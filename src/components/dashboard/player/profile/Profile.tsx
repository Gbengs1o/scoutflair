import React from "react";
import Banner from "./Banner";
import Bio from "./Bio";
import Posts from "../../../reusable/post/Posts";

const Profile = () => {
  return (
    // The padding can be adjusted for mobile if needed, e.g., p-4 lg:p-6
    <div className="w-full flex flex-col gap-6 p-4 md:p-6">
      <Banner />

      {/* This is the main layout container for Bio and Posts */}
      <div className="w-full flex flex-col lg:grid lg:grid-cols-[1fr_2fr] gap-6">
        
        {/* On large screens (lg), this div becomes sticky. On smaller screens, it's a normal div. */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Bio />
        </div>

        <Posts currentPlayer={true} />
      </div>
    </div>
  );
};

export default Profile;