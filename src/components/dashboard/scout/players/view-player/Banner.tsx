"use client";

import React, { FC } from "react";
import Image from "next/image";
import { Loader } from "@mantine/core";

import Field from "@/public/dashboard/player/field.jpeg";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";
import { iPlayerResponse } from "@/hooks/player";
import { getYearDifference } from "@/functions/dateFunctions";

const Banner: FC<{ data: iPlayerResponse | null }> = ({ data }) => {
  if (!data) {
    return (
      <div className="w-full shadow-custom rounded-2xl h-60 bg-gray-100 grid place-content-center">
        <Loader color="primary.6" />
      </div>
    );
  }

  const age = getYearDifference(new Date(), new Date(data.dob));

  return (
    <div className="w-full shadow-custom rounded-2xl bg-white flex flex-col overflow-hidden">
      <Image
        src={Field}
        alt="field background"
        className="w-full h-32 sm:h-44 object-cover"
        width={300}
        height={120}
        priority
      />
      <div className="w-full flex flex-col relative pt-12 pb-6 px-4 sm:px-6">
        {/* Responsive Avatar */}
        <div className="absolute -top-14 sm:-top-16 left-4 sm:left-6">
          <ProfileImageOrTextAvatar
            image={data.imageUrl}
            name={data.fullName}
            radius="rounded-full"
            size="size-24 sm:size-28"
            text="text-4xl sm:text-5xl"
            className="border-4 border-white"
          />
        </div>

        {/* Responsive Text */}
        <div className="w-full flex flex-col gap-1 sm:gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-dark">
            {data.fullName}
          </h2>
          <div className="text-placeholder text-sm sm:text-base font-medium">
            <p>
              {data.position}, No. {data.jerseyNumber}
            </p>
            <p>{age} yrs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;