"use client";

import React, { useState, useEffect } from "react";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";
import { convertTime } from "@/functions/dateFunctions";

// --- Data Pools for Random Activity Generation ---
const userProfiles = [
  { name: "Alex Ray", image: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1948.png" },
  { name: "Maria Garcia", image: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1973.png" },
  { name: "David Chen", image: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_2071.png" },
  { name: "Sofia Rossi", image: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002582_793_4993.png" },
  { name: "Jordan Lee", image: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1795.png" },
];

const playerNames = ["Leo Silva", "Kai Hernandez", "Jude Müller", "Victor Osimhen", "Jamal Musiala"];
const activityTemplates = [
  "viewed the profile of {player}",
  "added {player} to the watchlist",
  "rated {player} with 4 stars",
  "generated a new report for {player}",
  "updated the scouting notes for {player}",
];

interface Activity {
  id: number;
  userImageUrl: string;
  userFullName: string;
  message: string;
  createdDate: Date;
}

// Helper function to generate a single new activity
const generateNewActivity = (): Activity => {
  const user = userProfiles[Math.floor(Math.random() * userProfiles.length)];
  const player = playerNames[Math.floor(Math.random() * playerNames.length)];
  const template = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];

  return {
    id: Date.now(), // Unique ID for the key prop
    userFullName: user.name,
    userImageUrl: user.image,
    message: template.replace("{player}", player),
    createdDate: new Date(),
  };
};

const Feed = () => {
  // Initialize state with a few activities so it's not empty on load
  const [activities, setActivities] = useState<Activity[]>(() => [
    generateNewActivity(),
    generateNewActivity(),
    generateNewActivity(),
  ]);

  useEffect(() => {
    // Set an interval to add a new activity every 3 seconds
    const interval = setInterval(() => {
      const newActivity = generateNewActivity();
      // Add the new activity to the top and keep the list at a max of 15 items
      setActivities((prevActivities) => [newActivity, ...prevActivities].slice(0, 15));
    }, 3000); // 3000ms = 3 seconds

    // Clean up the interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full max-h-[70vh] h-auto overflow-y-auto scrollbar-thin scrollbar-webkit
      duration-300 ease-out transition-all rounded-[1rem] py-4 px-5 shadow-custom bg-white flex flex-col"
    >
      <div className="w-full justify-between items-center flex mb-4">
        <h2 className="text-dark font-bold text-16-19">Activity Feed</h2>
      </div>

      <div className="w-full flex flex-col gap-4">
        {activities.map((activity) => (
          // The key is now unique and the animation class is applied here
          <div key={activity.id} className="flex flex-col gap-2 w-full animate-fadeInDown">
            <div className="flex gap-2 items-center w-full">
              <ProfileImageOrTextAvatar
                image={activity.userImageUrl}
                name={activity.userFullName}
                size="size-8"
                radius="rounded-full"
              />
              <div className="w-full justify-between items-center flex">
                <h2 className="text-14-16 font-semibold text-dark">
                  {activity.userFullName}
                </h2>
                <p className="text-placeholder text-10-12">
                  {convertTime(activity.createdDate)}
                </p>
              </div>
            </div>
            <p className="text-placeholder text-12-14">{activity.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;