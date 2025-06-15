import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="px-4 sm:px-6 md:px-[106px] bg-ghostwhite pb-20">
      <div className="bg-primary py-10 rounded-[20px]">
        <div className="flex flex-col gap-4 items-center justify-center text-white px-4">
          <p className="font-bold font-manrope text-lg text-center">
            The Bridge Between Talent and Triumph!
          </p>
          <h2 className="font-bold font-manrope text-2xl sm:text-3xl md:text-4xl text-center max-w-[850px]">
            Where Talent Meets Opportunity—Play Hard, Get Noticed!
          </h2>
          <p className="font-normal font-lato text-base sm:text-lg text-center max-w-[950px]">
            Scoutflair is where passionate players, dedicated scouts, and visionary coaches connect. Showcase your skills, discover top talent, and take your football journey to the next level.
          </p>
          <Link
            href={""}
            className="font-semibold text-base sm:text-lg font-poppins flex items-center justify-center w-[200px] sm:w-[292px] h-[48px] sm:h-[55px] text-white rounded-[24px] mt-4 border border-white bg-transparent"
          >
            GET STARTED
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
