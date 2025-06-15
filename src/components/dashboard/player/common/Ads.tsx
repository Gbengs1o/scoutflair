import React from "react";

import Image from "next/image";
import UpcomingMatch from "@/public/dashboard/player/unsplash_t8vre7qpm2m.png";

const Ads = () => {
  return (
    <div className="w-full shadow-custom rounded-[1rem] pt-4 pb-10 px-5 gap-6 bg-white flex flex-col relative overflow-hidden">
      <div className="flex flex-col w-1/2 gap-11">
        <h2 className=" font-bold text-16-19 text-dark">Featured Ads</h2>
        <div className="w-full flex flex-col gap-7">
          <div className="space-y-1">
            <h2 className="text-14-18 font-semibold text-primary-2">
              Subscribe to Scoutflair Premium Plan
            </h2>
            <p className="text-8-9 text-dark">
              Lorem ipsum dolor sit amet consectetur. Nunc malesuada ultricies
              amet metus vive at.
            </p>
          </div>
          <button className="w-full rounded h-10 bg-primary-4 text-white text-14-24 font-semibold text-opacity-[0.92]">
            Subscribe
          </button>
        </div>
      </div>
      <Image
        src={UpcomingMatch}
        className="w-full h-auto absolute -right-[28%] scale-125 top-4 object-cover"
        alt="Upcoming Match"
      />
    </div>
  );
};

export default Ads;
