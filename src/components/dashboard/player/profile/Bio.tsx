"use client";

import React from "react";

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
import MailIcon from "@/public/icons/Player Bio Mail.svg";
import PhoneIcon from "@/public/icons/Player Bio Phone.svg";

import FBIcon from "@/public/icons/Facebook Icon.svg";
import TTIcon from "@/public/icons/Tiktok Icon.svg";
import IGIcon from "@/public/icons/IG Icon.svg";

import Link from "next/link";

import { convertDateFull } from "@/functions/dateFunctions";

interface iBio {
  image: StaticImageData;
  text: string;
}

const Bio = () => {
  const bio = usePlayerDataStore((state) => state.bio);

  const fullName = useCurrentUserStore((state) => state.name);

  const bioData: iBio[] = [
    {
      image: ProfileIcon,
      text: fullName,
    },
    {
      image: DobIcon,
      text: convertDateFull(usePlayerDataStore((state) => state.dob)),
    },
    {
      image: CountryIcon,
      text: usePlayerDataStore((state) => state.nationality),
    },
    {
      image: FootIcon,
      text: usePlayerDataStore((state) => state.foot),
    },
    {
      image: HeightIcon,
      text: `${usePlayerDataStore((state) => state.height)}cm`,
    },
    {
      image: WeightIcon,
      text: `${usePlayerDataStore((state) => state.weight)}kg`,
    },
    {
      image: StatusIcon,
      text: usePlayerDataStore((state) => state.status),
    },
  ];

  const recommendation: iBio[] = [
    {
      image: ProfileIcon,
      text: usePlayerDataStore((state) => state.recommendedName),
    },
    {
      image: MailIcon,
      text: usePlayerDataStore((state) => state.recommendedEmail),
    },
    {
      image: PhoneIcon,
      text: usePlayerDataStore((state) => state.recommendedPhone),
    },
  ];

  return (
    <div className="w-full h-fit shadow-custom rounded-[1rem] pt-3 sm:pt-4 pb-6 sm:pb-8 bg-white flex flex-col">
      <h2 className="text-sm sm:text-16-19 text-dark font-bold ml-4 sm:ml-5">Player Details</h2>
      <div className="flex flex-col w-full mt-4 sm:mt-6 gap-3 sm:gap-4 px-4 sm:px-5">
        <h2 className="text-dark text-xs sm:text-14-16 font-medium">Biography</h2>
        <p className="text-xs sm:text-12-18 text-dark leading-relaxed">{bio}</p>
      </div>
      <hr className="bg-[#E0E0E0] w-full my-3" />
      <h2 className="text-dark text-xs sm:text-14-16 font-medium pl-4 sm:pl-5">About</h2>
      <div className="flex flex-col w-full mt-3 sm:mt-4 gap-1 px-4 sm:px-5">
        {bioData.map((data, index) =>
          data.text ? (
            <div key={index} className="w-full flex items-center py-1 gap-2 sm:gap-3">
              <Image
                src={data.image}
                alt="data icon"
                width={32}
                height={32}
                className="size-8 sm:size-9 md:size-10 flex-shrink-0"
              />
              <p className="text-xs sm:text-12-18 text-dark font-medium break-words">{data.text}</p>
            </div>
          ) : (
            <div key={index} />
          )
        )}
      </div>
      {/* <hr className="bg-[#E0E0E0] w-full my-3" />
      <h2 className="text-dark text-xs sm:text-14-16 font-medium pl-4 sm:pl-5">Recommendations</h2>
      <div className="flex flex-col w-full mt-3 sm:mt-4 gap-1 px-4 sm:px-5">
        {recommendation.map((data, index) => (
          <div key={index} className="w-full flex items-center py-1 gap-2 sm:gap-3">
            <Image
              src={data.image}
              alt="data icon"
              width={32}
              height={32}
              className="size-8 sm:size-9 md:size-10 flex-shrink-0"
            />
            <p className="text-xs sm:text-12-18 text-dark font-medium break-words">{data.text}</p>
          </div>
        ))}
      </div> */}
      <hr className="bg-[#E0E0E0] w-full my-3" />
      <h2 className="text-dark text-xs sm:text-14-16 font-medium pl-4 sm:pl-5">Social Media</h2>
      <div className="w-full flex flex-wrap items-center gap-2 px-4 sm:px-5 mt-3 sm:mt-4">
        <Link
          href={usePlayerDataStore((state) => state.igLink)}
          target="__blank"
          className="border border-border-gray rounded-full w-20 sm:w-[5.5rem] cursor-pointer h-6 sm:h-7 flex justify-center items-center gap-1"
        >
          <Image
            src={IGIcon}
            alt="instagram icon"
            className="size-4 sm:size-5"
            width={20}
            height={20}
          />
          <p className="font-medium text-dark text-[9px] sm:text-10-12">Instagram</p>
        </Link>
        <Link
          href={usePlayerDataStore((state) => state.ttLink)}
          target="__blank"
          className="border border-border-gray rounded-full w-16 sm:w-[5.5rem] cursor-pointer h-6 sm:h-7 flex justify-center items-center gap-1"
        >
          <Image
            src={TTIcon}
            alt="tiktok icon"
            className="size-4 sm:size-5"
            width={20}
            height={20}
          />
          <p className="font-medium text-dark text-[9px] sm:text-10-12">Tiktok</p>
        </Link>
        <Link
          href={usePlayerDataStore((state) => state.fbLink)}
          target="__blank"
          className="border border-border-gray rounded-full w-20 sm:w-[5.5rem] cursor-pointer h-6 sm:h-7 flex justify-center items-center gap-1"
        >
          <Image
            src={FBIcon}
            alt="facebook icon"
            className="size-4 sm:size-5"
            width={20}
            height={20}
          />
          <p className="font-medium text-dark text-[9px] sm:text-10-12">Facebook</p>
        </Link>
      </div>
    </div>
  );
};

export default Bio;