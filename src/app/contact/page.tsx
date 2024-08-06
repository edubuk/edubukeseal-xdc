"use client";

import { Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

const ContactUs = () => {
  return (
    <div className="flex flex-col py-8 sm:py-16 items-center gap-10 sm:gap-20 bg-page-bg bg-full bg-no-repeat mb-11 px-4 sm:px-0">
      <div className="flex flex-col gap-4 w-full sm:w-[80%] m-auto">
        <h1 className={`${outfit.className} font-semibold text-4xl sm:text-[64px] text-[#2D6F57] text-center`}>
          Contact Us
        </h1>
        <p className={`${outfit.className} font-light text-lg sm:text-xl text-[#2D6F57] text-center`}>
          Any questions or Remarks? Just write to us.
        </p>
      </div>

      <div className="w-full sm:w-[90%] bg-[#E0FAEA] rounded-[20px] p-6 sm:p-10 flex flex-col sm:flex-row gap-10 sm:gap-20">
        <div className="bg-[#2D6F57] text-white p-6 sm:p-8 rounded-[20px] flex flex-col justify-between w-full sm:w-1/2">
          <div>
            <h2 className={`${outfit.className} font-semibold text-2xl sm:text-3xl mb-4`}>Contact Information</h2>
            <h2 className={`${outfit.className} font-large text-lg sm:text-[20px] mb-6`}>Eduprovince Technologies Private Limited (EduBuk)</h2>
            
            <div className="flex items-center mb-4">
              <Image src="/email.svg" alt="Email" width={24} height={24} />
              <span className="ml-2 text-sm sm:text-base">support@edubuk.com</span>
            </div>
            
            <div className="flex items-start">
              <Image src="/location.svg" alt="Address" width={24} height={24} />
              <span className="ml-2 text-sm sm:text-base">PHF 4117, Prestige High Fields, ISB Road, Financial District, Hyderabad-500032, Telangana, India</span>
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <Link href="https://www.instagram.com/edubuk_/">
              <Image src="/instagram.svg" alt="Instagram" width={32} height={32} />
            </Link>
            <Link href="https://linkedin.com/in/edubuk-ai-driven-decentralized-skilling-ecosystem-on-blockchain/">
              <Image src="/linkedin.svg" alt="LinkedIn" width={32} height={32} />
            </Link>
            <Link href="https://facebook.com/edubuk.trst/">
              <Image src="/facebook.svg" alt="Facebook" width={32} height={32} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full sm:w-1/2">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              className={`${outfit.className} p-4 text-black rounded-[10px] w-full`}
            />
            <input
              type="text"
              placeholder="Last Name"
              className={`${outfit.className} p-4 text-black rounded-[10px] w-full`}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Email"
              className={`${outfit.className} p-4 text-black rounded-[10px] w-full`}
            />
            <input
              type="tel"
              placeholder="Phone"
              className={`${outfit.className} p-4 text-black rounded-[10px] w-full`}
            />
          </div>
          <textarea
            placeholder="Message"
            rows={5}
            className={`${outfit.className} p-4 text-black rounded-[10px] w-full`}
          ></textarea>
          <button
            className={`rounded-[30px] font-normal text-lg sm:text-xl text-center text-white bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} py-2 px-6 w-fit self-center`}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;