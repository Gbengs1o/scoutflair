import React from "react";
import Navbar from "../reusable/Navbar";
import Image from "next/image";
import Line from "@/public/images/Line.png";
import {
    AnalyticsIcon,
    DeveloperIcon,
    GameIcon,
    MappingIcon,
  } from "@/icons";
import FeatureCard from "../FeatureCard/FeatureCard";
import TestimonialCarousel from "../TestimonialCarousel/TestimonialCarousel";
import HeroSection from "../HeroSection/HeroSection";
import Footer from "../reusable/Footer";

const FeaturesPage = () => {
    const features = [
        {
          icon: <GameIcon />,
          title: "Advance Scouting",
          description:
            "Discover talent with precision using our advanced scouting tools, providing in-depth analysis and insights to identify and evaluate top players.",
          hoverColor: "hover:bg-card-1",
          color: "text-card-1",
        },
        {
          icon: <DeveloperIcon />,
          title: "Talent Development",
          description:
            "Enhance player skills with our comprehensive talent development programs, focusing on personalized training to maximize potential.",
          hoverColor: "hover:bg-card-2",
          color: "text-card-2",
        },
        {
          icon: <AnalyticsIcon />,
          title: "Data Analytics",
          description:
            "Unlock valuable insights with our data analytics tools, providing detailed performance metrics and actionable intelligence for decision-making.",
          hoverColor: "hover:bg-card-3",
          color: "text-card-3",
        },
        {
          icon: <MappingIcon />,
          title: "Information Mapping",
          description:
            "Visualize and organize complex data with our information mapping tools, making it easier to understand and interpret key insights.",
          hoverColor: "hover:bg-card-4",
          color: "text-card-4",
        },
      ];

    return (
        <>
        <div>
            <Navbar />
        </div>
        <div className="bg-primary py-40 relative px-4">
        <div className="flex flex-col gap-4 justify-center items-center text-white text-center">
          <h2 className="font-bold font-merriweather text-2xl md:text-4xl max-w-[650px]">
            Everything You Need to Succeed in One Platform.
          </h2>
          <p className="font-lato font-normal text-sm md:text-base max-w-[620px]">
            From player scouting to performance tracking and seamless connections—unlock every tool you need to advance your football career in one powerful platform
          </p>
          <button className="bg-secondary text-black-50 w-[180px] md:w-[232px] h-[45px] rounded-3xl font-poppins text-sm font-semibold mt-4">
            UNLOCK OPPORTUNITIES
          </button>
        </div>

        {/* How It Works Section */}
        <div className="absolute md:bottom-0 bottom-[-12rem] left-0 right-0 transform translate-y-1/2 bg-white text-black-50 rounded-[20px] mx-4 md:mx-[106px]">
          <div className="px-6 py-6">
            <p className="font-manrope font-semibold text-xl md:text-2xl">How does it work?</p>

            {/* Steps */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 mt-6">

              {/* Step 1 */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-[2px]">
                  <span className="w-[18px] h-[18px] bg-primary text-white rounded-full text-xs flex items-center justify-center">1</span>
                  <Image src={Line} className="hidden md:block w-[270px]" alt="" />
                </div>
                <div className="mt-4">
                  <h2 className="font-lato text-base font-medium">Create Your Profile</h2>
                  <p className="font-lato text-xs font-normal max-w-[220px] mt-2">Whether you're a player, coach, or scout, set up a profile to showcase your skills, experience, and goals.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-[2px]">
                  <span className="w-[18px] h-[18px] bg-primary text-white rounded-full text-xs flex items-center justify-center">2</span>
                  <Image src={Line} className="hidden md:block w-[270px]" alt="" />
                </div>
                <div className="mt-4">
                  <h2 className="font-lato text-base font-medium">Engage & Showcase</h2>
                  <p className="font-lato text-xs font-normal max-w-[220px] mt-2">Players upload match footage and stats, while scouts and coaches browse, track, and evaluate talent.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-[2px]">
                  <span className="w-[18px] h-[18px] bg-primary text-white rounded-full text-xs flex items-center justify-center">3</span>
                  <Image src={Line} className="hidden md:block w-[270px]" alt="" />
                </div>
                <div className="mt-4">
                  <h2 className="font-lato text-base font-medium">Connect & Communicate</h2>
                  <p className="font-lato text-xs font-normal max-w-[220px] mt-2">Players get discovered, scouts find top talent, and coaches build winning teams through direct messaging.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-[2px]">
                  <span className="w-[18px] h-[18px] bg-primary text-white rounded-full text-xs flex items-center justify-center">4</span>
                </div>
                <div className="mt-4">
                  <h2 className="font-lato text-base font-medium">Secure Opportunities</h2>
                  <p className="font-lato text-xs font-normal max-w-[220px] mt-2">From trials to signings, coaching roles, and scouting missions—take your football career to the next level.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

        <div className="bg-ghostwhite md:pt-48 pt-[32rem]"></div>
        <div className="px-4 md:px-[106px] pt-[60px] bg-ghostwhite">
        <div className="flex items-center gap-2 justify-center border border-primary-2 w-[136px] h-[22px] rounded-[100px] text-primary font-merriweather font-normal text-sm">
          <span className="w-[6px] h-[6px] rounded-full bg-primary-2"></span>
          Core Features
        </div>
        <div className="flex flex-col md:flex-row items-center gap-5 mt-4 mb-8">
  <div className="flex-1">
    <h2 className="text-black-50 font-manrope font-bold text-2xl sm:text-3xl w-full sm:w-[90%] text-center md:text-left">
      Game-Changing Tools for Next-Level Scouting
    </h2>
  </div>
  <div className="flex-1">
    <p className="font-lato text-black-50 font-normal text-base text-center md:text-left">
      Empowering scouts with cutting-edge tools to discover, analyze,
      and connect with top football talent seamlessly—bringing the
      future of scouting to your fingertips
    </p>
  </div>
</div>

<div className="flex flex-col sm:flex-row gap-4 pb-10 px-4 items-center">
  {features.map((feature, index) => (
    <FeatureCard key={index} {...feature} />
  ))}
</div>
</div>

      <TestimonialCarousel />
      <div className="pt-20 bg-ghostwhite">
      <HeroSection />
      </div>

      <Footer />
        </>
    );
};

export default FeaturesPage;