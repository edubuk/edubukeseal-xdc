// import * as csv from "@fast-csv/parse";
import crypto from "crypto";
import { Router } from "express";
import fs from "fs";
import multer from "multer";
import path, { resolve } from "path";
import { Web3 } from "web3";
import yauzl from "yauzl";
// import { s3 } from '../server.js';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import * as IPFS from "ipfs-http-client";
import dotenv from "dotenv";
import cors from "cors";
import { error } from "console";
import AWS from "aws-sdk";
import csv from "csv-parser";

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

const aws_key = process.env.AWS_KEY || env("AWS_KEY");
const aws_secret = process.env.AWS_SECRET || env("AWS_SECRET");
const smart_contract = process.env.SMART_CONTRACT || env("SMART_CONTRACT");
const rpc_url = process.env.RPC_URL || env("RPC_URL");
const private_key = process.env.PRIVATE_KEY|| env("PRIVATE_KEY");



dotenv.config();
// const { S3 } = S3Client;
const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  accessKeyId: aws_key,
  secretAccessKey: aws_secret,
  endpoint: "https://s3.filebase.com",
  region: "us-east-1",
  s3ForcePathStyle: true,

});
const witness = "0x4049EfBf3D0B1c66eDf833B5EE511e8562C7D8d7";

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

uploadRouter.post(
  "/upload",
  cors(),
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

      if (
        contentType !== "application/pdf" &&
        contentType !== "image/jpeg" &&
        contentType !== "image/png"
      ) {
        throw new Error(
          "Bad Request: Invalid File Type. Only PDF, JPG, and PNG are allowed."
        );
      }
      let fileType;
      if (contentType === "application/pdf") {
        fileType = ".pdf";
      } else if (contentType === "image/png") {
        fileType = ".png";
      } else if (contentType === "image/jpeg") {
        fileType = ".jpeg";
      }

      const pdfPath = req.files.file[0].path;
      const hashex = req.body.hash;
      const issued_by = req.body.issued_by;
      const issued_to = req.body.issued_to;

      const key = `${issued_by}/${issued_to}-${Date.now()}${fileType}`;

      const receipts = [];

      const pdfContent = fs.readFileSync(pdfPath);
      const URI = await uploadToIPFS2(pdfContent, key, contentType);
	  console.log("my uri:", URI); //added console uri

      // Interact with smart contract (consider asynchronous for large datasets)
      const web3 = new Web3(
        new Web3.providers.HttpProvider(rpc_url)
      );
       const wallet = web3.eth.accounts.wallet.add(
         private_key
       );

	   console.log(" my wallet: ", wallet[0]);
    //web3.eth.defaultAccount = wallet[0];

	//const providersAccounts = await web3.eth.getAccounts();
      //web3.eth.defaultAccount = providersAccounts[0];

      const contract = new web3.eth.Contract(
        abi, // Replace with your smart contract ABI
        smart_contract // Replace with your smart contract address
      );

      contract.handleRevert = true;
      //contract.transactionBlockTimeout = 50000;
      //contract.transactionBlockTimeout = 200000;

      const txHash = await contract.methods
        .updateCertificateURI(hashex, URI)
        .send({
          from: wallet[0].address,
          gas: "3000000",
		  gasPrice: "12500000000"
        });

      console.log("TXN HASH:", txHash.transactionHash);
      const receipt = await web3.eth.getTransactionReceipt(
        txHash.transactionHash
      );

      fs.unlinkSync(pdfPath);

      res.json({
        message: "File Upload Success",
        transactionHash: txHash.transactionHash,
      });
    } catch (error) {
      console.error(error);
      const pdfPath = req.files.file[0].path;
      if (pdfPath) {
        fs.unlinkSync(pdfPath);
      }
      res.status(500).send({ message: error.message });
    }
  }
);

const unzipAll = async (zipFileName) => {
  return new Promise((resolve, reject) => {
    yauzl.open(
      `${zipFileName}`,
      { lazyEntries: true },
      function (err, zipfile) {
        if (err) {
          console.error("Errror Opening zip file", err);
          reject(err);
        }

        zipfile.readEntry();
        zipfile.on("entry", function (entry) {
          if (
            /\/$/.test(entry.fileName) ||
            String(entry.fileName).includes("/")
          ) {
            zipfile.readEntry();
          } else {
            zipfile.openReadStream(entry, async function (err, readStream) {
              if (err) reject(err);
              readStream.on("end", function () {
                zipfile.readEntry();
              });
              const name = entry.fileName;
              const newFile = fs.createWriteStream(`uploads/unzip/${name}`);
              readStream.pipe(newFile);
            });
          }
        });
        zipfile.on("end", () => {
          resolve(); // Resolve the promise when unzip is complete
        });
      }
    );
  });
};

const corsOptions = {
  origin: "http://localhost:3000/", // Your frontend origin
  methods: "POST", // Allowed methods
};

function calculateGas(data) {
  // Example: calculate gas based on the number of items in the data
  const gasPerItem = 500000; // Adjust based on your estimation
  const gas = gasPerItem * data.length;
  return gas;
}

