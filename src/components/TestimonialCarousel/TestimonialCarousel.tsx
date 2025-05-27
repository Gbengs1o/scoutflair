"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import Image from "next/image";
import Testimonial1 from "@/public/images/testimony1.png";
import Testimonial2 from "@/public/images/testimony2.png";
import Testimonial3 from "@/public/images/Testimonial3.png";
import Testimonial4 from "@/public/images/Testimonial4.png";
import Testimonial5 from "@/public/images/Testimonial5.png";
import Testimonial6 from "@/public/images/Testimonial6.png";
import Testimonial7 from "@/public/images/Testimonial7.png";

const testimonials = [
  {
    name: "Samuel Baracunda",
    title: "Professional Scout",
    description:
      "“Scoutflair has completely changed how I discover talent. The platform connects me with skilled, underrated players I wouldn’t have found otherwise. The detailed player insights and video highlights make scouting efficient and precise.”",
    image: Testimonial2,
  },
  {
    name: "Jane Doe",
    title: "Football Analyst",
    description: "A great platform to connect with talented players...",
    image: Testimonial1,
  },
  {
    name: "John Smith",
    title: "Coach",
    description: "This tool has transformed our scouting process...",
    image: Testimonial3,
  },
  {
    name: "Emily Clarke",
    title: "Talent Manager",
    description: "The insights provided by Scoutflair are invaluable...",
    image: Testimonial4,
  },
  {
    name: "Michael Lee",
    title: "Sports Agent",
    description: "I can now track and analyze players with ease...",
    image: Testimonial5,
  },
  {
    name: "Sarah Connor",
    title: "Football Scout",
    description: "The best platform for finding the next big talent.",
    image: Testimonial6,
  },
  {
    name: "David Beckham",
    title: "Sports Analyst",
    description: "Revolutionizing scouting technology.",
    image: Testimonial7,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(3);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-ghostwhite pt-14">
      <div className="py-10 bg-primary text-center px-4 sm:px-6 md:px-10 max-w-screen-xl mx-auto">
        <div className="flex justify-center flex-col items-center">
          <h2 className="text-white font-manrope font-bold text-3xl my-3">Game-Changing Experiences</h2>
          <p className="font-lato w-full max-w-[500px] text-center text-white font-normal text-base mb-4">
            Hear firsthand from players, coaches, and scouts who turned opportunities into success with Scoutflair.
          </p>
        </div>

        {/* Carousel */}
        <div className="flex items-center mt-8 w-full sm:w-full relative overflow-hidden px-8 sm:px-[40px] md:px-[106px] mx-auto">
          <FaRegArrowAltCircleLeft className="text-white text-3xl cursor-pointer mr-2 sm:mr-4" onClick={prevSlide} />
          <div className="relative right-[30px] md:right-0 w-full flex items-center py-10 overflow-hidden md:min-h-[200px] min-h-[100px]">
            <div className="relative flex items-center w-full justify-between">
              {testimonials.map((testimonial, index) => {
                const position = (index - currentIndex + testimonials.length) % testimonials.length;
                let scale = 0.6,
                  opacity = 0.3,
                  zIndex = 1,
                  translateX = (position - 3) * 200;

                if (position === 0) {
                  scale = 1.5;
                  opacity = 1;
                  zIndex = 10;
                  translateX = 0;
                } else if (position === 2 || position === testimonials.length - 2) {
                  scale = 1.5;
                  opacity = 0.7;
                  zIndex = 5;
                } else if (position === 1 || position === testimonials.length - 1) {
                  scale = 1;
                  opacity = 0.5;
                  zIndex = 3;
                } else if (position === 3 || position === testimonials.length - 3) {
                  scale = 1.5;
                  opacity = 0.5;
                  zIndex = 3;
                }

                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0.6 }}
                    animate={{ scale, opacity, zIndex, x: translateX }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={position === 0 ? 60 : 30}
                      height={position === 0 ? 60 : 30}
                      className="rounded-full bg-primary"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
          <FaRegArrowAltCircleRight className="text-white text-3xl cursor-pointer ml-2 sm:ml-4" onClick={nextSlide} />
        </div>

        {/* Active Testimonial Info */}
        <motion.div
          key={testimonials[currentIndex].name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-center"
        >
          <h3 className="text-xl font-manrope font-medium text-white my-2">
            {testimonials[currentIndex].name}
          </h3>
          <p className="text-white font-lato text-sm font-light">
            {testimonials[currentIndex].title}
          </p>
          <p className="mt-5 mx-auto text-white font-lato text-base font-normal px-4 sm:px-0 max-w-[90%] md:max-w-[650px]">
            {testimonials[currentIndex].description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
