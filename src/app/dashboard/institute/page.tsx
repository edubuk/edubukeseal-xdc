"use client";

import { Outfit } from "next/font/google";
import { useState } from "react";
import { TickCircle, Warning2 } from "iconsax-react";
import Link from "next/link.js";

const outfit = Outfit({ subsets: ["latin"] });

const Verified = () => {
  const [address, setAddress] = useState("");
  const [type, setType] = useState(0);
  const [TxnHash, setTxnHash] = useState("");

  const objApprove = {
    address: address,
  };

  const objUpdate = {
    address: address,
  };

  const objRevoke = {
    address: address,
  };

  const approve = async () => {
    const { connectMetamask } = await import("./../../../utils/bulkFunc.js");
    connectMetamask().then((res: any) => {
      console.log("Connected To : ", res);
    });
    console.log(objApprove);

    const { approve } = await import("./../../../utils/bulkFunc.js");
    const res: any = await approve(objApprove);
    console.log(res);
    if (res !== undefined) {
      setTxnHash(res);
    }
  };

  const update = async () => {
    const { connectMetamask } = await import("./../../../utils/bulkFunc.js");
    connectMetamask().then((res: any) => {
      console.log("Connected To : ", res);
    });
    console.log(objUpdate);

    const { update } = await import("./../../../utils/bulkFunc.js");
    const res: any = await update(objUpdate);
    console.log(res);
    if (res !== undefined) {
      setTxnHash(res);
    }
  };

  const revoke = async () => {
    const { connectMetamask } = await import("./../../../utils/bulkFunc.js");
    connectMetamask().then((res: any) => {
      console.log("Connected To : ", res);
    });
    console.log(objRevoke);

    const { revokeWit } = await import("./../../../utils/bulkFunc.js");
    const res: any = await revokeWit(objRevoke);
    console.log(res);
    if (res !== undefined) {
      setTxnHash(res);
    }
  };

  return (
    <div className="flex flex-col bg-page-bg bg-full bg-no-repeat gap-32 w-[100%] mx-auto pt-16 mb-40 sem:w-auto">
      <div className="flex flex-col gap-9">
        <span
          className={`${outfit.className} font-semibold text-[64px] text-[#2D6F57] text-center sem:text-4xl`}
        >
          Institute Dashboard
        </span>
      </div>
      {/*<div className="flex gap-6 self-center">
        <button
          onClick={() => {
            setType(0);
            setTxnHash("");
            setAddress("");
          }}
          className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] ${
            type === 0 ? "bg-[#2D6F57]" : "bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2]"
          }  ${outfit.className} flex py-2 px-6`}
        >
          Approve Regulator
        </button>
        <button
          onClick={() => {
            setType(1);
            setTxnHash("");
            setAddress("");
          }}
          className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] ${
            type === 1 ? "bg-[#2D6F57]" : "bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2]"
          } ${outfit.className} flex py-2 px-6`}
        >
          Update Witness
        </button>
        <button
          onClick={() => {
            setType(2);
            setTxnHash("");
            setAddress("");
          }}
          className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] ${
            type === 2 ? "bg-[#2D6F57]" : "bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2]"
          } ${outfit.className} flex py-2 px-6`}
        >
          Revoke Witness
        </button>
      </div>*/}

<div className="flex gap-6 self-center bg-[#E0FAEA] w-[50%] p-8 rounded-[20px]">
  <button
    onClick={() => {
      setType(0);
      setTxnHash("");
      setAddress("");
    }}
    className={`rounded-[30px] font-normal text-xl text-center ${
      type === 0 ? "bg-[#2D6F57] text-[#ffffff]" : "bg-transparent text-[#2D6F57] border border-[#2D6F57]"
    } ${outfit.className} flex py-2 px-6 transition-colors duration-300 ease-in-out`}
  >
    Approve Regulator
  </button>
  <button
    onClick={() => {
      setType(1);
      setTxnHash("");
      setAddress("");
    }}
    className={`rounded-[30px] font-normal text-xl text-center ${
      type === 1 ? "bg-[#2D6F57] text-[#ffffff]" : "bg-transparent text-[#2D6F57] border border-[#2D6F57]"
    } ${outfit.className} flex py-2 px-6 transition-colors duration-300 ease-in-out`}
  >
    Update Witness
  </button>
  <button
    onClick={() => {
      setType(2);
      setTxnHash("");
      setAddress("");
    }}
    className={`rounded-[30px] font-normal text-xl text-center ${
      type === 2 ? "bg-[#2D6F57] text-[#ffffff]" : "bg-transparent text-[#2D6F57] border border-[#2D6F57]"
    } ${outfit.className} flex py-2 px-6 transition-colors duration-300 ease-in-out`}
  >
    Revoke Witness
  </button>
</div>


      <div className="rounded-[20px] border border-solid border-[#FFFFFF4D] bg-[#E0FAEA] pt-9 w-[50%] mx-auto pb-24 px-7 flex flex-col gap-8 sem:p-4 med:w-[90%] med:m-auto">
        {type === 0 ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label
                className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
              >
                Regulator Address
              </label>
              <input
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
            <button
              onClick={approve}
              className={`rounded-[30px] w-fit self-center font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
            >
              Approve
            </button>
          </div>
        ) : type === 1 ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label
                className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
              >
                Witness Address
              </label>
              <input
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
            <button
              onClick={update}
              className={`rounded-[30px] w-fit self-center font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
            >
              Update
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label
                className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
              >
                Witness Address
              </label>
              <input
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
                type="text"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
            <button
              onClick={revoke}
              className={`rounded-[30px] w-fit self-center font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
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
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#AECFFF47] sem:p-4 overflow-scroll`}
              >
                {`${TxnHash}`}
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <span
                className={`w-full text-xl text-center text-green-500 font-normal ${outfit.className} flex self-center py-2 px-6 justify-center`}
              >
                <TickCircle size="32" color="#22c55e" variant="Bold" />
                {type === 0
                  ? "Approved!"
                  : type === 1
                  ? "Updated!"
                  : "Revoked!"}
              </span>
              <button
                className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
                onClick={() => window.location.reload()}
              >
                Click here to{" "}
                {type === 0 ? "approve" : type === 1 ? "update" : "revoke"}{" "}
                another institute
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Verified;
