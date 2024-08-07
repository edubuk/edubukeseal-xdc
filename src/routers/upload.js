import crypto from "crypto";
import { Router } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { Web3 } from "web3";
import yauzl from "yauzl";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import cors from "cors";
import AWS from "aws-sdk";
import csv from "csv-parser";
import env from "@beam-australia/react-env";

dotenv.config();

const aws_key = process.env.AWS_KEY || env("AWS_KEY") || 'CC4943D384E226A7C338';
const aws_secret = process.env.AWS_SECRET || env("AWS_SECRET") || 'ArF1IVYF7rm4OqfcVuB2shDtlEbFuRJkR9LKtxC4';
const smart_contract = process.env.SMART_CONTRACT || env("SMART_CONTRACT") || '0x7B29389a13a2a2443581B511bfD3386eaC175802';
const rpc_url = process.env.RPC_URL || env("RPC_URL") || 'https://earpc.xinfin.network';
const private_key = process.env.PRIVATE_KEY || env("PRIVATE_KEY") || '0xe8e1afe6fe58acd52072e33e62c9c29ac727e99da3e01532cf68bb8830aaa461';

const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string[]",
				"name": "failedHashes",
				"type": "string[]"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "BulkUploadFailed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "hash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "issuerId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "studentname",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "issuerName",
				"type": "string"
			}
		],
		"name": "CertificatePosted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "InstituteRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "instituteAddress",
				"type": "address"
			}
		],
		"name": "InstituteRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "IssuerRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnerRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "issuerId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "witness",
				"type": "address"
			}
		],
		"name": "WitnessRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "witness",
				"type": "address"
			}
		],
		"name": "instituteWitnessUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newwitness",
				"type": "address"
			}
		],
		"name": "UpdateWitness",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "Verifycertificate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "Viewcertificatedata",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "regulator",
				"type": "address"
			}
		],
		"name": "approveInstitutes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "studentname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "URI",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_type",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "_witness",
						"type": "address"
					}
				],
				"internalType": "struct Edubukesealer.bulkuploaddata[]",
				"name": "data",
				"type": "tuple[]"
			},
			{
				"internalType": "string",
				"name": "_issuerName",
				"type": "string"
			}
		],
		"name": "bulkUpload",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "chkApprovedInstitute",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_witness",
				"type": "address"
			}
		],
		"name": "getInstituteWitnesses",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_witness",
				"type": "address"
			}
		],
		"name": "getinstituteID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_studentname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_uri",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_type",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuerName",
				"type": "string"
			}
		],
		"name": "postCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_institueName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ackronynm",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_witness",
				"type": "address"
			}
		],
		"name": "registerInstitute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_institute",
				"type": "address"
			}
		],
		"name": "revokeInstitute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_witness",
				"type": "address"
			}
		],
		"name": "revokeWitness",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "studentname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "URI",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "hash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "_type",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "_witness",
						"type": "address"
					}
				],
				"internalType": "struct Edubukesealer.bulkuploaddata[]",
				"name": "data",
				"type": "tuple[]"
			}
		],
		"name": "updateBulkCertificateURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_uri",
				"type": "string"
			}
		],
		"name": "updateCertificateURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "verifyContractOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "verifyInstitute",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "viewCertificateURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewInstituteID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const s3 = new AWS.S3({
	apiVersion: "2006-03-01",
	accessKeyId: aws_key,
	secretAccessKey: aws_secret,
	endpoint: "https://s3.filebase.com",
	region: "us-east-1",
	s3ForcePathStyle: true,
	signatureVersion: "v4",
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
const upload = multer({ storage: storage });

const corsOptions = {
	origin: 'https://edubukeseal.com',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true
};

uploadRouter.use(cors(corsOptions));

const unzipAll = async (zipFileName) => {
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

						const name = entry.fileName;
						const newFile = fs.createWriteStream(`uploads/unzip/${name}`);
						readStream.pipe(newFile);

						readStream.on("end", () => {
							zipfile.readEntry();
						});
					});
				}
			});
			zipfile.on("end", () => resolve());
		});
	});
};

const parseCSV = async (csvPath) => {
	return new Promise((resolve, reject) => {
		const results = [];
		fs.createReadStream(csvPath)
			.pipe(csv())
			.on('data', (data) => results.push(data))
			.on('end', () => resolve(results))
			.on('error', (error) => reject(error));
	});
};

