"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// --- Data for our dynamic scouts ---
const scoutProfiles = [
  {
    name: "Alex Ray",
    image: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1948.png",
  },
  {
    name: "Maria Garcia",
    image: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1973.png",
  },
  {
    name: "David Chen",
    image: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_2071.png",
  },
  {
    name: "Sofia Rossi",
    image: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002582_793_4993.png",
  },
  {
    name: "Jordan Lee",
    image: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1795.png",
  },
];

interface IBadge {
  label: string;
  sub: string;
  value: number;
  color: string;
}

// Helper function to generate a random number
const getRandomValue = () => Math.floor(Math.random() * 100);

const Badges = () => {
  const [currentScout, setCurrentScout] = useState(scoutProfiles[0]);

  const [badges, setBadges] = useState<IBadge[]>([
    { label: "Experience", sub: "Professional", color: "#EF4444", value: getRandomValue() }, // Using Tailwind's red-500
    { label: "Transfers", sub: "Successful", color: "#22C55E", value: getRandomValue() }, // Using Tailwind's green-500
    { label: "Accuracy", sub: "Scouting", color: "#3B82F6", value: getRandomValue() }, // Using Tailwind's blue-500
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * scoutProfiles.length);
      setCurrentScout(scoutProfiles[randomIndex]);

      setBadges((prevBadges) =>
        prevBadges.map((badge) => ({ ...badge, value: getRandomValue() }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-6">
      {/* --- Header --- */}
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <Image
            src={currentScout.image}
            alt={`${currentScout.name}'s profile picture`}
            width={48}
            height={48}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-blue-100"
          />
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-gray-800 font-bold text-base sm:text-lg lg:text-xl leading-tight truncate">
            {currentScout.name}
          </h2>
          <p className="text-gray-500 text-sm font-medium">Scout Badges</p>
        </div>
      </div>

      {/* --- Corrected & Responsive Badges Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
        {badges.map((badge, index) => (
          <div
            key={index}
            // A flex-col container for the new card structure
            className="bg-slate-50 rounded-xl border border-slate-200/80 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 flex flex-col"
          >
            {/* 1. Top Label (now correctly on top) */}
            <h4 className="pt-3 pb-2 text-center text-gray-500 text-xs font-bold uppercase tracking-wider">
              {badge.label}
            </h4>

            {/* 2. Accent Line (now a separator) */}
            <div
              className="h-[2px] mx-4"
              style={{ backgroundColor: badge.color }}
            ></div>

            {/* 3. Main Content Area */}
            <div className="flex-grow flex flex-col items-center justify-center py-2 sm:py-3">
              <div className="flex items-baseline">
                <span
                  className="text-4xl sm:text-5xl font-bold tabular-nums"
                  style={{ color: badge.color }}
                >
                  {badge.value.toString().padStart(2, "0")}
                </span>
                <span className="text-xl font-light text-gray-400 ml-1">%</span>
              </div>
              <p className="mt-1 text-gray-600 text-sm font-medium capitalize">
                {badge.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Update Indicator --- */}
      <div className="flex items-center justify-center gap-2 opacity-60">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-500 font-medium">Updates every 5s</span>
      </div>
    </div>
  );
};

export default Badges;