"use client";

import React, { useState } from "react";

import Image, { StaticImageData } from "next/image";
import { RiMedalLine } from "react-icons/ri";
import Pic from "@/public/images/ellipse-67.png";
import Pic2 from "@/public/images/pvid2.png";
import Background from "@/public/images/vid2.png";

import { MdOutlinePlayCircle } from "react-icons/md";

interface iClip {
  scoutName: string;
  scoutImage: string | StaticImageData;
  video: string | StaticImageData;
}

interface iComparison {
  image: string | StaticImageData;
  fouls: number;
  goals: number;
  assists: number;
  cleanSheet: number;
}

const Clips = () => {
  const [clips, setClips] = useState<iClip[]>(
    Array(3).fill({
      scoutImage: Pic,
      scoutName: "John Doe",
      video: Background,
    })
  );

  const [comparisons, setComparisons] = useState<iComparison[]>(
    Array(6).fill({
      image: Pic2,
      fouls: 0,
      goals: 0,
      assists: 0,
      cleanSheet: 0,
    })
  );

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-5 gap-5 bg-white flex flex-col justify-between">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-dark font-bold text-16-19">Player&apos;s Clips</h2>
        <p className="text-14-16 font-medium text-dark">Edit</p>
      </div>

      <button className="bg-primary-2 rounded-lg text-white text-14-24 w-[180px] py-2">
        View All Players
      </button>

      <div className="w-full grid grid-cols-3 gap-5">
        {clips.map((clip, i) => (
          <div className="flex flex-col items-center gap-3 w-full" key={i}>
            <div className="relative w-full">
              <Image
                src={clip.video}
                alt="video"
                width={180}
                height={120}
                className="w-full h-[6.5rem] object-cover rounded brightness-90"
              />
              <MdOutlinePlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-24-28" />
            </div>
            <div className="w-full justify-center items-center flex">
              <Image
                src={clip.scoutImage}
                alt="scout"
                width={48}
                height={48}
                className="size-12 object-cover rounded"
              />
              <div className="flex flex-col w-[50%]">
                <p className="text-10-12 text-dark">Scouted By</p>
                <p className="text-14-16 font-bold text-primary-2">
                  {clip.scoutName}
                </p>
              </div>
              <RiMedalLine className="text-primary-2 text-14-16" />
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-dark font-bold text-16-19">Comparison</h2>
      <div className="w-full grid grid-cols-6 gap-5">
        {comparisons.map((comp, i) => (
          <div
            key={i}
            className="flex flex-col bg-white shadow-custom rounded-lg p-1 gap-2"
          >
            <Image
              src={comp.image}
              alt="compare image"
              width={50}
              height={50}
              className="w-full h-[3rem] object-cover rounded-md"
            />
            <div className="w-full flex flex-col gap-0.5">
              <div className="flex w-full items-center justify-between">
                <p className="text-10-12 text-dark text-opacity-[0.88]">
                  Fouls
                </p>
                <p className="text-10-12 text-dark text-opacity-[0.88]">
                  {comp.fouls}
                </p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-10-12 text-dark text-opacity-[0.88]">
                  Goals
                </p>
                <p className="text-10-12 text-dark text-opacity-[0.88]">
                  {comp.goals}
                </p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-10-12 text-dark text-opacity-[0.88]">
                  Assists
                </p>
                <p className="text-10-12 text-dark text-opacity-[0.88]">
                  {comp.assists}
                </p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-10-12 text-dark text-opacity-[0.88]">
                  Clean Sheet
                </p>
                <p className="text-10-12 text-dark text-opacity-[0.88]">
                  {comp.cleanSheet}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clips;
