"use client";

import { iPlayerFullDetails } from "@/hooks/scout"; // Assuming correct type import
import React, { FC } from "react";

interface iMetric {
  name: string;
  value: number;
}

const SkillMetrics: React.FC<{ data: iPlayerFullDetails | null }> = ({ data }) => {
  if (data === null) {
    // Consider a more informative loading/empty state
    return <div className="p-4 text-center text-gray-500">Skill metrics data not available.</div>;
  }

  const metrics: iMetric[] = [
    { name: "LONG SHOTS", value: data.longShots },
    { name: "DIRECT FREE KICKS", value: data.freeKicks },
    { name: "AERIAL DUELS", value: data.skillAerialDuels },
    { name: "DRIBBLING", value: data.skillDribbling },
    { name: "ONE-ON-ONE", value: data.oneToOne },
    { name: "HEADER", value: data.header },
    { name: "FITNESS", value: data.fitness },
    { name: "ACCURACY", value: data.accuracy },
    { name: "SHOT POWER", value: data.shotPower },
  ].filter(metric => typeof metric.value === 'number'); // Ensure only valid metrics are shown

  // Font size translations (examples, adjust if your custom classes are already responsive)
  // text-16-19 -> text-sm sm:text-base md:text-lg (Title)
  // text-12-14 -> text-xs sm:text-sm (Edit text, Skill name)
  // text-10-12 -> text-[10px] sm:text-xs (Skill value - or just text-xs if 10px is too small)

  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col
                   py-3 px-3 sm:py-4 sm:px-4 md:px-5 gap-3 sm:gap-4"> {/* Responsive padding & main gap */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-dark font-bold text-sm sm:text-base md:text-lg"> {/* Responsive title font */}
          Skill Metrics
        </h2>
        <p className="font-medium text-dark text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:underline"> {/* Responsive edit font, interactive */}
          Edit
        </p>
      </div>

      {metrics.length > 0 ? (
        <div className="flex flex-col w-full gap-2 sm:gap-2.5"> {/* Responsive gap between metric items */}
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="w-full text-dark flex items-center justify-between
                         py-1.5 px-1 sm:py-2 sm:px-1.5 rounded-md hover:bg-gray-50 transition-colors" /* Responsive padding, interactive hover */
            >
              <p className="font-semibold text-xs sm:text-sm capitalize truncate" title={metric.name}> {/* Responsive name font, capitalize for better readability, truncate */}
                {metric.name.toLowerCase()}
              </p>
              <p className="font-medium text-dark/80 text-[11px] sm:text-xs"> {/* Responsive value font, slight opacity */}
                {metric.value.toString().padStart(2, '0')} {/* Ensure two digits for consistency */}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4 text-sm">No skill metrics to display.</p>
      )}
    </div>
  );
};

export default SkillMetrics;