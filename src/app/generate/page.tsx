"use client";
import { TickCircle, Warning2 } from "iconsax-react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import env  from "@beam-australia/react-env";
 
const api = process.env.API || env("API");


const outfit = Outfit({ subsets: ["latin"] });

const Generation = () => {
  const [type, setType] = useState(0);
  const [clicked, setClicked] = useState(false);

  const [issuerName, setIssuerName] = useState("");

  

  const router = useRouter();

  useEffect(() => {
    if (
      !(window as any).ethereum ||
      !(window as any).ethereum.selectedAddress
    ) {
      // Redirect to login page if not connected
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => setClicked(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [clicked]);

  const [FileName, setFile] = useState(new File([], "", {}));
  const [ConnectedAccount, setConnectedAccount] = useState("");
  const [FileHash, setFileHash] = useState("");
  const [TxnHash, setTxnHash] = useState("");
  const [CertType, setCertType] = useState("");
  const [CertOwner, setCertOwner] = useState("");
  const [CertIssuer, setCertIssuer] = useState("");
  const [CertId, setCertId] = useState("");

  const [zipFile, setZipFile] = useState(new File([], "", {}));
  const [csvFile, setCSVFile] = useState(new File([], "", {}));
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);
  const [successBulk, setSuccessBulk] = useState(0);
  const [bulkArray, setBulkArray] = useState([]);

  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
  };
  const registerBulkFiles = async () => {
    const formData = new FormData();
    formData.append("zip", zipFile);
    formData.append("csv", csvFile);
    // integrate bulk upload api here just by passing address in the parameter
    try {
      console.log(zipFile);
      setSuccessBulk(1);
      const res = await fetch(`${api}bulk-upload?witness=${ConnectedAccount}`,
        {
          method: "POST",
          body: formData,
          headers: {
            // 'Content-Type': 'multipart/form-data', // or the appropriate content type for your use case
            'Access-Control-Allow-Origin': '*', // This is usually handled by the server, not set by the client
            'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Credentials': 'false' // Indicates whether credentials are included in the request
          },
          credentials: 'include', // This includes credentials (cookies, etc.) in the request
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.message === "File Upload Success") {
        setSuccessBulk(2);
        setBulkArray(data.response);
        console.log("Successfully Sumbitted");
      } else {
        alert("File Upload Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showBulkTransaction = async () => {
    const { connectMetamask } = await import("./../../utils/bulkFunc");
    connectMetamask().then((res: any) => {
      console.log("Connected To : ", res);
      setConnectedAccount(res);
    });

    const { bulkUpload } = await import("./../../utils/bulkFunc");
    console.log("Sending issuerName:", issuerName); // Log before sending
    const res: any = await bulkUpload(bulkArray, issuerName);
    console.log(res);
    if (res === "error") {
    } else {
      setTxnHash(res);
      setSuccessBulk(3);
    }
  };

  const hashFile = async (file: any) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (event: any) => {
        try {
          const arrayBuffer = event.target.result;
          const byteArray = new Uint8Array(arrayBuffer);
  
          // Compute SHA-256 hash
          console.log("byteaArrary: ", byteArray);

          const hashBuffer = await crypto.subtle.digest("SHA-256", byteArray);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          
          // Convert hash to hex string with leading zeros padded
          const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join("");
          console.log("Hashhex_frontend:", hashHex);
          resolve(hashHex);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };
  

  const computeHash = async () => {
    const hashDigest: any = await hashFile(FileName);
    console.log(hashDigest);
    setFileHash(hashDigest);
  };

  const displayAccount = async () => {
    const { connectMetamask } = await import("./../../utils/bulkFunc");
    connectMetamask().then((res: any) => {
      console.log("Connected To : ", res);
      setConnectedAccount(res);
    });
  };

  //const [isRegistered, setIsRegistered] = useState(false); //false success msg

  const registerFile = async () => {
    const obj = {
      name: CertOwner,
      issuer: CertIssuer,
      uri: CertId,
      type: CertType,
      hash: FileHash,
    };

    const { connectMetamask } = await import("./../../utils/bulkFunc");
    connectMetamask().then((res: any) => {
      console.log("Connected To : ", res);
      setConnectedAccount(res);
    });

    //setIsRegistered(true); 
    //setTimeout(() => setIsRegistered(false), 10000);
    //false single certif upload success message

    const { registerCertificate } = await import("../../utils/bulkFunc");

    const receipt: any = await registerCertificate(obj);
    console.log(receipt);
    if (receipt === 3) {
      alert("Institute Not Registered. Please register");
      return;
    }
    const formData = new FormData();
    formData.append("file", FileName);
    formData.append("issued_to", CertOwner);
    formData.append("issued_by", CertIssuer);
    formData.append("hash", FileHash);
    try {
      // const res = await fetch(`${api}upload`, {
      //   method: "POST",
      //   body: formData,

      // });
      const res = await fetch(`${api}upload`, {
        method: "POST",
        body: formData,
        headers: {
          // 'Content-Type': 'multipart/form-data', // or the appropriate content type for your use case
          'Access-Control-Allow-Origin': '*', // This is usually handled by the server, not set by the client
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'false' // Indicates whether credentials are included in the request
        },
        credentials: 'include', // This includes credentials (cookies, etc.) in the request
      });
      const data = await res.json();
      console.log(data);
      if (data.message === "File Upload Success") {
        setSuccess(true);
        setTxnHash(receipt);
      }
      console.log("Successfully Sumbitted");
    } catch (error) {
      alert("Please try again");
      console.log(error);
    }
  };

  return (
    <div className="bg-page-bg bg-full bg-no-repeat flex flex-col gap-20 py-16 sem:w-auto ">
      <div className="flex flex-col gap-9">
        <span
          className={`${outfit.className} font-semibold text-[64px] text-[#2D6F57] text-center sem:text-4xl`}
        >
          eSeal Certificates
        </span>
        <span
          className={`${outfit.className} font-light text-xl w-[50%] mx-auto text-[#2D6F57] text-center`}
        >
          Record Academic & Work-Experience Certificates and CVs on Blockchain
					in a transparent & tamper-proof manner
        </span>

        <Link
      href="/dashboard/institute"
      onClick={() => setClicked(true)}
      className={`rounded-[20px] flex self-center w-fit mx-auto font-normal text-base text-center ${
        clicked ? 'bg-[#2D6F57]' : 'bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2]'
      } text-[#ffffff] ${outfit.className} py-2 px-6 mt-6 transition-colors duration-300 ease-in-out`}
    >
      <button className="focus:outline-none">Add Witness</button>
    </Link>

      </div>
      <div className="rounded-[20px] border border-solid border-[#FFFFFF4D] w-[50%] mx-auto bg-[#E0FAEA] pt-9 pb-24 px-7 flex flex-col gap-8 sem:p-4 med:w-[90%] med:m-auto">
        <span
          className={`${outfit.className} font-medium text-5xl text-[#2D6F57] text-center`}
        >
          eSealer
        </span>
        
        <div className="flex gap-6 justify-center w-[80%] mx-auto bg-white p-4 rounded-[20px]">
  <button
    onClick={() => {
      setType(0);
      setTxnHash("");
      setSuccess(false);
    }}
    className={`rounded-[30px] font-normal text-xl text-center ${
      type === 0 ? "bg-[#2D6F57] text-[#ffffff]" : "bg-transparent text-[#2D6F57] border border-[#2D6F57]"
    } ${outfit.className} flex py-2 px-6 transition-colors duration-300 ease-in-out`}
  >
    Single Certificate
  </button>
  <button
    onClick={() => {
      setType(1);
      setTxnHash("");
      setSuccess(false);
      displayAccount();
    }}
    className={`rounded-[30px] font-normal text-xl text-center ${
      type === 1 ? "bg-[#2D6F57] text-[#ffffff]" : "bg-transparent text-[#2D6F57] border border-[#2D6F57]"
    } ${outfit.className} flex py-2 px-6 transition-colors duration-300 ease-in-out`}
  >
    Bulk Certificate
  </button>
</div>


        {type === 0 ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label
                className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
              >
                Certificate issued to
              </label>
              <input
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                type="text"
                placeholder="Name"
                onChange={(e) => setCertOwner(e.target.value)}
                value={CertOwner}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label
                className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
              >
                Certificate issued by
              </label>
              <input
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                type="text"
                placeholder="Certifying Authority"
                onChange={(e) => setCertIssuer(e.target.value)}
                value={CertIssuer}
              />
            </div>
            <div className="flex flex-col gap-4">
              <label
                className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
              >
                Certificate type
              </label>
              <input
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                type="text"
                placeholder="Certificate Type"
                onChange={(e) => setCertType(e.target.value)}
                value={CertType}
              />
            </div>
            <div className="flex flex-col w-[300px] gap-4">
              <label
                className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
              >
                Upload document
              </label>
              <input
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF] sem:w-full`}
                type="file"
                name="pdf"
                placeholder="Choose file"
                onChange={selectFile}
              />
            </div>
            <button
              onClick={() => {
                computeHash();
                setClicked(true);
              }}
              className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] ${
                clicked ? 'bg-[#2D6F57]' : 'bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2]'
              } ${outfit.className} flex self-center py-2 px-6 w-fit transition-colors duration-300 ease-in-out`}
            >
              Compute File Hash
            </button>
            
            <div className="flex flex-col gap-4">
              <label
                className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
              >
                File hash of selected file
              </label>
              <input
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF] sem:p-4`}
                type="text"
                placeholder="Fill out the form and select a file"
                readOnly
                value={FileHash}
              />
            </div>
            <button
              onClick={registerFile}
              className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
            >
              Register File
            </button>

            {/*{isRegistered && (
        <div className="mt-4 text-center">
          <span
                    className={`w-full text-xl text-center text-green-500 font-normal ${outfit.className} flex self-center py-2 px-6 justify-center`}
                  >
                    <TickCircle size="32" color="#22c55e" variant="Bold" />
                    File {`"${FileName.name}"`} Successfully Registered!
                  </span>
        </div>
      )}*/
      //function calling false success msg
      }

{(success || TxnHash !== "") && (
  <>
    <div className="flex flex-col gap-4">
      <label
        className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
      >
        Transaction Hash
      </label>
      <Link
        href={`https://explorer.xinfin.network/tx/${TxnHash}`}
        target="_blank"
        className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF] sem:p-4 overflow-scroll`}
      >
        {`${TxnHash}`}
      </Link>
    </div>
    <div className="flex flex-col gap-4">
      <span
        className={`w-full text-xl text-center text-green-500 font-normal ${outfit.className} flex self-center py-2 px-6 justify-center`}
      >
        <TickCircle size="32" color="#22c55e" variant="Bold" />
        File {`"${FileName.name}"`} Successfully Registered!
      </span>
      <button
        className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
        onClick={() => window.location.reload()}
      >
        Click here to register another certificate
      </button>
    </div>
  </>
)}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {successBulk === 0 ? (
              <>
                <div className="flex flex-col gap-4">
                  <label
                    className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                  >
                    Institute Address
                  </label>
                  <input
                    className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                    type="text"
                    placeholder="Your Address"
                    readOnly
                    value={ConnectedAccount}
                  />
                </div>
                <div className="flex flex-col gap-5">
                <span
                  className={`${outfit.className} text-center font-normal text-xl text-[#2D6F57]`}
                >
                  Download sample CSV template
                </span>
                <a
                  download
                  href="./testt.csv"
                  style={{ display: "flex", alignSelf: "center" }}
                >
                  <button
                    className={`rounded-[30px] self-center w-fit font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
                  >
                    Download
                  </button>
                </a>
                </div>

                <div className="flex flex-col gap-4">
                <label
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                >
                  Issuer Name
                </label>
                <input
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                  type="text"
                  placeholder="Enter issuer name"
                  value={issuerName}
                  onChange={(e) => setIssuerName(e.target.value)}
                />
              </div>
                


                <div className="flex justify-between gap-6">
                  <div className="flex flex-col w-[300px] gap-4">
                    <label
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                    >
                      Upload zipfile
                    </label>
                    <input
                      className={`${outfit.className} font-normal text-l text-[#2D6F57] w-[100%] rounded-[20px] p-4 bg-[#FFFFFF] sem:w-full`}
                      type="file"
                      name="zip"
                      placeholder="Choose file"
                      onChange={(e: any) => {
                        setZipFile(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-[300px] gap-4">
                    <label
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                    >
                      Upload csvfile
                    </label>
                    <input
                      className={`${outfit.className}  font-normal text-l text-[#2D6F57] w-[100%] rounded-[20px] p-4 bg-[#FFFFFF] sem:w-full`}
                      type="file"
                      name="csv"
                      placeholder="Choose file"
                      onChange={(e: any) => {
                        setCSVFile(e.target.files[0]);
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={registerBulkFiles}
                  className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
                >
                  Register Bulk Files
                </button>
              </>
            ) : successBulk === 1 ? (
              <div className="flex flex-col gap-4">
                <span
                  className={`w-full text-xl text-center text-yellow-500 font-normal ${outfit.className} flex self-center py-2 px-6 justify-center`}
                >
                  Files Are Being Uploaded...
                </span>
              </div>
            ) : successBulk === 2 ? (
              <div className="flex flex-col gap-4">
                <span
                  className={`w-full text-xl text-center text-green-500 font-normal ${outfit.className} flex self-center py-2 px-6 justify-center`}
                >
                  <TickCircle size="32" color="#22c55e" variant="Bold" />
                  Files Successfully Uploaded!
                </span>
                <button
                  className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
                  onClick={() => {
                    showBulkTransaction();
                    //setSuccessBulk(3);
                  
                  }}
                >
                  Click here to Register
                </button>
              </div>
            ) //below is false success message0
            : (
              <>
                <div className="flex flex-col gap-4">
                  <label
                    className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                  >
                    Transaction Hash
                  </label>
                  <Link
                  href={`https://explorer.xinfin.network/tx/${TxnHash}`}
                  target="_blank"
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF] sem:p-4 overflow-scroll`}
                >
                  {`${TxnHash}`}
                </Link>
                </div>
                <div className="flex flex-col gap-4">
                  <span
                    className={`w-full text-xl text-center text-green-500 font-normal ${outfit.className} flex self-center py-2 px-6 justify-center`}
                  >
                    <TickCircle size="32" color="#22c55e" variant="Bold" />
                    Files Successfully Registered!
                  </span>
                  <button
                    className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
                    onClick={() => window.location.reload()}
                  >
                    Click here to register more
                  </button>
                </div>
              </>
            ) 
            
            }
          </div>
        )}
      </div>
    </div>
  );
};


export default Generation;
