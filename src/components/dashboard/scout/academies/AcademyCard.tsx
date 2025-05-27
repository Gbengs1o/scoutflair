import React, { FC } from "react";

import { FaStar, FaMedal } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { iAcademyResponse } from "@/hooks/academy";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";

const AcademyCard: FC<{
  academy: iAcademyResponse;
  onSelected: () => void;
}> = ({ academy, onSelected }) => {
  return (
    <div
      onClick={onSelected}
      className={`hover:bg-secondary hover:bg-opacity-20 bg-white shadow-custom rounded-xl flex flex-col sm:flex-row gap-3 sm:gap-5 p-3 sm:px-3 sm:py-2 cursor-pointer`}
    >
      {/* Avatar and Rating Section */}
      <div className="flex sm:flex-col items-center sm:items-center gap-2 sm:gap-1 sm:w-10">
        <ProfileImageOrTextAvatar
          image={academy.imageUrl}
          name={academy.name}
          radius="rounded"
          size="size-10 sm:size-10"
        />
        <div className="items-center justify-center flex w-fit gap-0.5">
          <p className="text-8-9 sm:text-8-9 text-dark font-medium">{academy.rating}</p>
          <FaStar size={8} className={`text-secondary-3`} />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 sm:w-[calc(100%-3.75rem)] flex flex-col justify-between gap-3 sm:gap-0">
        {/* Header Section */}
        <div className="flex flex-col gap-2 sm:gap-1 w-full">
          <div className="flex justify-between items-start sm:items-center w-full gap-2">
            <h2 className="text-14-16 sm:text-12-14 font-semibold text-dark line-clamp-2 sm:line-clamp-1 flex-1">
              {academy.name}
            </h2>
            <div className="p-2 bg-primary-2 rounded size-6 sm:size-4 grid place-content-center flex-shrink-0">
              <FaMedal className={`text-white`} size={12} />
            </div>
          </div>
          <div className="flex items-center w-fit gap-1 sm:gap-0.5">
            <IoLocationOutline className={`text-dark`} size={12} />
            <h2 className="text-10-12 sm:text-8-9 text-dark line-clamp-2 sm:line-clamp-1">
              {academy.address}
            </h2>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full grid grid-cols-3 gap-4 sm:gap-0 text-10-12 sm:text-8-9 text-dark">
          <div className="flex flex-col w-full">
            <h3 className="text-10-12 sm:text-8-9 font-medium sm:font-normal">Players:</h3>
            <p className="text-8-10 sm:text-6-7 font-semibold sm:font-normal">{academy.playersCount}</p>
          </div>
          <div className="flex flex-col w-full">
            <h3 className="text-10-12 sm:text-8-9 font-medium sm:font-normal">Wins:</h3>
            <p className="text-8-10 sm:text-6-7 font-semibold sm:font-normal">{academy.winCount}</p>
          </div>
          <div className="flex flex-col w-full">
            <h3 className="text-10-12 sm:text-8-9 font-medium sm:font-normal">Graduated:</h3>
            <p className="text-8-10 sm:text-6-7 font-semibold sm:font-normal">{academy.graduatedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyCard;