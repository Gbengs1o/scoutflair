"use client";

import React from "react";
import { convertDateFullAndTime } from "@/functions/dateFunctions";
import Image from "next/image";

// It's generally better to import images that are part of the component's static assets
// directly if they are within the src directory, or ensure the public path is correct.
// For background images in Tailwind JIT, the path needs to be resolvable.
// import BannerBg from "@/public/dashboard/player/upcoming-matches-banner.jpeg"; // If you want to use Next/Image for background
import UpcomingMatchImageFile from "@/public/dashboard/player/unsplash_t8vre7qpm2m.png";

import { IoCalendarNumberOutline } from "react-icons/io5";
import { TbSoccerField } from "react-icons/tb";
import { iMatchResponse } from "@/hooks/match"; // Assuming this type is correctly defined
import { Loader } from "@mantine/core";

const UpcomingMatchBanner: React.FC<{
  data: iMatchResponse[];
  loading: boolean;
}> = ({ data, loading }) => {
  const upcomingMatchesData = data || []; // Ensure data is always an array

  return (
    // Responsive height: taller on larger screens
    <div className="w-full h-48 sm:h-56 md:h-[15rem] lg:h-[16rem] relative overflow-hidden font-lato rounded-xl sm:rounded-2xl shadow-custom-2 bg-[url('/dashboard/player/upcoming-matches-banner.jpeg')] bg-cover bg-no-repeat bg-center">
      {/*
        Note on background image path:
        For Tailwind JIT, ensure the path in bg-[url('/path/to/image.jpeg')] is relative to your public directory
        or an absolute URL. If it's in public/dashboard/player/, then '/dashboard/player/upcoming-matches-banner.jpeg' is correct.
        The original `../../public/...` is not standard for Tailwind's url() usage.
      */}
      <div className="w-full h-full absolute left-0 top-0 text-white overflow-hidden flex flex-col rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#041931]/95 via-[#041931]/80 to-transparent p-3 sm:p-4 md:p-5">
        {/* Using a gradient overlay can make the right-side image blend better */}

        {loading && (
          <div className="w-full h-full flex items-center justify-center">
            <Loader color="white" /> {/* Simpler color for Mantine Loader with white background */}
          </div>
        )}

        {!loading && upcomingMatchesData.length > 0 && (
          <div className="flex flex-col justify-center gap-1.5 sm:gap-2 h-full max-w-full sm:max-w-[70%] md:max-w-[65%] lg:max-w-[60%]"> {/* Limit text width */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-left leading-tight">
              {upcomingMatchesData[0].homeTeam} vs {upcomingMatchesData[0].awayTeam}
            </p>
            <div className="flex flex-col gap-1 sm:gap-1.5 text-gray-200"> {/* Lighter text color for sub-info */}
              <div className="flex gap-1.5 sm:gap-2 items-center text-xs sm:text-sm">
                <IoCalendarNumberOutline className="text-sm sm:text-base md:text-lg flex-shrink-0" />
                <p className="truncate">
                  {/*
                    Date parsing can be tricky. Ensure the combined string is a valid format.
                    Example: If date is "2023-10-27" and dateTime is "T15:00:00Z",
                    `${data[0].date}${data[0].dateTime}` is valid.
                    If dateTime is just "15:00:00", you might need:
                    new Date(`${data[0].date}T${data[0].dateTime}`)
                  */}
                  {convertDateFullAndTime(
                    new Date(`${upcomingMatchesData[0].date}${upcomingMatchesData[0].dateTime}`)
                  )}
                </p>
              </div>
              <div className="flex gap-1.5 sm:gap-2 items-center text-xs sm:text-sm">
                <TbSoccerField className="text-sm sm:text-base md:text-lg flex-shrink-0" />
                <p className="truncate">{upcomingMatchesData[0].stadiumPitch}</p>
              </div>
            </div>
            {/* Optional Button - an example if you want to bring it back */}
            {/*
            <button className="mt-3 sm:mt-4 border border-secondary-3 hover:bg-secondary-3/20 transition-colors h-7 sm:h-8 rounded-full w-28 sm:w-32 text-xs sm:text-sm font-medium">
              MATCH PREVIEW
            </button>
            */}
          </div>
        )}

        {!loading && upcomingMatchesData.length === 0 && (
          <div className="w-full h-full flex items-center justify-center text-center px-4">
            <p className="text-sm sm:text-base font-medium">
              No upcoming matches scheduled at the moment.
            </p>
          </div>
        )}
      </div>

      {/* Decorative Image - responsive positioning and size */}
      {/* Hidden on extra small screens, then appears and grows */}
      <div className="absolute top-0 right-0 h-full w-1/2 pointer-events-none">
        <Image
          src={UpcomingMatchImageFile}
          alt="Upcoming Match illustration"
          fill // Use fill to cover the parent div
          className="object-contain object-right opacity-60 sm:opacity-80 md:opacity-100"
          // object-contain to see more of the image, object-right to align it
          // Responsive opacity could also be an option
          // Original: w-1/2 h-full absolute -right-10 top-0 object-cover
          // New approach: container div controls position and size more cleanly with fill
          // The parent div is `w-1/2`, so the image effectively takes that space from the right.
          // You can adjust `w-1/2` on the parent div or use different classes on the image itself:
          // e.g., className="absolute top-0 h-full object-contain object-right opacity-80
          //    w-1/3 -right-5 sm:w-2/5 sm:-right-8 md:w-1/2 md:-right-10"
        />
      </div>
    </div>
  );
};

export default UpcomingMatchBanner;