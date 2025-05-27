"use client";

import React from "react";
import PlayerCard from "./PlayerCard"; // Assuming PlayerCard is already responsive
import { IoPeopleOutline } from "react-icons/io5";
import { useGetScoutsPlayers } from "@/hooks/scout";
import { Loader } from "@mantine/core";
import Image from "next/image";
import Void from "@/public/images/Void.png";

const AllPlayers: React.FC = () => {
  const { data, loading, error } = useGetScoutsPlayers(); // Assuming error state might be available

  // Font size translations (examples, adjust if your custom classes are already responsive)
  // text-16-19 -> text-sm sm:text-base md:text-lg (Title)
  // text-10-12 -> text-[10px] sm:text-xs (Filter button)
  // text-12-14 -> text-xs sm:text-sm (Empty state message)

  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col
                   py-3 px-3 sm:py-4 sm:px-4 md:px-5 gap-4 sm:gap-5"> {/* Responsive padding & main gap */}
      {/* Header: Title and Filter Button */}
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-1.5 sm:gap-2 items-center text-dark"> {/* Responsive gap */}
          <IoPeopleOutline className="text-lg sm:text-xl md:text-2xl" /> {/* Responsive icon size */}
          <h2 className="font-bold text-sm sm:text-base md:text-lg"> {/* Responsive title font */}
            All Players
          </h2>
        </div>
        <button className="text-primary-2 border border-primary-2 rounded-md
                           font-bold cursor-pointer
                           px-2.5 py-1 text-[10px]
                           sm:px-3 sm:py-1.5 sm:text-xs
                           hover:bg-primary-2 hover:text-white transition-colors"> {/* Responsive filter button */}
          Filter
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="w-full flex justify-center items-center py-10 sm:py-16 md:py-20 min-h-[20rem]"> {/* Flexible height and padding */}
          <Loader color="primary.6" size="lg" />
        </div>
      )}

      {/* Error State (Optional but good practice) */}
      {!loading && error && (
        <div className="w-full flex flex-col justify-center items-center text-center py-10 sm:py-16 md:py-20 min-h-[20rem] gap-3">
          <Image
            src={Void} // You might want a different "error" image
            alt="Error loading players"
            width={80} // Smaller for error indicator
            height={80}
            className="w-20 h-auto object-contain opacity-70"
          />
          <h2 className="text-dark text-sm sm:text-base font-medium">
            Could not load players
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            {error.message || "An unexpected error occurred. Please try again later."}
          </p>
          {/* Optionally, add a retry button here */}
        </div>
      )}


      {/* Player Cards Grid - Only show if not loading, no error, and data exists */}
      {!loading && !error && data && data.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6"> {/* Responsive columns & gap */}
          {data.map((player, i) => (
            <PlayerCard key={player.id || i} player={player} /> // Use a stable key like player.id if available
          ))}
        </div>
      )}

      {/* Empty State - Only show if not loading, no error, and data is empty */}
      {!loading && !error && data && data.length === 0 && (
        <div className="w-full flex flex-col justify-center items-center text-center
                       py-10 sm:py-16 md:py-20 min-h-[20rem] gap-4 sm:gap-5"> {/* Flexible height, responsive gap & padding */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"> {/* Responsive container for image */}
            <Image
              src={Void}
              alt="No players available"
              layout="fill"
              objectFit="contain" // or "cover"
            />
          </div>
          <h2 className="text-dark font-medium text-xs sm:text-sm md:text-base"> {/* Responsive text */}
            There are no players available at the moment
          </h2>
        </div>
      )}
    </div>
  );
};

export default AllPlayers;