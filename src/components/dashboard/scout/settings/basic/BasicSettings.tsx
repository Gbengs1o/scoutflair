import React from "react";
import Basic from "./Basic"; // Assuming Basic.tsx or Basic.jsx is in the same directory

const BasicSettings = () => {
  return (
    <div className="w-full min-h-full shadow-custom rounded bg-white flex flex-col gap-6 sm:gap-8 items-center p-4 sm:p-6">
      {/*
        - Replaced h-full with min-h-full for better flexibility if content grows.
        - Added some overall padding to the main container (p-4 sm:p-6)
        - Adjusted gap to be responsive: gap-6 sm:gap-8
      */}
      <div className="w-full flex flex-col shadow-custom-1 h-auto py-3 sm:py-4 px-4 sm:px-6 rounded-t">
        {/*
          - Removed fixed h-16, using py for vertical padding instead for flexibility.
          - Responsive horizontal padding: px-4 sm:px-6
          - Added rounded-t if this header is visually distinct.
        */}
        <h2 className="text-dark font-bold text-base sm:text-lg md:text-xl">
          {/*
            Using standard responsive text sizes:
            text-16-19 -> text-base (16px) on small, sm:text-lg (18px), md:text-xl (20px)
            Adjust as per your tailwind.config.js if you have '16-19' defined.
            If '16-19' is e.g. ['16px', '19px'], you could do:
            className="text-dark font-bold text-sm_custom sm:text-16-19" (defining text-sm_custom for smaller screens)
          */}
          Basic Settings
        </h2>
        <h2 className="text-placeholder text-xs sm:text-sm">
          {/*
            text-12-14 -> text-xs (12px) on small, sm:text-sm (14px)
            If '12-14' is e.g. ['12px', '14px'], this is fine, or use:
            className="text-placeholder text-10-12_custom sm:text-12-14"
          */}
          Manage your essential settings
        </h2>
      </div>
      <div className="w-full">
        {/* Added a w-full div to contain Basic, ensuring it takes up available width
            within the padded parent. Basic component itself handles its internal max-width.
        */}
        <Basic />
      </div>
    </div>
  );
};

export default BasicSettings;