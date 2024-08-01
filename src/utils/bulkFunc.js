"use client";
import { Web3 } from "web3";
export const web3 = new Web3(window.ethereum);

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "regulator",
        type: "address",
      },
    ],
    name: "approveInstitutes",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "studentname",
            type: "string",
          },
          {
            internalType: "string",
            name: "URI",
            type: "string",
          },
          {
            internalType: "string",
            name: "hash",
            type: "string",
          },
          {
            internalType: "string",
            name: "_type",
            type: "string",
          },
          {
            internalType: "address",
            name: "_witness",
            type: "address",
          },
        ],
        internalType: "struct Edubukesealer.bulkuploaddata[]",
        name: "data",
        type: "tuple[]",
      },
      {
        internalType: "string",
        name: "_issuerName",
        type: "string",
      },
    ],
    name: "bulkUpload",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string[]",
        name: "failedHashes",
        type: "string[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "count",
        type: "uint256",
      },
    ],
    name: "BulkUploadFailed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "hash",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "issuerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "studentname",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "issuerName",
        type: "string",
      },
    ],
    name: "CertificatePosted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "InstituteRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "instituteAddress",
        type: "address",
      },
    ],
    name: "InstituteRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "IssuerRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnerRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_institueName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_ackronynm",
        type: "string",
      },
      {
        internalType: "address",
        name: "_witness",
        type: "address",
      },
    ],
    name: "registerInstitute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_witness",
        type: "address",
      },
    ],
    name: "revokeWitness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_hash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "updateCertificateURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "issuerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "witness",
        type: "address",
      },
    ],
    name: "WitnessRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "witness",
        type: "address",
      },
    ],
    name: "instituteWitnessUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_studentname",
        type: "string",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
      {
        internalType: "string",
        name: "_hash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_type",
        type: "string",
      },
      {
        internalType: "string",
        name: "_issuerName",
        type: "string",
      },
    ],
    name: "postCertificate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_institute",
        type: "address",
      },
    ],
    name: "revokeInstitute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "studentname",
            type: "string",
          },
          {
            internalType: "string",
            name: "URI",
            type: "string",
          },
          {
            internalType: "string",
            name: "hash",
            type: "string",
          },
          {
            internalType: "string",
            name: "_type",
            type: "string",
          },
          {
            internalType: "address",
            name: "_witness",
            type: "address",
          },
        ],
        internalType: "struct Edubukesealer.bulkuploaddata[]",
        name: "data",
        type: "tuple[]",
      },
    ],
    name: "updateBulkCertificateURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newwitness",
        type: "address",
      },
    ],
    name: "UpdateWitness",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_hash",
        type: "string",
      },
    ],
    name: "chkApprovedInstitute",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_witness",
        type: "address",
      },
    ],
    name: "getinstituteID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_witness",
        type: "address",
      },
    ],
    name: "getInstituteWitnesses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_hash",
        type: "string",
      },
    ],
    name: "Verifycertificate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verifyContractOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "verifyInstitute",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_hash",
        type: "string",
      },
    ],
    name: "Viewcertificatedata",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_hash",
        type: "string",
      },
    ],
    name: "viewCertificateURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewInstituteID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const Contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
Contract.handleRevert = true;

export async function connectMetamask() {
  // Check if web3 is available
  if (typeof window.ethereum !== "undefined") {
    // Request access to the user's MetaMask account
    window.ethereum.enable();

    // Get the user's accounts
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  } else {
    window.alert("Please Install MetaMask!");
  }
}

export async function verifyLogin() {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];
  console.log(defaultAccount);
  const res = await Contract.methods
    .verifyContractOwner()
    .call({ from: defaultAccount });
  console.log(res);
  if (res === true) {
    console.log("returning");
    return res;
  }
  try {
    const ins = await Contract.methods
      .verifyInstitute()
      .call({ from: defaultAccount });
    console.log(ins);
    return ins;
  } catch (error) {
    console.log("Error in function calling");
    console.log(error);
    return false;
  }
}

// this func registers institute
export async function register(obj) {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];
  console.log(defaultAccount);
  try {
    const result = await Contract.methods
      .registerInstitute(obj.name, obj.acronym, obj.address)
      .send({ from: defaultAccount, gas: "3000000", gasPrice: "12500000000" });
    console.log(result);
    return result.blockHash;
  } catch (err) { 
    console.log("Error sending");
    console.log(err);
    if (err.data.code === 3) {
      alert("Error : Only admin can register Institute");
    } else {
      alert("Error: Please try again");
    }
  }
}

export async function revoke(obj) {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];
  console.log(defaultAccount);
  try {
    const result = await Contract.methods
      .revokeInstitute(obj.address)
      .send({ from: defaultAccount, gas: "3000000", gasPrice: "12500000000" });
    console.log(result);
    return result.transactionHash;
  } catch (err) {
    console.log("Error sending");
    console.log(err);
    if (err.data.code === 3) {
      alert("Error: Institute Not Registered");
    }
  }
}

