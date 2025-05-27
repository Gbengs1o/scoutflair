import React from "react";
import Badges from "../common/Badges";   // Assuming these are present
import Feed from "../common/Feed";       // Assuming these are present
import Plan from "./Plan";               // Assuming these are present
import Players from "../common/Players";   // Assuming these are present
import Prospects from "../common/Prospects"; // Assuming these are present

// Dummy components for standalone testing
// const DummyComponent: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
//   <div className={`p-4 border border-dashed border-gray-400 rounded bg-gray-100 ${className}`}>
//     <p className="text-center font-semibold">{name}</p>
//     <p className="text-xs text-center text-gray-500">Content for {name}</p>
//   </div>
// );
// const Players = () => <DummyComponent name="Players" className="h-full" />;
// const Prospects = () => <DummyComponent name="Prospects" className="h-full" />;
// const Badges = () => <DummyComponent name="Badges" className="h-full" />;
// const Plan = () => <DummyComponent name="Plan" className="min-h-[200px]" />; // Give Plan some min-height for demo
// const Feed = () => <DummyComponent name="Feed" className="min-h-[300px]" />; // Give Feed some min-height for demo


const Overview = () => {
  return (
    // Base: p-4, gap-4 for mobile
    // md+: p-6, gap-6 for larger screens
    <div className="w-full flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      {/* --- FIRST ROW: Players, Prospects, Badges --- */}
      {/* Mobile: flex-col to stack all three groups. */}
      {/* lg+: grid layout as originally intended, h-[8.5rem] or min-h-[8.5rem] applied here. */}
      {/* Using lg: breakpoint for this more complex 2-column split to give more space. */}
      <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-6 lg:h-[8.5rem]"> {/* Apply fixed height only on lg+ */}

        {/* Players & Prospects Group */}
        {/* Mobile: flex-col to stack Players and Prospects */}
        {/* md (intermediate): flex-row if enough space BEFORE the main lg:grid kicks in */}
        {/* lg+: flex-row, h-full to fill the grid cell height */}
        <div className="w-full flex flex-col gap-4 md:flex-row md:gap-6 lg:h-full">
          {/*
            On md:flex-row, these children will share space.
            md:flex-1 makes them share equally.
            If they have intrinsic widths or one should be larger, adjust accordingly (e.g., md:w-1/2 or md:w-2/3 etc.)
          */}
          <div className="w-full md:flex-1 lg:h-full"> {/* lg:h-full if Players component should fill */}
            <Players />
          </div>
          <div className="w-full md:flex-1 lg:h-full"> {/* lg:h-full if Prospects component should fill */}
            <Prospects />
          </div>
        </div>

        {/* Badges Component */}
        {/* Takes full width in the mobile column stack. */}
        {/* On lg+, it's in its grid cell. lg:h-full to fill the grid cell height. */}
        <div className="w-full lg:h-full">
          <Badges />
        </div>
      </div>

      {/* --- SECOND ROW: Plan, Feed --- */}
      {/* Mobile: flex-col to stack Plan and Feed. */}
      {/* lg+: grid layout. */}
      <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-6">
        {/* Plan Component */}
        <div className="w-full">
          <Plan />
        </div>

        {/* Feed Component - Sticky */}
        {/*
          Adjust sticky top:
          - top-4 for smaller screens (matches p-4)
          - lg:top-6 for larger screens (matches md:p-6, assuming sticky starts at lg breakpoint)
          self-start helps with alignment in flex/grid context before sticky takes over.
          h-full might be an issue if its parent (the grid cell) doesn't have a determined height.
          Often, sticky elements have their own max-height and overflow.
          For this example, we'll keep w-full. The h-full on lg means it tries to fill the implicit height of the grid row.
        */}
        <div className="sticky top-4 self-start w-full lg:top-6 lg:h-auto"> {/* lg:h-auto or specific height for Feed if needed */}
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Overview;