"use client";

import React from "react";

interface iBadge {
  label: string;
  sub: string;
  value: number;
  color: string;
}

const Badges: React.FC = () => {
  const badges: iBadge[] = [
    {
      label: "Trophies",
      value: 0,
      sub: "Professional",
      color: "#222222", // text-dark equivalent
    },
    {
      label: "Top Scorer",
      value: 0,
      sub: "Successful",
      color: "#222222",
    },
    {
      label: "Awards",
      value: 0,
      sub: "Scouting",
      color: "#222222",
    },
  ];

  // Note: text-4-4 is extremely small (4px). Assuming this was a placeholder or typo.
  // I've changed it to a more readable small size like text-[10px] or text-xs.
  // Similarly, text-32-38 is very large. It's scaled down significantly for mobile.

  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col
                   py-3 px-3 sm:py-4 sm:px-4 md:px-5 gap-3 sm:gap-4"> {/* Responsive padding & gap, removed fixed height */}
      <h2 className="text-dark font-bold text-sm sm:text-base md:text-lg"> {/* Responsive font size */}
      {/* Or, if your custom class text-16-19 is already responsive: */}
      {/* <h2 className="text-dark font-bold text-16-19"> */}
        Performance Badges
      </h2>
      <div className="w-full grid grid-cols-3 gap-2 sm:gap-3 md:gap-4"> {/* Responsive gap, removed fixed height */}
        {badges.map((badge, index) => (
          <div
            key={index}
            className="w-full p-2 sm:p-2.5 rounded-lg text-dark flex flex-col justify-between items-center text-center bg-white shadow-custom-1 aspect-[3/4] sm:aspect-auto min-h-[7rem] sm:min-h-[8rem]"
            // Added aspect ratio for very small screens to give some height, and min-height
            // items-center & text-center for better alignment in smaller spaces
          >
            <h4 className="font-semibold text-[10px] leading-tight sm:text-xs"> {/* Responsive font size & line-height */}
            {/* Or, if your custom class text-10-12 is already responsive: */}
            {/* <h4 className="text-10-12 font-semibold"> */}
              {badge.label}
            </h4>
            {/* Value needs to be significantly smaller on mobile */}
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-dark/90 my-1"> {/* Responsive font size, text-dark/90 for opacity */}
            {/* Or, if your custom class text-32-38 implies a responsive range: */}
            {/* <h1 className="text-32-38 font-bold text-opacity-[0.88]"> */}
              {badge.value.toString().padStart(2, "0")}
            </h1>
            <h4
              className="font-semibold text-[9px] leading-tight sm:text-[10px]" /* Readable small font, responsive */
              style={{ color: badge.color }}
            >
            {/* Or, if your custom class text-4-4 implies a responsive range (unlikely for 4px): */}
            {/* <h4 className="text-4-4 font-semibold" style={{ color: badge.color }}> */}
              {badge.sub}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;