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

      {/* Top Hero Section */}
      <div className="bg-hero bg-ghostwhite pt-20 sm:pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 md:px-10 lg:px-[106px]">
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 justify-center items-center py-8 sm:py-12 md:py-16 max-w-screen-xl mx-auto text-center">
          <span className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 border border-orange-50 rounded-full text-orange-100 font-lato font-semibold text-xs sm:text-sm md:text-base">
            <RiRocket2Line className="text-sm sm:text-base md:text-lg flex-shrink-0" />
            <span className="text-xs sm:text-sm md:text-base">Unleash Your Potential, Get Discovered!</span>
          </span>

          <h2 className="font-merriweather text-black-50 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight max-w-4xl px-2">
            Revolutionizing Football{" "}
            <span className="relative text-orange-100 italic inline-block">
              Scouting
              <div className="absolute -bottom-1 right-2 sm:-bottom-2 sm:right-4 md:right-6 lg:right-10 z-0">
                <Image
                  src={Vector}
                  alt="vector underline"
                  className="w-20 sm:w-32 md:w-40 lg:w-52 h-auto"
                />
              </div>
            </span>{" "}
            with Data & Insights
          </h2>

          <p className="font-merriweather text-black-50 font-normal text-sm sm:text-base md:text-lg max-w-xl lg:max-w-3xl mb-4 sm:mb-6 px-2">
            Our solution provides elite scouting, talent data, and mapping tools
            to all clubs, federations and players to optimize performance and
            achieve their goals.
          </p>

          <button className="font-poppins font-semibold text-sm sm:text-base md:text-lg text-white px-6 py-3 sm:px-8 sm:py-4 bg-primary rounded-full transition-all hover:bg-primary-2 hover:shadow-lg w-full max-w-xs sm:w-auto">
            UNLOCK OPPORTUNITIES
          </button>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="bg-ghostwhite pb-10 sm:pb-12 md:pb-14 z-20 relative px-4 sm:px-6 md:px-10 lg:px-[106px]">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 z-20 max-w-screen-xl mx-auto">
          <div className="md:w-[65%] lg:w-[70%]">
            <Image
              src={Frame1}
              alt="Football action scene"
              className="w-full h-48 sm:h-64 md:h-full object-cover rounded-lg sm:rounded-xl"
            />
          </div>

          <div className="md:w-[35%] lg:w-[30%] flex flex-col gap-3 md:gap-4">
            <div className="w-full">
              <Image
                src={Frame2}
                alt="Scouting analytics"
                className="w-full h-32 sm:h-40 md:h-auto object-cover rounded-lg sm:rounded-xl"
              />
            </div>
            <div className="flex flex-row gap-3 md:gap-4 w-full">
              <div className="w-1/2">
                <Image
                  src={Frame3}
                  alt="Player profile interface"
                  className="w-full h-24 sm:h-32 md:h-auto object-cover rounded-lg sm:rounded-xl"
                />
              </div>
              <div className="w-1/2">
                <Image
                  src={Frame4}
                  alt="Team collaboration view"
                  className="w-full h-24 sm:h-32 md:h-auto object-cover rounded-lg sm:rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-4 bottom-2 sm:right-8 sm:bottom-4 z-10">
          <Image src={Ball} alt="Football" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-center justify-center bg-primary text-white w-full min-h-[60px] sm:min-h-[80px] py-4 px-4 text-center">
        <p className="font-lato font-medium text-xs sm:text-sm md:text-base lg:text-lg uppercase max-w-4xl mx-auto leading-relaxed">
          Scoutflair equips you with powerful tools to showcase talent, analyze
          performance, and elevate football scouting
        </p>
      </div>

      {/* Core Features Section */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-[106px] py-10 sm:py-12 md:py-16 bg-ghostwhite">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 justify-center border border-primary-2 w-fit mx-auto px-3 py-1 rounded-full text-primary font-merriweather font-normal text-xs sm:text-sm mb-6">
            <span className="w-[6px] h-[6px] rounded-full bg-primary-2"></span>
            Core Features
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5 mt-6 sm:mt-8 mb-8 sm:mb-10 md:mb-12">
            <div className="flex-1">
              <h2 className="text-black-50 font-manrope font-bold text-xl sm:text-2xl md:text-3xl w-full text-center md:text-left">
                Game-Changing Tools for Next-Level Scouting
              </h2>
            </div>
            <div className="flex-1">
              <p className="font-lato text-black-50 font-normal text-sm sm:text-base w-full text-center md:text-left">
                Empowering scouts with cutting-edge tools to discover, analyze,
                and connect with top football talent seamlessly—bringing the
                future of scouting to your fingertips
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-10">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-aboutframe z-10">
        <div className="px-4 sm:px-6 md:px-10 lg:px-[106px] py-10 sm:py-12 md:py-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12 gap-8">
              <div className="relative flex-1 flex justify-center md:justify-start items-center">
                <div className="relative">
                  <Image
                    src={Group1}
                    alt="Abstract group of players"
                    className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 z-10 object-contain"
                  />
                  <div className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 border-2 sm:border-4 border-secondary border-dashed rounded-xl top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-5 z-0"></div>
                </div>
              </div>

              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex items-center gap-2 justify-center md:justify-start border border-secondary w-fit px-3 py-1 rounded-full text-primary font-merriweather font-normal text-xs sm:text-sm mb-4 mx-auto md:mx-0">
                  <span className="w-[6px] h-[6px] rounded-full bg-primary-2"></span>
                  About Us
                </div>

                <h2 className="text-black-50 font-manrope font-bold text-xl sm:text-2xl md:text-3xl my-4 text-center md:text-left">
                  Connecting Talent with Opportunity – Bridging the Gap in Football.
                </h2>

                <p className="font-lato text-black-50 font-normal text-sm sm:text-base mb-6 text-center md:text-left">
                  Scoutflair is a dynamic football scouting platform designed to
                  bridge the gap between talent and opportunity. Whether you're a
                  player striving for exposure, a coach seeking the right prospects,
                  or a scout looking for top talent, Scoutflair streamlines the
                  connection process. We make talent discovery seamless, helping
                  footballers advance their careers while enabling scouts and coaches
                  to find the right fit with ease.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 justify-center md:justify-start">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <IoCheckmarkCircle className="text-[#52D17C] w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <p className="font-lato text-black-50 font-medium text-xs sm:text-sm md:text-base">
                        Unlocking Football Potential
                      </p>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <IoCheckmarkCircle className="text-[#52D17C] w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <p className="font-lato text-black-50 font-medium text-xs sm:text-sm md:text-base">
                        Talent Discovery Made Easy
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <IoCheckmarkCircle className="text-[#52D17C] w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <p className="font-lato text-black-50 font-medium text-xs sm:text-sm md:text-base">
                        Your Gateway to Football Success
                      </p>
                    </div>
                    <div className="flex items-center gap-2 justify-center sm:justify-start">
                      <IoCheckmarkCircle className="text-[#52D17C] w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <p className="font-lato text-black-50 font-medium text-xs sm:text-sm md:text-base">
                        Connecting Players, Coaches & Scouts
                      </p>
                    </div>
                  </div>
                </div>

                <Link href="/about" className="block w-full sm:w-fit mx-auto md:mx-0">
                  <span className="flex items-center justify-center border border-secondary w-full sm:w-48 md:w-64 h-12 rounded-full text-black-50 font-poppins font-medium text-sm sm:text-base transition-colors hover:bg-secondary/10">
                    Explore Now
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-around items-center gap-6 mt-12 sm:mt-16 md:mt-20">
              <Image
                src={Group2}
                alt="Player group 1"
                className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto object-contain"
              />
              <Image
                src={Group3}
                alt="Player group 2"
                className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto object-contain"
              />
              <Image
                src={Group4}
                alt="Player group 3"
                className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto object-contain"
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