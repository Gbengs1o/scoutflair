import React from "react";
import Navbar from "../reusable/Navbar";
import Footer from "../reusable/Footer";
import Image from "next/image";
import ContactImage from "@/public/images/contact-image.png";
import { FiMail, FiPhone } from "react-icons/fi";

const ContactPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-ghostwhite pt-32 md:pt-40 md:pb-20 pb-16">
        <div className="px-6 md:px-12 lg:px-[106px] flex flex-col lg:flex-row gap-10">
          {/* Left Section - Form */}
          <div className="bg-white py-8 pr-6 pl-[24px] md:pr-[52px] rounded-[20px] w-full lg:w-1/2">
            {/* Get in touch Badge */}
            <div className="flex items-center gap-2 justify-center border border-primary-2 w-fit px-4 h-[22px] rounded-full text-primary font-merriweather text-sm">
              <span className="w-[6px] h-[6px] rounded-full bg-primary-2"></span>
              Get in touch
            </div>

            {/* Heading */}
            <h2 className="font-manrope font-bold text-black-50 text-2xl md:text-3xl my-4 w-full md:w-[500px]">
              Scouting Talent? Chasing Dreams? Let’s Talk
            </h2>

            {/* Description */}
            <p className="font-lato font-normal text-base text-black-50">
              Whether you&apos;re scouting the next big star or chasing your football dreams, we&apos;re here to help. Reach out and let&apos;s make it happen!
            </p>

            {/* Divider */}
            <hr className="border-[#D1D1D1] border-[1px] w-full my-4" />

            {/* Contact Form */}
            <form className="space-y-4">
              <div className="flex flex-col md:flex-row w-full gap-4">
                <div className="flex flex-col w-full md:w-1/2">
                  <label htmlFor="fname" className="font-lato text-black-50 text-base mb-1">
                    First Name:
                  </label>
                  <input type="text" id="fname" className="border border-primary p-3 rounded-lg w-full" />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                  <label htmlFor="lname" className="font-lato text-black-50 text-base mb-1">
                    Last Name:
                  </label>
                  <input type="text" id="lname" className="border border-primary p-3 rounded-lg w-full" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="font-lato text-black-50 text-base mb-1">
                  Email Address:
                </label>
                <input type="email" id="email" className="border border-primary p-3 rounded-lg w-full" />
              </div>
              <div>
                <label htmlFor="message" className="font-lato text-black-50 text-base mb-1">
                  Message:
                </label>
                <textarea className="border border-primary p-3 rounded-lg w-full h-32 resize-none" />
              </div>
              <div className="pt-5">
                <button className="border border-orange-50 bg-transparent text-black-50 font-poppins text-base rounded-3xl w-full h-[40px]">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Right Section - Image & Contact Info */}
          <div className="w-full lg:w-1/2">
            <Image
              src={ContactImage}
              alt="Customer support"
              className="w-full h-auto object-contain"
            />
            {/* Contact Info */}
            <div className="bg-white px-5 py-5 mt-5 rounded-[20px] shadow-md space-y-4">
              <div className="bg-[#DEDEDEB2] flex items-center gap-3 p-4 rounded-2xl">
                <div className="flex items-center justify-center bg-primary w-[50px] h-[50px] rounded-full">
                  <FiMail className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-lato font-medium text-black-50 text-base">Email Address</p>
                  <p className="font-lato font-normal text-black-50 text-sm">
                    Contact@scoutfair.com
                  </p>
                </div>
              </div>
              <div className="bg-[#DEDEDEB2] flex items-center gap-3 p-4 rounded-2xl">
                <div className="flex items-center justify-center bg-primary w-[50px] h-[50px] rounded-full">
                  <FiPhone className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-lato font-medium text-black-50 text-base">Phone Number</p>
                  <p className="font-lato font-normal text-black-50 text-sm">
                    +2348129296919
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
