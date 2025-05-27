"use client";

import React, { useState } from "react";
import { MdHealthAndSafety } from "react-icons/md";

interface iInjury {
  year: number;
  cause: string;
  duration: string;
}

const History: React.FC = () => {
  const [injuries, setInjuries] = useState<iInjury[]>(
    Array(5).fill({
      year: 2023,
      cause: "Ankle sprain",
      duration: "2 months",
    }).map((item, index) => ({ // Add some variation for testing
      ...item,
      year: item.year - index,
      cause: index % 2 === 0 ? "Ankle sprain with a very long description to test wrapping capabilities" : "Knee ligament tear",
    }))
  );

  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col
                   py-3 px-4 sm:py-4 sm:px-5 gap-4 sm:gap-5"> {/* Responsive padding & gap */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-dark font-bold text-sm sm:text-base md:text-lg"> {/* Responsive font size */}
        {/* Or, if your custom class text-16-19 is already responsive: */}
        {/* <h2 className="text-dark font-bold text-16-19"> */}
          Injury History
        </h2>
        <p className="font-medium text-dark text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:underline"> {/* Responsive font size, no-wrap, interactive */}
        {/* Or, if your custom class text-14-16 is already responsive: */}
        {/* <p className="text-14-16 font-medium text-dark whitespace-nowrap cursor-pointer hover:underline"> */}
          See All
        </p>
      </div>

      <div className="flex flex-col w-full">
        {injuries.map((injury, index) => (
          <div
            key={index}
            className={`
              flex flex-col items-start gap-1 py-3
              sm:flex-row sm:items-center sm:justify-between sm:gap-4
              w-full border-border-gray
              ${index !== injuries.length - 1 ? "border-b" : ""}
            `}
          >
            {/* Left Part: Icon and Year */}
            <div className="w-fit flex items-center gap-1 sm:gap-1.5"> {/* Responsive gap */}
              <MdHealthAndSafety className="text-red-600 text-base sm:text-lg" /> {/* Responsive icon size */}
              <p className="text-dark font-semibold text-xs sm:text-sm"> {/* Responsive font size */}
              {/* Or, if your custom class text-14-16 is already responsive: */}
              {/* <p className="text-14-16 text-dark font-semibold"> */}
                {injury.year}
              </p>
            </div>

            {/* Right Part: Cause and Duration */}
            <p className="text-dark text-xs sm:text-sm w-full break-words sm:w-auto sm:text-right"> {/* Responsive font, alignment, width, and word break */}
            {/* Or, if your custom class text-14-16 is already responsive: */}
            {/* <p className="text-14-16 text-dark w-full break-words sm:w-auto sm:text-right"> */}
              <span className="font-medium">{injury.cause}:</span> He was out for {injury.duration}
            </p>
          </div>
        ))}
        {injuries.length === 0 && (
          <p className="text-center text-gray-500 py-4 text-sm">No injury history recorded.</p>
        )}
      </div>
    </div>
  );
};

export default History;