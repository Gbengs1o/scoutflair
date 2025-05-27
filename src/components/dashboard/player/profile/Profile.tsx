import React from "react";
import Banner from "./Banner";
import Bio from "./Bio";
import Posts from "../../../reusable/post/Posts";

const Profile = () => {
  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 p-3 sm:p-4 md:p-6">
      <Banner />
      <div className="w-full flex flex-col lg:grid lg:grid-cols-[1fr_2fr] gap-4 sm:gap-6">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Bio />
        </div>
        <Posts currentPlayer={true} />
      </div>
    </div>
  );
};

export default Profile;