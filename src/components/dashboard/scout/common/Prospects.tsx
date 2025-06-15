"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GiSwordsEmblem } from "react-icons/gi";

// --- Data Pools for Random Prospect Generation ---
const prospectImageUrls = [
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1795.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1826.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002582_793_4993.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1948.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1973.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_2071.png",
];
const firstNames = ["Leo", "Kai", "Jude", "Victor", "Jamal", "Santi", "Liam", "Noah"];
const lastNames = ["Silva", "Hernandez", "Müller", "Saka", "Rice", "Bello", "Okafor", "Gomez"];

interface Prospect {
  playerFullName: string;
  playerImageUrl: string;
  playerGA: number;
}

const generateRandomProspects = (): Prospect[] => {
  const newProspects: Prospect[] = [];
  const usedIndices = new Set<number>();
  while (newProspects.length < 3) {
    let imageIndex = Math.floor(Math.random() * prospectImageUrls.length);
    if (!usedIndices.has(imageIndex)) {
      usedIndices.add(imageIndex);
      newProspects.push({
        playerFullName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        playerImageUrl: prospectImageUrls[imageIndex],
        playerGA: Math.floor(Math.random() * 21) + 5,
      });
    }
  }
  return newProspects;
};

const TopProspectsCard = () => {
  const [prospects, setProspects] = useState<Prospect[]>(generateRandomProspects());
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProspects(generateRandomProspects());
      setKey(prevKey => prevKey + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 sm:p-6 flex flex-col gap-6 min-h-[210px]">
      {/* --- Header with Readable Text --- */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Top Prospects</h2>
          <p className="text-base text-slate-500">Players with high potential</p>
        </div>
        <div className="bg-green-100 text-green-600 rounded-full p-2 shadow-sm">
          <GiSwordsEmblem size={24} />
        </div>
      </div>

      {/* --- Responsive & Corrected Prospect Grid --- */}
      <div key={key} className="grid grid-cols-3 gap-3 sm:gap-4 animate-fade-in">
        {prospects.map((prospect, index) => (
          <div
            key={index}
            className="relative bg-slate-50 border border-slate-200 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:border-slate-300 flex flex-col items-center pb-4"
          >
            {/* Image is still absolute to pop out */}
            <Image
              src={prospect.playerImageUrl}
              alt={prospect.playerFullName}
              width={56}
              height={56}
              className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full absolute -top-6 border-4 border-white shadow-lg"
            />
            
            {/* THIS IS THE FIX: A new div with margin-top to push text down */}
            <div className="flex flex-col items-center text-center mt-8">
              <p className="text-sm font-semibold text-slate-700 w-full truncate px-1">
                {prospect.playerFullName}
              </p>
              <p className="text-xs font-bold text-green-600 mt-0.5">
                {prospect.playerGA} GA
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// To use the animation, add this to your tailwind.config.js
/*
module.exports = {
  // ...
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  // ...
}
*/

export default TopProspectsCard;