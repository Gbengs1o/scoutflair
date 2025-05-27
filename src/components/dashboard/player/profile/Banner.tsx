"use client";

import React from "react";

import Image from "next/image";

import Field from "@/public/dashboard/player/field.jpeg";

import {
  useCurrentUserStore,
  usePlayerDataStore,
} from "@/stores/userStore";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";

const Banner = () => {
  const image = useCurrentUserStore((state) => state.image);
  const name = useCurrentUserStore((state) => state.name);

  const role = usePlayerDataStore((state) => state.role);
  const jersey = usePlayerDataStore((state) => state.jersey);
  const age = usePlayerDataStore((state) => state.age);

  const dob = usePlayerDataStore((state) => state.dob);

  return (
    <div className="w-full shadow-custom rounded-[1rem] gap-6 bg-white flex flex-col overflow-hidden">
      <Image
        src={Field}
        alt="field"
        className="w-full h-32 sm:h-36 md:h-44 object-cover"
        width={300}
        height={120}
      />
      <div className="w-full flex flex-col relative pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-5 md:pb-6">
        <div className="absolute -top-4 sm:-top-5 md:-top-6 left-3 sm:left-4 -translate-y-1/2">
          <ProfileImageOrTextAvatar
            image={image}
            name={name}
            radius="rounded-full"
            size="size-16 sm:size-20 md:size-24 lg:size-28"
            text="text-sm sm:text-base md:text-lg lg:text-48-57"
          />
        </div>
        <div className="w-full flex flex-col gap-1 sm:gap-2 pl-3 sm:pl-4 pr-3 sm:pr-4">
          <h2 className="text-lg sm:text-xl md:text-20-24 font-bold text-dark break-words">
            {name}
          </h2>
          <div className="text-placeholder text-xs sm:text-sm md:text-14-16 font-medium">
            <p className="break-words">
              {role}, No. {jersey}
            </p>
            <p>{age} yrs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;