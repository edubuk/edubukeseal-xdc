import { Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

const Media = () => {
  return (
    <div className="flex flex-col gap-20 py-8 mb-16 bg-page-bg bg-full bg-no-repeat">
      <span
        className={`${outfit.className} font-semibold mt-10 text-[52px] text-[#2D6F57] text-center sem:text-4xl`}
      >
        Media Mentions
      </span>
      <div className="flex justify-around mx-auto w-[90%] med:flex-col med:gap-8">
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center gap-6 justify-center sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m1.png"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://drive.google.com/file/d/1R1XwmSk-f08gatS0pcATIixO-ycrT6ZP/view"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center justify-center gap-6 sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m2.jpg"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://government.economictimes.indiatimes.com/news/governance/t-aim-startups-win-awards-at-g20-digital-innovation-network-held-in-indonesia/94018890"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center gap-6 justify-center sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m3.JPG"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://www.youtube.com/watch?v=cXttJZqkSfw&t=145s"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-around mx-auto w-[90%] med:flex-col med:gap-8">
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center justify-center gap-6 sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m4.JPG"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://inc42.com/startups/30-startups-to-watch-the-startups-that-caught-our-eye-in-may-2022/"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center gap-6 justify-center sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m5.JPG"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://yourstory.com/2022/04/experts-reimagining-edtech"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center justify-center gap-6 sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m6.png"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://alexablockchain-com.cdn.ampproject.org/c/s/alexablockchain.com/edubuk-concordium-secure-academic-credentials/?amp=1"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-around mx-auto w-[90%] med:flex-col med:gap-8">
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center gap-6 justify-center sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m7.JPG"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://www.linkedin.com/posts/edubuk-ai-driven-decentralized-skilling-ecosystem-on-blockchain_seedstars-ftxsdgchallenge-activity-6863546274097037312-TLic?utm_source=share&utm_medium=member_desktop"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center justify-center gap-6 sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m8.JPG"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://twitter.com/CoinDCX/status/1633444957691191297?s=20"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center gap-6 justify-center sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m9.JPG"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://twitter.com/Seedstars/status/1562736045912834049"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-around mx-auto w-[90%] med:flex-col med:gap-8">
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center justify-center gap-6 sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m18.PNG"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://mpost.io/edubuk-partners-concordium-to-tackle-fake-credentials-with-blockchain-verification/"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center gap-6 justify-center sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m17.JPG"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://www.streetinsider.com/Press+Releases/G20+Digital+Innovation+Network+%28DIN%29%3A+Catalyst+for+Digital+Economy+Growth+in+Indonesia/20597605.html"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center gap-6 justify-center sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m11.png"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://timesnext.com/shivani-mehrotra-bajaj-startup-story-edubuk/"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-around mx-auto w-[90%] med:flex-col med:gap-8">
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center gap-6 justify-center sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m13.png"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://www.birlatmtsteel.com/birla-young-indian-awards-2020/"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center justify-center gap-6 sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m12.png"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://telanganatoday.com/we-hub-western-digital-select-8-startups-for-accelerator"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center justify-center gap-6 sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m14.JPG"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://www.linkedin.com/posts/raise-money_pitchfriday-startupcompetition-innovation-activity-7033687319370940416-6w6u?utm_source=share&utm_medium=member_desktop"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-around mx-auto w-[90%] med:flex-col med:gap-8">
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center gap-6 justify-center sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m15.png"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://ai.telangana.gov.in/revv-up/cohort-1/"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center justify-center gap-6 sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m16.png"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="http://startuphyderabad.com/srix-innovation-x-1-0-preliminary-jury-round/"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>

        <div className="rounded-[20px] border border-solid border-[#E0FAEA] bg-[#E0FAEA] py-7 px-9 flex flex-col items-center justify-center gap-6 sem:p-4 med:w-fit med:self-center">
          <Image
            alt="media"
            src="/images/m10.jpg"
            width={250}
            height={400}
            // className="w-[250px] h-[120px]"
          />
          <Link
            href="https://www.linkedin.com/posts/edubuk-ai-driven-decentralized-skilling-ecosystem-on-blockchain_glad-to-update-that-edubuk-is-recognized-activity-7148561934357807105-M258?utm_source=share&utm_medium=member_desktop"
            target="_blank"
          >
            <button className="flex rounded px-4 py-3 bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] text-[#FFFFFF] text-base font-normal w-fit">
              Learn more ↗
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Media;
