"use client";

import React, { useState } from "react";

const Languages = () => {
  const [index, setIndex] = useState<number>(0);
  const languages = ["English (UK)", "English (USA)", "Português (Brasil)", "Español"]; // Added more examples for wrapping demo

  return (
    // Added padding to the overall container for better spacing
    <div className="flex flex-col gap-4 p-4 sm:p-6 w-full rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col">
        <h2 className="text-dark dark:text-gray-100 text-sm sm:text-base font-semibold">
          {/* Responsive text size, e.g., 14px on mobile, 16px on sm+ */}
          Language Settings
        </h2>
        <p className="text-placeholder dark:text-gray-400 text-xs sm:text-sm font-medium mt-0.5">
          {/* Responsive text size, e.g., 12px on mobile, 14px on sm+ */}
          Select your language preferences
        </p>
      </div>

      <div
        className="
          flex flex-col sm:flex-row  // Stack vertically by default, row on sm screens and up
          sm:flex-wrap             // Allow wrapping on sm screens if there are many options
          gap-y-3 sm:gap-y-2       // Vertical gap for stacked items and wrapped rows
          sm:gap-x-4               // Horizontal gap for items in a row
          items-start sm:items-center // Align items to start when stacked, center when in a row
          w-full                    // Take full width to allow proper alignment and wrapping
        "
      >
        {languages.map((lang, i) => (
          <div
            key={i}
            className="flex gap-2 items-center text-sm text-dark dark:text-gray-200 font-medium cursor-pointer"
            onClick={() => setIndex(i)} // Allow clicking the whole div to select
          >
            <input
              type="checkbox"
              // The 'custom-checkbox' class should ideally handle responsive sizing or be adaptable.
              // Tailwind provides `form-checkbox` for basic styling if you add @tailwindcss/forms plugin.
              // Example basic styling for visibility if custom-checkbox is not defined:
              className="custom-checkbox h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              checked={index === i}
              onChange={() => setIndex(i)} // Keep onChange for accessibility with keyboard
              aria-labelledby={`lang-label-${i}`}
            />
            <label htmlFor={`lang-label-${i}`} id={`lang-label-${i}`} className="select-none">
              {/* Using a label for better accessibility and associating with the input */}
              {lang}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;