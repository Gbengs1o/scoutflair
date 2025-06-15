import React from "react";
import Navbar from "../reusable/Navbar";
import { RiRocket2Line } from "react-icons/ri";
import Image from "next/image";
import Vector from "@/public/images/Vector@2x.png";
import Frame1 from "@/public/images/Frame_1.png";
import Frame2 from "@/public/images/Frame_2.png";
import Frame3 from "@/public/images/Frame_3.png";
import Frame4 from "@/public/images/Frame_4.png";
import Ball from "@/public/images/ball.png";
import { AnalyticsIcon, DeveloperIcon, GameIcon, MappingIcon } from "@/icons";
import FeatureCard from "../FeatureCard/FeatureCard";
import Group1 from "@/public/images/Group_1.png";
import Group2 from "@/public/images/group_2.png";
import Group3 from "@/public/images/group_3.png";
import Group4 from "@/public/images/group_4.png";
import { IoCheckmarkCircle } from "react-icons/io5";
import Link from "next/link";
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
    <>
      <div>
        <Navbar />
      </div>
      <div className="bg-hero bg-ghostwhite pt-[120px] px-4 md:px-10 lg:px-20">
        <div className="flex flex-col gap-5 justify-center items-center pt-10 max-w-screen-xl mx-auto text-center">
          <span className="inline-flex items-center gap-1 px-4 py-1 border border-orange-50 rounded-full text-orange-100 font-lato font-semibold text-sm sm:text-lg">
            <RiRocket2Line />
            Unleash Your Potential, Get Discovered!
          </span>

          <h2 className="font-merriweather text-black-50 font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-4xl">
            Revolutionizing Football{" "}
            <span className="relative text-orange-100 italic inline-block">
              Scouting
              <div className="absolute -bottom-2 right-10">
                <Image
                  src={Vector}
                  alt="vector underline"
                  className="w-[150px] md:w-[210px]"
                />
              </div>
            </span>{" "}
            with Data & Insights
          </h2>

          <p className="font-merriweather text-black-50 font-normal text-base sm:text-lg max-w-3xl mb-4">
            Our solution provides elite scouting, talent data, and mapping tools
            to all clubs...
          </p>

          <button className="font-poppins font-semibold text-base sm:text-lg text-white px-6 py-3 bg-primary rounded-3xl transition-all hover:bg-primary-2 hover:shadow-lg">
            UNLOCK OPPORTUNITIES
          </button>
        </div>
      </div>

      <div className="bg-ghostwhite pb-14 z-20 relative">
        <div className="flex flex-col md:flex-row px-4 md:px-[106px] gap-2 z-20">
          <div className="md:w-[70%]">
            <Image
              src={Frame1}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-[30%] flex flex-col md:flex-row gap-2">
            <div className="w-full">
              <Image
                src={Frame2}
                alt=""
                className="w-full rounded-[20px] h-full object-cover"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <div className="h-1/2">
                <Image
                  src={Frame3}
                  alt=""
                  className="w-full rounded-[20px] h-full object-cover"
                />
              </div>
              <div className="h-1/2">
                <Image
                  src={Frame4}
                  alt=""
                  className="w-full rounded-[20px] h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-[40px] bottom-0 z-[-1]">
          <Image src={Ball} alt="" className="w-[100px] h-[100px]" />
        </div>
      </div>

      <div className="flex items-center justify-center bg-primary text-white w-full h-[80px] px-4 text-center">
        <p className="font-lato font-medium text-lg uppercase">
          Scoutflair equips you with powerful tools to showcase talent, analyze
          performance, and elevate football scouting
        </p>
      </div>

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

<div className="bg-aboutframe z-10">
  <div className="px-4 md:px-[106px] py-10">
    <div className="flex flex-col md:flex-row md:gap-0 gap-10">
      <div className="relative flex-1 flex justify-center md:justify-start">
        <Image
          src={Group1}
          alt={""}
          className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] z-10"
        />
        <div className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] border-4 border-secondary border-dashed rounded-xl top-5 left-5 sm:top-10 sm:left-10 z-[-1]"></div>
      </div>

      <div className="flex-1 mt-4">
        <div className="flex items-center gap-2 justify-center md:justify-start border border-secondary w-fit px-4 h-[22px] rounded-[100px] text-primary font-merriweather font-normal text-sm">
          <span className="w-[6px] h-[6px] rounded-full bg-primary-2"></span>
          About Us
        </div>

        <h2 className="text-black-50 font-manrope font-bold text-2xl sm:text-3xl my-3 w-full sm:w-[90%] text-center md:text-left">
          Connecting Talent with Opportunity – Bridging the Gap in Football.
        </h2>

        <p className="font-lato text-black-50 font-normal text-base mb-4 text-center md:text-left">
          Scoutflair is a dynamic football scouting platform designed to
          bridge the gap between talent and opportunity. Whether you&apos;re a
          player striving for exposure, a coach seeking the right prospects,
          or a scout looking for top talent, Scoutflair streamlines the
          connection process. We make talent discovery seamless, helping
          footballers advance their careers while enabling scouts and coaches
          to find the right fit with ease.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mb-8 items-center md:items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="text-[#52D17C] w-[15px] h-[15px]" />
              <p className="font-lato text-black-50 font-medium text-base">
                Unlocking Football Potential
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="text-[#52D17C] w-[15px] h-[15px]" />
              <p className="font-lato text-black-50 font-medium text-base">
                Talent Discovery Made Easy
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="text-[#52D17C] w-[15px] h-[15px]" />
              <p className="font-lato text-black-50 font-medium text-base">
                Your Gateway to Football Success
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="text-[#52D17C] w-[15px] h-[15px]" />
              <p className="font-lato text-black-50 font-medium text-base">
                Connecting Players, Coaches & Scouts
              </p>
            </div>
          </div>
        </div>

        <Link href={"/about"}>
          <span className="flex items-center justify-center border border-secondary w-full sm:w-[254px] h-[40px] rounded-[24px] text-black-50 font-poppins font-medium text-base mx-auto md:mx-0">
            Explore Now
          </span>
        </Link>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row mt-20 justify-center items-center sm:items-stretch gap-4">
      <Image
        src={Group2}
        alt=""
        className="h-[150px] sm:h-[200px] w-auto object-cover"
      />
      <Image
        src={Group3}
        alt=""
        className="h-[150px] sm:h-[200px] w-auto object-cover"
      />
      <Image
        src={Group4}
        alt=""
        className="h-[150px] sm:h-[200px] w-auto object-cover"
      />
    </div>
  </div>
</div>

      <TestimonialCarousel />
      <Faq />
      <HeroSection />
      <Footer />
    </>
  );
};

export default HomePage;
