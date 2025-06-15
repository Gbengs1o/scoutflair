"use client";

import React, { useState, ReactNode } from "react";
import BasicSettings from "./basic/BasicSettings";

import { IoSettingsOutline, IoSearchOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";

interface iSetting {
  name: string;
  icon: IconType;
  content: ReactNode;
}

const Settings = () => {
  const settings: iSetting[] = [
    {
      name: "Basic Settings",
      icon: IoSettingsOutline,
      content: <BasicSettings />,
    },
  ];

  const [active, setActive] = useState<number>(0);

  return (
    // --- RESPONSIVE CHANGES ---
    // 1. `grid-cols-1 md:grid-cols-[1.5fr_3fr]`:
    //    - On small screens (mobile), it defaults to a single column grid (`grid-cols-1`), stacking the sidebar and content.
    //    - On medium screens and larger (`md:`), it switches to the original two-column layout.
    // 2. `p-4 md:p-6`:
    //    - Uses slightly less padding on smaller screens (`p-4`) and more on larger ones (`p-6`).
    // 3. `min-h-full`:
    //    - Changed from `h-full` to allow the container to grow vertically if content overflows on smaller screens.
    <div className="w-full min-h-full grid grid-cols-1 md:grid-cols-[1.5fr_3fr] p-4 md:p-6 gap-4">
      {/* Sidebar container */}
      <div className="w-full h-full shadow-custom rounded py-4 bg-white flex flex-col gap-4">
        <div className="w-full justify-between items-center flex px-5">
          <h2 className="text-dark font-bold text-16-19">Settings</h2>
          <div className="p-2 rounded bg-[#F1F1F1]">
            <IoSearchOutline className="text-dark text-lg" />
          </div>
        </div>
        <div className="w-full flex flex-col ">
          {settings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`${
                  index === active ? "bg-primary text-white" : "text-dark"
                }
              text-14-16 font-medium h-14 px-6 gap-2 flex items-center cursor-pointer`}
              >
                <Icon size={20} />
                <p className="text-14-16 font-medium">{setting.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content area: This will now correctly flow below the sidebar on mobile and to the side on desktop */}
      {settings[active].content}
    </div>
  );
};

export default Settings;