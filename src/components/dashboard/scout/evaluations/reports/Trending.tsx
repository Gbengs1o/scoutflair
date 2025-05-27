"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import Pic from "@/public/dashboard/scout/ellipse-2373.png"; // Player image
import Nig from "@/public/dashboard/scout/twemoji_flag-nigeria.png"; // Nationality flag

import { AiOutlineThunderbolt } from "react-icons/ai";

interface iPlayerInfo {
  nationality: string | StaticImageData;
  image: string | StaticImageData;
  firstName: string;
  lastName: string;
  position: string;
  age: number;
  detail: string;
}

const Trending: React.FC = () => {
  const [trending, setTrending] = useState<iPlayerInfo>({
    nationality: Nig,
    image: Pic,
    firstName: "Adams",
    lastName: "Taylor",
    position: "Midfielder",
    age: 23,
    detail: "77 G/A (2022/2023)",
  });

  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col
                   py-3 px-4 sm:py-4 sm:px-5 gap-3 sm:gap-4"> {/* Responsive padding & gap */}
      <h2 className="text-dark font-bold text-sm sm:text-base md:text-lg"> {/* Responsive font size */}
      {/* Or, if your custom class text-16-19 is already responsive: */}
      {/* <h2 className="text-dark font-bold text-16-19"> */}
        Trending
      </h2>

      <div className="flex flex-col w-full items-center gap-3 sm:gap-4"> {/* Responsive gap */}
        {/* Player Image */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden"> {/* Responsive container */}
          <Image
            src={trending.image}
            alt={`${trending.firstName} ${trending.lastName} - trending player`}
            layout="fill" // Fill the responsive parent
            objectFit="cover" // Crop to fill, maintaining aspect ratio
            // For layout="fill", width/height props are for intrinsic size/placeholder, not display size
            // e.g. width={200} height={200} if that's the source image's typical size
            sizes="(max-width: 640px) 4rem, (max-width: 768px) 5rem, 6rem" // Helps Next.js optimize
          />
        </div>

        {/* Name, Age, Nationality */}
        <div className="flex flex-col items-center gap-1 sm:gap-1.5">
          <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2"> {/* Allow wrapping, responsive gap */}
            <p className="font-bold text-dark text-center text-sm sm:text-base md:text-lg"> {/* Responsive font size */}
              {trending.firstName} {trending.lastName}, {trending.age}
            </p>
            <div className="relative w-4 h-4 sm:w-5 sm:h-5"> {/* Responsive container for flag */}
              <Image
                src={trending.nationality}
                alt={`${trending.firstName} ${trending.lastName}'s nationality`}
                layout="fill"
                objectFit="contain" // Or "cover" if you prefer
                className="rounded-sm" // Slight rounding for flag
              />
            </div>
          </div>
          {/* Position */}
          <p className="font-semibold text-dark text-xs sm:text-sm"> {/* Responsive font size */}
            {trending.position}
          </p>
        </div>

        {/* Detail (G/A) */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <AiOutlineThunderbolt className="text-secondary-3 text-base sm:text-lg md:text-xl" /> {/* Responsive icon size */}
          <p className="text-dark text-xs sm:text-sm"> {/* Responsive font size */}
            {trending.detail}
          </p>
        </div>

        {/* View Report Button */}
        <button className="border border-secondary-3 rounded-full font-medium text-dark
                           px-3 py-1 text-[10px]
                           sm:px-4 sm:py-1.5 sm:text-xs
                           hover:bg-secondary-3 hover:text-white transition-colors duration-150"> {/* Responsive padding & font, hover effect */}
          View Report
        </button>
      </div>
    </div>
  );
};

export default Trending;