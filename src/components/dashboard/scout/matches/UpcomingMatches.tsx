"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import Void from "@/public/images/Void.png";
import AddMatch from "./AddMatch";
import { useScoutDataStore } from "@/stores/userStore";

// Define a clear type for our upcoming match data
type UpcomingMatch = {
  id: string;
  homeTeam: string;
  homeTeamLogoUrl: string;
  awayTeam: string;
  awayTeamLogoUrl: string;
};

// --- MOCK DATA FOR UPCOMING MATCHES ---
// A larger pool of potential matches to be randomly selected from.
const ALL_UPCOMING_MATCHES: UpcomingMatch[] = [
  {
    id: "match-1",
    homeTeam: "Al-Ittihad",
    homeTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002576_793_4424.png",
    awayTeam: "Club América",
    awayTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Club_Am_rica_1_531_2482.png",
  },
  {
    id: "match-2",
    homeTeam: "Kashima Antlers",
    homeTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Kashima_Antlers_1_531_2618.png",
    awayTeam: "Al-Nassr",
    awayTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002575_793_4422.png",
  },
  {
    id: "match-3",
    homeTeam: "Denmark",
    homeTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamarca_1_531_2487.png",
    awayTeam: "Al-Ittihad",
    awayTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002576_793_4424.png",
  },
  {
    id: "match-4",
    homeTeam: "Club América",
    homeTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Club_Am_rica_1_531_2482.png",
    awayTeam: "Denmark",
    awayTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamarca_1_531_2487.png",
  },
  {
    id: "match-5",
    homeTeam: "Al-Nassr",
    homeTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002575_793_4422.png",
    awayTeam: "Al-Ittihad",
    awayTeamLogoUrl:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002576_793_4424.png",
  },
];

// A helper function to get a specified number of random items from an array
const getRandomMatches = (
  sourceArray: UpcomingMatch[],
  count: number
): UpcomingMatch[] => {
  // Shuffle the array and take the first 'count' items
  return [...sourceArray].sort(() => 0.5 - Math.random()).slice(0, count);
};

// Since the component now manages its own data, we can remove the props
const UpcomingMatches: React.FC = () => {
  // State to hold the matches that are currently displayed
  const [displayedMatches, setDisplayedMatches] = useState<UpcomingMatch[]>([]);
  
  const [cupInfo] = useState({
    image:
      "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Saudi_arabia_heart_flag_793_4461.png",
    name: "Champions Cup",
    type: "International Friendlies",
  });
  const team = useScoutDataStore((state) => state.currentTeam);
  const [opened, { open, close }] = useDisclosure(false);

  // useEffect hook to initialize and then update the matches every 5 seconds
  useEffect(() => {
    // Set the initial matches immediately on component mount
    setDisplayedMatches(getRandomMatches(ALL_UPCOMING_MATCHES, 3));

    // Set up an interval to change the matches every 5 seconds (5000 ms)
    const intervalId = setInterval(() => {
      setDisplayedMatches(getRandomMatches(ALL_UPCOMING_MATCHES, 3));
    }, 5000);

    // Cleanup function: This is crucial to stop the interval
    // when the component unmounts, preventing memory leaks.
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array [] ensures this effect runs only once on mount.
  
  // With local data, loading is no longer a concern
  const loading = false;

  return (
    <>
      <div className="w-full shadow-custom rounded-2xl p-4 sm:p-5 bg-white flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-dark font-bold text-base sm:text-lg">
            Upcoming Matches
          </h2>
          <button
            onClick={open}
            className="text-primary-2 border border-primary-2 px-3 py-1 rounded-md text-xs sm:text-sm cursor-pointer font-bold hover:bg-primary-2 hover:text-white transition-colors"
          >
            Add Match
          </button>
        </div>

        {loading ? (
          <div className="w-full min-h-[10rem] grid place-content-center">
            <Loader color="primary.6" />
          </div>
        ) : displayedMatches.length > 0 ? (
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
              <p className="text-xs text-dark cursor-pointer hover:underline">
                View All
              </p>
            </div>
            <div className="flex flex-col w-full border-t border-border-gray">
              {displayedMatches.map((match) => (
                <div
                  key={match.id}
                  className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4 items-center w-full py-3 border-b border-border-gray last:border-b-0"
                >
                  <div className="flex gap-2 items-center justify-start overflow-hidden">
                    <Image
                      src={match.homeTeamLogoUrl}
                      alt={`${match.homeTeam} logo`}
                      className="size-5 rounded-full object-cover flex-shrink-0"
                      width={20}
                      height={20}
                    />
                    <h3 className="text-sm text-placeholder truncate">
                      {match.homeTeam}
                    </h3>
                  </div>
                  <div className="px-3 py-1 text-dark rounded-lg bg-[#B1D4E0] text-xs font-bold">
                    VS
                  </div>
                  <div className="flex gap-2 items-center justify-end overflow-hidden">
                    <h3 className="text-sm text-placeholder truncate text-right">
                      {match.awayTeam}
                    </h3>
                    <Image
                      src={match.awayTeamLogoUrl}
                      alt={`${match.awayTeam} logo`}
                      className="size-5 rounded-full object-cover flex-shrink-0"
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
              There are no upcoming matches yet.
            </h2>
          </div>
        )}
      </div>

      <Modal.Root
        opened={opened && team !== undefined}
        onClose={close}
        centered
        padding={0}
        size="md"
        radius={16}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Body>
            {team && <AddMatch close={close} currentAcademy={team} />}
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default UpcomingMatches;