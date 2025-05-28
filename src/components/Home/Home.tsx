import React from "react";
import Navbar from "../reusable/Navbar";
import { RiRocket2Line } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

// Assuming these paths are correct
import Vector from "@/public/images/Vector@2x.png";
import Frame1 from "@/public/images/Frame_1.png";
import Frame2 from "@/public/images/Frame_2.png";
import Frame3 from "@/public/images/Frame_3.png";
import Frame4 from "@/public/images/Frame_4.png";
import Ball from "@/public/images/ball.png";
import Group1 from "@/public/images/Group_1.png";
import Group2 from "@/public/images/group_2.png";
import Group3 from "@/public/images/group_3.png";
import Group4 from "@/public/images/group_4.png";

import { AnalyticsIcon, DeveloperIcon, GameIcon, MappingIcon } from "@/icons";
import FeatureCard from "../FeatureCard/FeatureCard";
import { IoCheckmarkCircle } from "react-icons/io5";
import TestimonialCarousel from "../TestimonialCarousel/TestimonialCarousel";
import Faq from "../FAQ/Faq";
import HeroSection from "../HeroSection/HeroSection";
import Footer from "../reusable/Footer";

const HomePage = () => {
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
    <div className="w-full overflow-x-hidden">
      <div>
        <Navbar />
      </div>

      {/* Top Hero Section - Fixed navbar overlap and improved mobile spacing */}
      <div className="bg-hero bg-ghostwhite pt-24 sm:pt-28 md:pt-32 lg:pt-36 px-4 sm:px-6 md:px-8 lg:px-[106px]">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 justify-center items-center py-10 sm:py-14 md:py-18 lg:py-20 max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 border border-orange-50 rounded-full text-orange-100 font-lato font-semibold text-xs sm:text-sm md:text-base shadow-sm">
            <RiRocket2Line className="text-base sm:text-lg md:text-xl flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">Unleash Your Potential, Get Discovered!</span>
          </span>

          <h1 className="font-merriweather text-black-50 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight max-w-5xl px-2">
            Revolutionizing Football{" "}
            <span className="relative text-orange-100 italic inline-block">
              Scouting
              <div className="absolute -bottom-1 right-2 sm:-bottom-2 sm:right-4 md:-bottom-3 md:right-6 lg:-bottom-4 lg:right-8 z-0">
                <Image
                  src={Vector}
                  alt="decorative underline"
                  className="w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48 h-auto"
                  priority
                />
              </div>
            </span>{" "}
            with Data & Insights
          </h1>

          <p className="font-merriweather text-black-50 font-normal text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl lg:max-w-4xl mb-6 sm:mb-8 px-4 leading-relaxed">
            Our solution provides elite scouting, talent data, and mapping tools
            to all clubs, federations and players to optimize performance and
            achieve their goals.
          </p>

          <button className="font-poppins font-semibold text-sm sm:text-base md:text-lg text-white px-8 py-4 sm:px-10 sm:py-5 bg-primary rounded-full transition-all duration-300 hover:bg-primary-2 hover:shadow-xl hover:scale-105 active:scale-95 w-full max-w-sm sm:w-auto shadow-lg">
            UNLOCK OPPORTUNITIES
          </button>
        </div>
      </div>

      {/* Image Grid Section - Improved mobile layout */}
      <div className="bg-ghostwhite pb-12 sm:pb-16 md:pb-20 z-20 relative px-4 sm:px-6 md:px-8 lg:px-[106px]">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 z-20 max-w-7xl mx-auto">
          <div className="lg:w-[65%] xl:w-[70%]">
            <Image
              src={Frame1}
              alt="Football action scene with players in competition"
              className="w-full h-52 sm:h-64 md:h-72 lg:h-full object-cover rounded-xl sm:rounded-2xl shadow-lg"
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>

          <div className="lg:w-[35%] xl:w-[30%] flex flex-col gap-4 sm:gap-5 md:gap-6">
            <div className="w-full">
              <Image
                src={Frame2}
                alt="Advanced scouting analytics dashboard"
                className="w-full h-40 sm:h-48 md:h-56 lg:h-auto object-cover rounded-xl sm:rounded-2xl shadow-lg"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>
            <div className="flex flex-row gap-4 sm:gap-5 md:gap-6 w-full">
              <div className="w-1/2">
                <Image
                  src={Frame3}
                  alt="Player profile and statistics interface"
                  className="w-full h-28 sm:h-36 md:h-44 lg:h-auto object-cover rounded-xl sm:rounded-2xl shadow-lg"
                  sizes="(max-width: 1024px) 50vw, 17.5vw"
                />
              </div>
              <div className="w-1/2">
                <Image
                  src={Frame4}
                  alt="Team collaboration and communication tools"
                  className="w-full h-28 sm:h-36 md:h-44 lg:h-auto object-cover rounded-xl sm:rounded-2xl shadow-lg"
                  sizes="(max-width: 1024px) 50vw, 17.5vw"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-6 bottom-4 sm:right-10 sm:bottom-6 md:right-12 md:bottom-8 z-10">
          <Image 
            src={Ball} 
            alt="Football decoration" 
            className="w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 opacity-80" 
          />
        </div>
      </div>

      {/* Info Banner - Better mobile text handling */}
      <div className="flex items-center justify-center bg-primary text-white w-full min-h-[70px] sm:min-h-[90px] py-5 px-4 text-center">
        <p className="font-lato font-medium text-sm sm:text-base md:text-lg lg:text-xl uppercase max-w-5xl mx-auto leading-relaxed">
          Scoutflair equips you with powerful tools to showcase talent, analyze
          performance, and elevate football scouting
        </p>
      </div>

      {/* Core Features Section - Enhanced mobile layout */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-[106px] py-12 sm:py-16 md:py-20 bg-ghostwhite">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 justify-center border border-primary-2 w-fit mx-auto px-4 py-2 rounded-full text-primary font-merriweather font-normal text-xs sm:text-sm mb-8 sm:mb-10">
            <span className="w-[6px] h-[6px] rounded-full bg-primary-2"></span>
            Core Features
          </div>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 mt-8 sm:mt-10 mb-10 sm:mb-12 md:mb-16">
            <div className="flex-1">
              <h2 className="text-black-50 font-manrope font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl w-full text-center lg:text-left leading-tight">
                Game-Changing Tools for Next-Level Scouting
              </h2>
            </div>
            <div className="flex-1">
              <p className="font-lato text-black-50 font-normal text-sm sm:text-base md:text-lg w-full text-center lg:text-left leading-relaxed">
                Empowering scouts with cutting-edge tools to discover, analyze,
                and connect with top football talent seamlessly—bringing the
                future of scouting to your fingertips
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 pb-12">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* About Us Section - Major mobile improvements */}
      <div className="bg-aboutframe z-10">
        <div className="px-4 sm:px-6 md:px-8 lg:px-[106px] py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-16 gap-10 sm:gap-12">
              <div className="relative flex-1 flex justify-center lg:justify-start items-center order-2 lg:order-1">
                <div className="relative">
                  <Image
                    src={Group1}
                    alt="Abstract representation of football players and team dynamics"
                    className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] z-10 object-contain"
                  />
                  <div className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] border-3 sm:border-4 border-secondary border-dashed rounded-2xl top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-0 opacity-60"></div>
                </div>
              </div>

              <div className="flex-1 order-1 lg:order-2">
                <div className="flex items-center gap-2 justify-center lg:justify-start border border-secondary w-fit px-4 py-2 rounded-full text-primary font-merriweather font-normal text-xs sm:text-sm mb-6 mx-auto lg:mx-0">
                  <span className="w-[6px] h-[6px] rounded-full bg-primary-2"></span>
                  About Us
                </div>

                <h2 className="text-black-50 font-manrope font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 text-center lg:text-left leading-tight">
                  Connecting Talent with Opportunity – Bridging the Gap in Football.
                </h2>

                <p className="font-lato text-black-50 font-normal text-sm sm:text-base md:text-lg mb-8 text-center lg:text-left leading-relaxed">
                  Scoutflair is a dynamic football scouting platform designed to
                  bridge the gap between talent and opportunity. Whether you're a
                  player striving for exposure, a coach seeking the right prospects,
                  or a scout looking for top talent, Scoutflair streamlines the
                  connection process. We make talent discovery seamless, helping
                  footballers advance their careers while enabling scouts and coaches
                  to find the right fit with ease.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 justify-center sm:justify-start">
                      <IoCheckmarkCircle className="text-[#52D17C] w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <p className="font-lato text-black-50 font-medium text-sm sm:text-base">
                        Unlocking Football Potential
                      </p>
                    </div>
                    <div className="flex items-center gap-3 justify-center sm:justify-start">
                      <IoCheckmarkCircle className="text-[#52D17C] w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <p className="font-lato text-black-50 font-medium text-sm sm:text-base">
                        Talent Discovery Made Easy
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 justify-center sm:justify-start">
                      <IoCheckmarkCircle className="text-[#52D17C] w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <p className="font-lato text-black-50 font-medium text-sm sm:text-base">
                        Your Gateway to Football Success
                      </p>
                    </div>
                    <div className="flex items-center gap-3 justify-center sm:justify-start">
                      <IoCheckmarkCircle className="text-[#52D17C] w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <p className="font-lato text-black-50 font-medium text-sm sm:text-base">
                        Connecting Players, Coaches & Scouts
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/about" className="block w-full sm:w-fit mx-auto lg:mx-0">
                  <span className="flex items-center justify-center border-2 border-secondary w-full sm:w-52 md:w-64 h-12 sm:h-14 rounded-full text-black-50 font-poppins font-medium text-sm sm:text-base transition-all duration-300 hover:bg-secondary/10 hover:shadow-lg hover:scale-105 active:scale-95">
                    Explore Now
                  </span>
                </Link>
              </div>
            </div>

            {/* Brand logos section - Better mobile spacing */}
            <div className="flex flex-col sm:flex-row sm:justify-around items-center gap-8 sm:gap-6 mt-16 sm:mt-20 md:mt-24">
              <Image
                src={Group2}
                alt="Partner organization logo 1"
                className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <Image
                src={Group3}
                alt="Partner organization logo 2"
                className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <Image
                src={Group4}
                alt="Partner organization logo 3"
                className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <TestimonialCarousel />
      <Faq />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HomePage;