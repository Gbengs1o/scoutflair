"use client"; // Add this line at the very top

import React from "react";
import Navbar from "../reusable/Navbar";
import Image from "next/image";
import Line from "@/public/images/Line.png"; // Make sure this path is correct for your project
import {
    AnalyticsIcon,
    DeveloperIcon,
    GameIcon,
    MappingIcon,
  } from "@/icons"; // Make sure this path is correct
import FeatureCard from "../FeatureCard/FeatureCard";
import TestimonialCarousel from "../TestimonialCarousel/TestimonialCarousel";
import HeroSectionComponent from "../HeroSection/HeroSection"; // Renamed to avoid conflict
import Footer from "../reusable/Footer";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; // Make sure Swiper modules are imported correctly

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


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

    const steps = [
        {
          number: 1,
          title: "Create Your Profile",
          description: "Whether you're a player, coach, or scout, set up a profile to showcase your skills, experience, and goals."
        },
        {
          number: 2,
          title: "Engage & Showcase",
          description: "Players upload match footage and stats, while scouts and coaches browse, track, and evaluate talent."
        },
        {
          number: 3,
          title: "Connect & Communicate",
          description: "Players get discovered, scouts find top talent, and coaches build winning teams through direct messaging."
        },
        {
          number: 4,
          title: "Secure Opportunities",
          description: "From trials to signings, coaching roles, and scouting missions—take your football career to the next level."
        }
    ];

    return (
        <>
        <div>
            <Navbar />
        </div>
        
        {/* Main Hero Section (Top of page) - Fixed navbar overlap */}
        <div className="bg-primary pt-28 sm:pt-32 md:pt-36 lg:pt-40 xl:pt-48 pb-16 sm:pb-20 md:pb-24 lg:pb-32 xl:pb-40 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 justify-center items-center text-white text-center max-w-5xl mx-auto">
              <h2 className="font-bold font-merriweather text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl max-w-4xl leading-tight tracking-tight">
                Everything You Need to Succeed in One Platform.
              </h2>
              <p className="font-lato font-normal text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed opacity-90">
                From player scouting to performance tracking and seamless connections—unlock every tool you need to advance your football career in one powerful platform
              </p>
              <button className="bg-secondary text-black-50 px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 rounded-full font-poppins text-sm sm:text-base lg:text-lg font-semibold mt-4 sm:mt-6 lg:mt-8 hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                UNLOCK OPPORTUNITIES
              </button>
            </div>
          </div>

          {/* How It Works Section - Improved mobile positioning */}
          <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 xl:-bottom-16 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 xl:left-[106px] xl:right-[106px]">
            <div className="bg-white text-black-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
              <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
                <h3 className="font-manrope font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                  How does it work?
                </h3>

                {/* Mobile Carousel Layout - Improved */}
                <div className="block xl:hidden">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    className="pb-12"
                  >
                    {steps.map((step) => (
                      <SwiperSlide key={step.number} className="!flex !flex-col !items-center !text-center !px-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-full text-base sm:text-lg font-bold flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                          {step.number}
                        </div>
                        <h4 className="font-lato text-base sm:text-lg font-semibold mb-2 sm:mb-3">{step.title}</h4>
                        <p className="font-lato text-sm sm:text-base font-normal leading-relaxed max-w-xs sm:max-w-sm opacity-80 px-2">
                          {step.description}
                        </p>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Desktop Layout - Same as before */}
                <div className="hidden xl:flex items-start justify-between">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                      <div className="flex flex-col items-center text-center flex-1 px-2">
                        <div className="w-12 h-12 bg-primary text-white rounded-full text-lg font-bold flex items-center justify-center mb-6 shadow-lg">
                          {step.number}
                        </div>
                        <h4 className="font-lato text-lg font-semibold mb-4">{step.title}</h4>
                        <p className="font-lato text-base font-normal leading-relaxed max-w-sm opacity-80">
                          {step.description}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="flex-shrink-0 flex items-center justify-center pt-6 px-2 xl:px-4 self-start mt-1">
                          <Image 
                            src={Line} 
                            className="w-full max-w-[80px] md:max-w-[100px] xl:max-w-[150px] opacity-60"
                            alt="connector line" 
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Spacer - Adjusted for better mobile spacing */}
        <div className="bg-ghostwhite pt-32 sm:pt-48 md:pt-56 lg:pt-64 xl:pt-72"></div> 
        
        {/* Core Features Section - Improved mobile layout */}
        <div className="bg-ghostwhite">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[106px] max-w-7xl pb-8 sm:pb-12 md:pb-16 lg:pb-20">
            <div className="flex items-center gap-2 justify-center border border-primary-2 px-4 py-2 rounded-full text-primary font-merriweather font-normal text-sm mx-auto w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-2"></span>
              Core Features
            </div>
            
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 mt-6 sm:mt-8 lg:mt-10 xl:mt-12 mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
              <div className="flex-1 w-full">
                <h2 className="text-black-50 font-manrope font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center lg:text-left leading-tight">
                  Game-Changing Tools for Next-Level Scouting
                </h2>
              </div>
              <div className="flex-1 w-full">
                <p className="font-lato text-black-50 font-normal text-sm sm:text-base md:text-lg lg:text-xl text-center lg:text-left leading-relaxed opacity-80">
                  Empowering scouts with cutting-edge tools to discover, analyze,
                  and connect with top football talent seamlessly—bringing the
                  future of scouting to your fingertips
                </p>
              </div>
            </div>

            {/* Improved grid layout for mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>

        <TestimonialCarousel />
        
        <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 bg-ghostwhite">
          <HeroSectionComponent />
        </div>

        <Footer />
        <style jsx global>{`
          .swiper-pagination-bullet {
            background-color: #00205B !important; /* primary color */
            opacity: 0.5 !important;
            width: 8px !important;
            height: 8px !important;
          }
          .swiper-pagination-bullet-active {
            opacity: 1 !important;
            background-color: #00A0E3 !important; /* secondary color or a brighter primary variant */
            width: 10px !important;
            height: 10px !important;
          }
          .swiper-slide {
            box-sizing: border-box;
          }
          @media (max-width: 640px) {
            .swiper-pagination-bullet {
              width: 6px !important;
              height: 6px !important;
            }
            .swiper-pagination-bullet-active {
              width: 8px !important;
              height: 8px !important;
            }
          }
        `}</style>
        </>
    );
};

export default FeaturesPage;