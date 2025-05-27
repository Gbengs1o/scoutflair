import React from "react";
import Ads from "../common/Ads";
import Feeds from "../common/Feeds";
import Posts from "../../../reusable/post/Posts";

import CreateNewPost from "./CreateNewPost";

const Spotlight = () => {
  return (
    <div className="w-full p-3 sm:p-4 md:p-5 xl:p-6 gap-3 sm:gap-4 md:gap-5 xl:gap-6">
      {/* Mobile & Small Tablet Layout - Single Column */}
      <div className="xl:hidden w-full flex flex-col gap-3 sm:gap-4 md:gap-5">
        <CreateNewPost />
        
        {/* Mobile Feeds - Show at top on mobile for better engagement */}
        <div className="sm:hidden">
          <Feeds />
        </div>
        
        <Posts currentPlayer={false} />
        
        {/* Tablet/Small Laptop Feeds - Show after posts */}
        <div className="hidden sm:block xl:hidden">
          <Feeds />
        </div>
        
        {/* Mobile/Tablet/Small Laptop Ads - Show at bottom */}
        <div className="xl:hidden">
          <Ads />
        </div>
      </div>

      {/* Large Desktop Layout - Two Columns */}
      <div className="hidden xl:grid xl:grid-cols-[2fr_1fr] xl:gap-6 w-full">
        <div className="w-full flex flex-col gap-6">
          <CreateNewPost />
          <Posts currentPlayer={false} />
        </div>

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

export default Spotlight;