"use client";
import React, { useState } from "react";
import Logo from "./Logo"; // Assuming Logo component is correctly implemented
import { MdOutlineEmail } from "react-icons/md";
import { BiLogoFacebook, BiLogoInstagramAlt } from "react-icons/bi";
import { TiSocialLinkedin } from "react-icons/ti";
import { BsTwitterX } from "react-icons/bs";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    // Handle successful submission (e.g., send email to backend)
    console.log("Email submitted:", email);
    setError(""); // Clear error after valid submission
    setEmail(""); // Optionally reset the email field
  };

  return (
    <div className="w-full bg-primary pb-7">
      <div className="pt-7 pb-10">
        {/* Improved HR styling */}
        <hr className="border-t border-white/30" />
      </div>

      {/* Responsive padding for the main content area */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-[106px]">
        {/* Responsive flex layout for columns */}
        <div className="flex flex-col lg:flex-row flex-wrap gap-y-10 lg:gap-x-8 justify-between text-white pb-12">
          {/* Left column: Takes full width on mobile, auto width on lg up to max-w-sm */}
          <div className="w-full lg:w-auto lg:max-w-sm flex flex-col gap-3 font-lato font-normal">
            <Logo color="white" />
            {/* Increased text size for better readability */}
            <p className="text-sm">
              Scoutflair is a dynamic football scouting platform designed to
              bridge the gap between talent and opportunity. Talent meets
              opportunity.
            </p>
            <div className="text-xs"> {/* Kept contact details text-xs */}
              <p>+2348123926919</p>
              <div className="flex items-center gap-1 mt-1">
                <MdOutlineEmail />
                <span>support@scoutflair.com</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 sm:gap-4 flex-wrap"> {/* Responsive gap */}
              <span className="text-sm">Follow Us</span> {/* Adjusted text size to match paragraph */}
              <div className="flex items-center gap-2">
                <Link
                  href={"#"}
                  className="bg-white w-[18px] h-[18px] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <BiLogoFacebook className="text-primary" />
                </Link>
                <Link
                  href={"#"}
                  className="bg-white w-[18px] h-[18px] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <TiSocialLinkedin className="text-primary" />
                </Link>
                <Link href={"#"} className="hover:opacity-80 transition-opacity">
                  <BiLogoInstagramAlt className="text-white w-[20px] h-[20px]" />
                </Link>
                <Link
                  href={"#"}
                  className="bg-white w-[16px] h-[16px] rounded-sm flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <BsTwitterX className="text-primary" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links: Takes full width on mobile, auto width on lg */}
          <div className="w-full lg:w-auto">
            <h2 className="font-merriweather font-bold text-lg text-white mb-3">
              Quick Links
            </h2>
            <div className="flex flex-col gap-3 text-white font-normal font-lato text-base">
              <Link href={"/home"} className="hover:text-gray-300 transition-colors">Home</Link>
              <Link href={"/about"} className="hover:text-gray-300 transition-colors">About</Link>
              <Link href={"/features"} className="hover:text-gray-300 transition-colors">Features</Link>
              <Link href={"/contact"} className="hover:text-gray-300 transition-colors">Contact Us</Link>
            </div>
          </div>

          {/* Resources: Takes full width on mobile, auto width on lg */}
          <div className="w-full lg:w-auto">
            <h2 className="font-merriweather font-bold text-lg text-white mb-3">
              Resources
            </h2>
            <div className="flex flex-col gap-3 text-white font-normal font-lato text-base">
              <Link href={"#"} className="hover:text-gray-300 transition-colors">F. A. Q</Link>
              <Link href={"#"} className="hover:text-gray-300 transition-colors">Cookies</Link>
              <Link href={"#"} className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <Link href={"#"} className="hover:text-gray-300 transition-colors">Terms & Conditions</Link>
            </div>
          </div>

          {/* Newsletter: Takes full width on mobile, auto width on lg up to max-w-sm */}
          <div className="w-full lg:w-auto lg:max-w-sm">
            <h2 className="font-merriweather font-bold text-lg text-white mb-3">
              Get Exclusive Updates
            </h2>
            <div className="flex flex-col gap-3 text-white font-normal font-lato text-base">
              <p>
                Join our newsletter for the latest scouting opportunities,
                highlights, and expert insights.
              </p>

              <form onSubmit={handleSubmit} className="relative w-full mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  // Adjusted padding, text size, and added placeholder color
                  className="pl-4 pr-12 md:pr-14 py-3 rounded-[4px] border text-white font-lato font-medium text-sm border-white bg-transparent outline-none w-full placeholder-gray-300 focus:border-gray-300 transition-colors"
                />
                <button
                  type="submit"
                  // Button now takes full height of the relative parent, adjusted padding
                  className="absolute right-0 top-0 bottom-0 px-3 bg-white text-primary rounded-r-[4px] flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  {/* Slightly responsive icon */}
                  <IoIosSend className="w-5 h-5 sm:w-6 sm-h-6" />
                </button>
              </form>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="pb-7">
        {/* Improved HR styling */}
        <hr className="border-t border-white/30" />
      </div>

      <div className="font-lato font-normal text-sm text-center text-white">
        © Copyright 2025, All Right Reserved. Scoutflair
      </div>
    </div>
  );
};

export default Footer;