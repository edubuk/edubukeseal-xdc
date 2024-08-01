"use client";

import { TickCircle } from "iconsax-react";
import moment from "moment";
import { Outfit } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";


const outfit = Outfit({ subsets: ["latin"] });

const Verify = () => {
  const router = useRouter();
  const [isVerify, setIsVerify] = useState(false);
  const [isError, setIsError] = useState(false);
  const [FileName, setFile] = useState(new File([], "", {}));
  const [FileHash, setFileHash] = useState("");
  const [CertType, setCertType] = useState("");
  const [CertOwner, setCertOwner] = useState("");
  const [Timestamp, setTimestamp] = useState(BigInt(0));
  const [Witness, setWitness] = useState("");
  const [CertIssuer, setCertIssuer] = useState("");
  const [CertURI, setCertURI] = useState("");
  const [view, setView] = useState(0);
  const [address, setAddress] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [ConnectedAccount, setConnectedAccount] = useState("");

  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
    setIsVerify(false);
  };

  // const hashFile = async (file: any) => {
  //   const reader = new FileReader();
  //   return new Promise((resolve, reject) => {
  //     reader.onload = (event: any) => {
  //       const arrayBuffer = event.target.result;
  //       // Convert arrayBuffer to Uint8Array (required for crypto.subtle)
  //       const byteArray = new Uint8Array(arrayBuffer);
  //       console.log(JSON.stringify(byteArray));

  //       crypto.subtle
  //         .digest("SHA-256", byteArray)
  //         .then((hashBuffer) => {
  //           // Convert hashBuffer to hex string
  //           const hashArray = Array.from(new Uint8Array(hashBuffer));
  //           const hashHex = hashArray.map((b) => b.toString(16)).join("");
  //           resolve(hashHex);
  //         })
  //         .catch(reject);
  //     };
  //     reader.onerror = reject;
  //     reader.readAsArrayBuffer(file);
  //   });
  // };

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
    console.log("my hash:",hashDigest);
    setFileHash(hashDigest);

    const { verify } = await import("./../../utils/bulkFunc");
    const obj: any = await verify(hashDigest);
    console.log(obj);
    if (obj === "Error") {
      setIsError(true);
      setIsVerify(false);
    } else {
      setIsError(false);
      setIsVerify(true);
      setInstituteName(obj[1]);
      setCertType(obj[2]);
      setCertOwner(obj[0]);
      setFileHash(obj[3]);
      setTimestamp(obj[6]);
      setWitness(obj[5]);
    }

    const { checkApprove } = await import("./../../utils/bulkFunc");
    const res: any = await checkApprove(hashDigest);
    console.log(res);
    if (res === true) {
      setView(1);
    }
  };

  const displayAccount = async () => {
    const { connectMetamask } = await import("./../../utils/bulkFunc");
    connectMetamask().then((res: any) => {
      console.log("Connected To : ", res);
      setConnectedAccount(res);
    });
  };

  const viewCertificate = async () => {
    const hashDigest: any = await hashFile(FileName);

    const { view } = await import("./../../utils/bulkFunc");
    const res: any = await view(hashDigest);
    setCertURI(res);
  };

  return (
    <div className="flex flex-col py-16 items-center gap-40 bg-page-bg bg-full bg-no-repeat med:gap-20 mb-11">
      <div className="flex flex-col gap-14 w-[50%] m-auto med:w-fit">
        <div className="flex flex-col gap-9">
          <span
            className={`${outfit.className} font-semibold text-[64px] text-[#2D6F57] text-center sem:text-4xl`}
          >
            Verify Certificates
          </span>
          <span
            className={`${outfit.className} font-light text-xl text-[#2D6F57] text-center`}
          >
            Verify Academic & Work-Experience Certificates and CVs on Blockchain
            in a transparent & tamper-proof manner
          </span>
        </div>
        <div className="rounded-[20px] border border-solid border-[#FFFFFF30] bg-[#E0FAEA] py-9 px-7 flex flex-col gap-16 sem:p-4 sem:w-[90%] sem:m-auto">
          {view === 2 ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <label
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                >
                  Institute Account Address
                </label>
                <input
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                  type="text"
                  placeholder="Address"
                  value={ConnectedAccount}
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                >
                  File Hash on Blockchain:
                </label>
                <input
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#AECFFF47]`}
                  type="text"
                  value={FileHash}
                  placeholder="Certificate Type"
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                >
                  Click in the link below to view your certificate
                </label>
                <Link
                  href={`https://ipfs.filebase.io/ipfs/${CertURI}`}
                  target="_blank"
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF] sem:p-4 overflow-scroll`}
                >
                  {`${CertURI}`}
                </Link>
                <button
                  className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
                  onClick={() => window.location.reload()}
                >
                  Click here to verify another certificate
                </button>
              </div>
            </div>
          ) : (
            <>
              <span
                className={`${outfit.className} font-medium text-5xl text-[#2D6F57] text-center`}
              >
                Verifier
              </span>
              <div className="flex flex-col gap-4">
                <label
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                >
                  Upload a file to verify
                </label>
                <div className="flex items-center sem:flex-col">
                  <input
                    className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF] sem:p-4 sem:w-full`}
                    type="file"
                    placeholder="Choose file"
                    onChange={selectFile}
                  />
                  <span
                    className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
                  >
                    Suggested file types: PDF, JPEG, PNG
                  </span>
                </div>
              </div>
              <button
                className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
                onClick={computeHash}
              >
                Verify Certificate
              </button>
              {isError && (
                <div
                  className={`font-normal text-xl text-[#eb5552] rounded-[20px] p-6 bg-[#ffaeae47]`}
                >
                  Error! Certificate Not Verified!
                </div>
              )}
              {isVerify && (
                <div className="flex flex-col gap-6">
                  <input
                    className={`${outfit.className} font-normal text-center text-xl text-[#012376] rounded-[20px] p-6 bg-[#AECFFF47]`}
                    type="text"
                    placeholder="Certifying Authority"
                    readOnly
                    value="Record On Blockchain"
                  />
                  <div className="flex flex-col gap-4">
                    <label
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                    >
                      Certificate issued to
                    </label>
                    <input
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#AECFFF47]`}
                      type="text"
                      placeholder="Name"
                      value={CertOwner}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                    >
                      Certificate type
                    </label>
                    <input
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#AECFFF47]`}
                      type="text"
                      placeholder="Certificate Type"
                      value={CertType}
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                    >
                      File Hash on Blockchain:
                    </label>
                    <input
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#AECFFF47]`}
                      type="text"
                      value={FileHash}
                      placeholder="Certificate Type"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                    >
                      Certificate Issuer Account:
                    </label>
                    <input
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#AECFFF47]`}
                      type="text"
                      value={Witness}
                      placeholder="Certificate Type"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                    >
                      Certificate Issuer Name
                    </label>
                    <input
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#AECFFF47]`}
                      type="text"
                      value={instituteName}
                      placeholder="Certificate Type"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label
                      className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                    >
                      Timestamp:
                    </label>
                    <input
                      className={`${outfit.className} font-normal text-xl text-[#012376] rounded-[20px] p-6 bg-[#AECFFF47]`}
                      type="text"
                      value={moment
                        .unix(Number(Timestamp))
                        .format("dddd, MMMM Do YYYY")}
                      placeholder="Certificate Type"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <span
                      className={`w-full text-xl text-center text-green-500 font-normal ${outfit.className} flex self-center py-2 px-6 justify-center`}
                    >
                      <TickCircle size="32" color="#22c55e" variant="Bold" />
                      Certificate Successfully Verified!
                    </span>
                    {view === 1 && (
                      <button
                        className={`rounded-[20px] w-fit self-center font-normal text-base text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6 mt-8`}
                        onClick={() => {
                          setView(2);
                          displayAccount();
                          viewCertificate();
                        }}
                      >
                        View Certificate
                      </button>
                    )}
                    <button
                      className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
                      onClick={() => window.location.reload()}
                    >
                      Click here to verify another certificate
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;
