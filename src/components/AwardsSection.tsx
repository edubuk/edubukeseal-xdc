import React, { FC } from "react";
import { Outfit } from "next/font/google";
import Image from "next/image";

const outfit = Outfit({ subsets: ["latin"] });

interface AwardProps {
  img: string;
}

export const AwardCards: FC<AwardProps> = ({ img }): JSX.Element => {
  return (
    <div className="rounded-3xl bg-[#9DB8FF1F] py-11 px-6 border border-solid border-[#9DB8FF1F] flex items-center sem:p-4">
      <Image
        src={img}
        alt="adlogo"
        width={89}
        height={89}
        className="sem:w-fit"
      />
    </div>
  );
};

const AwardsSection = () => {
  return (
    <div className="flex flex-col gap-20 m-0 p-0" id="awards">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 items-center">
            
            <span
              className={`${outfit.className} font-bold text-[60px] text-[#2D6F57] text-center`}
            >
              Awards & Recognitions
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-9 items-center justify-center med:flex-col">
          <Image
            alt="logos"
            src="/v20/collab-big.png"
            width={922}
            height={473}
            className="self-center w-full max-w-[80%] h-auto"
          />
            <div className="flex flex-col items-center justify-center">
              <Image
                alt="award"
                src="/images/award.png"
                width={318}
                height={420}
                className="relative sem:w-fit sem:self-center z-10"
              />
              {/*<div className="absolute flex flex-col px-6 pb-1 rounded-[12px] pt-20 z-1 border-2 border-[#2D6F57] mt-20 ">
              <span
                className={`${outfit.className} font-semibold text-base text-[#2D6F57] text-center`}
              >
                Winner, G20 Conference, Indonesia 2022: Best Startup, Jury&#39;s
                Choice
              </span>
              </div>*/}
              <span
                className={`${outfit.className} font-semibold text-base text-[#2D6F57] text-center pt-6`}
              >
                Winner, G20 Conference, Indonesia 2022: Best Startup, Jury&#39;s
                Choice
              </span>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-col gap-0" id="collaborators">
        <div className="relative z-100 flex flex-col gap-4 items-center">
          
          <span
            className={`${outfit.className} font-bold text-[60px] text-[#2D6F57] text-center sem:text-5xl sem:w-fit`}
          >
            Collaborators & Supporters
          </span>
        </div>
        <div className="relative flex gap-10 z-200 flex-row justify-center items-center m-auto ml-28 -mt-28 med:flex-col med:items-center sem:mx-2 mt-6">
  <div className="flex flex-row">
    <Image
      alt="group"
      src="/images/grouppic.png"
      width={1200}
      height={900}
      className="z-10 sem:self-center sem:w-full"
    />
  </div>
  <Image
    alt="collaboraters"
    src="/v20/collabsbig.svg"
    width={1200}
    height={900}
    className="z-1 -mr-20 -ml-20 lg:ml-0 lg:-mr-40 sem:self-center sem:w-full"
  />
</div>

        
        <div className="flex flex-col gap-12 -mt-14">
          <span
            className={`${outfit.className} font-semibold text-[60px] text-[#2D6F57] text-center sem:text-5xl sem:w-fit`}
          >
            MoUs Signed with Universities
          </span>
          <div className="flex gap-10 flex-wrap items-center justify-center rounded-3xl border border-solid border-[#9DB8FF1F] p-5 w-[90%] m-auto">
            <Image alt="mou" src="/images/mou1.jpg" width={320} height={230} className="bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2] px-6 py-6 rounded-[10px]"/>
            <Image alt="mou" src="/images/mou2.jpg" width={300} height={220} className="bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-6 py-6 rounded-[10px]"/>
            <Image alt="mou" src="/images/mou3.jpg" width={300} height={220} className="bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-6 py-6 rounded-[10px]"/>
            <Image alt="mou" src="/images/mou4.jpg" width={300} height={220} className="bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-6 py-6 rounded-[10px]"/>
            <Image alt="mou" src="/images/mou5.jpg" width={300} height={220} className="bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-6 py-6 rounded-[10px]"/>
            <Image alt="mou" src="/images/mou7.jpg" width={300} height={220} className="bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-6 py-6 rounded-[10px]"/>
            <Image alt="mou" src="/images/mou6.jpg" width={300} height={220} className="bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-6 py-6 rounded-[10px]"/>
            <Image alt="mou" src="/images/mou8.jpg" width={300} height={220} className="bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-6 py-6 rounded-[10px]"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;
