"use client";

import React from "react";
import UpcomingMatchBanner from "./UpcomingMatch";
import UpcomingMatches from "./UpcomingMatches";
import RecentMatches from "./RecentMatches";
import { useGetUpcomingMatches } from "@/hooks/match";

const Matches = () => {
  const { loading, data } = useGetUpcomingMatches();

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6">
      <UpcomingMatchBanner loading={loading} data={data} />
      {/* Responsive Grid: Stacks on mobile, 2 columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
        <UpcomingMatches loading={loading} data={data} />
        <RecentMatches />
      </div>
    </div>
  );
};

export default Matches;