"use client";

import React, { FC } from "react";
import { Outfit } from "next/font/google";
import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./slider.module.css";

const outfit = Outfit({ subsets: ["latin"] });

interface CardProps {
  img: string;
  id: number;
  con: string;
  link: string;
}

const ClientCards: FC<CardProps> = (props): JSX.Element => {
  return (
    <div
      className={`flex flex-col rounded-3xl jsutify-center align-center mx-auto items-center bg-gradient-to-b from-[#245D51] to-[#5FC8A2] border border-solid border-[#69C6FF4D] shadow-2xl shadow-[#00000005] ${
        props.id === 1 ? "gap-8" : props.id === 2 ? "gap-6" : "gap-6"
      }  py-6 px-8  sem:p-4 sem:gap-10 w-full sem:w-fit`}
    >
      <Image
        alt="cardpic"
        src={props.img}
        width={250}
        height={100}
        className="self-center bg-white px-4 py-4 rounded-[12px]"
      />
      <div
        className={`flex flex-col justify-center items-center mx-auto  ${
          props.id === 1
            ? "gap-[3rem]"
            : props.id === 2
            ? "gap-[1.5rem]"
            : "gap-[4rem]"
        } sem:items-center`}
      >
        <span
          className={`${outfit.className} font-light text-center text-l text-[#FFFFFF] sem:text-center`}
        >
          {props.con}
        </span>
        <Link href={props.link} target="_blank">
          <button className="flex rounded-[12px] px-4 py-3 bg-[#E0FAEA] text-[#2D6F57] text-base font-normal w-fit">
            Learn more ↗
          </button>
        </Link>
      </div>
    </div>
  );
};

interface UserProps {
  text: string;
  name: string;
  school: string;
}

const UserCard: FC<UserProps> = (props): JSX.Element => {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-solid border-[#FFFFFF4D] bg-[#FFFFFF14] shadow-[0px_24px_32px_0px_#00000005] py-5 px-8">
      <span className={`${outfit.className} font-light text-xl text-[#2D6F57] font-style-italic`}>
        &quot;{props.text}&quot;
      </span>
      <span
        className={`${outfit.className} font-medium text-xl text-[#2D6F57]`}
      >
        {props.name}
        <br /> {props.school}
      </span>
    </div>
  );
};

