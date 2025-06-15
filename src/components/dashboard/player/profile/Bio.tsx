"use client";

import React, { useState, useEffect } from "react";
import {
  useCurrentUserStore,
  usePlayerDataStore,
} from "@/stores/userStore";
import Image, { StaticImageData } from "next/image";
import ProfileIcon from "@/public/icons/Player Bio Profile.svg";
import DobIcon from "@/public/icons/Player Bio Dob.svg";
import CountryIcon from "@/public/icons/Player Bio Country.svg";
import FootIcon from "@/public/icons/Player Bio Foot.svg";
import HeightIcon from "@/public/icons/Player Bio Height.svg";
import WeightIcon from "@/public/icons/Player Bio Weight.svg";
import StatusIcon from "@/public/icons/Player Bio Status.svg";
import Link from "next/link";
import { convertDateFull } from "@/functions/dateFunctions";
import FBIcon from "@/public/icons/Facebook Icon.svg";
import TTIcon from "@/public/icons/Tiktok Icon.svg";
import IGIcon from "@/public/icons/IG Icon.svg";

// --- Helper function to generate a random number in a given range ---
// CORRECTED: Added types for 'min', 'max', and the return value.
const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

interface iBio {
  image: StaticImageData;
  text: string;
}

const Bio = () => {
  const bio = usePlayerDataStore((state) => state.bio);
  const fullName = useCurrentUserStore((state) => state.name);
  const dob = usePlayerDataStore((state) => state.dob);
  const nationality = usePlayerDataStore((state) => state.nationality);
  const foot = usePlayerDataStore((state) => state.foot);
  const status = usePlayerDataStore((state) => state.status);

  const [height, setHeight] = useState(() => getRandomNumber(165, 200));
  const [weight, setWeight] = useState(() => getRandomNumber(60, 95));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeight(getRandomNumber(165, 200));
      setWeight(getRandomNumber(60, 95));
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  const bioData: iBio[] = [
    { image: ProfileIcon, text: fullName },
    { image: DobIcon, text: convertDateFull(dob) },
    { image: CountryIcon, text: nationality },
    { image: FootIcon, text: foot },
    { image: HeightIcon, text: `${height}cm` },
    { image: WeightIcon, text: `${weight}kg` },
    { image: StatusIcon, text: status },
  ];

  return (
    <div className="w-full h-fit shadow-custom rounded-[1rem] pt-4 pb-8 bg-white flex flex-col">
      <h2 className="text-16-19 text-dark font-bold ml-5">Player Details</h2>
      <div className="flex flex-col w-full mt-6 gap-4 px-5 ">
        <h2 className="text-dark text-14-16 font-medium">Biography</h2>
        <p className="text-12-18 text-dark">{bio}</p>
      </div>
      <hr className="bg-[#E0E0E0] w-full my-3" />
      <h2 className="text-dark text-14-16 font-medium pl-5">About</h2>
      <div className="flex flex-col w-full mt-4 gap-1 px-5 ">
        {bioData.map((data, index) =>
          data.text ? (
            <div key={index} className="w-full flex items-center py-1 gap-2">
              <Image
                src={data.image}
                alt="data icon"
                width={32}
                height={32}
                className="size-10"
              />
              <p className="text-12-18 text-dark font-medium">{data.text}</p>
            </div>
          ) : (
            <div key={index} />
          )
        )}
      </div>
      <hr className="bg-[#E0E0E0] w-full my-3" />
      <h2 className="text-dark text-14-16 font-medium pl-5">Social Media</h2>
      <div className="w-full flex items-center gap-2 px-5 mt-4">
        <Link
          href={usePlayerDataStore((state) => state.igLink)}
          target="__blank"
          className="border border-border-gray rounded-full w-[5.5rem] cursor-pointer h-7 flex justify-center items-center gap-1"
        >
          <Image src={IGIcon} alt="instagram icon" className="size-5" width={20} height={20} />
          <p className="font-medium text-dark text-10-12">Instagram</p>
        </Link>
        <Link
          href={usePlayerDataStore((state) => state.ttLink)}
          target="__blank"
          className="border border-border-gray rounded-full w-[5.5rem] cursor-pointer h-7 flex justify-center items-center gap-1"
        >
          <Image src={TTIcon} alt="tiktok icon" className="size-5" width={20} height={20} />
          <p className="font-medium text-dark text-10-12">Tiktok</p>
        </Link>
        <Link
          href={usePlayerDataStore((state) => state.fbLink)}
          target="__blank"
          className="border border-border-gray rounded-full w-[5.5rem] cursor-pointer h-7 flex justify-center items-center gap-1"
        >
          <Image src={FBIcon} alt="facebook icon" className="size-5" width={20} height={20} />
          <p className="font-medium text-dark text-10-12">Facebook</p>
        </Link>
      </div>
    </div>
  );
};

export default Bio;