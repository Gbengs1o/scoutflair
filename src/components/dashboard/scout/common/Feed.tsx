"use client";

import React from "react";

import { convertTime } from "@/functions/dateFunctions";
import { useGetScoutActivityFeed } from "@/hooks/scout";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";
import { Loader } from "@mantine/core";
import Image from "next/image";
import Void from "@/public/images/Void.png"; // Assuming this path is correct

const Feed = () => {
  const { loading, data: activities } = useGetScoutActivityFeed();

  return (
    <div
      className={`w-full ${
        !loading && activities && activities.length === 0 // Ensure activities is defined before checking length
          ? "h-full" // For empty state, take full height if parent allows
          : "max-h-[70vh] h-auto overflow-y-auto scrollbar-thin scrollbar-webkit"
      } duration-300 ease-out transition-all rounded-[1rem] 
         py-3 px-3 sm:py-4 sm:px-5 gap-3 sm:gap-4 md:gap-5 
         shadow-custom bg-white flex flex-col`}
    >
      <div className="w-full justify-between items-center flex">
        {/* Font size 'text-16-19' might be large for very small screens, consider 'text-base sm:text-16-19' */}
        <h2 className="text-dark font-bold text-16-19">Activity Feed</h2>
      </div>

      {/* Activity List Section */}
      {!loading && activities && activities.length > 0 && (
        // Removed redundant overflow-y-scroll here, parent handles scrolling
        <div className="w-full flex flex-col gap-3 sm:gap-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex flex-col gap-1.5 sm:gap-2 w-full">
              <div className="flex gap-2 items-center w-full">
                <ProfileImageOrTextAvatar
                  image={activity.userImageUrl}
                  name={activity.userFullName}
                  size="size-8" // This is 2rem, generally fine for mobile too
                  radius="rounded-full"
                />

                <div className="w-full justify-between items-center flex">
                  {/* Consider responsive font sizes if needed */}
                  <h2 className="text-14-16 font-semibold text-dark flex-shrink min-w-0 mr-2">
                    <span className="truncate block">{activity.userFullName}</span>
                  </h2>
                  <p className="text-placeholder text-10-12 flex-shrink-0">
                    {convertTime(new Date(activity.createdDate))}
                  </p>
                </div>
              </div>
              {/* Consider responsive font sizes if needed */}
              <p className="text-placeholder text-12-14">{activity.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="w-full h-full flex-grow grid place-content-center"> {/* Added flex-grow */}
          <Loader color="primary.6" />
        </div>
      )}

      {/* Empty State */}
      {!loading && activities && activities.length === 0 && (
        <div className="w-full h-full flex-grow flex flex-col justify-center items-center gap-4 sm:gap-5"> {/* Added flex-grow */}
          <Image
            src={Void}
            alt="no activity"
            width={100} // Intrinsic width, actual display controlled by className
            height={100} // Intrinsic height
            className="w-24 h-auto sm:w-28 md:w-32 object-cover" // Responsive width
          />
          {/* Consider responsive font sizes if needed */}
          <h2 className="text-dark text-10-12 font-medium text-center">
            There are no activities available at the moment
          </h2>
        </div>
      )}
    </div>
  );
};

export default Feed;