function calculateGas(data) {
	const gasPerItem = 500000; // Adjust based on your estimation
	const gas = gasPerItem * data.length;
	return gas;
}

const getFileType = (fileName) => {
	const ext = path.extname(fileName).toLowerCase();
	return ext;
};

function processData(data) {
	return {
		studentname: data.issued_to,
		_type: data.cert_type,
		file_name: data.file_name, // Assuming a file name field in the CSV
	};
}

const hashFile = (filePath) => {
	console.log("hashFile:: filePath", filePath);

	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			if (err) {
				console.log("hashFile:: err: ", err);
				reject(err);
				return;
			}
			console.log("hashFile:: data: ", data);
			// Compute SHA-256 hash
			const hash = crypto.createHash('sha256');
			hash.update(data);
			const hashHex = hash.digest('hex');
			console.log("hashFile:: hashHex: ", hashHex);

			resolve(hashHex);
		});
	});
};

const computeHash = async (filePath) => {
	console.log("computeHash:: filePath", filePath);
	try {
		const hashDigest = await hashFile(filePath);
		console.log("computeHash:: hashDigest ", hashDigest);
		return hashDigest; // Return the hash digest directly
	} catch (error) {
		console.error('Error computing hash:', error);
		throw error; // Ensure the error is propagated
	}
};

function cleanupFiles(zipPath, csvPath) {
	// Function to handle file deletion
	const deleteFile = (filePath) => {
		if (filePath) {
			fs.unlink(filePath, (err) => {
				if (err) {
					console.error(`Error deleting file at ${filePath}:`, err);
				} else {
					console.log(`Successfully deleted file at ${filePath}`);
				}
			});
		}
	};

	// Log paths for debugging
	console.log("cleanupFiles:: csvPath: ", csvPath);
	console.log("cleanupFiles:: zipPath: ", zipPath);

	// Delete the files
	deleteFile(csvPath);
	deleteFile(zipPath);
}

async function uploadToIPFS2(data, key, Type) {
	const params = {
		Bucket: "edubuk",
		Key: key,
		Body: data,
		ContentType: Type,
	};
	try {
		const data = await s3.upload(params).promise();
		console.log(`File uploaded successfully at ${data.Location}`);
		const metadata = await s3
			.headObject({ Bucket: params.Bucket, Key: params.Key })
			.promise();
		const cid = metadata.Metadata.cid;
		if (cid) {
			console.log(`CID: ${cid}`);
			return cid;
		} else {
			console.log("CID not found in metadata");
			return null;
		}
	} catch (err) {
		console.error(`Error uploading file: ${err}`);
		throw err;
	}
}

async function getUri(data, key, Type) {
	const params = {
		Bucket: "edubuk",
		Key: key,
		Body: data,
		ContentType: Type,
		Metadata: { import: "car" },
	};
	try {
		const request = s3.putObject(params, (err, data) => {
			if (err) {
				console.error("Error uploading file:", err);
			} else {
				s3.headObject(
					{
						Bucket: "edubuk",
						Key: key,
					},
					(err, metadata) => {
						if (err) {
							console.error("Error retrieving metadata:", err);
						} else {
							const cid = metadata.Metadata.cid;
							const uri = `ipfs://${cid}`;
							console.log(`CID: ${cid}`);
							console.log(`URI: ${uri}`);
						}
					}
				);
			}
		});
	} catch (err) {
		console.error(`Error uploading file: ${err}`);
		throw err;
	}
}

