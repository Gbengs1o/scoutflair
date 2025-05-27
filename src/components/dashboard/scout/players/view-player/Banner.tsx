"use client";

import React, { FC } from "react";
import Image from "next/image";

import Field from "@/public/dashboard/player/field.jpeg"; // Make sure this path is correct

import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";
import { iPlayerResponse } from "@/hooks/player"; // Assuming this interface is defined
import { getYearDifference } from "@/functions/dateFunctions"; // Assuming this function is defined

// Dummy iPlayerResponse for example, replace with your actual hook/data
// interface iPlayerResponse {
//   dob: string;
//   imageUrl: string | null;
//   fullName: string;
//   position: string;
//   jerseyNumber: number;
// }

const Banner: FC<{ data: iPlayerResponse }> = ({ data }) => {
  const age = getYearDifference(new Date(), new Date(data.dob));

  // Define responsive avatar sizes and text for the avatar
  const avatarSizeClasses = "size-20 sm:size-24 md:size-28";
  // Assuming text-48-57 was font-size: 48px. Tailwind's text-5xl is 3rem (48px).
  // Adjust based on your actual definition of text-48-57.
  const avatarTextSizeClasses = "text-3xl sm:text-4xl md:text-5xl";

  // Define responsive text sizes for player name and info
  // Assuming text-20-24 was font-size: 20px. Tailwind's text-xl is 1.25rem (20px).
  const nameTextSizeClasses = "text-lg sm:text-xl md:text-xl"; // md:text-xl is your original 20px
  // Assuming text-14-16 was font-size: 14px. Tailwind's text-sm is 0.875rem (14px).
  const infoTextSizeClasses = "text-xs sm:text-sm md:text-sm"; // md:text-sm is your original 14px

  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col overflow-hidden">
      {/* Banner Image */}
      <div className="relative w-full"> {/* Added relative for potential future overlays on image itself */}
        <Image
          src={Field}
          alt="field"
          className="w-full object-cover h-32 sm:h-36 md:h-44" // Responsive height
          width={1200} // Provide a larger base width for better quality
          height={400} // Provide a base height corresponding to largest version
          priority // Consider adding priority if it's LCP
        />
      </div>

      {/* Content Area: Avatar + Player Info */}
      <div className="w-full flex flex-col relative pb-4 pt-8 sm:pt-10 md:pt-12 md:pb-6">
        {/* Avatar: Absolutely Positioned */}
        {/*
          Calculation for -top-X and pt-Y:
          Original: Avatar size-28 (7rem), -top-6 (-1.5rem), content pt-12 (3rem)
          Avatar center is 1.5rem above content block's top edge.
          Avatar bottom edge is (7rem/2) - 1.5rem = 3.5rem - 1.5rem = 2rem into the content block.
          Content padding-top (pt-12 = 3rem) gives 1rem space between avatar bottom and text.

          Mobile: Avatar size-20 (5rem).
            -top-X: We want similar visual overlap. Let's try -top-4 (-1rem).
            Avatar bottom edge: (5rem/2) - 1rem = 2.5rem - 1rem = 1.5rem into content block.
            Content pt-Y: 1.5rem (avatar intrusion) + 0.5rem (desired space) = 2rem. So pt-8.
          SM: Avatar size-24 (6rem).
            -top-X: Try -top-5 (-1.25rem).
            Avatar bottom edge: (6rem/2) - 1.25rem = 3rem - 1.25rem = 1.75rem into content block.
            Content pt-Y: 1.75rem (avatar intrusion) + 0.75rem (desired space) = 2.5rem. So pt-10.
          MD: Avatar size-28 (7rem).
            -top-X: -top-6 (-1.5rem).
            Avatar bottom edge: (7rem/2) - 1.5rem = 3.5rem - 1.5rem = 2rem into content block.
            Content pt-Y: 2rem (avatar intrusion) + 1rem (desired space) = 3rem. So pt-12.
        */}
        <div
          className="absolute left-3 -top-4 -translate-y-1/2 
                     sm:left-4 sm:-top-5 
                     md:left-4 md:-top-6"
        >
          <ProfileImageOrTextAvatar
            image={data.imageUrl}
            name={data.fullName}
            radius="rounded-full"
            size={avatarSizeClasses}
            text={avatarTextSizeClasses}
          />
        </div>

        {/* Player Information */}
        {/*
          Padding left for text info:
          Needs to clear the avatar.
          Mobile: avatar left-3 (0.75rem) + avatar size-20 (5rem) + gap (e.g. 0.5rem) = pl-[6.25rem]
          SM: avatar left-4 (1rem) + avatar size-24 (6rem) + gap (e.g. 0.5rem) = pl-[7.5rem]
          MD: avatar left-4 (1rem) + avatar size-28 (7rem) + gap (e.g. 0.5rem) = pl-[8.5rem]
          Also add some right padding for balance, especially on smaller screens.
        */}
        <div className="w-full flex flex-col gap-1 sm:gap-2 
                        pr-4 pl-[calc(0.75rem+5rem+0.5rem)] 
                        sm:pr-4 sm:pl-[calc(1rem+6rem+0.5rem)] 
                        md:pr-6 md:pl-[calc(1rem+7rem+0.5rem)]"
        >
          <h2 className={`${nameTextSizeClasses} font-bold text-dark truncate`}>
            {data.fullName}
          </h2>
          <div className={`${infoTextSizeClasses} text-placeholder font-medium`}>
            <p>
              {data.position}, No. {data.jerseyNumber}
            </p>
            <p>{age} yrs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;