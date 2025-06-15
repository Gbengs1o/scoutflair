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
    // You can add more settings items here
  ];

  const [active, setActive] = useState<number>(0);

  return (
    // RESPONSIVE LAYOUT:
    // Stacks vertically by default (mobile-first).
    // Becomes a grid with a fixed sidebar on large screens (1024px+).
    <div className="w-full flex flex-col lg:grid lg:grid-cols-[280px_1fr] p-4 md:p-6 gap-6">
      
      {/* Settings Navigation Sidebar */}
      <div className="w-full lg:h-full shadow-custom rounded py-4 bg-white flex flex-col gap-4">
        <div className="w-full justify-between items-center flex px-5">
          <h2 className="text-dark font-bold text-16-19">Settings</h2>
          <div className="p-2 rounded bg-[#F1F1F1] cursor-pointer">
            <IoSearchOutline className="text-dark text-lg" />
          </div>
        </div>
        <div className="w-full flex flex-col">
          {settings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`${
                  index === active
                    ? "bg-primary text-white"
                    : "text-dark hover:bg-gray-100" // Added hover state for better UX
                }
              text-14-16 font-medium h-14 px-6 gap-2 flex items-center cursor-pointer transition-colors duration-200`}
              >
                <Icon size={20} />
                <p className="text-14-16 font-medium">{setting.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings Content Area */}
      {settings[active].content}
    </div>
  );
};

export default Settings;