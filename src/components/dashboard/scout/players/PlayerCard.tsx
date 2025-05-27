"use client";

import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";
import { getYearDifference } from "@/functions/dateFunctions";
import { iPlayerResponse } from "@/hooks/player";
import React, { FC } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const PlayerCard: FC<{ player: iPlayerResponse }> = ({ player }) => {
  const router = useRouter(); // Initialize router

  const handleViewProfile = () => {
    router.push(`/dashboard/scout/players/view-player?email=${player.email}`);
  };

  // --- Responsive Class Definitions ---

  // Avatar
  const avatarSizeClasses = 
    "size-16 sm:size-20 md:size-[6rem]"; // Mobile: 4rem (64px), SM: 5rem (80px), MD: 6rem (96px)
  const avatarTextClasses = 
    "text-xl sm:text-2xl md:text-[28px] md:leading-[33px]"; // Adapting from original 'text-28-33'

  // Player Name (Original: text-14-16)
  const nameTextClasses = 
    "text-xs sm:text-sm md:text-sm md:leading-[16px] font-semibold text-dark truncate"; // Mobile: 12px, SM/MD: 14px

  // Sub Info Text (Position, Jersey, Height, Weight - Original: text-8-11)
  // NOTE: 8px is very small. Kept consistent as per original for MD. Consider increasing for accessibility.
  const subInfoTextClasses = 
    "text-[8px] leading-[11px] sm:text-[9px] sm:leading-tight md:text-[8px] md:leading-[11px] text-placeholder";
    // Mobile: 8px, SM: 9px, MD: 8px - slight increase on SM for general readability

  // Age Text (Original: text-10-12)
  const ageTextClasses = 
    "text-[10px] leading-[12px] font-semibold text-dark text-opacity-[0.88]"; // Consistent 10px

  // --- Component Return ---
  return (
    <div
      className={`w-full h-auto rounded-[1rem] border border-border-gray border-opacity-50 
                 flex items-center 
                 p-3 gap-3
                 sm:p-4 sm:gap-3 
                 md:px-5 md:py-4 md:gap-4`} // Responsive padding, main gap, and h-auto
    >
      <ProfileImageOrTextAvatar
        name={player.fullName}
        image={player.imageUrl}
        size={avatarSizeClasses}
        radius="rounded-full"
        text={avatarTextClasses}
      />

      {/* Information Section */}
      <div className="flex-1 flex flex-col gap-1 sm:gap-1.5 md:gap-2 min-w-0"> {/* flex-1, responsive gap, min-w-0 for truncation */}
        
        {/* Name and Position */}
        <div className="flex w-full items-start justify-between"> {/* items-start for better text alignment */}
          <div className="flex flex-col min-w-0"> {/* min-w-0 for name truncation */}
            <h2 className={nameTextClasses}>
              {player.fullName}
            </h2>
            <h3 className={subInfoTextClasses}>
              {player.position}, No {player.jerseyNumber}
            </h3>
          </div>
          {/* Optional: Add an icon or small action button here if needed */}
        </div>

        {/* Age and Physical Stats */}
        <div className="flex flex-col">
          <h2 className={ageTextClasses}>
            AGE: {getYearDifference(new Date(), new Date(player.dob))} yrs
          </h2>
          <h3 className={subInfoTextClasses}>
            {player.height}cm {player.weight}kg
          </h3>
        </div>

        {/* View Profile Button */}
        <div
          onClick={handleViewProfile}
          className={`border rounded-full border-secondary-3 hover:bg-secondary-3 
                     font-medium text-dark hover:text-white text-opacity-[0.88] 
                     cursor-pointer grid place-content-center 
                     ease-out duration-300 transition-colors
                     px-3 py-1 mt-1 w-full 
                     sm:py-1.5 sm:w-auto sm:self-start  
                     md:py-2`} // Responsive padding, width, alignment, and a small top margin
        >
          {/* Button text size is taken from original (text-10-12), applied via font-medium and text-dark on parent div */}
          <span className="text-[10px] leading-[12px]">View Profile</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;