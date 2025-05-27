"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { RiMedalLine } from "react-icons/ri";
import Pic from "@/public/images/ellipse-67.png"; // Scout image
import Pic2 from "@/public/images/pvid2.png"; // Comparison player image
import Background from "@/public/images/vid2.png"; // Video thumbnail placeholder

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

const Clips: React.FC = () => {
  const [clips, setClips] = useState<iClip[]>(
    Array(3).fill({
      scoutImage: Pic,
      scoutName: "John Doe The Scout With A Very Long Name", // Longer name for testing
      video: Background,
    })
  );

  const [comparisons, setComparisons] = useState<iComparison[]>(
    Array(6).fill({
      image: Pic2,
      fouls: 12,
      goals: 25,
      assists: 18,
      cleanSheet: 5,
    })
  );

  // Translating custom font sizes:
  // text-16-19 -> text-sm sm:text-base md:text-lg
  // text-14-16 -> text-xs sm:text-sm
  // text-14-24 (button) -> text-xs sm:text-sm (typical button range)
  // text-10-12 -> text-[10px] sm:text-xs (or just text-xs if 10px is too small)
  // text-24-28 (play icon) -> text-3xl sm:text-4xl

  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col
                   py-3 px-3 sm:py-4 sm:px-4 md:px-5 gap-4 sm:gap-5 md:gap-6"> {/* Responsive padding & main gap */}
      {/* Header 1: Player's Clips */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-dark font-bold text-sm sm:text-base md:text-lg"> {/* Responsive font */}
          Player's Clips
        </h2>
        <p className="font-medium text-dark text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:underline"> {/* Responsive font, interactive */}
          Edit
        </p>
      </div>

      {/* View All Players Button */}
      <button className="bg-primary-2 rounded-lg text-white
                         text-xs sm:text-sm
                         w-full py-2 px-4 self-start
                         sm:w-auto sm:max-w-[200px]
                         hover:bg-primary-2/90 transition-colors"> {/* Responsive width, padding, font */}
        View All Players
      </button>

      {/* Clips Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5"> {/* Responsive columns & gap */}
        {clips.map((clip, i) => (
          <div className="flex flex-col gap-2 sm:gap-3 w-full" key={i}>
            {/* Video Thumbnail */}
            <div className="relative w-full aspect-video overflow-hidden rounded-lg group cursor-pointer"> {/* Aspect ratio, interactive */}
              <Image
                src={clip.video}
                alt={`Video clip ${i + 1}`}
                layout="fill"
                objectFit="cover"
                className="brightness-90 group-hover:brightness-100 transition-all"
                // width/height props are for intrinsic size for optimization, not display with layout="fill"
                // e.g. width={1280} height={720}
              />
              <MdOutlinePlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white
                                            text-3xl sm:text-4xl md:text-5xl
                                            group-hover:scale-110 transition-transform" /> {/* Responsive icon */}
            </div>
            {/* Scout Info */}
            <div className="w-full flex items-center gap-2 px-1">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full overflow-hidden"> {/* Responsive scout image container */}
                <Image
                  src={clip.scoutImage}
                  alt={`${clip.scoutName} - scout`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0"> {/* flex-1 to take available space, min-w-0 for truncation */}
                <p className="text-dark text-[10px] sm:text-xs truncate">Scouted By</p>
                <p className="font-bold text-primary-2 text-xs sm:text-sm truncate"> {/* Responsive font, truncate */}
                  {clip.scoutName}
                </p>
              </div>
              <RiMedalLine className="text-primary-2 text-base sm:text-lg flex-shrink-0" /> {/* Responsive icon */}
            </div>
          </div>
        ))}
      </div>

      {/* Header 2: Comparison */}
      <h2 className="text-dark font-bold text-sm sm:text-base md:text-lg mt-2 sm:mt-4"> {/* Responsive font, margin top */}
        Comparison
      </h2>

      {/* Comparison Grid */}
      <div className="w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3"> {/* Responsive columns & gap */}
        {comparisons.map((comp, i) => (
          <div
            key={i}
            className="flex flex-col bg-white shadow-custom rounded-lg p-1.5 sm:p-2 gap-1.5 sm:gap-2 items-center" /* Responsive padding & gap */
          >
            {/* Comparison Player Image */}
            <div className="relative w-full aspect-square rounded-md overflow-hidden"> {/* Aspect ratio container */}
              <Image
                src={comp.image}
                alt={`Comparison player ${i + 1}`}
                layout="fill"
                objectFit="cover"
                // width/height for intrinsic size
                // e.g. width={100} height={100}
              />
            </div>
            {/* Stats */}
            <div className="w-full flex flex-col gap-0.5 text-[10px] sm:text-xs"> {/* Responsive font for stats */}
              {[
                { label: "Fouls", value: comp.fouls },
                { label: "Goals", value: comp.goals },
                { label: "Assists", value: comp.assists },
                { label: "Clean Sheet", value: comp.cleanSheet },
              ].map((stat) => (
                <div key={stat.label} className="flex w-full items-center justify-between">
                  <p className="text-dark/80">{stat.label}</p>
                  <p className="text-dark font-medium">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clips;