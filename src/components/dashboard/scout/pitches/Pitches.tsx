"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineFilterAlt } from "react-icons/md"; // This import wasn't used, but I'll leave it in.
import { Loader } from "@mantine/core";

import Map from "@/components/reusable/MapImage";
import PitchCard from "./PitchCard";
import ViewPitch from "./ViewPitch";
import { iLocalPitchResponse, useGetLocalPitches } from "@/hooks/pitch";
import Void from "@/public/images/Void.png";

const Pitches = () => {
  const { data, loading } = useGetLocalPitches();
  const [currentPitch, setCurrentPitch] = useState<iLocalPitchResponse | null>(
    null
  );

  return (
    // CHANGE 1: Main Layout Responsiveness
    // - On mobile (default), it's always a single-column grid (`grid-cols-1`).
    // - On large screens (`lg:`) and up, it becomes a two-column grid *only if* a pitch is selected.
    // - `min-h-screen` is used instead of `h-[100vh]` to be more flexible if content overflows vertically on small screens.
    // - Padding is adjusted for smaller screens (`p-4`) and larger screens (`md:p-6`).
    <div
      className={`w-full min-h-screen grid ${
        currentPitch === null ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
      } gap-6 p-4 md:p-6 transition-all duration-300 ease-out`}
    >
      {/* This container for the list/details now works well in a single or double column layout */}
      <div className="flex flex-col h-full w-full shadow-custom rounded-2xl py-4 bg-white">
        {/* LIST VIEW */}
        {currentPitch === null && (
          <div className="flex flex-col w-full px-4 md:px-5 gap-6 h-full">
            <div className="w-full items-center flex justify-between">
              <h2 className="text-lg md:text-xl text-dark font-bold">
                Available Pitches
              </h2>
              <Link
                href={"/dashboard/scout/pitches/add"}
                className="border-primary-2 border rounded px-3 py-1.5 text-primary-2 text-sm font-medium hover:bg-primary-2/10 transition-colors"
              >
                Add New
              </Link>
            </div>

            {/* CHANGE 2: Pitch Card Grid Responsiveness */}
            {/* - This grid now adapts to the screen size.
                - Mobile (default): 1 column (`grid-cols-1`)
                - Small screens (`sm:`): 2 columns
                - Large screens (`lg:`): 3 columns
                - Extra-large screens (`xl:`): 4 columns
               - The complex ternary logic is removed as it's no longer needed. */}
            {!loading && data.length > 0 && (
              <div
                className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {data.map((pitch) => (
                  <PitchCard
                    key={pitch.id} // Use a unique ID from the data for the key
                    pitch={pitch}
                    onSelected={() => {
                      setCurrentPitch(pitch);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Loader State */}
            {loading && (
              <div className="w-full h-full flex-grow grid place-content-center">
                <Loader color="primary.6" />
              </div>
            )}

            {/* Empty State */}
            {!loading && data.length === 0 && (
              <div className="w-full h-full flex-grow flex flex-col justify-center items-center gap-5 my-16 text-center">
                <Image
                  src={Void}
                  alt="No pitches available"
                  width={100}
                  height={100}
                  className="w-32 h-auto object-cover"
                />
                <h2 className="text-dark text-sm font-medium">
                  There are no local pitches available yet.
                </h2>
              </div>
            )}
          </div>
        )}

        {/* DETAIL VIEW */}
        {currentPitch !== null && (
          <ViewPitch
            pitch={currentPitch}
            onClose={() => setCurrentPitch(null)}
          />
        )}
      </div>

      {/* MAP VIEW */}
      {/* This will now appear below the details on mobile/tablet, and to the right on large screens */}
      {currentPitch !== null && (
        <div className="w-full h-[50vh] lg:h-full rounded-2xl overflow-hidden shadow-custom">
           <Map
             latitude={Number.parseFloat(currentPitch.latitude)}
             longitude={Number.parseFloat(currentPitch.longitude)}
           />
        </div>
      )}
    </div>
  );
};

export default Pitches;