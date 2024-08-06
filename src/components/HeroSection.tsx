import { Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";


const outfit = Outfit({ subsets: ["latin"] });
const HeroSection = () => {
  return (
    <div className="bg-page-bg bg-full bg-no-repeat px-20 py-12 flex flex-col gap-20 m-0 sem:mx-8 sem:my-16 ${outfit.className}">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-6 items-center w-[60%] m-auto sem:w-full">
          <span
            className={`flex ${outfit.className} font-bold text-[60px] text-center text-[#2D6F57] sem:text-4xl`}
          >
            INTRODUCING EDUBUK
          </span>
          <span 
          className={'flex ${outfit.className} font-normal text-[16px] text-center text-[#000000]'}>
            Digitally Record & Verify Educational Transcripts and
            Work-Experience Certificates on Blockchain making Background
            Verification Process Significantly Cheaper & Faster
          </span>
        </div>
        <div className="flex gap-8 justify-center">
          <Link href="/generate">
            <button
              className={`rounded-[20px] font-normal text-base text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
            >
              e-Seal Certificates
            </button>
          </Link>
          <Link href="/verify">
            <button
              className={`rounded-[20px] font-normal text-base text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
            >
              e-Verify Certificates
            </button>
          </Link>
        </div>

        {/*}
        <div className="flex flex-col gap-3 items-center">
          <span
            className={`font-normal text-base text-center ${outfit.className} text-[#00378A]`}
          >
            Powered by{" "}
          </span>
          <Image
            alt="jumbologo"
            src="https://protojumbo.jumbochain.org/images/logosvg.svg"
            width={74}
            height={74}
          />
        </div>
        */}

      </div>
      
      <div className="flex flex-col gap-14" id="learner">
        <div className="flex flex-col gap-1 items-center">
          
          <span
            className={`${outfit.className} font-semibold text-[60px] text-[#2D6F57] text-center`}
          >
            Learner&#39;s Edubuk Profile On The Blockchain
          </span>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex justify-center gap-9 sem:flex-col">
            <div className="flex flex-col gap-2 items-center">
              <Image
                alt="icon"
                src="/v20/learners1.svg"
                width={235}
                height={235}
                className="sem:w-fit"
              />
              
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Image
                alt="icon"
                src="/v20/learners2.svg"
                width={235}
                height={235}
                className="sem:w-fit"
              />
              {/*<span
                className={`${outfit.className} font-medium text-xl text-[#012376] `}
              >
                Credits & Grades
              </span>*/}
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Image
                alt="icon"
                src="/v20/learners3.svg"
                width={235}
                height={235}
                className="sem:w-fit"
              />
            </div>
          </div>
          <div className="flex justify-center gap-9 sem:flex-col">
            <div className="flex flex-col gap-2 items-center">
              <Image
                alt="icon"
                src="/v20/learners4.svg"
                width={235}
                height={235}
                className="sem:w-fit"
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Image
                alt="icon"
                src="/v20/learners5.svg"
                width={235}
                height={235}
                className="med:w-fit"
              />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Image
                alt="icon"
                src="/v20/learners6.svg"
                width={235}
                height={235}
                className="sem:w-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
