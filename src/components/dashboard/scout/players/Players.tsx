"use client";

import React from "react";
import { Loader } from "@mantine/core";
import Image from "next/image";

import PlayerCard from "./PlayerCard";
import { useGetPlayers } from "@/hooks/scout";
import Void from "@/public/images/Void.png";

const Players = () => {
  const { data: players, loading } = useGetPlayers();

  return (
    <div className="w-full flex flex-col gap-4 p-4 sm:p-6">
      <div className="w-full shadow-custom rounded-2xl p-4 sm:p-5 bg-white flex flex-col gap-5">
        <h2 className="text-dark font-bold text-base sm:text-lg">
          Available Players
        </h2>

        {loading ? (
          <div className="w-full grid place-content-center min-h-[30rem]">
            <Loader color="primary.6" />
          </div>
        ) : players && players.length > 0 ? (
          // Responsive Grid: Adjusts columns based on screen size
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {players.map((player) => (
              <PlayerCard key={player.email} player={player} />
            ))}
          </div>
        ) : (
          <div className="w-full min-h-[30rem] flex flex-col justify-center items-center gap-5">
            <Image
              src={Void}
              alt="No players available"
              width={100}
              height={100}
              className="w-40 h-auto object-cover"
            />
            <h2 className="text-dark text-base font-medium text-center">
              There are no players available
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;