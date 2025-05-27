"use client";

import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import ProfileIcon from "@/public/icons/Player Bio Profile.svg";
import DobIcon from "@/public/icons/Player Bio Dob.svg";
import CountryIcon from "@/public/icons/Player Bio Country.svg";
import FootIcon from "@/public/icons/Player Bio Foot.svg";
import HeightIcon from "@/public/icons/Player Bio Height.svg";
import WeightIcon from "@/public/icons/Player Bio Weight.svg";

import FBIcon from "@/public/icons/Facebook Icon.svg";
import TTIcon from "@/public/icons/Tiktok Icon.svg";
import IGIcon from "@/public/icons/IG Icon.svg";

import { convertDateFull } from "@/functions/dateFunctions";
import { iPlayerResponse } from "@/hooks/player";

interface iBio {
  image: StaticImageData;
  text: string;
}

// Dummy iPlayerResponse for example, replace with your actual hook/data
// interface iPlayerResponse {
//   fullName: string;
//   dob: string;
//   nationality: string;
//   preferredFoot: string;
//   height: number;
//   weight: number;
//   biography: string;
//   igUrl?: string | null;
//   ticTokUrl?: string | null;
//   facebookUrl?: string | null;
// }

const Bio: FC<{ data: iPlayerResponse }> = ({ data }) => {
  const bioData: iBio[] = [
    {
      image: ProfileIcon,
      text: data.fullName,
    },
    {
      image: DobIcon,
      text: convertDateFull(data.dob),
    },
    {
      image: CountryIcon,
      text: data.nationality,
    },
    {
      image: FootIcon,
      text: data.preferredFoot,
    },
    {
      image: HeightIcon,
      text: `${data.height}cm`,
    },
    {
      image: WeightIcon,
      text: `${data.weight}kg`,
    },
  ];

  return (
    <div className="w-full h-fit shadow-custom rounded-[1rem] bg-white flex flex-col 
                   pt-3 pb-6 sm:pt-4 sm:pb-8"> {/* Responsive Padding Top/Bottom */}
      <h2 className="font-bold text-dark 
                     text-base leading-tight ml-4 
                     sm:text-lg sm:leading-tight sm:ml-5"> {/* Responsive Text & Margin Left */}
        Player Details
      </h2>

      {/* Biography Section */}
      <div className="flex flex-col w-full gap-3 px-4 mt-4 
                     sm:gap-4 sm:px-5 sm:mt-5 md:mt-6"> {/* Responsive Gap, Padding X, Margin Top */}
        <h2 className="font-medium text-dark 
                       text-sm leading-tight 
                       md:text-base md:leading-tight"> {/* Responsive Text */}
          Biography
        </h2>
        <p className="text-dark 
                      text-xs leading-relaxed 
                      sm:text-sm sm:leading-relaxed"> {/* Responsive Text & Line Height */}
          {data.biography}
        </p>
      </div>

      <hr className="bg-[#E0E0E0] w-full my-3 sm:my-4" /> {/* Responsive Margin Y */}

      {/* About Section */}
      <h2 className="font-medium text-dark pl-4 
                     text-sm leading-tight  
                     sm:pl-5 md:text-base md:leading-tight"> {/* Responsive Padding Left & Text */}
        About
      </h2>
      <div className="flex flex-col w-full gap-1 px-4 mt-3 
                     sm:px-5 sm:mt-4"> {/* Responsive Padding X & Margin Top */}
        {bioData.map((item, index) =>
          item.text ? (
            <div key={index} className="w-full flex items-center py-1 gap-2">
              <Image
                src={item.image}
                alt={`${item.text} icon`}
                width={32} // Base width for NextImage, actual display set by className
                height={32} // Base height for NextImage
                className="size-6 sm:size-7 md:size-8" // Responsive Icon Size (24px, 28px, 32px)
              />
              <p className="font-medium text-dark 
                            text-xs leading-relaxed 
                            sm:text-sm sm:leading-relaxed"> {/* Responsive Text */}
                {item.text}
              </p>
            </div>
          ) : (
            <div key={index} /> // Empty div for items with no text (maintains key stability)
          )
        )}
      </div>

      <hr className="bg-[#E0E0E0] w-full my-3 sm:my-4" /> {/* Responsive Margin Y */}

      {/* Social Media Section */}
      <h2 className="font-medium text-dark pl-4 
                     text-sm leading-tight 
                     sm:pl-5 md:text-base md:leading-tight"> {/* Responsive Padding Left & Text */}
        Social Media
      </h2>
      <div className="w-full flex flex-wrap items-center gap-2 px-4 mt-3 
                     sm:px-5 sm:mt-4"> {/* Added flex-wrap, Responsive Padding X & Margin Top */}
        {/* Instagram Link */}
        {data.igUrl && (
          <Link
            href={data.igUrl}
            target="__blank"
            rel="noopener noreferrer" // Good practice for target="_blank"
            className="border border-border-gray rounded-full cursor-pointer 
                       flex justify-center items-center gap-1 
                       px-2 h-6 w-auto min-w-[5rem]  
                       sm:px-3 sm:h-7 sm:min-w-[5.5rem]" // Responsive padding, height, min-width
          >
            <Image
              src={IGIcon}
              alt="Instagram icon"
              width={20}
              height={20}
              className="size-4 sm:size-5" // Responsive Icon Size
            />
            <p className="font-medium text-dark 
                          text-[10px] leading-3 
                          sm:text-xs sm:leading-tight"> {/* Responsive Text */}
              Instagram
            </p>
          </Link>
        )}

        {/* TikTok Link */}
        {data.ticTokUrl && (
          <Link
            href={data.ticTokUrl}
            target="__blank"
            rel="noopener noreferrer"
            className="border border-border-gray rounded-full cursor-pointer 
                       flex justify-center items-center gap-1 
                       px-2 h-6 w-auto min-w-[5rem] 
                       sm:px-3 sm:h-7 sm:min-w-[5.5rem]"
          >
            <Image
              src={TTIcon}
              alt="Tiktok icon"
              width={20}
              height={20}
              className="size-4 sm:size-5"
            />
            <p className="font-medium text-dark 
                          text-[10px] leading-3 
                          sm:text-xs sm:leading-tight">
              Tiktok
            </p>
          </Link>
        )}

        {/* Facebook Link */}
        {data.facebookUrl && (
          <Link
            href={data.facebookUrl}
            target="__blank"
            rel="noopener noreferrer"
            className="border border-border-gray rounded-full cursor-pointer 
                       flex justify-center items-center gap-1 
                       px-2 h-6 w-auto min-w-[5rem] 
                       sm:px-3 sm:h-7 sm:min-w-[5.5rem]"
          >
            <Image
              src={FBIcon}
              alt="Facebook icon"
              width={20}
              height={20}
              className="size-4 sm:size-5"
            />
            <p className="font-medium text-dark 
                          text-[10px] leading-3 
                          sm:text-xs sm:leading-tight">
              Facebook
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Bio;