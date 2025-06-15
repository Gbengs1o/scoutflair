import React, { FC } from "react";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";
import { getYearDifference } from "@/functions/dateFunctions";
import { iPlayerResponse } from "@/hooks/player";

const PlayerCard: FC<{ player: iPlayerResponse }> = ({ player }) => {
  // A button is more semantically correct for an action
  const handleViewProfile = () => {
    window.location.assign(
      `/dashboard/scout/players/view-player?email=${player.email}`
    );
  };

  return (
    <div className="w-full h-full border border-border-gray/50 rounded-2xl p-3 bg-white flex flex-col items-center text-center gap-3">
      {/* Avatar */}
      <ProfileImageOrTextAvatar
        name={player.fullName}
        image={player.imageUrl}
        size="size-24"
        radius="rounded-full"
        text="text-3xl"
      />

      {/* Details */}
      <div className="w-full flex flex-col gap-2 items-center">
        <div>
          <h2 className="text-dark font-semibold text-base">
            {player.fullName}
          </h2>
          <h3 className="text-placeholder text-xs">
            {player.position}, No {player.jerseyNumber}
          </h3>
        </div>
        <div className="text-center">
          <h2 className="text-dark font-semibold text-sm text-opacity-90">
            AGE: {getYearDifference(new Date(), new Date(player.dob))} yrs
          </h2>
          <h3 className="text-placeholder text-xs">
            {player.height}cm, {player.weight}kg
          </h3>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleViewProfile}
        className="w-full mt-auto px-3 py-2 border rounded-full border-secondary-3 hover:bg-secondary-3 font-medium text-xs cursor-pointer grid place-content-center text-dark hover:text-white transition-colors duration-200"
      >
        View Profile
      </button>
    </div>
  );
};

export default PlayerCard;