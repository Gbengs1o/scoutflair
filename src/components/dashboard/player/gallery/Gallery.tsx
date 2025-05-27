import React from "react";
import Ads from "../common/Ads";
import Feeds from "../common/Feeds";
import Slides from "./Slides";

const Gallery = () => {
  return (
    <div className="w-full p-3 sm:p-6">
      {/* Mobile Layout: Stacked */}
      <div className="flex flex-col gap-4 sm:gap-6 lg:hidden">
        <Slides />
        <Feeds />
        <Ads />
      </div>
      
      {/* Desktop Layout: Grid */}
      <div className="hidden lg:grid lg:grid-cols-[2fr_1fr] lg:gap-6">
        <Slides />
        <div className="flex flex-col gap-6 w-full">
          <Feeds />
          <div className="sticky top-20 self-start">
            <Ads />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;