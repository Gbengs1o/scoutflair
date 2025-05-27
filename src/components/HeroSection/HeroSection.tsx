import Link from "next/link";

const HeroSection = () => {
  return (
    // Outer container: Responsive padding and bottom margin
    <div className="bg-ghostwhite px-4 pb-12 sm:px-6 sm:pb-16 md:px-10 md:pb-20 lg:px-[106px] lg:pb-24">
      {/* Inner colored box: Responsive vertical padding */}
      <div className="bg-primary py-8 rounded-[20px] sm:py-10 md:py-12 lg:py-14">
        {/* Content container: Responsive gap and inner horizontal padding */}
        <div className="flex flex-col items-center justify-center gap-4 text-white sm:gap-5 md:gap-6 px-4 sm:px-6">
          <p className="font-manrope text-center font-bold text-lg sm:text-xl md:text-2xl">
            The Bridge Between Talent and Triumph!
          </p>
          <h2 className="font-manrope max-w-[850px] text-center font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-5xl">
            Where Talent Meets Opportunity—Play Hard, Get Noticed!
          </h2>
          <p className="font-lato max-w-[950px] text-center font-normal text-base sm:text-lg md:text-xl">
            Scoutflair is where passionate players, dedicated scouts, and
            visionary coaches connect. Showcase your skills, discover top
            talent, and take your football journey to the next level.
          </p>
          <Link
            href={"/auth/sign-up"} // Assuming a relevant link, e.g., sign-up
            className="mt-5 flex h-[48px] w-[200px] items-center justify-center rounded-[24px] border border-white bg-transparent font-poppins text-base font-semibold text-white transition-colors hover:bg-white/10 sm:mt-6 sm:h-[52px] sm:w-[250px] sm:text-lg md:mt-8 md:h-[55px] md:w-[292px]"
          >
            GET STARTED
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;