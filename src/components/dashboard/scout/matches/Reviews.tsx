"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Player from "@/public/dashboard/scout/Rectangle 14.png"; // Ensure path is correct

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiMiniTrophy } from "react-icons/hi2";

interface iReview {
  id: number; // Added for stable keys
  image: StaticImageData | string;
  academy: string;
  name: string;
  target: string;
  fitness: number;
  dribble: number;
  pace: number;
  composure: number;
  overall: number;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<iReview[]>(
    Array(4)
      .fill(null)
      .map((_, index) => ({
        id: index, // Use index for unique ID in this mock data
        image: Player,
        name: `Paul Attah ${index + 1}`,
        academy: "Scoutflair Academy",
        target: `${index * 5} G/A Promising`,
        fitness: 70 + index * 5,
        dribble: 65 + index * 5,
        pace: 80 + index * 2,
        composure: 60 + index * 3,
        overall: Math.floor(Math.random() * 40) + 50, // Randomize for visual variety
      }))
  );

  // Define colors (replace with your actual theme colors if they differ)
  const progressBarPathColor = "#041931"; // Example: Dark Blue/Black
  const progressBarTextColor = "#222222"; // Example: Dark Gray
  const progressBarTrailColor = "#E5E7EB"; // Example: Light Gray (Tailwind gray-200)
  const primaryColor = "#4F46E5"; // Example: Indigo (Tailwind indigo-600)
  const trophyBgColor = "#FBBF24"; // Example: Amber (Tailwind amber-400)
  const darkTextColor = "#1F2937"; // Example: Gray-800
  const placeholderTextColor = "#6B7280"; // Example: Gray-500
  const borderColor = "#E5E7EB"; // Example: Gray-200

  return (
    <div className="w-full shadow-custom rounded-xl sm:rounded-2xl py-3 sm:py-4 bg-white flex flex-col gap-4 sm:gap-6">
      <h2 className="text-dark font-bold text-base sm:text-lg md:text-xl px-4 sm:px-5" style={{color: darkTextColor}}>
        Player Reviews
      </h2>
      <div className="w-full flex flex-col">
        {reviews.map((review, i) => (
          <div
            className={`
              w-full flex flex-col md:flex-row md:items-center md:justify-between
              gap-4 
              px-4 sm:px-5 py-3 sm:py-4 
              ${i !== reviews.length - 1 ? "border-b" : ""}
            `}
            style={{borderColor: borderColor}}
            key={review.id}
          >
            {/* Section 1: Player Info */}
            <div className="flex gap-3 items-center w-full md:w-auto md:flex-shrink-0 md:max-w-xs lg:max-w-sm">
              <Image
                src={review.image}
                alt={`${review.name}'s image`}
                width={60} // Intrinsic width for Next.js Image
                height={60} // Intrinsic height for Next.js Image
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-[3.75rem] md:h-[3.75rem] object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex flex-col gap-0.5 min-w-0"> {/* min-w-0 for truncation */}
                <p className="text-xs sm:text-sm font-medium truncate" style={{color: primaryColor}}>
                  {review.academy}
                </p>
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base font-semibold truncate" style={{color: darkTextColor}}>
                    {review.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium truncate" style={{color: placeholderTextColor}}>
                    {review.target}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Stats - Wraps on smaller screens, horizontal on larger */}
            <div className="flex flex-wrap justify-start items-start gap-x-3 sm:gap-x-4 gap-y-3 md:gap-x-2 lg:gap-x-4 md:flex-nowrap md:justify-center md:items-center md:mx-auto">
              {/* Stat Item: Fitness */}
              <div className="flex flex-col gap-0.5 items-start min-w-[calc(50%-0.5rem)] sm:min-w-[calc(50%-0.75rem)] md:min-w-0">
                <h4 className="font-medium text-[10px] sm:text-xs" style={{color: placeholderTextColor}}>Fitness</h4>
                <p className="text-sm sm:text-base font-bold" style={{color: darkTextColor}}>
                  {review.fitness.toString().padStart(2, "0")}%
                </p>
                <h5 className="font-medium text-[10px] sm:text-xs" style={{color: placeholderTextColor}}>Improved</h5>
              </div>
              {/* Stat Item: Dribble */}
              <div className="flex flex-col gap-0.5 items-start min-w-[calc(50%-0.5rem)] sm:min-w-[calc(50%-0.75rem)] md:min-w-0">
                <h4 className="font-medium text-[10px] sm:text-xs" style={{color: placeholderTextColor}}>Dribble</h4>
                <p className="text-sm sm:text-base font-bold" style={{color: darkTextColor}}>
                  {review.dribble.toString().padStart(2, "0")}%
                </p>
                <h5 className="font-medium text-[10px] sm:text-xs" style={{color: placeholderTextColor}}>Good</h5>
              </div>
              {/* Stat Item: Pace */}
              <div className="flex flex-col gap-0.5 items-start min-w-[calc(50%-0.5rem)] sm:min-w-[calc(50%-0.75rem)] md:min-w-0">
                <h4 className="font-medium text-[10px] sm:text-xs" style={{color: placeholderTextColor}}>Pace</h4>
                <p className="text-sm sm:text-base font-bold" style={{color: darkTextColor}}>
                  {review.pace.toString().padStart(2, "0")}%
                </p>
                <h5 className="font-medium text-[10px] sm:text-xs" style={{color: placeholderTextColor}}>Excellent</h5>
              </div>
              {/* Stat Item: Composure */}
              <div className="flex flex-col gap-0.5 items-start min-w-[calc(50%-0.5rem)] sm:min-w-[calc(50%-0.75rem)] md:min-w-0">
                <h4 className="font-medium text-[10px] sm:text-xs" style={{color: placeholderTextColor}}>Composure</h4>
                <p className="text-sm sm:text-base font-bold" style={{color: darkTextColor}}>
                  {review.composure.toString().padStart(2, "0")}%
                </p>
                <h5 className="font-medium text-[10px] sm:text-xs" style={{color: placeholderTextColor}}>Improved</h5>
              </div>
            </div>

            {/* Section 3: Overall Progress & Trophy */}
            <div className="flex items-center justify-start md:justify-end gap-3 sm:gap-4 flex-shrink-0 mt-3 md:mt-0">
              <div
                className="w-10 h-10" // Consistent size for progress bar
              >
                <CircularProgressbar
                  value={review.overall}
                  text={`${review.overall}%`}
                  strokeWidth={12}
                  styles={buildStyles({
                    rotation: 0.5,
                    strokeLinecap: "round",
                    textSize: "22px", // Adjusted for 40x40px container
                    pathTransitionDuration: 0.5,
                    pathColor: progressBarPathColor,
                    textColor: progressBarTextColor,
                    trailColor: progressBarTrailColor,
                  })}
                />
              </div>
              <div className="grid place-content-center w-10 h-10 rounded-full text-dark" style={{backgroundColor: trophyBgColor}}>
                <HiMiniTrophy className="text-lg sm:text-xl" /> {/* Responsive Icon Size */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;