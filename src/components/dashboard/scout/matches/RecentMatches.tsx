"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Void from "@/public/images/Void.png"; // Ensure this path is correct
import CupImage from "@/public/dashboard/scout/Ellipse 2381.png"; // Ensure this path is correct

import { FaStar } from "react-icons/fa";
import { useGetPreviousMatches, iPreviousMatch } from "@/hooks/match"; // Assuming iPreviousMatch is exported

import { Loader } from "@mantine/core";

interface iCupInfo {
  image: StaticImageData | string;
  name: string;
  type: string;
}

const RecentMatches = () => {
  const [cupInfo, setCupInfo] = useState<iCupInfo>({
    image: CupImage,
    name: "Fayomi's Cup",
    type: "Local Championship",
  });

  const { loading, data, success } = useGetPreviousMatches();
  const previousMatchesData = data || []; // Ensure data is always an array

  return (
    <div className="w-full shadow-custom rounded-xl sm:rounded-2xl py-3 sm:py-4 bg-white flex flex-col gap-3 sm:gap-4">
      {/* Header Section */}
      <div className="px-4 sm:px-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        <h2 className="text-dark font-bold text-base sm:text-lg md:text-16-19"> {/* Responsive Text */}
          Recent Matches
        </h2>
        {!loading && previousMatchesData.length > 0 && (
          <div className="flex w-full sm:w-fit justify-between items-center">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Image
                src={cupInfo.image}
                alt="cup image"
                width={32} // Base size
                height={32}
                className="w-7 h-7 sm:w-8 sm:h-8 md:size-9 rounded-full object-cover" // Responsive size
              />
              <div className="flex flex-col">
                <h3 className="font-semibold text-xs sm:text-sm md:text-10-12 text-dark truncate"> {/* Responsive Text & Truncate */}
                  {cupInfo.name}
                </h3>
                <p className="text-[10px] sm:text-xs md:text-8-9 text-placeholder"> {/* Responsive Text */}
                  {cupInfo.type}
                </p>
              </div>
            </div>
            {/* "View All" can be hidden on very small screens or styled differently if needed */}
            <a href="#" className="text-xs sm:text-sm md:text-10-12 text-primary-600 hover:text-primary-700 whitespace-nowrap ml-2 sm:ml-0"> {/* Assuming primary color */}
              View All
            </a>
          </div>
        )}
      </div>


      {/* Matches List */}
      {!loading && previousMatchesData.length > 0 && (
        <div className="flex flex-col w-full border-t border-border-gray">
          {previousMatchesData.map((rc: iPreviousMatch, i: number) => (
            <div
              key={rc.id || i} // Prefer a stable ID like rc.id if available
              className={`w-full flex items-center px-3 sm:px-5 py-2.5 sm:py-3 gap-2 sm:gap-3 ${
                i !== previousMatchesData.length - 1 ? "border-b border-border-gray" : ""
              }`}
            >
              {/* Column 1: Star & FT - Fixed width, shrinks last */}
              <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                <FaStar className="text-xs sm:text-sm md:text-12-14 text-secondary-3" /> {/* Responsive Icon Size */}
                <h3 className="text-xs sm:text-sm md:text-14-16 text-placeholder font-medium">FT</h3>
              </div>

              {/* Column 2: Home Team - Flexible width, takes up space, truncates */}
              <div className="flex items-center gap-1 sm:gap-1.5 flex-1 min-w-0"> {/* flex-1 and min-w-0 are key */}
                <Image
                  src={rc.homeTeamLogoUrl || Void} // Fallback image
                  alt={`${rc.homeTeam} logo`}
                  className="size-4 sm:size-5 rounded-full object-cover flex-shrink-0"
                  width={20} // Next.js Image width/height should be intrinsic or desired display
                  height={20}
                />
                <h3 className="text-xs sm:text-sm md:text-14-16 text-dark truncate"> {/* Responsive Text & Truncate */}
                  {rc.homeTeam}
                </h3>
              </div>

              {/* Column 3: Score - Fixed width, shrinks last */}
              <div className="px-2 sm:px-3 py-0.5 sm:py-1 text-dark rounded-md sm:rounded-lg bg-[#B1D4E0] text-[10px] sm:text-xs md:text-10-12 font-semibold flex-shrink-0 whitespace-nowrap">
                {rc.homeTeamScore ?? 0} : {rc.awayTeamScore ?? 0}
              </div>

              {/* Column 4: Away Team - Flexible width, takes up space, truncates, justifies content to end */}
              <div className="flex items-center justify-end gap-1 sm:gap-1.5 flex-1 min-w-0"> {/* flex-1 and min-w-0 are key */}
                <h3 className="text-xs sm:text-sm md:text-14-16 text-dark truncate text-right"> {/* Responsive Text & Truncate */}
                  {rc.awayTeam}
                </h3>
                <Image
                  src={rc.awayTeamLogoUrl || Void} // Fallback image
                  alt={`${rc.awayTeam} logo`}
                  className="size-4 sm:size-5 rounded-full object-cover flex-shrink-0"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="w-full h-40 flex items-center justify-center">
          <Loader color="primary.6" /> {/* Ensure primary.6 is defined in Mantine theme or Tailwind */}
        </div>
      )}

      {/* Empty State */}
      {!loading && previousMatchesData.length === 0 && (
        <div className="w-full flex flex-col justify-center items-center gap-4 sm:gap-5 py-10 sm:my-16 px-4">
          <Image
            src={Void}
            alt="no matches"
            width={80} // Base size
            height={80}
            className="w-20 h-auto sm:w-24 md:w-32 object-contain" // Responsive size
          />
          <h2 className="text-dark text-xs sm:text-sm md:text-10-12 font-medium text-center">
            There are no recent matches yet
          </h2>
        </div>
      )}
    </div>
  );
};

export default RecentMatches;