"use client";

import React from "react";
// Assuming these components are defined as in the previous example
// import UpcomingMatchBanner from "./UpcomingMatchBanner";
// import UpcomingMatches from "./UpcomingMatches";
// import RecentMatches from "./RecentMatches";
// import Articles from "./Articles"; // You'd need to import/define this
// import Reviews from "./Reviews";   // You'd need to import/define this
import { useGetUpcomingMatches } from "@/hooks/match";


// Using placeholder components from the previous example for completeness
const PlaceholderComponent: React.FC<{ name: string; loading?: boolean; data?: any, isSticky?: boolean }> = ({ name, loading, isSticky }) => (
  <div className={`bg-gray-100 p-4 rounded-lg shadow ${isSticky ? 'border-2 border-blue-300' : ''}`}>
    <h3 className="font-semibold text-lg mb-2">{name} {isSticky && "(Sticky)"}</h3>
    {loading && <p>Loading...</p>}
    <p className="text-sm">Content for {name}</p>
    <div className="h-32 bg-gray-200 mt-2"></div> {/* Placeholder for content height */}
  </div>
);

const UpcomingMatchBanner: React.FC<{ loading?: boolean; data?: any }> = ({ loading, data }) => (
  <PlaceholderComponent name="Upcoming Match Banner" loading={loading} data={data} />
);
const UpcomingMatches: React.FC<{ loading?: boolean; data?: any }> = ({ loading, data }) => (
  <PlaceholderComponent name="Upcoming Matches (Potentially Sticky)" loading={loading} data={data} isSticky />
);
const RecentMatches: React.FC = () => <PlaceholderComponent name="Recent Matches" />;
const Articles: React.FC = () => <PlaceholderComponent name="Articles" />;
const Reviews: React.FC = () => <PlaceholderComponent name="Reviews (Potentially Sticky)" isSticky />;
// End Placeholder components


const ComplexPageLayout = () => {
  const { loading, data } = useGetUpcomingMatches();

  return (
    // Main container:
    // Mobile: flex-col (stacks the two main columns)
    // lg and up: flex-row (two main columns side-by-side)
    // Responsive padding and gap
    <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6">

      {/* Left Column */}
      {/* Mobile: w-full */}
      {/* lg and up: w-1/2 (takes half the width) */}
      <div className="flex flex-col w-full lg:w-1/2 gap-4 lg:gap-6">
        <UpcomingMatchBanner loading={loading} data={data} />
        <RecentMatches />
        {/* Sticky element will be sticky within this column */}
        <div className="lg:sticky lg:top-6"> {/* Apply sticky only on lg+ screens if desired, or keep it always sticky */}
          <UpcomingMatches loading={loading} data={data} />
        </div>
      </div>

      {/* Right Column */}
      {/* Mobile: w-full */}
      {/* lg and up: w-1/2 (takes half the width) */}
      <div className="flex flex-col w-full lg:w-1/2 gap-4 lg:gap-6">
        <Articles />
        {/* Sticky element will be sticky within this column */}
        <div className="lg:sticky lg:top-6"> {/* Apply sticky only on lg+ screens if desired, or keep it always sticky */}
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default ComplexPageLayout;