import React from "react";
import Badges from "../common/Badges";
import Feed from "../common/Feed";
import Plan from "./Plan";
import Players from "../common/Players";
import Prospects from "../common/Prospects";

const Overview = () => {
  return (
    // Use flex-col for mobile, and lg:grid for desktop
    <div className="w-full flex flex-col gap-6">
      {/* Section 1: Players, Prospects, Badges */}
      <div className="w-full flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-6">
        {/* This part stacks on mobile/tablet */}
        <div className="w-full flex flex-col sm:flex-row gap-6">
          <Players />
          <Prospects />
        </div>
        <Badges />
      </div>

      {/* Section 2: Plan, Feed */}
      <div className="w-full flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-6">
        <Plan />
        {/* Sticky behavior only on large screens where the column layout is active */}
        <div className="w-full lg:sticky lg:top-6 lg:self-start">
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Overview;