"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Loader } from "@mantine/core";

import Void from "@/public/images/Void.png";
import { useCurrentUserStore } from "@/stores/userStore";
import AddTask from "./AddTask";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";
import { useGetScoutsPlayers } from "@/hooks/scout";

// --- Image URLs you provided ---
// These will be used for the player profile pictures.
const imageUrls = [
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1948.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1973.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_2071.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002582_793_4993.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1795.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1826.png",
];

const Plan = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { name: scoutName, image: scoutImage } = useCurrentUserStore();
  const { data: players, loading } = useGetScoutsPlayers();

  // --- MODIFICATION: Add an image to each player object ---
  // This maps over the fetched players and adds an 'image' property from our array.
  // This is a great way to use placeholder images during development.
  const playersWithImages = players?.map((player, index) => ({
    ...player,
    image: imageUrls[index % imageUrls.length], // Cycle through images
  }));

  return (
    <>
      <div className="w-full shadow-custom rounded-2xl p-4 sm:p-5 bg-white flex flex-col">
        <div className="w-full justify-between items-center flex">
          <div className="flex gap-2 w-fit items-center text-dark">
            <HiOutlineClipboardDocumentCheck size={22} />
            <h2 className="font-bold text-base sm:text-lg">Scouting Plan</h2>
          </div>
          <button
            onClick={open}
            className="text-primary-2 border border-primary-2 px-3 py-1 rounded-md text-xs sm:text-sm cursor-pointer font-bold hover:bg-primary-2 hover:text-white transition-colors"
          >
            Add Task
          </button>
        </div>
        <hr className="bg-placeholder my-3" />
        <div className="flex gap-2 items-center">
          <ProfileImageOrTextAvatar
            image={scoutImage}
            name={scoutName}
            size="size-8"
            radius="rounded-full"
            text="text-xs"
          />
          <h3 className="text-dark font-lato text-sm">{scoutName}</h3>
        </div>

        {/* Player cards content */}
        <div className="mt-4">
          {loading ? (
            <div className="w-full min-h-[16rem] grid place-content-center">
              <Loader color="primary.6" />
            </div>
          ) : playersWithImages && playersWithImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* --- MODIFICATION: Use the new `playersWithImages` array --- */}
              {playersWithImages.slice(0, 4).map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-5 min-h-[16rem]">
              <Image
                src={Void}
                alt="No tasks available"
                width={100}
                height={100}
                className="w-32 h-auto object-cover"
              />
              <h2 className="text-dark text-sm font-medium text-center max-w-xs">
                There are no tasks available at the moment. Click 'Add Task' to get started.
              </h2>
            </div>
          )}
        </div>
      </div>
      {opened && <AddTask close={close} />}
    </>
  );
};

// --- MODIFICATION: PlayerCard now uses the image from the player object ---
const PlayerCard = ({ player }) => (
  <div className="bg-[#FFFAFA] border-[0.5px] rounded-2xl w-full p-3 flex flex-col items-center gap-2">
    <h3 className="text-sm font-semibold text-dark text-center">
      {player.currentTeam}
    </h3>
    <ProfileImageOrTextAvatar
      image={player.image} // Changed from "" to player.image
      name={player.fullName}
      radius="rounded-full"
      size="size-14"
    />
    <div className="flex flex-col items-center gap-1 w-full">
      <div className="flex gap-1">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <FaStar
              key={index}
              size={10}
              className={
                index < 4 ? "text-[#FFD700]" : "text-border-gray" // Example rating
              }
            />
          ))}
      </div>
      <h2 className="font-semibold text-dark text-sm text-center">
        {player.fullName}
      </h2>
    </div>
    <hr className="bg-placeholder my-1.5 w-full" />
    <div className="w-full flex flex-col items-center gap-2 text-dark">
      <h3 className="text-xs font-bold text-primary-2">{player.position}</h3>
      <div className="flex gap-3 items-center text-[10px] font-medium">
        <p>H: {player.height}</p>
        <p>W: {player.weight}</p>
      </div>
      <h2 className="text-xs font-medium mt-1">Academy Stats</h2>
      <div className="flex w-full justify-around items-center text-[10px] font-medium text-center">
        <div className="flex flex-col items-center">
          <p className="font-bold">{player.appearances}</p>
          <p>Games</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">{player.assists}</p>
          <p>Assists</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">{player.goals}</p>
          <p>Goals</p>
        </div>
      </div>
    </div>
  </div>
);

export default Plan;