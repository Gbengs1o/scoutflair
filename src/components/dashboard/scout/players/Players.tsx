"use client";

import React from "react";
import PlayerCard from "./PlayerCard";
// IoSearchOutline and TbColorFilter are not used in the current JSX.
// If needed for search/filter, they would be part of additional UI.
// import { IoSearchOutline } from "react-icons/io5";
// import { TbColorFilter } from "react-icons/tb";
import { useGetPlayers } from "@/hooks/scout"; // Assuming this hook is correctly set up
import { Loader } from "@mantine/core";
import Image from "next/image";
import Void from "@/public/images/Void.png"; // Make sure this path is correct

const Players = () => {
  const { data, loading, error } = useGetPlayers(); // Assuming your hook also returns an error state

  // Responsive text for "Available Players" heading (Original: text-16-19)
  const titleTextClasses = "text-base sm:text-lg font-bold text-dark";

  // Responsive text for empty state message (Original: text-16-19)
  const emptyStateTextClasses = "text-sm sm:text-base font-medium text-dark text-center px-4";

  // Placeholder min-height for loading/empty states
  const placeholderMinHeightClasses = "min-h-[15rem] sm:min-h-[20rem] md:min-h-[25rem]";

  // Handle Error State
  if (error) {
    return (
      <div className={`w-full flex flex-col items-center justify-center gap-4 p-3 sm:p-4 md:p-6 ${placeholderMinHeightClasses}`}>
        <Image
          src={Void} // Or a specific error image
          alt="Error loading players"
          width={100}
          height={100}
          className="w-24 h-auto object-contain sm:w-32 md:w-36 opacity-70"
        />
        <h2 className={emptyStateTextClasses}>
          Oops! Something went wrong while fetching players.
        </h2>
        <p className="text-xs text-gray-500 text-center px-4">
          Please try refreshing the page or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col 
                   gap-3 p-3 
                   sm:gap-4 sm:p-4 
                   md:p-6 md:gap-4"> {/* Responsive overall padding and gap */}
      
      <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col 
                     px-3 py-3 gap-3
                     sm:px-4 sm:py-4 sm:gap-4
                     md:px-5 md:py-4 md:gap-5"> {/* Responsive inner padding and gap */}
        
        <h2 className={titleTextClasses}>Available Players</h2>

        {/* Optional: Placeholder for Search/Filter Bar if you plan to add it
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <input type="search" placeholder="Search players..." className="border p-2 rounded-md w-full sm:w-1/2 lg:w-1/3" />
          <button className="p-2 border rounded-md bg-gray-100">Filter</button>
        </div>
        */}

        {loading && (
          <div className={`w-full grid place-content-center ${placeholderMinHeightClasses}`}>
            <Loader color="primary" /> {/* Using a general primary color */}
          </div>
        )}

        {!loading && data && data.length > 0 && (
          <div className="w-full grid gap-3
                         grid-cols-1 
                         sm:grid-cols-2 sm:gap-4
                         md:grid-cols-2 
                         lg:grid-cols-3 
                         xl:grid-cols-4"> {/* Responsive grid columns and gap */}
            {data.map((player) => (
              // Use a more stable key if available, like player.id or player.email
              <PlayerCard key={player.id || player.email} player={player} />
            ))}
          </div>
        )}

        {!loading && (!data || data.length === 0) && (
          <div className={`w-full flex flex-col justify-center items-center gap-4 sm:gap-5 ${placeholderMinHeightClasses}`}>
            <Image
              src={Void}
              alt="No players available"
              width={100} // Next.js Image optimization: base width
              height={100}// Next.js Image optimization: base height
              className="w-24 h-auto object-contain 
                         sm:w-32 
                         md:w-36 opacity-80" // Responsive image size
            />
            <h2 className={emptyStateTextClasses}>
              There are no players available at the moment.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;