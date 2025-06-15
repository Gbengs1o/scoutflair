"use client";

import React from "react";
import Image from "next/image";
import { RiMedalLine } from "react-icons/ri";
import { Loader } from "@mantine/core";

// --- Mock Hook for Demonstration ---
// This simulates your data fetching and can be replaced with your actual hook.
const useMockGetScoutPlayerMetrics = () => {
  const [loading, setLoading] = React.useState(true);
  const data = { playerScoutedNumber: 87 };

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate network delay
    return () => clearTimeout(timer);
  }, []);

  return { loading, data, success: !loading };
};

const playerImageUrls = [
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1948.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1973.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_2071.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002582_793_4993.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1795.png",
];

const PlayersScoutedCard = () => {
  const { loading, data, success } = useMockGetScoutPlayerMetrics();

  const visibleAvatars = 3;
  const remainingPlayers = data ? Math.max(0, data.playerScoutedNumber - visibleAvatars) : 0;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex flex-col min-h-[200px]">
      {loading ? (
        <div className="flex-grow flex items-center justify-center">
          <Loader color="blue" size="sm" />
        </div>
      ) : (
        success && data && (
          <div className="flex flex-col h-full">
            {/* --- Header with Larger Text --- */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Players Scouted
                </h2>
                <p className="text-base text-slate-500">Total unique athletes</p>
              </div>
              <div className="bg-blue-100 text-blue-600 rounded-full p-2 shadow-sm">
                <RiMedalLine size={24} />
              </div>
            </div>

            <div className="flex-grow" />

            {/* --- Footer with Larger Stats & Text --- */}
            <div className="flex justify-between items-end">
              <div className="flex items-center group -space-x-3 hover:space-x-1 transition-all duration-300">
                {playerImageUrls.slice(0, visibleAvatars).map((url, i) => (
                  <Image
                    key={i}
                    src={url}
                    alt={`Scouted player ${i + 1}`}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-300 group-hover:scale-110"
                  />
                ))}
                {remainingPlayers > 0 && (
                  <div className="h-10 w-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-slate-600">
                      +{remainingPlayers}
                    </span>
                  </div>
                )}
              </div>

              {/* --- Main Stat with Larger Text --- */}
              <div className="text-right">
                <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
                  {data.playerScoutedNumber}
                </h1>
                <p className="text-base font-medium text-slate-600 -mt-1">
                  In Total
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PlayersScoutedCard;