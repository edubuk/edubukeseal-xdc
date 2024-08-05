import React from "react";
import { Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

const About = () => {
  return (
    <div className="flex flex-col bg-page-bg bg-full bg-no-repeat py-8 mb-40 gap-24">
      <div className="flex flex-col gap-9  w-[80%] self-center sem:w-fit">
        <span
          className={`${outfit.className} font-bold text-[60px] text-[#2D6F57] text-center sem:text-5xl`}
        >
          About Edubuk
        </span>
        <span
          className={`${outfit.className} font-light text-xl text-black text-center sem:w-[90%] sem:m-auto sem:text-[1rem]`}
        >
          Our Platform bridges the gap between education and employment by providing emerging tech 
          courses, verifiable academic & professional credentials and intelligent job matching leveraging 
          AI and Blockchain Tech.
          <br />
          <span className="font-semibold"> Mission: </span> Our Mission is to provide personalized career guidance, 
          cutting-edge skill development in emerging technologies, and secure credential verification, 
          ensuring that every learner can achieve their fullest potential and meet the evolving demands of 
          the global job market today.
          <br /> <span className="font-semibold"> Vision: </span> Our vision is to revolutionize education and employment by creating 
          a future where every individuals career path is clear, skills are continuously enhanced, 
          and credentials are universally trusted.
        </span>
      </div>
      <div className="flex flex-col gap-10" id="founders">
        <span
          className={`${outfit.className} font-semibold text-[60px] text-[#2D6F57] text-center`}
        >
          Meet our Team
        </span>
        <div className="flex justify-center mt-28 gap-10 flex-wrap sem:flex-col">
          <div className="rounded-[12px] px-6 bg-team-bg flex flex-col gap-4 items-center pb-14 w-[26%] h-fit sem:w-[90%] sem:p-4 sem:m-auto">
            <Image
              alt="image"
              src="/v20/team1.svg"
              width={370}
              height={315}
              className="relative rounded-[20px] w-[359px] -mt-28 h-[314px] sem:w-fit"
            />
            <span
              className={`${outfit.className} font-semibold text-[20px] text-[#2D6F57] mx-auto text-center justify-center items-center w-[90%] sem:w-auto`}
            >
              Shivani Mehrotra Bajaj<br/> Co-Founder & CEO
            </span>
            <div className="flex flex-row gap-3">
              <div className="flex">
             <Link
              href="https://www.linkedin.com/in/shivani-mehrotra-edubuk/"
              target="_blank"
             >
             <Image
                alt="icon"
                src="/v20/linkedinteam.svg"
                width={24}
                height={24}
                className="sem:w-fit"
              />
              </Link>
              </div>

              <div className="flex">
              <Link
              href="https://www.linkedin.com/in/shivani-mehrotra-edubuk/"
              target="_blank"
             >
              <Image
                alt="icon"
                src="/v20/telegramteam.svg"
                width={24}
                height={24}
                className="sem:w-fit"
              />
              </Link>
              </div>

              <Link
              href="https://www.linkedin.com/in/shivani-mehrotra-edubuk/"
              target="_blank"
             >
              <Image
                alt="icon"
                src="/v20/mailteam.svg"
                width={24}
                height={24}
                className="sem:w-fit"
              />
              </Link>
            </div>
            <span
              className={`${outfit.className} font-normal text-base text-[#2D6F57] text-center`}
            >
              10+ years of Experience in the Education Industry as Professor, UGC NET Qualified University Topper, 
              Top 30 young Indian in Education, National VP, Emerging Technologies Wing, WICCI Finalists: Women in AI APAC- 2024 award,
              Dean, European Digital University.
            </span>
          </div>
          
          
          <div className="rounded-[12px] px-6 bg-team-bg flex flex-col gap-4 items-center pb-14 w-[26%] h-fit sem:w-[90%] sem:p-4 sem:m-auto">
            <Image
              alt="image"
              src="/v20/team2.svg"
              width={370}
              height={315}
              className="relative rounded-[20px] w-[359px] -mt-28 h-[314px] sem:w-fit"
            />
            <span
              className={`${outfit.className} font-semibold text-[20px] text-[#2D6F57] mx-auto text-center justify-center items-center w-[90%] sem:w-auto`}
            >
              Apoorva Bajaj, CFA<br/> Co-Founder & CFO
            </span>
            <div className="flex flex-row gap-3">
              <div className="flex">
             <Link
              href="https://www.linkedin.com/in/shivani-mehrotra-edubuk/"
              target="_blank"
             >
             <Image
                alt="icon"
                src="/v20/linkedinteam.svg"
                width={24}
                height={24}
                className="sem:w-fit"
              />
              </Link>
              </div>

              <div className="flex">
              <Link
              href="https://www.linkedin.com/in/shivani-mehrotra-edubuk/"
              target="_blank"
             >
              <Image
                alt="icon"
                src="/v20/telegramteam.svg"
                width={24}
                height={24}
                className="sem:w-fit"
              />
              </Link>
              </div>

              <Link
              href="https://www.linkedin.com/in/shivani-mehrotra-edubuk/"
              target="_blank"
             >
              <Image
                alt="icon"
                src="/v20/mailteam.svg"
                width={24}
                height={24}
                className="sem:w-fit"
              />
              </Link>
            </div>
            <span
              className={`${outfit.className} font-normal text-base text-[#2D6F57] text-center`}
            >
              10+ years Exp. in Finance + Technology
              IIT, IIM, Gold-Medalist,  ex-Goldman Sachs, DE Shaw, JP Morgan, Quant Hedge Funds,  
              Trained in AI, Blockchain & Data Analytics by Google, IBM, Microsoft Experts Global Trainer in Gen AI, 
              AI, ML, Blockchain & Emerging Technologies.
            </span>
          </div>

          <div className="rounded-[12px] px-6 bg-team-bg flex flex-col gap-4 items-center pb-10 w-[26%] h-fit sem:w-[90%] sem:p-4 sem:m-auto">
            <Image
              alt="image"
              src="/v20/team3.svg"
              width={370}
              height={315}
              className="relative rounded-[20px] w-[359px] -mt-28 h-[314px] sem:w-fit"
            />
            <span
              className={`${outfit.className} font-semibold text-[20px] text-[#2D6F57] mx-auto text-center justify-center items-center w-[90%] sem:w-auto`}
            >
              Dhanraj Dadhich<br/> Director & CTO
            </span>
            <div className="flex flex-row gap-3">
              <div className="flex">
             <Link
              href="https://www.linkedin.com/in/shivani-mehrotra-edubuk/"
              target="_blank"
             >
             <Image
                alt="icon"
                src="/v20/linkedinteam.svg"
                width={24}
                height={24}
                className="sem:w-fit"
              />
              </Link>
              </div>

              <div className="flex">
              <Link
              href="https://www.linkedin.com/in/shivani-mehrotra-edubuk/"
              target="_blank"
             >
              <Image
                alt="icon"
                src="/v20/telegramteam.svg"
                width={24}
                height={24}
                className="sem:w-fit"
              />
              </Link>
              </div>

              <Link
              href="https://www.linkedin.com/in/shivani-mehrotra-edubuk/"
              target="_blank"
             >
              <Image
                alt="icon"
                src="/v20/mailteam.svg"
                width={24}
                height={24}
                className="sem:w-fit"
              />
              </Link>
            </div>
            <span
              className={`${outfit.className} font-normal text-base text-[#2D6F57] text-center`}
            >
              25+ years Exp. in Technology Domain. Strong programming background Proficient in Java/JEE, C, C++, Solidity, 
              Rust, Substrate, and Python. Worked with cutting-edge technologies in domains like Blockchain, Quantum Computing,
               Big Data, AI/ML, IoT, CeFi, DeFi, AWS, GCP Worked with billion-dollar companies.
            </span>
          </div>


        </div>
      </div>
     
      <div className="flex flex-col gap-10">
        <span
          className={`${outfit.className} font-medium text-5xl text-[#2D6F57] text-center`}
        >
          Meet our Advisors
        </span>
        <div className="flex justify-center gap-10 flex-wrap sem:flex-col">
          <div className="rounded-[12px] px-6 pb-4 pt-6 bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2] flex flex-col gap-5 items-center w-[20%] h-fit sem:w-[90%] sem:p-4 sem:m-auto">
            <Image
              alt="image"
              src="/v20/advisor1.jpg"
              width={200}
              height={180}
              className="rounded-[20px] sem:w-fit"
            />
            <span
              className={`${outfit.className} font-semibold text-2xl text-[#2D6F57] text-center  sem:w-auto`}
            >
              Ish Anand
            </span>
            <span
              className={`${outfit.className} font-semibold text-base text-[#FFFFFF] text-center`}
            >
            Serial Entrepreneur, Advisor in Startups, Global Citizen

            </span>
            <Link href="https://www.linkedin.com/in/muagrawal/" target="_blank">
              <Image
                alt="linkedin"
                src="/v20/linkedinteam.svg"
                width={28}
                height={28}
                className=""
              />
            </Link>
          </div>

          <div className="rounded-[12px] px-2 pb-4 pt-6 bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2] flex flex-col gap-5 items-center w-[20%] h-fit sem:w-[90%] sem:p-4 sem:m-auto">
            <Image
              alt="image"
              src="/images/pic2.jpg"
              width={200}
              height={180}
              className="rounded-[20px] sem:w-fit"
            />
            <span
              className={`${outfit.className}  font-semibold text-2xl text-[#2D6F57] text-center  sem:w-auto`}
            >
              Dr. Narsing Rao, GS 
              </span>
            <span
              className={`${outfit.className} font-semibold text-base text-[#FFFFFF] text-center`}
            >
            Former VC at <br/> ICFAI University

            </span>
            <Link
              href="https://www.linkedin.com/in/dr-narsing-rao-gs-a318735/"
              target="_blank"
            >
              <Image
                alt="linkedin"
                src="/v20/linkedinteam.svg"
                width={28}
                height={28}
                className=""
              />
            </Link>
          </div>

          <div className="rounded-[12px] px-2 pb-4 pt-6 bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2] flex flex-col gap-5 items-center w-[20%] h-fit sem:w-[90%] sem:p-4 sem:m-auto">
            <Image
              alt="image"
              src="/v20/advisor3.jpg"
              width={200}
              height={180}
              className="rounded-[20px] sem:w-fit"
            />
            <span
              className={`${outfit.className}  font-semibold text-2xl text-[#2D6F57] text-center  sem:w-auto`}
            >
              Dr. Sindhu Bhaskar 
              </span>
            <span
              className={`${outfit.className} font-semibold text-base text-[#FFFFFF] text-center`}
            >
            Co-Founder, EST Global, <br/> Forbes Council Member

            </span>
            <Link
              href="https://www.linkedin.com/in/dr-narsing-rao-gs-a318735/"
              target="_blank"
            >
              <Image
                alt="linkedin"
                src="/v20/linkedinteam.svg"
                width={28}
                height={28}
                className=""
              />
            </Link>
          </div>


          <div className="rounded-[12px] px-6 pb-4 pt-6 bg-gradient-to-b from-[#FFFFFF] to-[#5FC8A2] flex flex-col gap-5 items-center w-[20%] h-fit sem:w-[90%] sem:p-4 sem:m-auto">
            <Image
              alt="image"
              src="/images/pic1.jpg"
              width={200}
              height={180}
              className="rounded-[20px] sem:w-fit"
            />
            <span
              className={`${outfit.className} font-semibold text-2xl text-[#2D6F57] text-center  sem:w-auto`}
            >
              Mukul Agrawal
            </span>
            <span
              className={`${outfit.className} font-semibold text-base text-[#FFFFFF] text-center`}
            >
            Co-Founder, <br/>
            E-Tutor World

            </span>
            <Link href="https://www.linkedin.com/in/muagrawal/" target="_blank">
              <Image
                alt="linkedin"
                src="/v20/linkedinteam.svg"
                width={28}
                height={28}
                className=""
              />
            </Link>
          </div>


          
          
        </div>
      </div>
    </div>
  );
};

export default About;
