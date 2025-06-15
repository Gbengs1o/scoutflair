import React from "react";
import Ads from "../common/Ads";
import Feeds from "../common/Feeds";
import Slides from "./Slides";

const Gallery = () => {
  return (
    // The key change is here:
    // - `grid-cols-1` is the default (mobile), stacking everything vertically.
    // - `lg:grid-cols-[2fr_1fr]` applies the two-column layout only on large screens (1024px and wider).
    <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] p-6 gap-6">
      
      {/* Main content area */}
      <Slides />

      {/* Sidebar area */}
      <div className="flex flex-col gap-6 w-full">
        <Feeds />
        {/* The 'sticky' class works best on larger screens where there's room to scroll past it */}
        <div className="sticky top-20 self-start">
          <Ads />
        </div>
      </div>

    </div>
  );
};

export default Gallery;