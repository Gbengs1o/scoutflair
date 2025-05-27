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
      <div className="bg-ghostwhite pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[106px] max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 lg:gap-10">
            {/* Left Section - Form */}
            <div className="bg-white p-4 sm:p-6 md:p-8 lg:py-8 lg:pr-6 lg:pl-6 xl:pr-[52px] xl:pl-[24px] rounded-[20px] w-full xl:w-1/2 shadow-sm">
              {/* Get in touch Badge */}
              <div className="flex items-center gap-2 justify-center border border-primary-2 w-fit px-3 sm:px-4 h-[20px] sm:h-[22px] rounded-full text-primary font-merriweather text-xs sm:text-sm mx-auto sm:mx-0">
                <span className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full bg-primary-2"></span>
                Get in touch
              </div>

              {/* Heading */}
              <h2 className="font-manrope font-bold text-black-50 text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl my-3 sm:my-4 text-center sm:text-left max-w-full xl:max-w-[500px]">
                Scouting Talent? Chasing Dreams? Let's Talk
              </h2>

              {/* Description */}
              <p className="font-lato font-normal text-sm sm:text-base text-black-50 text-center sm:text-left mb-4">
                Whether you&apos;re scouting the next big star or chasing your football dreams, we&apos;re here to help. Reach out and let&apos;s make it happen!
              </p>

              {/* Divider */}
              <hr className="border-[#D1D1D1] border-[1px] w-full my-3 sm:my-4" />

              {/* Contact Form */}
              <form className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label htmlFor="fname" className="font-lato text-black-50 text-sm sm:text-base mb-1">
                      First Name:
                    </label>
                    <input 
                      type="text" 
                      id="fname" 
                      className="border border-primary p-2 sm:p-3 rounded-lg w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label htmlFor="lname" className="font-lato text-black-50 text-sm sm:text-base mb-1">
                      Last Name:
                    </label>
                    <input 
                      type="text" 
                      id="lname" 
                      className="border border-primary p-2 sm:p-3 rounded-lg w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="font-lato text-black-50 text-sm sm:text-base mb-1 block">
                    Email Address:
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="border border-primary p-2 sm:p-3 rounded-lg w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="font-lato text-black-50 text-sm sm:text-base mb-1 block">
                    Message:
                  </label>
                  <textarea 
                    id="message"
                    className="border border-primary p-2 sm:p-3 rounded-lg w-full h-24 sm:h-32 resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                  />
                </div>
                <div className="pt-3 sm:pt-5">
                  <button 
                    type="submit"
                    className="border border-orange-50 bg-transparent text-black-50 font-poppins text-sm sm:text-base rounded-3xl w-full h-[38px] sm:h-[40px] hover:bg-orange-50 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-50 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Right Section - Image & Contact Info */}
            <div className="w-full xl:w-1/2">
              <div className="w-full mb-4 sm:mb-5">
                <Image
                  src={ContactImage}
                  alt="Customer support"
                  className="w-full h-auto object-contain rounded-lg"
                  priority
                />
              </div>
              
              {/* Contact Info */}
              <div className="bg-white px-4 sm:px-5 py-4 sm:py-5 rounded-[20px] shadow-md space-y-3 sm:space-y-4">
                <div className="bg-[#DEDEDEB2] flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl">
                  <div className="flex items-center justify-center bg-primary w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full flex-shrink-0">
                    <FiMail className="text-white text-lg sm:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-lato font-medium text-black-50 text-sm sm:text-base">Email Address</p>
                    <p className="font-lato font-normal text-black-50 text-xs sm:text-sm break-all sm:break-normal">
                      Contact@scoutfair.com
                    </p>
                  </div>
                </div>
                
                <div className="bg-[#DEDEDEB2] flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl">
                  <div className="flex items-center justify-center bg-primary w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full flex-shrink-0">
                    <FiPhone className="text-white text-lg sm:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-lato font-medium text-black-50 text-sm sm:text-base">Phone Number</p>
                    <p className="font-lato font-normal text-black-50 text-xs sm:text-sm">
                      +2348129296919
                    </p>
                  </div>
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