uploadRouter.post(
	"/upload",
	upload.fields([
		{ name: "file", maxCount: 1 },
		{ name: "hash", maxCount: 1 },
		{ name: "issued_by", maxCount: 1 },
		{ name: "issued_to", maxCount: 1 },
	]),
	async (req, res) => {
		try {
			if (!req.files || !req.files.file || !req.files.file[0]) {
				throw new Error("Bad Request: file is missing");
			}

			const contentType = req.files.file[0].mimetype;

			const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
			if (!allowedTypes.includes(contentType)) {
				throw new Error("Bad Request: Invalid File Type. Only PDF, JPG, JPEG, and PNG are allowed.");
			}

			let fileType;
			if (contentType === "application/pdf") fileType = ".pdf";
			else if (contentType === "image/png") fileType = ".png";
			else if (contentType === "image/jpeg") fileType = ".jpeg";
			else if (contentType === "image/jpg") fileType = ".jpg";

			const pdfPath = req.files.file[0].path;
			const hashex = req.body.hash;
			const issued_by = req.body.issued_by;
			const issued_to = req.body.issued_to;

			const key = `${issued_by}/${issued_to}-${Date.now()}${fileType}`;

			const pdfContent = fs.readFileSync(pdfPath);
			const URI = await uploadToIPFS2(pdfContent, key, contentType);
			console.log("my uri:", URI);

			const web3 = new Web3(new Web3.providers.HttpProvider(rpc_url));
			const wallet = web3.eth.accounts.wallet.add(private_key);

			const contract = new web3.eth.Contract(abi, smart_contract);
			contract.handleRevert = true;

			const txHash = await contract.methods
				.updateCertificateURI(hashex, URI)
				.send({
					from: wallet[0].address,
					gas: "3000000",
					gasPrice: "12500000000"
				});

			console.log("TXN HASH:", txHash.transactionHash);

			fs.unlinkSync(pdfPath);

			res.json({
				message: "File Upload Success",
				transactionHash: txHash.transactionHash,
			});
		} catch (error) {
			console.error(error);
			if (req.files && req.files.file && req.files.file[0]) {
				const pdfPath = req.files.file[0].path;
				if (pdfPath) fs.unlinkSync(pdfPath);
			}
			res.status(500).send({ message: error.message });
		}
	}
);

uploadRouter.post(
	"/bulk-upload",
	upload.fields([
		{ name: "zip", maxCount: 1 },
		{ name: "csv", maxCount: 1 },
	]),
	async (req, res) => {
		try {
			if (!req.files.zip || !req.files.zip[0] || !req.files.csv || !req.files.csv[0]) {
				throw new Error("Bad Request: Missing files");
			}

			const zipMimeType = req.files.zip[0].mimetype;
			const csvMimeType = req.files.csv[0].mimetype;

			if (zipMimeType !== "application/zip" && zipMimeType !== "application/x-zip-compressed") {
				throw new Error("Bad Request: Invalid ZIP File Type");
			}
			if (csvMimeType !== "text/csv") {
				throw new Error("Bad Request: Invalid CSV File Type");
			}

			const zipPath = req.files.zip[0].path;
			const csvPath = req.files.csv[0].path;

			console.log("zip", zipPath);
			console.log("csv", csvPath);

			await unzipAll(zipPath);
			const csvData = await parseCSV(csvPath);

			const processedData = await Promise.all(csvData.map(processData));
			console.log("data", processedData);

			const s3Client = s3;
			const witness = req.query.witness;

			const uploadPromises = processedData.map(async (data) => {
				const fileType = getFileType(data.file_name);
				let contentType;
				if (fileType === ".pdf") contentType = "application/pdf";
				else if (fileType === ".png") contentType = "image/png";
				else if (fileType === ".jpeg" || fileType === ".jpg") contentType = "image/jpeg";
				else throw new Error("Unsupported file type");

				const pdfPath = `uploads/unzip/${data.file_name}`;
				const pdfContent = fs.readFileSync(pdfPath);

				const key = `${witness}/${data.studentname}-${Date.now()}${fileType}`;
				const uri = await uploadToIPFS2(pdfContent, key, contentType);

				const hashHex = await contract.methods.updateCertificateURI(data.hash, uri).send({
					from: wallet[0].address,
					gas: "3000000",
					gasPrice: "12500000000",
				});

				return { data, uri, hashHex: hashHex.transactionHash };
			});

			const results = await Promise.all(uploadPromises);

			fs.unlinkSync(zipPath);
			fs.unlinkSync(csvPath);

			res.json({ message: "Bulk Upload Success", results });
		} catch (error) {
			console.error(error);
			if (req.files.zip && req.files.zip[0]) fs.unlinkSync(req.files.zip[0].path);
			if (req.files.csv && req.files.csv[0]) fs.unlinkSync(req.files.csv[0].path);
			res.status(500).send({ message: error.message });
		}
	}
);

export default uploadRouter;
