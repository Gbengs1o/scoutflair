"use client";

import { iPlayerFullDetails } from "@/hooks/scout"; // Assuming correct type import
import React, { FC } from "react"; // Removed useState as it's not used here

import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";

interface iMetric {
  name: string;
  value: number;
  increase: number; // Assuming this might come from data later, or be calculated
  color: string;
}

const KeyMetrics: FC<{ data: iPlayerFullDetails | null }> = ({ data }) => {
  if (data === null) {
    // Or a loading skeleton / more informative message
    return <div className="p-4 text-center text-gray-500">Key metrics data not available.</div>;
  }

  // Example: Simulate some increase/decrease values if they aren't in `data`
  const getSimulatedIncrease = (baseValue: number): number => {
    if (baseValue === 0) return 0;
    // Simulate a random change between -20% and +20%
    const randomFactor = (Math.random() - 0.5) * 0.4; // -0.2 to +0.2
    return Math.round(randomFactor * 100); // As percentage
  };

  const metrics: iMetric[] = [
    { name: "Goals", value: data.goals, increase: getSimulatedIncrease(data.goals), color: "#008000" },
    { name: "Assists", value: data.assist, increase: getSimulatedIncrease(data.assist), color: "#008000" },
    { name: "Yellow Cards", value: data.yellowCards, increase: getSimulatedIncrease(data.yellowCards), color: "#F2A725" },
    { name: "Red Cards", value: data.redCards, increase: getSimulatedIncrease(data.redCards), color: "#FF0000" },
    { name: "Foul Wons", value: data.fowlsWon, increase: getSimulatedIncrease(data.fowlsWon), color: "#041931" },
    { name: "Aeriel Duels", value: data.aerialDuels, increase: getSimulatedIncrease(data.aerialDuels), color: "#0A2A56" },
    { name: "Crosses", value: data.crosses, increase: getSimulatedIncrease(data.crosses), color: "#041931" },
    { name: "Dribbles", value: data.dribbles, increase: getSimulatedIncrease(data.dribbles), color: "#008000" },
    { name: "Interceptions", value: data.interceptions, increase: getSimulatedIncrease(data.interceptions), color: "#101B8C" },
    { name: "Minutes P.", value: data.minutes, increase: getSimulatedIncrease(data.minutes), color: "#12B9D7" },
  ];

  // Font size translations (examples, adjust if your custom classes are already responsive)
  // text-16-19 -> text-sm sm:text-base md:text-lg
  // text-14-16 -> text-xs sm:text-sm
  // text-28-33 -> text-xl sm:text-2xl md:text-3xl (metric value)
  // text-12-14 -> text-[10px] sm:text-xs (increase percentage)
  // text-10-12 -> text-[10px] sm:text-xs (arrow icons)

  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col
                   py-3 px-3 sm:py-4 sm:px-4 md:px-5 gap-3 sm:gap-4 md:gap-5"> {/* Responsive padding & gap */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-dark font-bold text-sm sm:text-base md:text-lg"> {/* Responsive title font */}
          Key Metrics
        </h2>
        <p className="font-medium text-dark text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:underline"> {/* Responsive edit font, interactive */}
          Edit
        </p>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4"> {/* Responsive columns & gap */}
        {metrics.map((metric, index) => (
          <div
            className="w-full rounded-xl bg-white shadow-custom flex flex-col justify-between
                       p-2 sm:p-2.5 min-h-[5.5rem] sm:min-h-[6rem]" /* Responsive padding, min-height instead of fixed, removed internal gap from here */
            key={index}
          >
            <p
              className="font-bold text-xs sm:text-sm truncate" /* Responsive name font, truncate long names */
              style={{ color: metric.color }}
              title={metric.name} // Show full name on hover if truncated
            >
              {metric.name}
            </p>
            <div className="flex items-end justify-between w-full mt-1 sm:mt-1.5"> {/* items-end to align value with % baseline, responsive margin-top */}
              <p className="text-dark/90 font-semibold text-lg sm:text-xl md:text-2xl"> {/* Responsive value font, opacity with /90 */}
                {metric.value.toString().padStart(2, "0")}
              </p>
              {metric.increase !== 0 && ( // Only show if there's an increase/decrease
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <p className="text-black text-[10px] sm:text-xs">
                    {Math.abs(metric.increase)}%
                  </p>
                  {metric.increase > 0 ? (
                    <GoArrowUpRight className="text-green-600 text-xs sm:text-sm" /> // Using Tailwind colors, responsive icon size
                  ) : ( // metric.increase < 0 (since !== 0 is checked)
                    <GoArrowDownRight className="text-red-600 text-xs sm:text-sm" /> // Using Tailwind colors, responsive icon size
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;