"use client";

import React, { useState, ReactNode } from "react";
import BasicSettings from "./basic/BasicSettings"; // Assuming this component is responsive
import Accounts from "../../scout/settings/basic/Accounts";
import Notifications from "../../scout/settings/basic/Notifications";

import {
  IoSettingsOutline,
  IoSearchOutline,
  IoChevronBack,
  IoChevronForwardOutline,
} from "react-icons/io5";
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
    {
      name: "Account Security",
      icon: IoSettingsOutline, // Replace with a relevant icon
      content: <Accounts />,
    },
    {
      name: "Notifications",
      icon: IoSettingsOutline, // Replace with a relevant icon
      content: <Notifications />,
    },
  ];

  const [active, setActive] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);

  const handleSettingClick = (index: number) => {
    setActive(index);
    setShowContent(true);
  };

  const handleBackClick = () => {
    setShowContent(false);
  };

  return (
    <div className="w-full h-full p-4 sm:p-6 bg-gray-50">
      {/* Desktop Layout (md and up) */}
      <div className="hidden md:grid md:grid-cols-[minmax(250px,_1.5fr)_3fr] md:gap-6 w-full h-full">
        {/* Desktop Settings Menu */}
        <div className="w-full h-full shadow-custom rounded-lg py-4 bg-white flex flex-col gap-4">
          <div className="w-full justify-between items-center flex px-5">
            <h2 className="text-dark font-bold text-lg sm:text-xl">Settings</h2>
            <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
              <IoSearchOutline className="text-dark text-lg" />
            </button>
          </div>
          <div className="w-full flex flex-col">
            {settings.map((setting, index) => {
              const Icon = setting.icon;
              return (
                <div
                  key={index}
                  onClick={() => setActive(index)}
                  className={`
                    text-sm sm:text-base font-medium h-12 sm:h-14 px-5 sm:px-6 gap-3 flex items-center cursor-pointer
                    transition-colors duration-150 ease-in-out
                    ${
                      index === active
                        ? "bg-primary text-white"
                        : "text-dark hover:bg-primary/10"
                    }
                  `}
                >
                  <Icon className="h-[20px] w-[20px] flex-shrink-0" /> {/* Example: fixed size or responsive h/w classes */}
                  <p>{setting.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Settings Content Area */}
        <div className="w-full h-full bg-white shadow-custom rounded-lg p-4 sm:p-6 overflow-y-auto">
          {settings[active].content}
        </div>
      </div>

      {/* Mobile Layout (up to md) */}
      <div className="md:hidden w-full h-full">
        {!showContent ? (
          /* Mobile Settings Menu List */
          <div className="w-full h-full shadow-custom rounded-lg py-4 bg-white flex flex-col gap-2">
            <div className="w-full justify-between items-center flex px-4 sm:px-5 mb-2">
              <h2 className="text-dark font-bold text-lg">Settings</h2>
              <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors">
                <IoSearchOutline className="text-dark text-lg" />
              </button>
            </div>
            <div className="w-full flex flex-col">
              {settings.map((setting, index) => {
                const Icon = setting.icon;
                return (
                  <div
                    key={index}
                    onClick={() => handleSettingClick(index)}
                    className="text-dark text-sm font-medium h-14 px-4 sm:px-5 gap-3 flex items-center cursor-pointer
                               border-b border-gray-100 last:border-b-0
                               hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 ease-in-out"
                  >
                    <Icon className="h-[20px] w-[20px] flex-shrink-0 text-gray-600" /> {/* Example: fixed size or responsive h/w classes */}
                    <p className="flex-grow">{setting.name}</p>
                    <IoChevronForwardOutline className="text-gray-400 h-[18px] w-[18px]" /> {/* Example: fixed size or responsive h/w classes */}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Mobile Settings Content View */
          <div className="w-full h-full flex flex-col bg-white shadow-custom rounded-lg">
            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 border-b border-gray-200">
              <button
                onClick={handleBackClick}
                className="p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors"
                aria-label="Go back to settings menu"
              >
                {/* THIS IS THE CORRECTED LINE: */}
                <IoChevronBack className="text-dark h-[20px] w-[20px] sm:h-[22px] sm:w-[22px]" />
              </button>
              <h2 className="text-dark font-semibold text-base sm:text-lg">
                {settings[active].name}
              </h2>
            </div>
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {settings[active].content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;