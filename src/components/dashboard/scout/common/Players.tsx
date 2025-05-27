"use client";

import React from "react"; // Removed useState as ratings was unused
import Image from "next/image";
import { RiMedalLine } from "react-icons/ri"; // FaStar was unused
import { useGetScoutPlayerMetrics } from "@/hooks/scout";
import { Loader } from "@mantine/core";

const Players = () => {
  const { loading, data, success } = useGetScoutPlayerMetrics();
  // const [ratings, setRatings] = useState<number>(4); // This was unused

  // Define max avatars to show before showing a "+N"
  const MAX_AVATARS_VISIBLE = 5;

  return (
    <div className="w-full h-full shadow-custom rounded-[1rem] p-3 sm:p-4 md:px-5 md:py-4 bg-white flex flex-col justify-between gap-4">
      {/* 
        Added gap-4 to the main container for consistent spacing between header and content.
        Adjusted padding: p-3 for smallest, sm:p-4, md:px-5 md:py-4 for larger.
      */}
      {!loading && data && success && ( // Added check for data and success
        <>
          {/* Header: Title and Icon */}
          <div className="w-full justify-between items-center flex">
            <h2 className="text-dark font-bold text-sm sm:text-16-19"> {/* Responsive title font */}
              Total Players Scouted
            </h2>
            <RiMedalLine className="text-dark text-xl sm:text-2xl" /> {/* Responsive icon size */}
          </div>

          {/* Main Content: Avatars and Stats */}
          <div className="
            flex flex-col items-center gap-4   родственники /* Mobile: Stack vertically, center items, add gap */
            md:flex-row md:justify-between md:items-end md:gap-2 /* MD and up: Row, space between, align to bottom, smaller gap */
            w-full
          ">
            {/* Player Avatars Section */}
            <div className="flex flex-wrap justify-center md:justify-start -space-x-2"> {/* Negative margin for overlap, md:justify-start */}
              {data.imageUrls.slice(0, MAX_AVATARS_VISIBLE).map((playerUrl, index) =>
                playerUrl === "" || !playerUrl ? ( // Handle empty or nullish URLs
                  <div
                    key={`placeholder-${index}`}
                    className="size-7 sm:size-8 rounded-full bg-primary-2 border-2 border-white"
                  />
                ) : (
                  <Image
                    src={playerUrl}
                    key={`player-${index}`}
                    alt={`player ${index + 1}`}
                    width={32} // Intrinsic width, display controlled by className
                    height={32} // Intrinsic height
                    className="size-7 sm:size-8 rounded-full object-cover border-2 border-white" // Responsive size
                  />
                )
              )}
              {data.imageUrls.length > MAX_AVATARS_VISIBLE && (
                <div className="size-7 sm:size-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700 font-medium border-2 border-white">
                  +{data.imageUrls.length - MAX_AVATARS_VISIBLE}
                </div>
              )}
               {data.imageUrls.length === 0 && ( // Handle case with no images
                <div className="text-xs text-placeholder">No players to show</div>
              )}
            </div>

            {/* Stats Section */}
            <div className="flex flex-col items-center text-center md:items-end md:text-right"> {/* Centered on mobile, right-aligned on MD+ */}
              <h1 className="text-primary-2 font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-48-57"> {/* Responsive font size for the number */}
                {/* Ensure playerScoutedNumber is a number or provide fallback */}
                {typeof data.playerScoutedNumber === 'number' ? data.playerScoutedNumber.toString().padStart(2, "0") : "00"}
              </h1>
              <p className="text-xs sm:text-12-14 text-placeholder font-medium">
                Players Scouted
              </p>
            </div>
          </div>
        </>
      )}

      {/* Loading State */}
      {loading && (
        <div className="w-full h-full flex-grow grid place-content-center"> {/* flex-grow to take available space */}
          <Loader color="primary.6" />
        </div>
      )}

      {/* Error or No Data State (if success is false but not loading) */}
      {!loading && (!data || !success) && (
         <div className="w-full h-full flex-grow flex flex-col justify-center items-center text-placeholder">
          <RiMedalLine className="text-4xl mb-2" />
          <p>Player data not available.</p>
        </div>
      )}
    </div>
  );
};

export default Players;