"use client";

import React from "react";
import Image from "next/image";
import { GiSwordsEmblem } from "react-icons/gi";
import { useGetScoutPlayerProspects } from "@/hooks/scout";
import { Loader } from "@mantine/core";

const Prospects = () => {
  const { loading, data } = useGetScoutPlayerProspects();

  return (
    <div className="w-full h-full shadow-custom rounded-[1rem] 
                   p-3 sm:p-4 md:py-4 md:px-5 
                   bg-white flex flex-col 
                   gap-3 sm:gap-4"> {/* Adjusted padding and added gap */}
      
      {/* Loading State */}
      {loading && (
        <div className="w-full h-full flex-grow grid place-content-center"> {/* Added flex-grow */}
          <Loader color="primary.6" />
        </div>
      )}

      {/* Content when not loading and data is available */}
      {!loading && data && (
        <>
          {/* Header */}
          <div className="w-full justify-between items-center flex">
            <h2 className="text-dark font-bold text-sm sm:text-base md:text-16-19"> {/* Responsive font size */}
              Top Prospects
            </h2>
            <GiSwordsEmblem className="text-dark text-xl sm:text-2xl" /> {/* Responsive icon size */}
          </div>

          {/* Prospects Grid or Empty State */}
          {data.length > 0 ? (
            <div className="w-full grid grid-cols-1 gap-3 
                            xs:grid-cols-2 
                            md:grid-cols-3 md:gap-4"> {/* Responsive grid and gap */}
              {data.map((prospect, index) => (
                <div
                  key={index}
                  className="w-full relative flex flex-col bg-[#FFFAFA] pb-1 rounded-xl h-[4.5rem] sm:h-[4rem] text-dark items-center justify-end pt-6" 
                  // Slightly increased height on smallest screens, added pt-6 for image space
                >
                  <Image
                    src={prospect.playerImageUrl || "/images/default-player.png"} // Added fallback image
                    alt={prospect.playerFullName || "Player"}
                    width={44} // Intrinsic width
                    height={40} // Intrinsic height
                    className="w-10 h-9 sm:w-11 sm:h-10 object-cover rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 border-2 border-white shadow-sm" 
                    // Centered, responsive size, added border & shadow
                  />
                  {/* Ensure custom font sizes are defined, or use Tailwind defaults */}
                  <p className="text-[10px] leading-tight sm:text-10-12 line-clamp-1 text-center px-1">
                    {prospect.playerFullName}
                  </p>
                  <p className="text-[8px] leading-[10px] sm:text-8-9 text-gray-600"> {/* Slightly larger line-height for tiny font */}
                    {prospect.playerGA} GA
                  </p>
                </div>
              ))}
            </div>
          ) : (
            // Empty State Message
            <div className="w-full flex-grow flex flex-col justify-center items-center text-center py-4"> {/* flex-grow to fill space */}
              <GiSwordsEmblem className="text-3xl sm:text-4xl text-gray-400 mb-2" />
              <p className="text-xs sm:text-10-12 text-placeholder">
                There are no prospects available at the moment.
              </p>
            </div>
          )}
        </>
      )}

      {/* Fallback if data is null/undefined after loading (e.g., API error) */}
      {!loading && !data && (
         <div className="w-full flex-grow flex flex-col justify-center items-center text-center py-4">
            <GiSwordsEmblem className="text-3xl sm:text-4xl text-gray-400 mb-2" />
            <p className="text-xs sm:text-10-12 text-placeholder">
                Could not load prospect data.
            </p>
        </div>
      )}
    </div>
  );
};

export default Prospects;