uploadRouter.post(
  "/bulk-upload",
  cors(),
  upload.fields([
    { name: "zip", maxCount: 1 },
    { name: "csv", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Validate file types
      if (
        req.files.zip[0].mimetype !== "application/zip" &&
        req.files.zip[0].mimetype !== "application/x-zip-compressed"
      ) {
        throw new Error("Bad Request: Invalid ZIP File Type");
      }
      if (req.files.csv[0].mimetype !== "text/csv") {
        throw new Error("Bad Request: Invalid CSV File Type");
      }

      // Process ZIP file
      const zipPath = req.files.zip[0].path;
      const csvPath = req.files.csv[0].path;

      console.log("zip", zipPath);
      console.log("csv", csvPath);

      const receipts = [];
      const db = [];

      const zipFile = req.files.zip[0].path;

      const unzipResult = await unzipAll(zipFile);
      console.log("Unzip result:", unzipResult);

      const csvData = await parseCSV(csvPath); // Helper function for synchronous CSV parsing
      console.log("csv", csvData);

      const processedData = await Promise.all(csvData.map(processData)); // Helper function for student data processing
      console.log("data", processedData);
      const s3Client = s3; // Replace with your AWS region

      const witness = req.query.witness;

      const uploadPromises = processedData.map(async (data) => {
        const fileType = getFileType(data.file_name);
        console.log("file type", fileType);
        let contentType;
        if (fileType === ".pdf") {
          contentType = "application/pdf";
        } else if (fileType === ".png") {
          contentType = "image/png";
        } else if (fileType === ".jpeg" || fileType === ".jpg") {
          contentType = "image/jpeg";
        } else {
          throw new Error("Unsupported file type");
        }

        const pdfPath = `uploads/unzip/${data.file_name}`; // Assuming unzipped files in 'uploads/unzip'

		const pdfContent = fs.readFileSync(pdfPath); // Synchronous file reading (alternative approaches needed for large files)
		
		const key = `${witness}/${data.studentname}-${Date.now()}${fileType}`;

        const urii = await uploadToIPFS2(pdfContent, key, contentType);

		const hashHex = await computeHash(pdfPath);
        console.log("Mahadev: Dhanraj hashHex: ", hashHex);

        return {
          studentname: data.studentname,
          hash: hashHex,
          _type: data._type,
          _witness: witness,
          URI: (`https://ipfs.filebase.io/ipfs/${urii}`), // IPFS CID from uploadToIPFS
        };
      });

      const processedDataWithIPFS = await Promise.all(uploadPromises);

      // Cleanup temporary files after successful processing
      cleanupFiles(zipPath, csvPath);

      res.json({
        message: "File Upload Success",
        response: processedDataWithIPFS,
        // Include transaction hashes in the response
      });
    } catch (error) {
      const zipPath = req.files.zip[0].path;
      const csvPath = req.files.csv[0].path;

      if (zipPath && csvPath) {
        cleanupFiles(zipPath, csvPath);
      }
      console.error(error);
      res.status(500).send({ message: error.message });
    }
  }
);

function getFileType(fileName) {
  const parts = fileName.split(".");
  if (parts.length === 1 || (parts[0] === "" && parts.length === 2)) {
    return "";
  }
  return `.${parts.pop()}`;
}

// Helper functions for synchronous operations (consider asynchronous alternatives for large datasets)
// function parseCSV(csvPath) {
//   return new Promise((res, rej) => {
//     let data = [];
//     const datafile = csv.parseFile(csvPath, {
//       headers: true,
//     });

//     datafile.on("data", function (row) {
//       console.log(row);
//       data = [...data, row];
//     });

//     datafile.on("end", function (rowCount) {
//       console.log("Total rows: " + rowCount);
//       res(data);
//     });

//     datafile.on("error", function (err) {
//       console.log(err.message);
//       rej(err);
//     });
//   });
// }

// function parseCSV(csvPath) {
//   return new Promise((resolve, reject) => {
//     const data = [];
//     let rowCount = 0;
//     fs.createReadStream(csvPath)
//       .pipe(csv.parse({ headers: true }))
//       .on("error", (error) => {
//         console.error("Error parsing CSV:", error);
//         reject(error);
//       })
//       .on("data", (row) => {
//         // Collect each row of data
//         data.push(row);
//         rowCount++;
//       })
//       .on("end", (rowCount) => {
//         console.log("Total rows parsed:", rowCount);
//         // Resolve the Promise with the collected data
//         resolve(data);
//       });
//   });
// }

function parseCSV(csvPath) {
  return new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        console.log("Total rows parsed: ", data.length);
        console.log("Data:", data);
        resolve(data);
      })
      .on("error", (error) => {
        console.error("Error parsing CSV: ", error);
        reject(error);
      });
  });
}

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
			console.log("hashFile:: data: ", data );
			// Compute SHA-256 hash
			const hash = crypto.createHash('sha256');
			hash.update(data);
			const hashHex = hash.digest('hex');
			console.log("hashFile:: hashHex: ", hashHex );

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

async function uploadToIPFS(data) {
  const ipfs = IPFS.create();

  try {
    const { cid } = await ipfs.add(data);
    return cid.toString();
  } catch (error) {
    throw error;
  }
}

function cleanupFiles(zipPath, csvPath) {
  console.log("cleanupFiles:: csvPath: ", csvPath);
  console.log("cleanupFiles:: zipPath: ", zipPath);
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

export default uploadRouter;
