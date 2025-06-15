"use client";
import React, { useState } from "react";
import Logo from "./Logo";
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
    setError(""); // Clear error after valid submission
    setEmail(""); // Optionally reset the email field
  };

  return (
    <div className="w-full bg-primary pb-7">
      <div className="pt-7 pb-10">
        <hr className="text-ghostwhite" />
      </div>

      <div className="px-6 md:px-12 lg:px-[106px]">
        <div className="flex flex-col lg:flex-row flex-wrap gap-10 justify-between text-white pb-12">
          {/* Left column */}
          <div className="flex flex-col gap-2 font-lato font-normal text-xs max-w-sm">
            <Logo color="white" />
            <p>
              Scoutflair is a dynamic football scouting platform designed to
              bridge the gap between talent and opportunity. Talent meets
              opportunity.
            </p>
            <div>
              <p>+2348123926919</p>
              <div className="flex items-center gap-1 mt-1">
                <MdOutlineEmail />
                <span>support@scoutflair.com</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-4 flex-wrap">
              <span>Follow Us</span>
              <div className="flex items-center gap-2">
                <Link
                  href={"#"}
                  className="bg-white w-[18px] h-[18px] rounded-full flex items-center justify-center"
                >
                  <BiLogoFacebook className="text-primary" />
                </Link>
                <Link
                  href={"#"}
                  className="bg-white w-[18px] h-[18px] rounded-full flex items-center justify-center"
                >
                  <TiSocialLinkedin className="text-primary" />
                </Link>
                <Link href={"#"}>
                  <BiLogoInstagramAlt className="text-white w-[20px] h-[20px]" />
                </Link>
                <Link
                  href={"#"}
                  className="bg-white w-[16px] h-[16px] rounded-sm flex items-center justify-center"
                >
                  <BsTwitterX className="text-primary" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-merriweather font-bold text-lg text-white mb-3">
              Quick Links
            </h2>
            <div className="flex flex-col gap-3 text-white font-normal font-lato text-base">
              <Link href={"/home"}>Home</Link>
              <Link href={"/about"}>About</Link>
              <Link href={"/features"}>Features</Link>
              <Link href={"/contact"}>Contact Us</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h2 className="font-merriweather font-bold text-lg text-white mb-3">
              Resources
            </h2>
            <div className="flex flex-col gap-3 text-white font-normal font-lato text-base">
              <Link href={"#"}>F. A. Q</Link>
              <Link href={"#"}>Cookies</Link>
              <Link href={"#"}>Privacy Policy</Link>
              <Link href={"#"}>Terms & Conditions</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-sm w-full">
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
                  className="pr-12 px-4 py-2 rounded-[4px] border text-white font-lato font-medium text-xs border-white bg-transparent outline-none w-full"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 w-10 h-8 transform -translate-y-1/2 p-2 bg-white text-primary rounded-r-[4px] flex items-center justify-center"
                >
                  <IoIosSend className="w-6 h-6" />
                </button>
              </form>
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="pb-7">
        <hr className="text-ghostwhite" />
      </div>

      <div className="font-lato font-normal text-sm text-center text-white">
        © Copyright 2025, All Right Reserved. Scoutflair
      </div>
    </div>
  );
};

export default Footer;
