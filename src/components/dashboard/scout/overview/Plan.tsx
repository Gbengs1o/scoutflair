"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Loader } from "@mantine/core";

import Void from "@/public/images/Void.png"; // Ensure this path is correct
import { useCurrentUserStore } from "@/stores/userStore"; // Ensure this path is correct
import AddTask from "./AddTask"; // Ensure this path is correct
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar"; // Ensure this path is correct
import { useGetScoutsPlayers } from "@/hooks/scout"; // Ensure this path is correct

// Define a type for your player data for better type safety
interface Player {
  playerUserId: string | number; // Or appropriate type
  fullName: string;
  currentTeam: string;
  position: string;
  height: string;
  weight: string;
  appearances: number;
  assists: number;
  goals: number;
  image?: string; // Optional player image
  rating?: number; // Optional: For star rating
}


const Plan = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const currentUserName = useCurrentUserStore((state) => state.name);
  const currentUserImage = useCurrentUserStore((state) => state.image);

  const { data: playersData, loading } = useGetScoutsPlayers();
  const players: Player[] = playersData || []; // Ensure players is always an array

  // Helper for star ratings
  const getPlayerRating = (player: Player): number => {
    return player.rating || 0; // Default to 0 if no rating, adjust as needed
  };

  return (
    <>
      {/* Main container: responsive padding, rounded corners */}
      <div className="w-full shadow-custom rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 bg-white flex flex-col gap-3 sm:gap-4">
        {/* Header: Title and Add Task Button */}
        <div className="w-full justify-between items-center flex">
          <div className="flex gap-1 sm:gap-2 w-fit items-center text-dark">
            <HiOutlineClipboardDocumentCheck className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            <h2 className="font-bold text-sm sm:text-base md:text-lg">Scouting Plan</h2>
          </div>
          <button
            onClick={open}
            className="text-primary-2 border border-primary-2 px-2 py-1 sm:px-3 rounded-md text-xs sm:text-sm cursor-pointer font-bold hover:bg-primary-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-2 focus:ring-opacity-50 transition-colors"
          >
            Add Task
          </button>
        </div>

        <hr className="border-placeholder my-1 sm:my-2" />

        {/* Current User Info */}
        <div className="flex gap-2 items-center">
          <ProfileImageOrTextAvatar
            image={currentUserImage}
            name={currentUserName}
            size="size-8" // Assuming size-8 translates to w-8 h-8 (32px)
            radius="rounded-full"
            // text prop (e.g., text="text-xs") for text inside avatar should be handled by ProfileImageOrTextAvatar
          />
          <h3 className="text-dark font-lato text-xs sm:text-sm">{currentUserName}</h3>
        </div>

        {/* Player Cards Section - Conditional Rendering */}
        {loading && (
          <div className="w-full min-h-[16rem] flex justify-center items-center py-10">
            <Loader color="primary.6" /> {/* Ensure primary.6 is in your Mantine theme */}
          </div>
        )}

        {!loading && players && players.length > 0 && (
          // Player grid:
          // - Mobile: 1 column
          // - sm: 2 columns
          // - lg: 4 columns, with a fixed height for the row of cards
          // Gaps are responsive.
          <div className="mt-2 sm:mt-3 mb-2 sm:mb-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:h-[16rem]">
            {players.slice(0, 4).map((player) => (
              <div
                key={player.playerUserId}
                // Player card: responsive padding, standard border, rounded corners
                className="bg-[#FFFAFA] border border-gray-200 rounded-xl w-full h-full flex flex-col items-center p-2 sm:p-3 gap-2"
              >
                <h3 className="text-xs sm:text-sm font-semibold text-dark text-center truncate w-full px-1">
                  {player.currentTeam}
                </h3>
                <div className="w-full h-full items-center flex flex-col flex-grow"> {/* flex-grow to push stats down */}
                  <div className="flex flex-col items-center gap-1 w-full">
                    <ProfileImageOrTextAvatar
                      image={player.image || ""}
                      name={player.fullName}
                      radius={"rounded-full"}
                      size={"size-14"} // Assuming size-14 translates to w-14 h-14 (56px)
                    />
                    <div className="flex flex-col gap-0.5 w-full items-center mt-1">
                      <div className="flex w-fit gap-1">
                        {Array(5)
                          .fill(0)
                          .map((_, starIndex) => (
                            <FaStar
                              key={starIndex}
                              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 ${
                                starIndex < getPlayerRating(player)
                                  ? "text-yellow-400" // Using Tailwind yellow
                                  : "text-gray-300" // Using Tailwind gray
                              }`}
                            />
                          ))}
                      </div>
                      <h2 className="font-semibold text-dark text-[11px] sm:text-xs text-center truncate w-full px-1">
                        {player.fullName}
                      </h2>
                    </div>
                  </div>

                  <hr className="border-placeholder my-1 sm:my-1.5 w-full" />

                  <div className="w-full flex flex-col items-center gap-1.5 sm:gap-2 flex-grow justify-around"> {/* flex-grow and justify-around */}
                    <div className="w-full flex flex-col gap-0.5 sm:gap-1 items-center">
                      <h3 className="text-[10px] sm:text-xs font-bold text-primary-2">
                        {player.position}
                      </h3>
                      <div className="w-fit flex gap-2 sm:gap-3 items-center text-[9px] sm:text-[10px] font-medium text-dark">
                        <p>H: {player.height}</p>
                        <p>W: {player.weight}</p>
                      </div>
                    </div>
                    <div className="flex flex-col w-full items-center gap-1 sm:gap-1.5">
                      <h2 className="text-[10px] sm:text-xs font-medium text-dark">
                        Academy Stats
                      </h2>
                      <div className="flex w-full justify-around items-center text-[9px] sm:text-[10px] font-medium text-dark px-1">
                        <div className="flex flex-col items-center text-center">
                          <p>{player.appearances}</p>
                          <p>Games</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <p>{player.assists}</p>
                          <p>Assists</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <p>{player.goals}</p>
                          <p>Goals</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (!players || players.length === 0) && (
          <div className="w-full flex flex-col justify-center items-center gap-3 sm:gap-5 min-h-[16rem] py-10">
            <Image
              src={Void}
              alt="no task"
              width={100} // Base width, will be overridden by className
              height={100} // Base height, will be overridden by className
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
            />
            <h2 className="text-dark text-xs sm:text-sm font-medium text-center">
              There are no tasks available at the moment
            </h2>
          </div>
        )}
      </div>

      {/* Modal for AddTask - Assuming AddTask component is already responsive */}
      {opened && <AddTask close={close} />}
    </>
  );
};

export default Plan;