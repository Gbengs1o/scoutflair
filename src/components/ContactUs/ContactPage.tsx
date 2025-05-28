import React from "react";
import Navbar from "../reusable/Navbar";
import Footer from "../reusable/Footer";
import Image from "next/image";
import ContactImage from "@/public/images/contact-image.png";
import { FiMail, FiPhone } from "react-icons/fi";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Added more top padding to account for fixed navbar */}
      <div className="bg-ghostwhite pt-24 sm:pt-28 md:pt-36 lg:pt-44 pb-12 sm:pb-16 md:pb-20">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[106px] max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
            {/* Left Section - Form */}
            <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 xl:py-10 xl:pr-12 xl:pl-8 rounded-[20px] w-full xl:w-1/2 shadow-lg">
              {/* Get in touch Badge */}
              <div className="flex items-center gap-2 justify-center xl:justify-start border border-primary-2 w-fit px-3 sm:px-4 h-[22px] sm:h-[24px] rounded-full text-primary font-merriweather text-xs sm:text-sm mx-auto xl:mx-0">
                <span className="w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full bg-primary-2"></span>
                Get in touch
              </div>

              {/* Heading */}
              <h2 className="font-manrope font-bold text-black-50 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-3xl my-4 sm:my-5 md:my-6 text-center xl:text-left max-w-full xl:max-w-[520px] leading-tight">
                Scouting Talent? Chasing Dreams? Let's Talk
              </h2>

              {/* Description */}
              <p className="font-lato font-normal text-sm sm:text-base md:text-lg text-black-50 text-center xl:text-left mb-5 sm:mb-6 leading-relaxed">
                Whether you&apos;re scouting the next big star or chasing your football dreams, we&apos;re here to help. Reach out and let&apos;s make it happen!
              </p>

              {/* Divider */}
              <hr className="border-[#D1D1D1] border-[1px] w-full my-4 sm:my-5" />

              {/* Contact Form */}
              <form className="space-y-4 sm:space-y-5">
                <div className="flex flex-col sm:flex-row w-full gap-4">
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label htmlFor="fname" className="font-lato text-black-50 text-sm sm:text-base font-medium mb-2">
                      First Name:
                    </label>
                    <input 
                      type="text" 
                      id="fname" 
                      className="border border-primary p-3 sm:p-4 rounded-lg w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" 
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label htmlFor="lname" className="font-lato text-black-50 text-sm sm:text-base font-medium mb-2">
                      Last Name:
                    </label>
                    <input 
                      type="text" 
                      id="lname" 
                      className="border border-primary p-3 sm:p-4 rounded-lg w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" 
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="font-lato text-black-50 text-sm sm:text-base font-medium mb-2 block">
                    Email Address:
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="border border-primary p-3 sm:p-4 rounded-lg w-full text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" 
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="font-lato text-black-50 text-sm sm:text-base font-medium mb-2 block">
                    Message:
                  </label>
                  <textarea 
                    id="message"
                    className="border border-primary p-3 sm:p-4 rounded-lg w-full h-28 sm:h-32 md:h-36 resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white" 
                    placeholder="Tell us about your goals or requirements..."
                  />
                </div>
                <div className="pt-4 sm:pt-6">
                  <button 
                    type="submit"
                    className="border border-orange-50 bg-transparent text-black-50 font-poppins text-sm sm:text-base font-medium rounded-3xl w-full h-[42px] sm:h-[46px] md:h-[50px] hover:bg-orange-50 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-50 focus:ring-offset-2 active:transform active:scale-[0.98]"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Right Section - Image & Contact Info */}
            <div className="w-full xl:w-1/2">
              <div className="w-full mb-5 sm:mb-6">
                <Image
                  src={ContactImage}
                  alt="Customer support representative ready to help with football scouting and talent development"
                  className="w-full h-auto object-contain rounded-lg shadow-md"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 50vw"
                />
              </div>
              
              {/* Contact Info */}
              <div className="bg-white px-5 sm:px-6 py-5 sm:py-6 rounded-[20px] shadow-lg space-y-4 sm:space-y-5">
                <div className="bg-[#DEDEDEB2] flex items-center gap-4 p-4 sm:p-5 rounded-2xl hover:bg-[#D0D0D0B2] transition-colors duration-200">
                  <div className="flex items-center justify-center bg-primary w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] rounded-full flex-shrink-0 shadow-md">
                    <FiMail className="text-white text-lg sm:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-lato font-semibold text-black-50 text-sm sm:text-base mb-1">Email Address</p>
                    <a 
                      href="mailto:Contact@scoutfair.com"
                      className="font-lato font-normal text-black-50 text-xs sm:text-sm hover:text-primary transition-colors duration-200 break-all sm:break-normal"
                    >
                      Contact@scoutfair.com
                    </a>
                  </div>
                </div>
                
                <div className="bg-[#DEDEDEB2] flex items-center gap-4 p-4 sm:p-5 rounded-2xl hover:bg-[#D0D0D0B2] transition-colors duration-200">
                  <div className="flex items-center justify-center bg-primary w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] rounded-full flex-shrink-0 shadow-md">
                    <FiPhone className="text-white text-lg sm:text-xl" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-lato font-semibold text-black-50 text-sm sm:text-base mb-1">Phone Number</p>
                    <a 
                      href="tel:+2348129296919"
                      className="font-lato font-normal text-black-50 text-xs sm:text-sm hover:text-primary transition-colors duration-200"
                    >
                      +234 812 929 6919
                    </a>
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