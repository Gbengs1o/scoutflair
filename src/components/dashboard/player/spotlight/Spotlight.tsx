import React from "react";
import Ads from "../common/Ads";
import Feeds from "../common/Feeds";
import Posts from "../../../reusable/post/Posts";

import CreateNewPost from "./CreateNewPost";

const Spotlight = () => {
  return (
    // 1. Adjusted padding for mobile and changed the grid layout
    <div className="w-full p-4 md:p-6 gap-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
      {/* This is the main content column, it will appear on top on mobile */}
      <div className="w-full flex flex-col gap-6">
        <CreateNewPost />
        <Posts currentPlayer={false} />
      </div>

      {/* This is the sidebar column, it will stack below the main content on mobile */}
      <div className="flex flex-col gap-6 w-full">
        <Feeds />
        {/* 2. Made the 'Ads' component sticky only on large screens */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Ads />
        </div>
      </div>
    </div>
  );
};

export default Spotlight;