"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Field from "@/public/dashboard/player/field.jpeg";
import { useCurrentUserStore } from "@/stores/userStore";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";

// --- Helper functions to generate random data ---

// A list of realistic roles
const roles = ["Goalkeeper", "Defender", "Midfielder", "Forward", "Winger"];

// Function to get a random item from an array
// CORRECTED: Changed to a standard function declaration to avoid JSX syntax ambiguity with <T>.
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Function to get a random number in a given range (inclusive)
// This function was already correct from the last fix.
const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;


const Banner = () => {
  const image = useCurrentUserStore((state) => state.image);
  const name = useCurrentUserStore((state) => state.name);

  const [role, setRole] = useState(() => getRandomItem(roles));
  const [jersey, setJersey] = useState(() => getRandomNumber(1, 99));
  const [age, setAge] = useState(() => getRandomNumber(18, 38));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRole(getRandomItem(roles));
      setJersey(getRandomNumber(1, 99));
      setAge(getRandomNumber(18, 38));
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className="w-full shadow-custom rounded-[1rem] gap-6 bg-white flex flex-col overflow-hidden">
      <Image
        src={Field}
        alt="field"
        className="w-full h-44 object-cover"
        width={300}
        height={120}
        priority
      />
      <div className="w-full flex flex-col relative pt-12 pb-6">
        <div className="absolute -top-6 left-4 -translate-y-1/2">
          <ProfileImageOrTextAvatar
            image={image}
            name={name}
            radius="rounded-full"
            size="size-28"
            text="text-48-57"
          />
        </div>
        <div className="w-full flex flex-col gap-2 pl-4">
          <h2 className="text-20-24 font-bold text-dark">{name}</h2>
          <div className="text-placeholder text-14-16 font-medium">
            <p>
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