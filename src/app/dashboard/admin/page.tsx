"use client";

import { Outfit } from "next/font/google";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import { TickCircle, Warning2 } from "iconsax-react";

const outfit = Outfit({ subsets: ["latin"] });

const Admin = () => {
  const [InstituteAddress, setInstituteAddress] = useState("");
  const [InstituteName, setInstituteName] = useState("");
  const [InstituteAcronym, setInstituteAcronym] = useState("");
  const [Website, setWebsite] = useState("");
  const [ConnectedAccount, setConnectedAccount] = useState(null);
  const [state, setState] = useState(false);
  const [TxnHash, setTxnHash] = useState("");

  const objRegister = {
    address: InstituteAddress,
    name: InstituteName,
    acronym: InstituteAcronym,
  };

  const objRevoke = {
    address: InstituteAddress,
  };

  const register = async () => {
    const { connectMetamask } = await import("./../../../utils/bulkFunc.js");
    connectMetamask().then((res: any) => {
      console.log("Connected To : ", res);
      setConnectedAccount(res);
    });
    console.log(objRegister);

    const { register } = await import("./../../../utils/bulkFunc.js");
    const res: any = await register(objRegister);
    console.log(res);
    if (res != undefined) {
      setTxnHash(res);
    }
  };

  const revoke = async () => {
    const { connectMetamask } = await import("./../../../utils/bulkFunc.js");
    connectMetamask().then((res: any) => {
      console.log("Connected To : ", res);
      setConnectedAccount(res);
    });
    console.log(objRevoke);

    const { revoke } = await import("./../../../utils/bulkFunc.js");
    const res: any = await revoke(objRevoke);
    console.log(res);
    if (res != undefined) {
      setTxnHash(res);
    }
  };

  // useEffect(() => {
  //   alert("You are logged in as Administrator");
  // }, []);

  return (
    <>
      <div className="flex flex-col gap-12 mx-auto py-16 mb-40 bg-page-bg bg-full bg-no-repeat justify-center items-center sem:w-auto">
        <div className="flex flex-col gap-6">
          <span
            className={`${outfit.className} font-semibold text-[64px] text-[#2D6F57] text-center sem:text-4xl`}
          >
            Admin Dashboard
          </span>
          <span
            className={`${outfit.className} font-light text-xl text-[#2D6F57] text-center`}
          >
            Add Institute Credentials.
          </span>
        </div>
        <button
          className={`rounded-[30px] self-center font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
          onClick={() => {
            setState(!state);
            setTxnHash("");
            setInstituteAddress("");
          }}
        >
          {state === false ? "Revoke Institute" : "Institute Registration"}
        </button>
        <div className="w-[50%] rounded-[20px] border border-solid border-[#FFFFFF4D] bg-[#E0FAEA] pt-9 pb-24 px-7 flex flex-col gap-8 sem:p-4 med:w-[90%] med:m-auto">
          <span
            className={`${outfit.className} font-medium text-5xl text-[#2D6F57] text-center`}
          >
            {state === false ? "Institute Registration" : "Revoke Institute"}
          </span>
          <span
            className={`${outfit.className} mt-8 font-medium text-3xl text-[#2D6F57]`}
          >
            Details
          </span>
          {state === false ? (
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
                  onChange={(e) => setInstituteAddress(e.target.value)}
                  value={InstituteAddress}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                >
                  Institute Name
                </label>
                <input
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setInstituteName(e.target.value)}
                  value={InstituteName}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                >
                  Institute Acronym
                </label>
                <input
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                  type="text"
                  placeholder="Acronym"
                  onChange={(e) => setInstituteAcronym(e.target.value)}
                  value={InstituteAcronym}
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
                >
                  Institute Website Link
                </label>
                <input
                  className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                  type="url"
                  placeholder="www.acbd.com"
                  onChange={(e) => setWebsite(e.target.value)}
                  value={Website}
                />
              </div>
              <button
                className={`rounded-[30px] w-fit self-center font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
                onClick={register}
              >
                Register
              </button>
            </div>
          ) : (
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
                  onChange={(e) => setInstituteAddress(e.target.value)}
                  value={InstituteAddress}
                />
              </div>
              <button
                className={`rounded-[30px] w-fit self-center font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
                onClick={revoke}
              >
                Revoke
              </button>
            </div>
          )}
          {TxnHash != "" && (
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
                  {state === false
                    ? `Institute "${objRegister.acronym}" Successfully Registered!`
                    : `Institute Successfully Revoked!`}
                </span>
                <button
                  className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
                  onClick={() => window.location.reload()}
                >
                  Click here to {state === false ? "register" : "revoke"}{" "}
                  another institute
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
