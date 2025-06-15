"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import Pic from "@/public/dashboard/scout/ellipse-2373.png";
import Nig from "@/public/dashboard/scout/twemoji_flag-nigeria.png";

import { AiOutlineThunderbolt } from "react-icons/ai";

interface iPlayerInfo {
  nationality: string | StaticImageData;
  image: string | StaticImageData;
  firstName: string;
  lastName: string;
  position: string;
  age: number;
  detail: string;
}

const Trending = () => {
  const [trending, setTrending] = useState<iPlayerInfo>({
    nationality: Nig,
    image: Pic,
    firstName: "Adams",
    lastName: "Taylor",
    position: "Midfielder",
    age: 23,
    detail: "77 G/A (2022/2023)",
  });

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-5 gap-5 bg-white flex flex-col justify-between">
      <h2 className="text-dark font-bold text-16-19">Trending</h2>
      <div className="flex flex-col w-full items-center gap-4">
        <Image
          src={trending.image}
          alt={"trending player"}
          width={200}
          height={200}
          className="size-20 object-cover rounded-full"
        />
        <div className="flex flex-col items-center gap-2">
          <div className="w-fit flex items-center gap-2">
            <p className="text-16-19 font-bold text-dark">
              {trending.firstName} {trending.lastName}, {trending.age}
            </p>
            <Image
              src={trending.nationality}
              alt={"trending player nationality"}
              width={16}
              height={16}
              className="size-4 object-cover rounded"
            />
          </div>
          <p className="text-12-14 font-semibold text-dark">
            {trending.position}
          </p>
        </div>
        <div className="flex w-fit">
          <AiOutlineThunderbolt className="text-secondary-3 text-16-19" />
          <p className="text-14-16 text-dark">{trending.detail}</p>
        </div>

        <button className="border border-secondary-3 rounded-full font-medium text-dark text-10-12 px-4 py-2">
          View Report
        </button>
      </div>
    </div>
  );
};

export default Trending;
