"use client";

import React, { useState, ReactNode } from "react";
import BasicSettings from "./basic/BasicSettings"; // Ensure this path is correct

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
    // Add more settings here if needed
  ];

  const [active, setActive] = useState<number>(0);

  return (
    // Main layout:
    // - Mobile: Single column
    // - lg and up: Two columns grid
    // Removed dark:bg-gray-900, so it defaults to bg-gray-50 (a very light gray page background)
    // If you want pure white page background, change bg-gray-50 to bg-white
    <div className="w-full flex flex-col lg:grid lg:grid-cols-[minmax(280px,_1.5fr)_3fr] gap-4 lg:gap-6 p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      {/* Removed dark:bg-gray-800, so it defaults to bg-white */}
      <div className="w-full lg:h-full shadow-custom rounded-lg py-4 bg-white flex flex-col gap-4">
        {/* Sidebar Header */}
        <div className="w-full justify-between items-center flex px-4 sm:px-5">
          {/* Removed dark:text-gray-100, defaults to text-dark */}
          <h2 className="text-dark font-bold text-lg sm:text-xl">
            Settings
          </h2>
          <button
            type="button"
            aria-label="Search settings"
            // Removed dark:bg-gray-700 and dark:hover:bg-gray-600, defaults to light gray
            className="p-2 rounded bg-gray-100 hover:bg-gray-200"
          >
            {/* Removed dark:text-gray-300, defaults to text-dark or inherits */}
            <IoSearchOutline className="text-dark text-lg" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="w-full flex flex-col " aria-label="Settings navigation">
          {settings.map((setting, index) => {
            const Icon = setting.icon;
            const isActive = index === active;
            return (
              <a
                key={index}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActive(index);
                }}
                role="button"
                aria-current={isActive ? "page" : undefined}
                className={`
                  ${isActive
                    // Removed dark:bg-primary-dark for active state
                    ? "bg-primary text-white"
                    // Removed dark:text-gray-300 and dark:hover:bg-gray-700 for inactive state
                    : "text-dark hover:bg-gray-100"
                  }
                  text-sm sm:text-base font-medium h-12 sm:h-14 px-4 sm:px-6 gap-2 sm:gap-3 flex items-center cursor-pointer transition-colors duration-150 ease-in-out
                `}
              >
                <Icon
                  size={20}
                  // Removed dark mode specific icon colors
                  className={`${isActive ? "text-white" : "text-gray-500"}`}
                />
                <p>{setting.name}</p>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Content Area */}
      {/* This div wrapper is simple; BasicSettings itself should have a white/light background */}
      <div className="w-full">
        {settings[active].content}
      </div>
    </div>
  );
};

export default Settings;