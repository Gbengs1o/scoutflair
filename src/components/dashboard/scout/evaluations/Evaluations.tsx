"use client"; // Assuming this might be needed if child components are client components

import React from "react";
import Badges from "../common/Badges";
import Players from "../common/Players";
import Prospects from "../common/Prospects";
import Feed from "../common/Feed";
import AllPlayers from "./AllPlayers"; // Assuming path is correct based on previous context

const Evaluations: React.FC = () => {
  return (
    <div className="w-full flex flex-col p-3 sm:p-4 md:p-6 gap-4 md:gap-6"> {/* Responsive padding & main gap */}

      {/* Top Section: Players, Prospects, Badges */}
      <div className="w-full flex flex-col lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4 md:gap-6"> {/* Responsive layout & gap */}
        {/* Left part of top section: Players & Prospects */}
        <div className="w-full flex flex-col sm:flex-row gap-4 md:gap-6"> {/* Stacks on mobile, row on sm+ */}
          <div className="w-full sm:flex-1"> {/* Each takes half width on sm+, full on mobile */}
            <Players />
          </div>
          <div className="w-full sm:flex-1">
            <Prospects />
          </div>
        </div>
        {/* Right part of top section: Badges */}
        <div className="w-full">
          <Badges />
        </div>
      </div>

      {/* Bottom Section: AllPlayers, Feed */}
      <div className="w-full flex flex-col lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-4 md:gap-6"> {/* Responsive layout & gap */}
        {/* Left part of bottom section: AllPlayers */}
        <div className="w-full">
          <AllPlayers />
        </div>
        {/* Right part of bottom section: Feed */}
        <div className="w-full lg:sticky lg:top-6 lg:self-start h-auto lg:h-full">
          {/*
            - `lg:sticky lg:top-6 lg:self-start`: Apply sticky positioning only on lg screens and up.
            - `h-auto lg:h-full`: Allow natural height on mobile, attempt full height for sticky parent on lg.
              Note: For sticky to work effectively, the parent of this div (the grid column)
              and its ancestors up to the scroll container need to allow overflow or have sufficient height.
              If the `Feed` content itself is scrollable, this can work well.
              If `Feed` is very long and `AllPlayers` is short, on mobile the page will just be long.
          */}
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Evaluations;