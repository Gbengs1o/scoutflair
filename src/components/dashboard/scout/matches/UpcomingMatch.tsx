"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader } from "@mantine/core";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { TbSoccerField } from "react-icons/tb";

import { convertDateFullAndTime } from "@/functions/dateFunctions";
// This import is likely defined elsewhere in your project, so we'll assume it exists.
import { iMatchResponse } from "@/hooks/match"; 
import UpcomingMatch from "@/public/dashboard/player/unsplash_t8vre7qpm2m.png";

// --- MOCK DATA FOR THE BANNER ---
// A list of potential upcoming matches for the banner to cycle through.
// We create some future dates for realism.
const getFutureDate = (daysToAdd: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return {
    date: date.toISOString().split('T')[0], // YYYY-MM-DD
    dateTime: '19:00:00' // A fixed time for the example
  }
}

const ALL_MATCHES_BANNER: iMatchResponse[] = [
  {
    id: "banner-match-1",
    homeTeam: "Al-Nassr",
    awayTeam: "Al-Ittihad",
    stadiumPitch: "King Fahd International Stadium",
    ...getFutureDate(2), // Match in 2 days
    // Add other fields from iMatchResponse with dummy data to satisfy the type
    homeTeamLogoUrl: '', 
    awayTeamLogoUrl: '',
    homeTeamScore: null,
    awayTeamScore: null,
  },
  {
    id: "banner-match-2",
    homeTeam: "Club América",
    awayTeam: "Denmark",
    stadiumPitch: "Estadio Azteca",
    ...getFutureDate(4), // Match in 4 days
    homeTeamLogoUrl: '',
    awayTeamLogoUrl: '',
    homeTeamScore: null,
    awayTeamScore: null,
  },
  {
    id: "banner-match-3",
    homeTeam: "Kashima Antlers",
    awayTeam: "Al-Nassr",
    stadiumPitch: "Kashima Soccer Stadium",
    ...getFutureDate(7), // Match in 7 days
    homeTeamLogoUrl: '',
    awayTeamLogoUrl: '',
    homeTeamScore: null,
    awayTeamScore: null,
  },
];
// --- END OF MOCK DATA ---

// The component no longer needs to receive props for data or loading state.
const UpcomingMatchBanner: React.FC = () => {
  // State to hold the currently displayed match
  const [currentMatch, setCurrentMatch] = useState<iMatchResponse | null>(null);

  // Effect to handle the random match selection and interval
  useEffect(() => {
    // Set an initial random match immediately on component mount
    const initialRandomIndex = Math.floor(Math.random() * ALL_MATCHES_BANNER.length);
    setCurrentMatch(ALL_MATCHES_BANNER[initialRandomIndex]);

    // Set up an interval to change the match every 5 seconds
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * ALL_MATCHES_BANNER.length);
      setCurrentMatch(ALL_MATCHES_BANNER[randomIndex]);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup function: this will run when the component unmounts
    // to stop the interval and prevent memory leaks.
    return () => clearInterval(intervalId);

  }, []); // The empty dependency array [] ensures this effect runs only once.

  return (
    <div className="w-full h-48 sm:h-44 relative overflow-hidden font-lato rounded-2xl shadow-lg bg-[url('/dashboard/player/upcoming-matches-banner.jpeg')] bg-cover bg-no-repeat bg-center">
      {/* Dark Overlay */}
      <div className="w-full h-full absolute inset-0 text-white flex flex-col justify-center bg-[#041931]/90 p-4 sm:p-6">
        {/* We no longer need a loading state, we directly check if a match is set */}
        {currentMatch ? (
          <div className="flex flex-col justify-center gap-2 h-full">
            <p className="text-xl sm:text-2xl font-semibold text-left">
              {currentMatch.homeTeam} vs {currentMatch.awayTeam}
            </p>
            <div className="flex flex-col gap-1.5 text-white/80">
              <div className="flex gap-2 items-center text-sm">
                <IoCalendarNumberOutline />
                <p>
                  {convertDateFullAndTime(
                    // This constructor works because our mock data provides
                    // the date and time in the correct format.
                    new Date(`${currentMatch.date}T${currentMatch.dateTime}`)
                  )}
                </p>
              </div>
              <div className="flex gap-2 items-center text-sm">
                <TbSoccerField />
                <p>{currentMatch.stadiumPitch}</p>
              </div>
            </div>
          </div>
        ) : (
          // This fallback will only be shown for a brief moment before the first match is set
          <div className="w-full h-full grid place-content-center">
            <p className="text-base font-semibold text-center">
              No upcoming matches
            </p>
          </div>
        )}
      </div>

      {/* Decorative Image: Hidden on small screens to avoid clutter */}
      <Image
        src={UpcomingMatch}
        className="w-1/2 h-full absolute -right-10 top-0 object-cover hidden sm:block"
        alt="Upcoming Match Illustration"
        priority
      />
    </div>
  );
};

export default UpcomingMatchBanner;