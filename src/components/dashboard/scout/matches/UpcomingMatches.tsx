"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import CupImage from "@/public/dashboard/scout/Ellipse 2381.png"; // Ensure path is correct
import Void from "@/public/images/Void.png"; // Ensure path is correct

import { iMatchResponse } from "@/hooks/match"; // Assuming iMatchResponse is correctly typed

import { Loader, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddMatch from "./AddMatch"; // Assuming this component is already responsive
import { useScoutDataStore } from "@/stores/userStore";

interface iCupInfo {
  image: StaticImageData | string;
  name: string;
  type: string;
}

const UpcomingMatches: React.FC<{
  data: iMatchResponse[];
  loading: boolean;
}> = ({ data, loading }) => {
  const [cupInfo, setCupInfo] = useState<iCupInfo>({
    image: CupImage,
    name: "Fayomi's Cup",
    type: "Local Championship",
  });

  const team = useScoutDataStore((state) => state.currentTeam);
  const [opened, { open, close }] = useDisclosure(false);
  const upcomingMatchesData = data || []; // Ensure data is always an array

  // Define colors (replace with your actual theme colors or use Tailwind classes directly)
  const primaryColor = "text-blue-600"; // Example primary color (text-primary-2)
  const primaryBorderColor = "border-blue-600"; // Example primary border color (border-primary-2)
  const darkTextColor = "text-gray-800"; // Example (text-dark)
  const placeholderTextColor = "text-gray-500"; // Example (text-placeholder)
  const scoreBgColor = "bg-[#B1D4E0]"; // Keep as is if specific
  const borderColor = "border-gray-200"; // Example (border-border-gray)

  return (
    <>
      <div className={`w-full shadow-custom rounded-xl sm:rounded-2xl py-3 sm:py-4 bg-white flex flex-col gap-3 sm:gap-4 ${darkTextColor}`}>
        {/* Header Section: Title and Add Match Button */}
        <div className="px-4 sm:px-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className={`font-bold text-base sm:text-lg md:text-xl ${darkTextColor}`}>
            Upcoming Matches
          </h2>
          <button
            onClick={open}
            className={`
              ${primaryColor} ${primaryBorderColor} border 
              px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md 
              text-xs sm:text-sm font-semibold cursor-pointer 
              hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors
              self-start sm:self-center  /* Align button nicely on mobile */
            `}
          >
            Add Match
          </button>
        </div>

        {/* Cup Info Section - Shown if not loading and matches exist */}
        {!loading && upcomingMatchesData.length > 0 && (
          <div className={`w-full flex justify-between items-center px-4 sm:px-5 pt-1 sm:pt-0 border-t ${borderColor} sm:border-t-0 mt-2 sm:mt-0`}>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Image
                src={cupInfo.image}
                alt="cup image"
                width={32} // Base size
                height={32}
                className="w-7 h-7 sm:w-8 sm:h-8 md:size-9 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h3 className={`font-semibold text-xs sm:text-sm ${darkTextColor}`}>
                  {cupInfo.name}
                </h3>
                <p className={`text-[10px] sm:text-xs ${placeholderTextColor}`}>
                  {cupInfo.type}
                </p>
              </div>
            </div>
            <a href="#" className={`text-xs sm:text-sm ${primaryColor} hover:underline`}>View All</a>
          </div>
        )}

        {/* Matches List - Shown if not loading and matches exist */}
        {!loading && upcomingMatchesData.length > 0 && (
          <div className={`flex flex-col w-full ${upcomingMatchesData.length > 0 ? `border-t ${borderColor} mt-2 sm:mt-3` : ''}`}>
            {upcomingMatchesData.map((rc: iMatchResponse, i: number) => (
              <div
                key={rc.id || i} // Prefer a stable ID like rc.id if available
                className={`
                  w-full flex items-center 
                  px-3 sm:px-5 py-2.5 sm:py-3 gap-2 sm:gap-3
                  ${i !== upcomingMatchesData.length - 1 ? `border-b ${borderColor}` : ""}
                `}
              >
                {/* Home Team */}
                <div className="flex items-center gap-1 sm:gap-1.5 flex-1 min-w-0">
                  <Image
                    src={rc.homeTeamLogoUrl || Void} // Fallback image
                    alt={`${rc.homeTeam} logo`}
                    className="size-4 sm:size-5 rounded-full object-cover flex-shrink-0"
                    width={20}
                    height={20}
                  />
                  <h3 className={`text-xs sm:text-sm md:text-base ${placeholderTextColor} truncate`}>
                    {rc.homeTeam}
                  </h3>
                </div>

                {/* "vs" Separator */}
                <div className={`px-2 sm:px-3 py-0.5 sm:py-1 ${darkTextColor} rounded-md sm:rounded-lg ${scoreBgColor} text-[10px] sm:text-xs md:text-sm font-semibold flex-shrink-0 whitespace-nowrap`}>
                  vs
                </div>

                {/* Away Team */}
                <div className="flex items-center justify-end gap-1 sm:gap-1.5 flex-1 min-w-0">
                  <h3 className={`text-xs sm:text-sm md:text-base ${placeholderTextColor} truncate text-right`}>
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
            <Loader color="primary" /> {/* Use theme primary color from Mantine */}
          </div>
        )}

        {/* Empty State */}
        {!loading && upcomingMatchesData.length === 0 && (
          <div className="w-full flex flex-col justify-center items-center gap-4 sm:gap-5 py-10 sm:my-16 px-4">
            <Image
              src={Void}
              alt="no matches"
              width={80}
              height={80}
              className="w-20 h-auto sm:w-24 md:w-32 object-contain"
            />
            <h2 className={`${darkTextColor} text-xs sm:text-sm md:text-base font-medium text-center`}>
              There are no upcoming matches yet
            </h2>
          </div>
        )}
      </div>

      {/* Modal for Adding a Match */}
      <Modal.Root
        opened={opened && team !== undefined} // Ensure team is defined before opening
        onClose={close}
        centered
        padding={0} // AddMatch component will handle its own padding
        size="auto" // Let content dictate size, AddMatch has max-w
        radius="lg" // Mantine's radius scale (e.g., "md", "lg") or number
        // overlayProps={{
        //   backgroundOpacity: 0.55,
        //   blur: 3,
        // }} // Optional: For a nicer overlay
      >
        <Modal.Overlay />
        <Modal.Content>
          {/* Modal.Header could be used if AddMatch didn't have its own close icon/title */}
          <Modal.Body>
            {/* Render AddMatch only if team is defined, to prevent passing undefined */}
            {team !== undefined && <AddMatch close={close} currentAcademy={team} />}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default UpcomingMatches;