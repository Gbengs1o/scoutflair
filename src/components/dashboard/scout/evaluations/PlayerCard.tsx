"use client";

import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";
import { getYearDifference } from "@/functions/dateFunctions";
import { iScoutPlayersResponse } from "@/hooks/scout"; // Assuming correct type import
import Link from "next/link";
import React, { FC } from "react";

const PlayerCard: FC<{ player: iScoutPlayersResponse }> = ({ player }) => {
  const names = player.fullName.split(" ");
  const firstName = names[0] || ""; // Handle cases with no first name
  const lastName = names.slice(1).join(" ") || player.fullName; // Handle single names or multiple last names

  // Responsive classes for ProfileImageOrTextAvatar
  // Adjust based on your component and design needs
  const avatarSizeClasses = "size-20 xs:size-24 sm:size-28"; // e.g., 5rem, 6rem, 7rem (original was 7.25rem)
  const avatarTextClasses = "text-2xl xs:text-3xl sm:text-4xl"; // Corresponds to size (original text-28-33)

  // Font size translations (examples)
  // text-14-16 -> text-xs sm:text-sm
  // text-16-19 -> text-sm sm:text-base
  // text-24-28 -> text-xl sm:text-2xl (Jersey)
  // text-10-12 -> text-[10px] sm:text-xs (AGE/POSITION labels, button text)
  // text-8-9   -> text-[9px] sm:text-[10px] (AGE/POSITION values - very small, increased slightly)

  return (
    <div className="w-full border border-border-gray/50 rounded-[1rem] bg-white
                   flex flex-col p-2.5 gap-3
                   xs:flex-row xs:items-center xs:p-3 xs:gap-3 sm:gap-4"> {/* Stack on smallest, row on xs+, responsive padding & gap. Removed fixed height. */}

      {/* Avatar */}
      <div className="flex-shrink-0 self-center xs:self-auto"> {/* Center avatar when stacked */}
        <ProfileImageOrTextAvatar
          name={player.fullName}
          image={player.imageUrl}
          size={avatarSizeClasses}
          radius="rounded-md" // Or keep "rounded" if preferred, rounded-md is common
          text={avatarTextClasses}
        />
      </div>

      {/* Info Block */}
      <div className="w-full flex-1 flex flex-col gap-2.5 sm:gap-3 py-1"> {/* flex-1 to take space, responsive gap */}

        {/* Name and Jersey */}
        <div className="flex w-full items-start justify-between gap-2"> {/* items-start for name block, gap for safety */}
          <div className="flex flex-col">
            <p className="text-dark/80 text-xs sm:text-sm"> {/* opacity via /80 */}
              {firstName}
            </p>
            <p className="text-dark font-bold text-sm sm:text-base leading-tight"> {/* leading-tight for compact name */}
              {lastName}
            </p>
          </div>
          <p className="text-dark font-bold text-lg xs:text-xl sm:text-2xl whitespace-nowrap"> {/* Jersey #, no wrap */}
            #{player.jerseyNumber || "N/A"}
          </p>
        </div>

        {/* Age and Position */}
        <div className="flex w-full justify-around xs:justify-between gap-2"> {/* justify-around for small, between for larger in this section */}
          {[
            { label: "AGE", value: getYearDifference(new Date(), new Date(player.dob)) },
            { label: "POSITION", value: player.position || "N/A" },
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center gap-0.5 text-center">
              <h2 className="font-semibold text-dark/90 text-[10px] sm:text-xs uppercase tracking-wider"> {/* Label style */}
                {item.label}
              </h2>
              <p className="text-dark text-[10px] sm:text-xs"> {/* Value style, increased from 8-9px range */}
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col xs:flex-row items-center gap-2 sm:gap-3 mt-1"> {/* Stack buttons on smallest, row on xs+ */}
          {[
            { href: `/dashboard/scout/evaluations/reports?id=${player.playerId}`, label: "Reports" },
            { href: `/dashboard/scout/evaluations/statistics?id=${player.playerId}`, label: "Statistics" },
          ].map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="w-full text-center border rounded-full border-secondary-3
                         font-medium text-dark/80
                         py-1.5 px-2 text-[10px]
                         sm:py-2 sm:text-xs
                         hover:bg-secondary-3 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;