"use client";

import React, { useState } from "react";

const Languages = () => {
  const [index, setIndex] = useState<number>(0);
  const languages = ["English (UK)", "English (USA)", "Others"];

  return (
    <div className="flex flex-col gap-3 w-full ">
      <div className="flex flex-col">
        <h2 className="text-dark text-12-14 font-semibold">
          Language Settings
        </h2>
        <p className="text-placeholder text-10-12 font-semibold">
          Select your language preferences
        </p>
      </div>

      <div className="flex gap-4 items-center w-fit">
        {languages.map((lang, i) => (
          <div
            key={i}
            className="flex gap-1 items-center w-fit text-12-14 text-dark font-medium"
          >
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={index === i}
              onChange={(e) => setIndex(i)}
            />
            <p>{lang}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;
