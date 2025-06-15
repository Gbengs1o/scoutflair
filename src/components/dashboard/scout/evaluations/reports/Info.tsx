"use client";

import React, { FC } from "react";

import Image from "next/image";
import { convertDateWithSlashes } from "@/functions/dateFunctions";
import { iPlayerFullDetails } from "@/hooks/scout";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";

const Info: FC<{ data: iPlayerFullDetails | null }> = ({ data }) => {
  if (data === null) {
    return <></>;
  }

  return (
    <div className="w-full h-fit shadow-custom rounded-[1rem] py-4 px-5 gap-5 bg-white flex flex-col justify-between">
      <h2 className="text-dark font-bold text-16-19">Player Information</h2>
      <div className="w-full flex gap-6 items-center p-4">
        <ProfileImageOrTextAvatar
          size="size-[18rem]"
          image={data.imageUrl}
          name={data.fullName}
          radius="rounded"
          text="text-48-57"
        />

        <div className="w-[calc(100%-19.5rem)] border border-border-gray flex flex-col text-14-16 text-dark">
          <div className="flex items-center px-2 border-b border-border-gray">
            <p className="font-semibold w-[45%] border-r border-border-gray py-1">
              Name
            </p>
            <p className="w-[70%] py-1 pl-2">{data.fullName}</p>
          </div>
          <div className="flex items-center px-2 border-b border-border-gray">
            <p className="font-semibold w-[45%] border-r border-border-gray py-1">
              Date of Birth
            </p>
            <p className="w-[70%] py-1 pl-2">
              {convertDateWithSlashes(new Date(data.dob))}
            </p>
          </div>
          <div className="flex items-center px-2 border-b border-border-gray">
            <p className="font-semibold w-[45%] border-r border-border-gray py-1">
              Nationality
            </p>
            <p className="w-[70%] py-1 pl-2">{data.nationality}</p>
          </div>
          <div className="flex items-center px-2 border-b border-border-gray">
            <p className="font-semibold w-[45%] border-r border-border-gray py-1">
              Team
            </p>
            <p className="w-[70%] py-1 pl-2">{data.currentTeam}</p>
          </div>
          <div className="flex items-center px-2 border-b border-border-gray">
            <p className="font-semibold w-[45%] border-r border-border-gray py-1">
              Position
            </p>
            <p className="w-[70%] py-1 pl-2">{data.position}</p>
          </div>
          <div className="flex items-center px-2 border-b border-border-gray">
            <p className="font-semibold w-[45%] border-r border-border-gray py-1">
              Appearance
            </p>
            <p className="w-[70%] py-1 pl-2">{data.appearances}</p>
          </div>
          <div className="flex items-center px-2 border-b border-border-gray">
            <p className="font-semibold w-[45%] border-r border-border-gray py-1">
              Height
            </p>
            <p className="w-[70%] py-1 pl-2">
              {data.height !== "" ? data.height : "0"}cm
            </p>
          </div>
          <div className="flex items-center px-2 border-b border-border-gray">
            <p className="font-semibold w-[45%] border-r border-border-gray py-1">
              Weight
            </p>
            <p className="w-[70%] py-1 pl-2">
              {data.weight !== "" ? data.weight : "0"}kg
            </p>
          </div>
          <div className="flex items-center px-2 ">
            <p className="font-semibold w-[45%] border-r border-border-gray py-1">
              Preferred Foot
            </p>
            <p className="w-[70%] py-1 pl-2">{data.preferredFoot}</p>
          </div>
        </div>
      </div>
      <h2 className="text-dark font-bold text-16-19">Psychological Insights</h2>
      <div className="px-4 w-full flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-dark font-semibold text-14-16">Strengths</h2>
          {data.strength === "" ? (
            <p className="text-placeholder text-12-14">No data provided</p>
          ) : (
            data.strength
          )}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-dark font-semibold text-14-16">Weaknesses</h2>
          {data.weakness === "" ? (
            <p className="text-placeholder text-12-14">No data provided</p>
          ) : (
            data.weakness
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
