"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Loader } from "@mantine/core";
import { FaStar } from "react-icons/fa";

import Void from "@/public/images/Void.png";
// The original CupImage is no longer needed as we'll use a URL.
// import CupImage from "@/public/dashboard/scout/Ellipse 2381.png";

// The hook is no longer needed for this static example.
// import { useGetPreviousMatches } from "@/hooks/match";

// Define a type for the data your component will actually render.
type ProcessedMatch = {
  id: string; // The required 'id' for the key prop
  homeTeam: string;
  homeTeamLogoUrl: StaticImageData | string;
  homeTeamScore: number | null;
  awayTeam: string;
  awayTeamLogoUrl: StaticImageData | string;
  awayTeamScore: number | null;
};

// --- MOCK DATA USING YOUR IMAGES ---
// I've created a sample list of matches using the logos you provided.
const mockMatches: ProcessedMatch[] = [
  {
    id: "recent-match-1",
    homeTeam: "Al-Nassr",
    homeTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002575_793_4422.png",
    homeTeamScore: 2,
    awayTeam: "Al-Ittihad",
    awayTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002576_793_4424.png",
    awayTeamScore: 1,
  },
  {
    id: "recent-match-2",
    homeTeam: "Club América",
    homeTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Club_Am_rica_1_531_2482.png",
    homeTeamScore: 3,
    awayTeam: "Kashima Antlers",
    awayTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Kashima_Antlers_1_531_2618.png",
    awayTeamScore: 3,
  },
  {
    id: "recent-match-3",
    homeTeam: "Denmark",
    homeTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamarca_1_531_2487.png",
    homeTeamScore: 0,
    awayTeam: "Al-Nassr",
    awayTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002575_793_4422.png",
    awayTeamScore: 2,
  },
];
// --- END OF MOCK DATA ---

const RecentMatches = () => {
  // --- CUP INFO UPDATED ---
  // The heart-shaped Saudi flag is perfect for the cup image.
  // I've updated the name and type to match the theme.
  const [cupInfo] = useState({
    image:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Saudi_arabia_heart_flag_793_4461.png",
    name: "Saudi Champions Cup",
    type: "National Championship",
  });

  // Since we are using static mock data, we don't need to fetch from a hook.
  // We can set the state directly.
  const [processedMatches, setProcessedMatches] =
    useState<ProcessedMatch[]>(mockMatches);
  const loading = false; // Manually set loading to false

  // The useEffect to process fetched data is no longer needed.

  return (
    <div className="w-full shadow-custom rounded-2xl p-4 sm:p-5 bg-white flex flex-col gap-4">
      <h2 className="text-dark font-bold text-base sm:text-lg">
        Recent Matches
      </h2>

      {loading ? (
        <div className="w-full min-h-[10rem] grid place-content-center">
          <Loader color="primary.6" />
        </div>
      ) : processedMatches.length > 0 ? (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src={cupInfo.image}
                alt="cup image"
                width={36}
                height={36}
                className="size-9 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-sm text-dark">
                  {cupInfo.name}
                </h3>
                <p className="text-xs text-placeholder">{cupInfo.type}</p>
              </div>
            </div>
            <Link
              href="/matches"
              className="text-xs text-dark cursor-pointer hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="flex flex-col w-full border-t border-border-gray">
            {processedMatches.map((match) => (
              <div
                key={match.id}
                className="grid grid-cols-[auto_1fr_auto_1fr] gap-2 sm:gap-4 items-center w-full py-3 border-b border-border-gray last:border-b-0"
              >
                <div className="flex gap-2 items-center text-placeholder">
                  <FaStar className="text-sm text-secondary-3" />
                  <h3 className="text-xs sm:text-sm font-semibold">FT</h3>
                </div>
                <div className="flex gap-2 items-center justify-start overflow-hidden">
                  <Image
                    src={match.homeTeamLogoUrl}
                    alt={`${match.homeTeam} logo`}
                    className="size-4 sm:size-5 rounded-full object-cover flex-shrink-0"
                    width={20}
                    height={20}
                  />
                  <h3 className="text-xs sm:text-sm text-placeholder truncate">
                    {match.homeTeam}
                  </h3>
                </div>
                <div className="px-2 sm:px-3 py-1 text-dark rounded-lg bg-[#B1D4E0] text-xs font-bold">
                  {match.homeTeamScore ?? 0} : {match.awayTeamScore ?? 0}
                </div>
                <div className="flex gap-2 items-center justify-end overflow-hidden">
                  <h3 className="text-xs sm:text-sm text-placeholder truncate text-right">
                    {match.awayTeam}
                  </h3>
                  <Image
                    src={match.awayTeamLogoUrl}
                    alt={`${match.awayTeam} logo`}
                    className="size-4 sm:size-5 rounded-full object-cover flex-shrink-0"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-5 my-12">
          <Image
            src={Void}
            alt="no matches"
            width={100}
            height={100}
            className="w-32 h-auto object-cover"
          />
          <h2 className="text-dark text-sm font-medium text-center">
            There are no recent matches yet.
          </h2>
        </div>
      )}
    </div>
  );
};

export default RecentMatches;