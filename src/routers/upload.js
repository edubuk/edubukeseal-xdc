import crypto from "crypto";
import { Router } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import Web3 from "web3";
import yauzl from "yauzl";
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import * as IPFS from "ipfs-http-client";
import dotenv from "dotenv";
import cors from "cors";
import csv from "csv-parser";
import env  from "@beam-australia/react-env";

dotenv.config();

// Environment variables
const aws_key = process.env.AWS_KEY || env("AWS_KEY") || 'your-aws-key';
const aws_secret = process.env.AWS_SECRET || env("AWS_SECRET") || 'your-aws-secret';
const smart_contract = process.env.SMART_CONTRACT || env("SMART_CONTRACT") || '0xYourSmartContractAddress';
const rpc_url = process.env.RPC_URL || env("RPC_URL") || 'https://your-rpc-url';
const private_key = process.env.PRIVATE_KEY || env("PRIVATE_KEY") || '0xYourPrivateKey';

// Configure AWS S3
const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: aws_key,
        secretAccessKey: aws_secret,
    },
    endpoint: "https://s3.filebase.com",
    forcePathStyle: true,
});

const uploadRouter = Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
});
const upload = multer({ storage });

const corsOptions = {
    origin: [
      'https://edubukxdc-backend-sknjoltd5q-uc.a.run.app',
      'https://edubukeseal.com',
      '*'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  };
  
uploadRouter.use(cors(corsOptions));

uploadRouter.post("/upload", upload.fields([
    { name: "file", maxCount: 1 },
    { name: "hash", maxCount: 1 },
    { name: "issued_by", maxCount: 1 },
    { name: "issued_to", maxCount: 1 }
]), async (req, res) => {
    try {
        if (!req.files || !req.files.file || !req.files.file[0]) {
            throw new Error("Bad Request: file is missing");
        }

        const contentType = req.files.file[0].mimetype;
        if (!["application/pdf", "image/jpeg", "image/png"].includes(contentType)) {
            throw new Error("Bad Request: Invalid File Type. Only PDF, JPG, and PNG are allowed.");
        }

        const fileType = contentType === "application/pdf" ? ".pdf" : contentType === "image/png" ? ".png" : ".jpeg";
        const pdfPath = req.files.file[0].path;
        const { hash: hashex, issued_by, issued_to } = req.body;
        const key = `${issued_by}/${issued_to}-${Date.now()}${fileType}`;

        const pdfContent = fs.readFileSync(pdfPath);
        const URI = await uploadToIPFS2(pdfContent, key, contentType);

        const web3 = new Web3(new Web3.providers.HttpProvider(rpc_url));
        const wallet = web3.eth.accounts.wallet.add(private_key);
        const contract = new web3.eth.Contract(abi, smart_contract);

        const walletAddress = wallet[0].address || wallet.address;
        const txHash = await contract.methods.updateCertificateURI(hashex, URI).send({
            from: walletAddress,
            gas: "3000000",
            gasPrice: "12500000000"
        });

        fs.unlinkSync(pdfPath);

        res.json({
            message: "File Upload Success.",
            transactionHash: txHash.transactionHash,
        });
    } catch (error) {
        console.error("Error in POST /upload: ", error);
        if (req.files.file) {
            fs.unlinkSync(req.files.file[0].path);
        }
        res.status(500).send({ message: error.message });
    }
});

const unzipAll = (zipFileName) => {
    return new Promise((resolve, reject) => {
        yauzl.open(zipFileName, { lazyEntries: true }, (err, zipfile) => {
            if (err) return reject(err);

            zipfile.readEntry();
            zipfile.on("entry", (entry) => {
                if (/\/$/.test(entry.fileName) || entry.fileName.includes("/")) {
                    zipfile.readEntry();
                } else {
                    zipfile.openReadStream(entry, (err, readStream) => {
                        if (err) return reject(err);
                        readStream.on("end", () => zipfile.readEntry());
                        const name = entry.fileName;
                        const newFile = fs.createWriteStream(`uploads/unzip/${name}`);
                        readStream.pipe(newFile);
                    });
                }
            });

            zipfile.on("end", () => resolve());
        });
    });
};

uploadRouter.post("/bulk-upload", upload.fields([
    { name: "zip", maxCount: 1 },
    { name: "csv", maxCount: 1 }
]), async (req, res) => {
    try {
        if (req.files.zip[0].mimetype !== "application/zip" && req.files.zip[0].mimetype !== "application/x-zip-compressed") {
            throw new Error("Bad Request: Invalid ZIP File Type");
        }
        if (req.files.csv[0].mimetype !== "text/csv") {
            throw new Error("Bad Request: Invalid CSV File Type");
        }

        const zipPath = req.files.zip[0].path;
        const csvPath = req.files.csv[0].path;

        await unzipAll(zipPath);
        const csvData = await parseCSV(csvPath);
        const processedData = await Promise.all(csvData.map(processData));
        const witness = req.query.witness;

        const uploadPromises = processedData.map(async (data) => {
            const fileType = getFileType(data.file_name);
            const contentType = fileType === ".pdf" ? "application/pdf" : fileType === ".png" ? "image/png" : "image/jpeg";

            const pdfPath = `uploads/unzip/${data.file_name}`;
            const pdfContent = fs.readFileSync(pdfPath);
            const key = `${witness}/${data.studentname}-${Date.now()}${fileType}`;

            const URI = await uploadToIPFS2(pdfContent, key, contentType);
            const hashHex = await computeHash(pdfPath);

            return {
                studentname: data.studentname,
                hash: hashHex,
                _type: data._type,
                _witness: witness,
                URI,
            };
        });

        const processedDataWithIPFS = await Promise.all(uploadPromises);

        fs.unlinkSync(zipPath);
        fs.unlinkSync(csvPath);

        res.json({
            message: "File Upload Success",
            response: processedDataWithIPFS,
        });
    } catch (error) {
        console.error(error);
        if (req.files.zip) fs.unlinkSync(req.files.zip[0].path);
        if (req.files.csv) fs.unlinkSync(req.files.csv[0].path);
        res.status(500).send({ message: error.message });
    }
});

function getFileType(fileName) {
    return path.extname(fileName).toLowerCase();
}

function parseCSV(csvPath) {
    return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on("data", (row) => data.push(row))
            .on("end", () => resolve(data))
            .on("error", (error) => reject(error));
    });
}

function processData(data) {
    return {
        studentname: data.issued_to,
        _type: data.cert_type,
        file_name: data.file_name,
    };
}

const hashFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) return reject(err);
            const hash = crypto.createHash('sha256').update(data).digest('hex');
            resolve(hash);
        });
    });
};

const computeHash = async (filePath) => {
    return hashFile(filePath);
};

async function uploadToIPFS2(data, key, contentType) {
    const params = {
        Bucket: "edubuk",
        Key: key,
        Body: data,
        ContentType: contentType,
    };
    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log(`File uploaded successfully: ${data.Location}`);
        const metadata = await s3Client.send(new HeadObjectCommand({ Bucket: params.Bucket, Key: params.Key }));
        const cid = metadata.Metadata.cid;
        if (cid) return cid;
        throw new Error("CID not found in metadata");
    } catch (err) {
        console.error(`Error uploading file: ${err}`);
        throw err;
    }
}

export default uploadRouter;
