import React from "react";
import { Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

const CetaProgram = () => {
  return (
    <div className="flex flex-col gap-40 py-16 bg-page-bg bg-full bg-no-repeat">
      <div className="flex flex-col gap-20 w-[80%] m-auto med:w-full">
        <div className="flex flex-col gap-7 w-[50%] m-auto med:w-full">
          <span
            className={`${outfit.className} font-semibold text-[64px] text-[#2D6F57] text-center sem:text-4xl`}
          >
            CETA Program
          </span>
          <span
            className={`${outfit.className} font-light text-xl text-[#2D6F57] text-center sem:w-[90%] sem:m-auto`}
          >
            Certified Emerging Technologies Analyst
          </span>
          <div className="flex gap-8 justify-center">
            <Link href="https://edubuk.co.in/ " target="_blank">
              <button
                className={`rounded-[20px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
              >
                Explore More
              </button>
            </Link>
            <Link href="https://edubuk.co.in/#form-9" target="_blank">
              <button
                className={`rounded-[20px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
              >
                Enroll Now
              </button>
            </Link>
          </div>
          <span
            className={`${outfit.className} font-light text-xl text-[#2D6F57] text-center sem:w-[90%] sem:m-auto`}
          >
            Edubuk&#39;s CETA Program offers combined and standalone courses in
            the following highly in-demand Emerging Technologies:
          </span>
        </div>
        <div className="flex flex-col gap-5  m-auto med:w-full sem:w-[90%]">
          <div className="flex gap-7 sem:flex-col sem:items-center">
            <div className="rounded-[20px] w-[300px] h-[185px] justify-center border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex items-center sem:p-4">
              <span
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
              >
                Artificial Intelligence (AI) & Machine Learning
              </span>
            </div>
            <div className="rounded-[20px] w-[300px] h-[185px] justify-center border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex items-center sem:p-4">
              <span
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
              >
                Blockchain & Distributed Ledger Technology (Web3, NFTs, Asset
                Tokenization)
              </span>
            </div>
            <div className="rounded-[20px] w-[300px] h-[185px] justify-center border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex items-center sem:p-4">
              <span
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
              >
                Cybersecurity
              </span>
            </div>
            
          </div>
          <div className="flex gap-4 m-auto sem:flex-col sem:items-center">
            <div className="rounded-[20px] w-[300px] h-[185px] justify-center border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex items-center sem:p-4">
              <span
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
              >
                Cloud Computing
              </span>
            </div>
            <div className="rounded-[20px] w-[300px] h-[185px] justify-center border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex items-center sem:p-4">
              <span
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
              >
                Data Science
              </span>
            </div>
          </div>
          <div className="flex gap-7 sem:flex-col sem:items-center">
            <div className="rounded-[20px] w-[300px] h-[185px] justify-center border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex items-center sem:p-4">
              <span
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
              >
                Robotics & Drones
              </span>
            </div>
            <div className="rounded-[20px] w-[300px] h-[185px] justify-center border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex items-center sem:p-4">
              <span
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
              >
                Robotics & Drones
              </span>
            </div>
            <div className="rounded-[20px] w-[300px] h-[185px] justify-center border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex items-center sem:p-4">
              <span
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
              >
                Internet of Things (IoT) & Internet of Behavior (IoB)
              </span>
            </div>
          </div>
          <div className="flex gap-4 m-auto sem:flex-col sem:items-center">
            <div className="rounded-[20px] w-[300px] h-[185px] justify-center border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex items-center sem:p-4">
              <span
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
              >
                Augmented Reality (AR), Virtual Reality (VR), Mixed Reality (MR)
                & Metaverse
              </span>
            </div>
            <div className="rounded-[20px]  w-[300px] h-[185px] justify-center border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex items-center sem:p-4">
              <span
                className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
              >
                3D Printing
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-8">
          <span
            className={`${outfit.className} font-light text-2xl text-[#2D6F57] text-center w-[55%]`}
          >
            Our Comprehensive Certified Emerging Technologies Analyst (CETA)
            Program is carefully designed across three progressive levels:
          </span>
          <Image alt="frame" src="/v20/expert.svg" width={954} height={121} />
        </div>
      </div>
      <div className="rounded-3xl border border-solid border-[#9DB8FF1F] bg-[#E0FAEA] py-16 px-5 flex flex-col items-center gap-9 shadow-[0px_24px_32px_0px_#00000005] w-[90%] m-auto">
        <span
          className={`${outfit.className} font-medium text-5xl text-[#2D6F57] text-center`}
        >
          CETA Program Video
        </span>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/9NVqhfgZBtE?si=D6mvC1LkpdHAm5VM"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="med:w-[350px] med:h-[300px]"
        ></iframe>
        <span
          className={`${outfit.className} font-light text-xl text-[#2D6F57] text-center w-[70%] sem:w-full`}
        >
          One of the key highlights of the CETA Certification is its
          accessibility to learners (age 15 years to 60 years+) from all
          academic backgrounds. You don&#39;t need any prior coding or computer
          science experience to participate and excel in this program. Our
          primary focus lies in empowering learners with no-code and low-code
          modules, enabling them to harness the power of emerging technologies
          without getting bogged down in complex programming. Our curriculum
          includes modules on no-code based groundbreaking generative AI
          applications such as ChatGPT (Text to Text, AI), MidJourney (Text to
          Image AI), Synthesia, and Wave.Video (Text to Video AI), WIX (Text to
          Website, AI).
        </span>
        <div className="flex gap-4 flex-wrap justify-center">
          <Image alt="pic" src="/images/4.jpeg" width={310} height={310} className="rounded-[12px]"/>
          <Image alt="pic" src="/images/34.jpeg" width={310} height={310}className="rounded-[12px]" />
          <Image alt="pic" src="/images/38.jpg" width={310} height={310} className="rounded-[12px]"/>
          <Image alt="pic" src="/images/39.jpg" width={310} height={410} className="rounded-[12px]"/>
          <Image alt="pic" src="/images/5.jpeg" width={310} height={410} className="rounded-[12px]"/>
          <Image alt="pic" src="/images/45.jpeg" width={310} height={410} className="rounded-[12px]"/>
        </div>
      </div>
    </div>
  );
};

export default CetaProgram;
