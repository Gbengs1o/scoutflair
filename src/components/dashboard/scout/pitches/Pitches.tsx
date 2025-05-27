"use client";

import React, { useState } from "react";
import Map from "@/components/reusable/MapImage";
import Image from "next/image";
import Void from "@/public/images/Void.png";
import PitchCard from "./PitchCard";
import { iLocalPitchResponse, useGetLocalPitches } from "@/hooks/pitch";
import { Loader } from "@mantine/core";
import ViewPitch from "./ViewPitch";
import Link from "next/link";

const PitchesPage = () => {
  return <PitchesContent />;
};

const PitchesContent = () => {
  const { data: pitchesData, loading } = useGetLocalPitches();
  const [currentPitch, setCurrentPitch] = useState<iLocalPitchResponse | null>(null);

  const pitches = pitchesData || [];

  return (
    <div
      className={`w-full min-h-screen flex flex-col lg:grid lg:gap-4 xl:gap-6 p-3 sm:p-4 md:p-6
                  ${currentPitch === null
                    ? 'lg:grid-cols-1' // When no pitch is selected, list takes full width on lg+
                    // When a pitch is selected:
                    // lg (laptop): ViewPitch takes more space (e.g., ~60%), Map takes less (e.g., ~40%)
                    // xl (large desktop): Map takes more space (e.g., ~55%), ViewPitch takes less (e.g., ~45%)
                    : 'lg:grid-cols-[minmax(0,_1.5fr)_minmax(0,_1fr)] xl:grid-cols-[minmax(0,_1fr)_minmax(0,_1.2fr)]'
                  }
                  transition-all duration-300 ease-out`}
    >
      {/* Column 1: Pitch List or ViewPitch */}
      <div className={`flex flex-col w-full bg-white shadow-custom rounded-lg md:rounded-xl overflow-hidden
                      ${currentPitch !== null ? 'lg:max-h-[calc(100vh-theme(spacing.12))] lg:overflow-y-auto' : 'h-full'}`}>
        {currentPitch === null && (
          // Pitch List View
          <div className="flex flex-col h-full">
            {/* Header for Pitch List */}
            <div className="flex flex-col sm:flex-row w-full px-3 py-3 sm:p-4 items-center justify-between border-b border-gray-200 flex-shrink-0">
              <h2 className="text-base sm:text-lg md:text-xl text-dark font-bold mb-2 sm:mb-0">
                Available Pitches
              </h2>
              <Link
                href={"/dashboard/scout/pitches/add"}
                className="border-primary-2 border rounded-md px-3 py-1.5 text-primary-2 text-xs sm:text-sm font-semibold hover:bg-primary-2 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-2"
              >
                Add New
              </Link>
            </div>

            {/* Content: Cards or Loading/Empty State - This part scrolls */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {loading && (
                <div className="w-full h-full min-h-[60vh] flex justify-center items-center">
                  <Loader color="primary.6" />
                </div>
              )}
              {!loading && pitches.length > 0 && (
                <div
                  // Grid for Pitch Cards:
                  // Mobile: 1 column
                  // SM: 2 columns
                  // MD: 2 columns (Could be 3 if cards are narrow, but 2 is safer for wider cards)
                  // LG (Laptop): 3 columns
                  // XL (Large Desktop): 4 columns
                  // 2XL (Very Large Desktop): 4 columns (Could be 5 if cards are very narrow)
                  className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4"
                >
                  {pitches.map((pitch) => (
                    <PitchCard
                      key={pitch.localPitchId || pitch.id}
                      pitch={pitch}
                      onSelected={() => {
                        setCurrentPitch(pitch);
                      }}
                    />
                  ))}
                </div>
              )}
              {!loading && pitches.length === 0 && (
                <div className="w-full h-full min-h-[60vh] flex flex-col justify-center items-center gap-4 sm:gap-5 text-center">
                  <Image
                    src={Void}
                    alt="No pitches available"
                    width={100}
                    height={100}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain text-gray-400"
                  />
                  <h2 className="text-dark text-sm sm:text-base font-medium px-4">
                    There are no local pitches available yet.
                  </h2>
                  <p className="text-placeholder text-xs sm:text-sm">Try adding a new one!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {currentPitch !== null && (
          <ViewPitch
            pitch={currentPitch}
            onClose={() => setCurrentPitch(null)}
          />
        )}
      </div>

      {/* Column 2: Map (only if currentPitch is selected) */}
      {currentPitch !== null && (
        <div className="mt-4 lg:mt-0 w-full h-64 sm:h-80 md:h-96 lg:h-full rounded-lg md:rounded-xl overflow-hidden shadow-custom">
          <Map
            latitude={Number.parseFloat(currentPitch.latitude)}
            longitude={Number.parseFloat(currentPitch.longitude)}
            key={currentPitch.localPitchId || currentPitch.id} // Key ensures map re-renders if pitch changes
          />
        </div>
      )}
    </div>
  );
};

export default PitchesPage;