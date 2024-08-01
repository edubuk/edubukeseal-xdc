"use client";

import { Outfit } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useContext, useCallback } from "react";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";

const outfit = Outfit({ subsets: ["latin"] });

const AdminLogin = () => {
  const [ConnectedAccount, setConnectedAccount] = useState("");
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();

  function ellipseAddress(address: string | null, width: number = 4): string {
    return `${address?.slice(0, width + 2)}...${address?.slice(-width)}`;
  }

  const { account, connect, disconnect } = useContext(Web3ModalContext);

  const handleConnectWallet = useCallback(async () => {
    connect();
    if (account) {
      setConnectedAccount(account);
    } else {
      console.error("Account is null");
    }

    const { verifyLogin } = await import("../../utils/bulkFunc.js");
    const ans: any = await verifyLogin();
    console.log(ans);
    if (ans === false) {
      setNotFound(true);
    } else if (ans === true) {
      router.push("/dashboard/admin");
      alert("You are logged in as Administrator");
    } else {
      router.push("/generate");
      alert("You are logged in as Institute");
    }
  }, [connect]);

  const connected = async () => {
    const { connectMetamask } = await import("../../utils/bulkFunc.js");
    connectMetamask().then((res: any) => {
      console.log("Connected To : ", res);
      setConnectedAccount(res);
    });

    const { verifyLogin } = await import("../../utils/bulkFunc.js");
    const ans: any = await verifyLogin();
    console.log(ans);
    if (ans === false) {
      setNotFound(true);
    } else if (ans === true) {
      router.push("/dashboard/admin");
      alert("You are logged in as Administrator");
    } else {
      router.push("/generate");
      alert("You are logged in as Institute");
    }
  };
  return (
    <div className="flex w-[100%] mt-0 bg-page-bg bg-full bg-no-repeat">
    <div className="flex mt-16 mb-16 mx-auto flex-col bg-[#E0FAEA] rounded-[20px] w-[50%] border-2.5 border-solid border-[#2D6F57] py-12 px-5 gap-10">
      <span
        className={`${outfit.className} font-medium text-5xl text-[#2D6F57] text-center sem:text-4xl`}
      >
        Login
      </span>
      <div className="flex flex-col gap-12 w-[40%] items-center self-center">
        <Image alt="icon" src="/images/MetaMask.png" width={82} height={82} />
        <button
          className="w-fit self-center rounded-[30px] px-6 py-4 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2]"
          onClick={connected}
        >
          <span
            className={`${outfit.className} font-normal text-xl text-[#ffffff] text-center sem:text-lg`}
          >
            Connect Wallet
          </span>
        </button>
        {/*<button
          className="w-fit self-center rounded-[30px] px-6 py-4 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2]"
          onClick={handleConnectWallet}
        >
          <span
            className={`${outfit.className} font-normal text-xl text-[#ffffff] text-center sem:text-lg`}
          >
            Connect to XDC
          </span>
        </button>*/}
        {notFound && (
          <span
            className={`${outfit.className} font-medium text-3xl text-red-600 text-center sem:text-4xl`}
          >
            Please register your Institute
          </span>
        )}
      </div>
    </div>
    </div>  
  );
};

export default AdminLogin;