// this fucntion approves regulator
export async function approve(obj) {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];
  console.log(defaultAccount);
  try {
    const result = await Contract.methods
      .approveInstitutes(obj.address)
      .send({ from: defaultAccount, gas: "3000000", gasPrice: "12500000000" });
    console.log("my transaction hash: ", result.transactionHash);
    return result.transactionHash;
  } catch (err) {
    console.log("Error sending");
    console.log(err);
    if (err.code === 432) {
      alert("Transaction Timed out: Please try again");
    }
  }
}

export async function update(obj) {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];
  console.log(defaultAccount);
  try {
    const result = await Contract.methods
      .UpdateWitness(obj.address)
      .send({ from: defaultAccount, gas: "3000000", gasPrice: "12500000000" });
    console.log(result);
    return result.transactionHash;
  } catch (err) {
    console.log("Error sending");
    console.log(err);
    if (err.code === 432) {
      alert("Transaction Timed out: Please try again");
    }
  }
}

export async function revokeWit(obj) {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];
  console.log(defaultAccount);
  try {
    const result = await Contract.methods
      .revokeWitness(obj.address)
      .send({ from: defaultAccount, gas: "3000000", gasPrice: "12500000000" });
    console.log(result);
    return result.transactionHash;
  } catch (err) {
    console.log("Error sending");
    console.log(err);
    console.log(err.code);
    if (err.code === 432) {
      alert("Transaction Timed out: Please try again");
    } else if (err.data.message === "execution reverted") {
      alert("You are not authorized to revoke ");
    } else if (err.code === 100) {
      alert("Error: There cannot be zero witnesses");
    }
  }
}

// export async function postCertificate(obj) {
//   const providersAccounts = await web3.eth.getAccounts();
//   const defaultAccount = providersAccounts[0];
//   try {
//     const receipt = await Contract.methods
//       .postCertificate(obj.name, obj.issuer, obj.type, obj.hash)
//       .send({
//         from: defaultAccount,
//         gas: "300000",
//         gasPrice: "12500000000",
//       });

//     console.log("Transaction Hash: " + receipt.transactionHash);
//     return receipt.transactionHash;
//   } catch (err) {
//     console.error(err);
//   }
// }

export async function registerCertificate(obj) {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];

  try {
    const res = await Contract.methods
      .verifyInstitute()
      .call({ from: defaultAccount });
    console.log(res);
    try {
      console.log("obj.name : " , obj.name);
      console.log("obj.issuer : ", obj.issuer);
      console.log("obj.hash : ", obj.hash);
      console.log("obj.type : ", obj.type);
      console.log("obj.uri : ", obj.uri);

      console.log("defaultAccount : ", defaultAccount);


      const result = await Contract.methods
        .postCertificate(obj.name, obj.uri, obj.hash, obj.type, obj.issuer) 
        .send({
          from: defaultAccount,
          gas: "3000000",
          gasPrice: "12500000000",
        });
      
      console.log("Object:", result);
      console.log("Transaction Hash: " + result.transactionHash); //error
      return result;
    } catch (error) {
      console.log("Error in posting certificate"); //error, this
      console.log(error);
    }
  } catch (error) {
    console.log("Institute Not Registered");
    console.log(error);
  }
}

export async function verify(hash) {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];

  try {
    const res = await Contract.methods
      .Viewcertificatedata(hash)
      .call({ from: defaultAccount });
    console.log("Object:", res);
    return res;
  } catch (error) {
    console.log("Error in function calling"); //error, verify
    console.log(error);
    if (error.data.code === 3) {
      alert("Error: Certificate Does not Exists");
    }
    return "Error";
  }
}

export async function checkApprove(hash) {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];

  try {
    const res = await Contract.methods
      .chkApprovedInstitute(hash)
      .call({ from: defaultAccount });
    console.log(res);
    return res;
  } catch (error) {}
}

export async function view(hash) {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];

  try {
    const res = await Contract.methods
      .viewCertificateURI(hash)
      .call({ from: defaultAccount });
    return res;
  } catch (error) {
    console.log("Error in function calling");
    console.log(error);
    return "Error";
  }
}

export async function bulkUpload(res, issuerName) {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];

  const gasPerItem = 3000000; // Adjust based on your estimation
  const gas = gasPerItem * res.length;
  console.log("res: ",res);

  const input = res.map(item => [
    item.studentname,
    item.URI,
    item.hash,
    item._type, 
    item._witness
  ]);
  console.log("input: " ,input);
  // struct bulkuploaddata {
  //   string studentname;
  //   string URI; 
  //   string hash; 
  //   string _type;
  //   address _witness;
  // }

  console.log("Transformed Input:", JSON.stringify(input, null, 2));

  try {
    const result = await Contract.methods.bulkUpload(input,issuerName).send({
      from: defaultAccount,
      gas: gas,
      gasPrice: "12500000000",
    });
    console.log("Object:", result);
    console.log("Transaction Hash: " + result.transactionHash);
    return result.transactionHash;
  } catch (error) {
    console.log("Error in posting certificate");
    console.log(error);
    alert("Please try again");
    return "error";
  }
}
