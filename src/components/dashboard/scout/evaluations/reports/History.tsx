"use client";

import React, { useState } from "react";
import { MdHealthAndSafety } from "react-icons/md";

interface iInjury {
  year: number;
  cause: string;
  duration: string;
}

const History = () => {
  const [injuries, setInjuries] = useState<iInjury[]>(
    Array(5).fill({
      year: 2023,
      cause: "Ankle sprain",
      duration: "2 months",
    })
  );

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-5 gap-5 bg-white flex flex-col justify-between">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-dark font-bold text-16-19">Injury History</h2>
        <p className="text-14-16 font-medium text-dark">See All</p>
      </div>
      <div className="flex flex-col w-full">
        {injuries.map((injury, index) => (
          <div
            key={index}
            className={`flex w-full justify-between items-center py-2 border-border-gray ${
              index !== injuries.length - 1 && "border-b"
            }`}
          >
            <div className="w-fit flex items-center gap-0.5">
              <MdHealthAndSafety className="text-red-600 text-14-16" />
              <p className="text-14-16 text-dark font-semibold">
                {injury.year}
              </p>
            </div>
            <p className="text-14-16 text-dark">
              {injury.cause}: He was out for {injury.duration}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
