import AwardsSection from "@/components/AwardsSection";
import HeroSection from "@/components/HeroSection";
import ProgramSection from "@/components/ProgramSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-[80px] m-0 p-0">
        <HeroSection />{" "}
        {/* This section contains the main heading of the page */}
        <AwardsSection />
        <ProgramSection />
      </div>
      {/*<Image
        alt="bg"
        src="bg.svg"
        width={570}
        height={600}
        className="absolute top-[3184.74px] left-[1px] med:hidden"
      />
      <Image
        alt="bg"
        src="bg.svg"
        width={570}
        height={600}
        className="absolute top-[5594.74px] left-[1px] med:hidden"
      />
      <Image
        alt="bg"
        src="bg.svg"
        width={554.88}
        height={612.48}
        className="absolute z-[-1] top-[-62.93px] left-[455px] -rotate-[69.56deg] med:hidden"
      />*/}
    </>
  );
}
