import React, { FC } from "react";
import { Outfit } from "next/font/google";
import Image from "next/image";

const outfit = Outfit({ subsets: ["latin"] });

interface AwardProps {
  img: string;
}

export const AwardCards: FC<AwardProps> = ({ img }) => {
  return (
    <div className="rounded-3xl bg-[#9DB8FF1F] py-11 px-6 border border-solid border-[#9DB8FF1F] flex items-center sem:p-4">
      <Image
        src={img}
        alt="adlogo"
        layout="responsive"
        width={89}
        height={89}
        className="w-full h-auto"
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
              className={`${outfit.className} font-bold text-5xl md:text-6xl text-[#2D6F57] text-center`}
            >
              Awards & Recognitions
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-9 items-center justify-center">
            <Image
              alt="logos"
              src="/v20/collab-big.png"
              layout="responsive"
              width={922}
              height={473}
              className="w-full max-w-[80%] h-auto"
            />
            <div className="flex flex-col items-center justify-center">
              <Image
                alt="award"
                src="/images/award.png"
                layout="responsive"
                width={318}
                height={420}
                className="w-full h-auto"
              />
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
      <div className="flex flex-col gap-10" id="collaborators">
        
        <div className="flex flex-col gap-12 mt-6">
          <span className={`${outfit.className} font-semibold text-5xl md:text-6xl text-[#2D6F57] text-center`}>
            Collaborators & Supporters
          </span>
        </div>
        <div className="flex flex-wrap gap-40 rounded-3xl w-[80%] m-auto">
      <div className="flex-1 min-w-[200px] gap-40 p-2">
        <Image
          alt="group"
          src="/images/grouppic.png"
          layout="responsive"
          width={400}
          height={300}
          className="rounded-3xl border border-solid border-[#9DB8FF1F]"
        />
      </div>
      <div className="flex-1 min-w-[200px] gap-40 p-2">
        <Image
          alt="collaboraters"
          src="/v20/collabsbig.svg"
          layout="responsive"
          width={400}
          height={300}
          className="rounded-3xl border border-solid border-[#9DB8FF1F]"
        />
      </div>
    </div>
        <div className="flex flex-col gap-12 mt-6">
          <span className={`${outfit.className} font-semibold text-5xl md:text-6xl text-[#2D6F57] text-center`}>
            MoUs Signed with Universities
          </span>
          <div className="flex gap-10 flex-wrap items-center justify-center rounded-3xl border border-solid border-[#9DB8FF1F] p-5 w-[90%] m-auto">
            <Image alt="mou" src="/images/mou1.jpg" width={300} height={220} className="min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2] px-3 py-6 rounded-[6px]"/>
            <Image alt="mou" src="/images/mou2.jpg" width={300} height={220} className="min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-3 py-6 rounded-[6px]"/>
            <Image alt="mou" src="/images/mou3.jpg" width={300} height={220} className="min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-3 py-6 rounded-[6px]"/>
            <Image alt="mou" src="/images/mou4.jpg" width={300} height={220} className="min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-3 py-6 rounded-[6px]"/>
            <Image alt="mou" src="/images/mou5.jpg" width={300} height={220} className="min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-3 py-6 rounded-[6px]"/>
            <Image alt="mou" src="/images/mou7.jpg" width={300} height={220} className="min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-3 py-6 rounded-[6px]"/>
            <Image alt="mou" src="/images/mou6.jpg" width={300} height={220} className="min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-3 py-6 rounded-[6px]"/>
            <Image alt="mou" src="/images/mou8.jpg" width={300} height={220} className="min-w-[300px] min-h-[300px] max-w-[300px] max-h-[300px] bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2]  px-3 py-6 rounded-[6px]"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;
