"use client";
import React from "react";
import Navbar from "../reusable/Navbar";
import Image from "next/image";
import Bg from "@/public/images/Frame_5.png";
import Scout from "@/public/images/scout-logo.png";
import Faygroup from "@/public/images/faygroup-logo.png";
import Sleek from "@/public/images/sleek-logo.png";
import Valuegate from "@/public/images/valuegate-logo.png";
import Academy from "@/public/images/academy-logo.png";
import Frame8 from "@/public/images/Frame_8.png";
import Frame9 from "@/public/images/Frame_9.png";
import Frame10 from "@/public/images/Frame_10.png";
import Frame11 from "@/public/images/Frame_11.png";
import Frame12 from "@/public/images/Frame_12.png";
import Frame13 from "@/public/images/Frame_13.png";
import Frame14 from "@/public/images/Frame_14.png";
import Frame15 from "@/public/images/Frame_15.png";
import Frame16 from "@/public/images/Frame_16.png";
import Frame17 from "@/public/images/Frame_17.png";
import TestimonialCarousel from "../TestimonialCarousel/TestimonialCarousel";
import HeroSection from "../HeroSection/HeroSection";
import Footer from "../reusable/Footer";
import { motion } from "framer-motion";

const AboutPage: React.FC = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section - Increased mobile padding to avoid navbar overlap */}
      <div className="bg-ghostwhite pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-[106px]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 sm:gap-8">
          <div className="flex-1 w-full">
            <h2 className="font-merriweather font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-tight lg:leading-snug text-black-50 max-w-full lg:max-w-[600px]">
              Changing How Football Talent is Found & Fostered
            </h2>
          </div>
          <div className="flex-1 w-full">
            <p className="text-sm sm:text-base md:text-lg text-black-50 font-lato font-normal text-left lg:text-right leading-relaxed">
              We are transforming the way football talent is discovered and
              nurtured. Through cutting-edge data and insightful scouting, we
              connect emerging players with top scouts and clubs, ensuring no
              talent goes unnoticed.
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-14">
          <Image 
            src={Bg} 
            alt="Football talent scouting background" 
            className="w-full h-auto rounded-lg sm:rounded-xl"
            priority
          />
        </div>
      </div>

      {/* Partner Logos Marquee - Better mobile sizing */}
      <div className="bg-primary w-full h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] overflow-hidden relative flex justify-center">
        <motion.div
          className="flex items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 10, repeat: Infinity }}
        >
          {[Scout, Faygroup, Sleek, Valuegate, Academy, Scout, Faygroup, Sleek, Valuegate, Academy].map((img, i) => (
            <Image 
              key={i} 
              src={img} 
              alt="Partner logo" 
              className="w-[60px] sm:w-[70px] md:w-[80px] lg:w-[100px] mx-2 sm:mx-3 lg:mx-4" 
            />
          ))}
        </motion.div>
      </div>

      {/* Main Content Sections - Improved mobile spacing */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-[106px] bg-ghostwhite">
        
        {/* Our Dream Section - Better mobile layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10">
          <div className="bg-primary rounded-[16px] sm:rounded-[20px] text-white pt-6 sm:pt-8 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-10 xl:px-14 flex-1">
            <div className="flex items-center gap-2 justify-center lg:justify-start border border-white w-[120px] sm:w-[136px] h-[20px] sm:h-[22px] rounded-full font-merriweather text-xs sm:text-sm mx-auto lg:mx-0">
              <span className="w-[5px] sm:w-[6px] h-[5px] sm:h-[6px] rounded-full bg-white"></span>
              Our Dream
            </div>

            <h2 className="font-manrope font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-full lg:max-w-[320px] mt-4 sm:mt-6 text-center lg:text-left leading-tight">
              From the Streets to the Stadium – Making Dreams Reality
            </h2>
            <p className="font-lato font-medium text-sm sm:text-base mt-4 sm:mt-6 leading-relaxed text-center lg:text-left">
              Our dream is to create a world where every talented footballer, no matter where they come from, has the opportunity to be seen and succeed. We bridge the gap between grassroots passion and professional opportunities, using data-driven scouting and innovation to connect players with the right clubs and scouts. By leveling the playing field, we help turn raw potential into thriving football careers, ensuring that no talent goes unnoticed.
            </p>
          </div>

          <div className="flex-1 flex gap-3 sm:gap-4 lg:gap-5 justify-center">
            <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-[160px] sm:max-w-[200px] md:max-w-[250px]">
              <Image src={Frame8} alt="Team collaboration" className="w-full h-auto rounded-lg" />
              <Image src={Frame9} alt="Football training" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>

        {/* Our Mission Section - Improved mobile layout */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-start lg:justify-end order-2 lg:order-1">
            <div className="flex items-center gap-2 justify-center lg:justify-start border border-primary w-[120px] sm:w-[136px] h-[20px] sm:h-[22px] rounded-full text-primary font-merriweather text-xs sm:text-sm mx-auto lg:mx-0">
              <span className="w-[5px] sm:w-[6px] h-[5px] sm:h-[6px] rounded-full bg-primary"></span>
              Our Mission
            </div>
            <p className="font-manrope font-bold text-lg sm:text-xl md:text-2xl text-black-50 mt-3 sm:mt-4 text-center lg:text-left max-w-full lg:max-w-[500px] leading-tight">
              Empowering Players, Transforming Scouting
            </p>
            <p className="font-lato font-normal text-sm sm:text-base text-black-50 mt-4 sm:mt-5 leading-relaxed text-center lg:text-left max-w-full lg:max-w-[480px]">
              We are redefining football scouting by empowering players with a platform to showcase their skills, track progress, and connect with the right opportunities. At the same time, we equip scouts with advanced data-driven insights to make informed recruitment decisions. By bridging the gap between raw talent and professional opportunities, we are creating a more transparent, efficient, and impactful scouting ecosystem that benefits both players and the football industry at large.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 items-center justify-center order-1 lg:order-2">
            <div className="w-full max-w-[160px] sm:max-w-[180px] lg:max-w-[220px]">
              <Image src={Frame10} alt="Player showcase" className="w-full h-auto rounded-lg" />
            </div>
            <div className="w-full max-w-[160px] sm:max-w-[180px] lg:max-w-[220px] sm:self-end">
              <Image src={Frame11} alt="Data analytics" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>

        {/* Our Vision Section - Improved mobile layout */}
        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 items-center justify-center lg:w-[35%] order-2 lg:order-1">
              <div className="w-full max-w-[160px] sm:max-w-[180px] lg:max-w-[220px] sm:self-end">
                <Image src={Frame12} alt="Breaking barriers" className="w-full h-auto rounded-lg" />
              </div>
              <div className="w-full max-w-[160px] sm:max-w-[180px] lg:max-w-[220px]">
                <Image src={Frame13} alt="Creating legends" className="w-full h-auto rounded-lg" />
              </div>
            </div>

            <div className="flex flex-col justify-start lg:justify-end lg:w-[50%] order-1 lg:order-2">
              <div className="flex items-center gap-2 justify-center lg:justify-start border border-primary w-[120px] sm:w-[136px] h-[20px] sm:h-[22px] rounded-full text-primary font-merriweather text-xs sm:text-sm mx-auto lg:mx-0">
                <span className="w-[5px] sm:w-[6px] h-[5px] sm:h-[6px] rounded-full bg-primary"></span>
                Our Vision
              </div>
              <p className="font-manrope font-bold text-lg sm:text-xl md:text-2xl text-black-50 mt-3 sm:mt-4 text-center lg:text-left max-w-full lg:max-w-[500px] leading-tight">
                Breaking Barriers, Creating Football Legends
              </p>
              <p className="font-lato font-normal text-sm sm:text-base text-black-50 mt-4 sm:mt-5 leading-relaxed text-center lg:text-left max-w-full lg:max-w-[480px]">
                We are revolutionizing football scouting by eliminating barriers that prevent talented players from being discovered. Our platform ensures that every aspiring footballer, regardless of background, location, or resources, has the opportunity to showcase their skills and get noticed. By leveraging advanced data-driven insights and innovative scouting solutions, we connect players with scouts and clubs that can propel their careers forward. Our vision is to create a football ecosystem where raw talent is recognized, nurtured, and transformed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <TestimonialCarousel />

      {/* Meet the Team Section - Better mobile grid */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-[106px] bg-ghostwhite">
        <div className="flex items-center gap-2 justify-center border border-black-50 w-[120px] sm:w-[136px] h-[20px] sm:h-[22px] rounded-full text-black-50 font-merriweather text-xs sm:text-sm mx-auto">
          <span className="w-[5px] sm:w-[6px] h-[5px] sm:h-[6px] rounded-full bg-black-50"></span>
          Meet the Team
        </div>

        <h2 className="font-manrope font-bold text-black-50 text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 sm:mt-6 text-center leading-tight">
          The Minds Behind the Mission
        </h2>

        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
          {[Frame14, Frame15, Frame16, Frame17].map((img, i) => (
            <div key={i} className="w-full max-w-[250px] sm:max-w-[270px]">
              <Image 
                src={img} 
                alt={`Team member ${i + 1}`} 
                className="w-full h-auto aspect-[270/370] object-cover rounded-lg sm:rounded-xl" 
              />
            </div>
          ))}
        </div>
      </div>

      <HeroSection />
      <Footer />
    </>
  );
};

export default AboutPage;