const ProgramSection: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1, // Change the number of cards to show per slide
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Adjust breakpoints as needed
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col gap-28" id="accelerator">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-4 items-center">
          
          <span
            className={`${outfit.className} font-semibold text-[60px] text-[#2D6F57] text-center sem:text-5xl sem:w-fit`}
          >
            Completed Accelerator Programs
          </span>
        </div>
        <div className="flex bg-[#5FC8A247] rounded-[12px] w-[90%] gap-5 py-8 px-2 justify-center items-center mx-auto sem:flex-col sem:w-fit sem:self-center">
          <div className="rounded-3xl bg-[#FFFFFF] border border-solid border-[#AECFFF47] flex items-center">
            <Image src="/images/l22.png" alt="adlogo" width={250} height={250} className="min-w-[100%] min-h-[150px] max-w-[100%] max-h-[150px]" />
          </div>
          <div className="rounded-3xl bg-[#FFFFFF] py-4 px-2 border border-solid border-[#AECFFF47] flex items-center">
            <Image src="/images/l23.png" alt="adlogo" width={250} height={250} className="min-w-[100%] min-h-[150px] max-w-[100%] max-h-[150px]" />
          </div>
          <div className="rounded-3xl bg-[#FFFFFF] py-8 px-4 border-solid border-[#AECFFF47] flex items-center ">
            <Image src="/images/l24.png" alt="adlogo" width={250} height={250} className="min-w-[100%] min-h-[150px] max-w-[100%] max-h-[150px]" />
          </div>
          <div className="rounded-3xl bg-[#FFFFFF] py-8 px-3 border border-solid border-[#AECFFF47] flex items-center">
            <Image src="/images/l25.png" alt="adlogo" width={250} height={250} className="min-w-[100%] min-h-[150px] max-w-[100%] max-h-[150px]" />
          </div>
          <div className="rounded-3xl bg-[#FFFFFF] py-6 px-3 border border-solid border-[#AECFFF47] flex items-center">
            <Image src="/images/l26.png" alt="adlogo" width={250} height={250} className="min-w-[100%] min-h-[150px] max-w-[100%] max-h-[150px]" />
          </div>
        </div>
        <div className="flex gap-5 justify-center"></div>
      </div>



      <div className="flex flex-col gap-16 px-12">
        <div className="flex gap-10 justify-center med:flex-col med:gap-8">
          <ClientCards
            img={"/images/iee.png"}
            id={1}
            con={
              "Collaborated and MoU signed with World’s 4th Largest NACES (National Association of Credential Evaluation Services) Member: IEE (International Educational Evaluation) in the US. Transcript verification and transcript evaluation reports to be stored on the blockchain using Edubuk’s e-Seal application for study abroad applicant. "
            }
            link={
              "https://www.einpresswire.com/article/692558064/international-education-evaluations-and-edubuk-partner-to-eliminate-fake-credentials-with-blockchain-verification"
            }
          />
          <ClientCards
            img={"/images/ndsc.jpg"}
            id={2}
            con={
              "Collaborated with NSDC (National Skills Development Corporation, Govt. of India) under Skill India Digital Accelerator Program along with HDFC Bank Grants Program and Facilitated by T-Hub (Largest Startup Accelerator in India). Selected as top 10 Startups across India basis our CETA Program and eSealing of Educational & Work-Experience Certificates on the Blockchain."
            }
            link="https://www.linkedin.com/pulse/education-evaluations-credentials-blockchain-verification-wu8ce/"
          />
          <ClientCards
            img={"/images/est.png"}
            id={3}
            con="Collaborated and MoU signed with EST Global and EST FAB giving for upskilling, reskilling and certifying learner's in Emerging Technologies including AI & Blockchain giving us access to thousands of students across the globe with ETS' vast Network of FAB (Fintech & Blockchain Association in the US and globally)."
            link="https://www.linkedin.com/posts/dr-sindhu-bhaskar-55a84568_with-great-excitement-i-announce-the-coming-activity-7174682311538413569-uLA6"
          />
        </div>
     
      </div>




      <div className="flex flex-col gap-11" id="testimonials">
        <div className="flex flex-col gap-4 items-center">
          
          <span
            className={`${outfit.className} font-bold text-[60px] text-[#2D6F57] text-center w-[50%] sem:text-5xl sem:w-fit`}
          >
            Testimonials
          </span>
        </div>
        <div className={styles.sliderContainer}>
          <Slider {...settings} className="flex">
            <div className="inline-flex gap-14">
              <UserCard
                text="The Course was excellent. We learnt so much about Artificial intelligence and other emerging technologies. Also we learnt practical use-cases of these technologies in today's corporate sector in order to get a high-paying job which no one tells in today's world and is very important too."
                name="Anshika Guleria"
                school="NPGC College, Lucknow"
              />
              <UserCard
                text="Amazing and very informative sessions on various emerging technologies. Very helpful and easy to understand."
                name="Swati Poojary"
                school="GEMS School, Dubai"
              />
              <UserCard
                text="It was a wonderful learning experience during the CETA program. I am glad to have taken this course from Edubuk and will surely recommend the course to my friends who want to learn about emerging technologies and its fundamentals."
                name="Rahul Reddy"
                school="JBIET Hyderabad"
              />
            </div>
            <div className="flex gap-14">
              <UserCard
                text="I am really satisfied with the course and the knowledge we gained during the sessions. Also Mr Apoorva, the trainer, is very skilled and professional, everything was well organised and ontime."
                name="Lina Nimri"
                school="Rosary College, Marj Elhamam"
              />
              <UserCard
                text="The lessons were great, and I believe Apoorva Bajaj is an incredible tutor who is able to explain long and complex subjects on emerging technologies in a way that is concise and easy to remember."
                name="Abdallah Al-Shishani"
                school="Rosemary School, Jordan"
              />
              {/* <UserCard
                text="It was a wonderful learning experience during the CETA program. I am glad to have taken this course from Edubuk and will surely recommend the course to my friends who want to learn about emerging technologies and its fundamentals."
                name="Rahul Reddy"
                school="JBIET Hyderabad"
              /> */}
            </div>
          </Slider>
        </div>
      </div>



      <div className="flex flex-col gap-11" id="unsdgs">
        <div className="flex flex-col gap-4 items-center">
          
          <span
            className={`${outfit.className} font-bold text-[24px] text-[#2D6F57] text-center w-[50%]  sem:text-3xl sem:w-[90%]`}
          >
            Edubuk is committed and aligned towards United Nation&#39;s
            Sustainable Development Goals (UN SDGs)
          </span>
        </div>
        <div className="flex gap-6 justify-center sem:flex-col sem:w-fit sem:self-center">
            <Image
              src="/v20/sdg1.svg"
              alt="adlogo"
              width={125.03}
              height={125.03}
            />
            <Image
              src="/v20/sdg2.svg"
              alt="adlogo"
              width={125.03}
              height={125.03}
            />
            <Image
              src="/v20/sdg3.png"
              alt="adlogo"
              width={125.03}
              height={125.03}
            />
            <Image
              src="/v20/sdg4.svg"
              alt="adlogo"
              width={125.03}
              height={125.03}
            />
        </div>
      </div>
    </div>
  );
};

export default ProgramSection;
