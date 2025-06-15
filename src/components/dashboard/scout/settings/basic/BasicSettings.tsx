import React from "react";
import Basic from "./Basic";

const BasicSettings = () => {
  return (
    // The container is now more flexible, allowing the child component (Basic) to control its own width.
    <div className="w-full h-full shadow-custom rounded bg-white flex flex-col gap-6 md:gap-10">
      
      {/* Header section: Uses min-height to adapt if text wraps. Padding is now responsive. */}
      <div className="w-full flex flex-col shadow-custom-1 min-h-[4rem] px-4 md:px-5 justify-center">
        <h2 className="text-dark font-bold text-16-19">Basic Settings</h2>
        <h2 className="text-placeholder text-12-14">
          Manage your essential settings
        </h2>
      </div>

      <Basic />
    </div>
  );
};

export default BasicSettings;