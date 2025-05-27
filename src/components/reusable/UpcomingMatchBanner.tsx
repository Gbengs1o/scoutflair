"use client";

import React, { useState } from "react";

import {
  convertDateWithDayName,
  convertTime,
} from "@/functions/dateFunctions";
import Image, { StaticImageData } from "next/image";

import Logo1 from "@/public/dashboard/player/dinamo-zagreb-1.png";
import Logo2 from "@/public/dashboard/player/kashima-antlers-1.png";
import UpcomingMatch from "@/public/dashboard/player/unsplash_t8vre7qpm2m.png";

interface iClub {
  name: string;
  logo: StaticImageData | string;
}

const UpcomingMatchBanner: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [league, setLeague] = useState<string>("Uptown ScoutFlair League");
  const [time, setTime] = useState<Date>(new Date());
  const [clubs, setClubs] = useState<iClub[]>([
    {
      name: "Deltas FC",
      logo: Logo1,
    },
    {
      name: "Rhinos FC",
      logo: Logo2,
    },
  ]);

  return (
    <div className="w-full h-[240px] relative overflow-hidden font-lato rounded-2xl shadow-custom-2 bg-[url('../../public/dashboard/player/upcoming-matches-banner.jpeg')] bg-cover bg-no-repeat bg-center">
      <div className="w-full h-full absolute left-0 top-0 overflow-hidden rounded-lg bg-[#041931]/90">
        <div className="flex flex-col justify-start items-start absolute left-4 md:left-7 top-14 gap-6">
          <div className="flex flex-col justify-start items-start relative gap-2">
            <p className="nav-item text-left text-white">UPCOMING MATCH</p>
            <p className="text-md text-left text-white">
              <span className="font-light">{convertDateWithDayName(date)}</span>
              <span className="mx-2">|</span>
              <span className="font-medium">{league}</span>
            </p>
          </div>
          <div className="flex justify-end items-center gap-8">
            <div className="flex items-center gap-3">
              <p className="text-xl font-semibold text-left text-white">
                {clubs[0].name}
              </p>
              <div className="flex items-center">
                <Image
                  src={clubs[0].logo}
                  className="size-6 object-cover"
                  width={32}
                  height={32}
                  alt="Team Logo"
                />
              </div>
            </div>
            <div className="flex justify-center items-center px-2 rounded bg-black">
              <p className="text-base font-medium text-left text-white">
                {convertTime(time)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src={clubs[1].logo}
                width={32}
                height={32}
                className="size-6 object-cover"
                alt="Team Logo"
              />
              <div className="flex flex-col justify-center items-center">
                <p className="text-xl text-left font-semibold text-white">
                  {clubs[1].name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={UpcomingMatch}
          className="w-1/2 h-full absolute -right-10 top-0 object-cover"
          alt="Upcoming Match"
        />
      </div>
    </div>
  );
};

export default UpcomingMatchBanner;
