import React from "react";
import Basic from "./Basic";

const BasicSettings = () => {
  return (
    <div className="w-full h-full shadow-custom rounded bg-white flex flex-col gap-6 sm:gap-8 md:gap-10 items-center">
      <div className="w-full flex flex-col shadow-custom-1 h-14 sm:h-16 px-3 sm:px-5 justify-center">
        <h2 className="text-dark font-bold text-sm sm:text-base md:text-16-19">
          Basic Settings
        </h2>
        <h2 className="text-placeholder text-xs sm:text-12-14">
          Manage your essential settings
        </h2>
      </div>
      <div className="w-full px-3 sm:px-5 md:px-0">
        <Basic />
      </div>
    </div>
  );
};

export default BasicSettings;