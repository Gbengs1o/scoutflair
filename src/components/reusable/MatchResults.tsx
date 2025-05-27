"use client";

import React, { useState, FC } from "react";

import Image, { StaticImageData } from "next/image";

import FilterIcon from "@/public/icons/Filter Icon.svg";
import SortIcon from "@/public/icons/Sort Icon.svg";
import CalenderIcon from "@/public/icons/Calender Icon.svg";

import { getCurrentMonthWithYear } from "@/functions/dateFunctions";
import { IoIosArrowForward } from "react-icons/io";

import Logo1 from "@/public/dashboard/player/club-américa-1.png";
import Logo2 from "@/public/dashboard/player/dinamarca-1.png";
import PlayerImage from "@/public/dashboard/player/ellipse-2374.png";

import { FaStar } from "react-icons/fa";

interface iRecentMatch {
  currentDay: number;
  totalDays: number;
  homeLogo: string | StaticImageData;
  homeName: string;
  homeScore: number;
  awayLogo: string | StaticImageData;
  awayScore: number;
  awayName: string;
  manOfMatchName: string;
  manOfMatchTeam: string;
  manOfMatchImage: string | StaticImageData;
  manOfMatchRating: number;
}

const MatchResults = () => {
  const [results, setResults] = useState<iRecentMatch[]>(
    Array(6).fill({
      currentDay: 17,
      totalDays: 34,
      homeLogo: Logo1,
      homeName: "Josh FC",
      homeScore: 2,
      awayLogo: Logo2,
      awayScore: 1,
      awayName: "Drift SC",
      manOfMatchName: "Lionel Messi",
      manOfMatchTeam: "Barcelona",
      manOfMatchImage: PlayerImage,
      manOfMatchRating: 8.6,
    })
  );

  return (
    <div className="flex flex-col gap-5 w-full items-end">
      <div className="w-fit flex gap-5 items-center">
        <div className="flex items-center gap-2 bg-white hover:shadow-custom-1 rounded-full py-2 px-3 cursor-pointer transition-shadow ease-out duration-300">
          <Image
            src={FilterIcon}
            alt="filter-icon"
            width={20}
            height={20}
            className="size-5"
          />
          <p className="text-black-80 text-md">Filter</p>
        </div>
        <div className="flex items-center gap-2 bg-white hover:shadow-custom-1 rounded-full py-2 px-3 cursor-pointer transition-shadow ease-out duration-300">
          <Image
            src={SortIcon}
            alt="sort-icon"
            width={20}
            height={20}
            className="size-5"
          />
          <p className="text-black-80 text-md">Sort</p>
        </div>
        <div className="flex items-center gap-2 bg-white hover:shadow-custom-1 rounded-full py-2 px-3 cursor-pointer transition-shadow ease-out duration-300">
          <Image
            src={CalenderIcon}
            alt="calender-icon"
            width={20}
            height={20}
            className="size-5"
          />
          <p className="text-black-80 text-md">{getCurrentMonthWithYear()}</p>
        </div>
      </div>
      <div className="w-full py-2 px-4 shadow-custom-2 gap-6 overflow-hidden rounded-2xl bg-white border-2 border-border-gray">
        <div className="h-16 w-full flex justify-between items-center">
          <p className="text-xl font-bold text-left text-black">
            RECENT MATCH RESULTS
          </p>
          <div className="flex items-center gap-1 cursor-pointer">
            <p className="text-base text-left text-black-92">View All</p>
            <IoIosArrowForward size={"16px"} className="text-black" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 pb-4">
          {results.map((rt, i) => (
            <div
              className="w-full h-[170px] flex flex-col justify-between p-2 border-border-gray border rounded-[10px] shadow-custom-1"
              key={i}
            >
              <p className="text-sm text-black">
                Matchday {rt.currentDay} of {rt.totalDays}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1 items-center">
                  <Image
                    src={rt.homeLogo}
                    alt={rt.homeName}
                    width={32}
                    height={32}
                    className="rounded-full object-cover size-8"
                  />
                  <p className="text-[16px] font-inter font-medium text-black">
                    {rt.homeName}
                  </p>
                </div>

                <div className="bg-black text-sm rounded-[6px] px-2 py-[2px] text-white">
                  {rt.homeScore} - {rt.awayScore}
                </div>

                <div className="flex flex-col gap-1 items-center">
                  <Image
                    src={rt.awayLogo}
                    alt={rt.awayName}
                    width={32}
                    height={32}
                    className="rounded-full object-cover size-8"
                  />
                  <p className="text-[16px] font-inter font-medium text-black">
                    {rt.awayName}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex gap-1 items-center">
                  <Image
                    src={rt.manOfMatchImage}
                    className="size-6 object-cover rounded-full"
                    alt="soccer game concept"
                    width={32}
                    height={32}
                  />
                  <div className="flex flex-col h-full gap-0">
                    <p className="text-[12px] font-normal text-black">
                      {rt.manOfMatchName}
                    </p>
                    <p className="text-[10px] font-normal text-black">
                      {rt.manOfMatchTeam}
                    </p>
                  </div>
                </div>
                <div className="bg-primary-2 rounded-[6px] text-[12px] flex items-center gap-1 p-1 text-white">
                  <FaStar className="text-[#F1D023]" size={"12px"} />
                  {rt.manOfMatchRating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchResults;
