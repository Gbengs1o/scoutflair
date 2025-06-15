"use client";

import { iPlayerFullDetails } from "@/hooks/scout";
import React, { useState, useEffect, FC } from "react";

import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";

interface iMetric {
  name: string;
  value: number;
  increase: number;
  color: string;
}

// --- Helper Functions for Random Data (no changes here) ---
const metricTemplates = [
  { name: "Goals", color: "#008000" },
  { name: "Assists", color: "#008000" },
  { name: "Yellow Cards", color: "#F2A725" },
  { name: "Red Cards", color: "#FF0000" },
  { name: "Foul Wons", color: "#041931" },
  { name: "Aeriel Duels", color: "#0A2A56" },
  { name: "Crosses", color: "#041931" },
  { name: "Dribbles", color: "#008000" },
  { name: "Interceptions", color: "#101B8C" },
  { name: "Minutes P.", color: "#12B9D7" },
];

const generateRandomMetrics = (): iMetric[] => {
  return metricTemplates.map((template) => ({
    ...template,
    value:
      template.name === "Minutes P."
        ? Math.floor(Math.random() * 800) + 1500
        : Math.floor(Math.random() * 100),
    increase: Math.round((Math.random() - 0.5) * 40),
  }));
};

// --- The Component ---

const KeyMetrics: FC<{ data: iPlayerFullDetails | null }> = ({ data }) => {
  // 1. Add loading state, default to true
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<iMetric[]>([]);

  // Effect to load random data after a delay if no real data is provided
  useEffect(() => {
    // Only run this timer logic if there is no initial real data
    if (!data) {
      const timer = setTimeout(() => {
        setMetrics(generateRandomMetrics());
        setIsLoading(false); // Stop loading after 1 second
      }, 1000); // 1-second delay

      // Cleanup function to clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to update metrics instantly if real `data` is provided
  useEffect(() => {
    if (data) {
      const realMetrics: iMetric[] = [
        // ... (metric mapping from data)
        { name: "Goals", value: data.goals, increase: 0, color: "#008000" },
        { name: "Assists", value: data.assist, increase: 0, color: "#008000" },
        { name: "Yellow Cards", value: data.yellowCards, increase: 0, color: "#F2A725" },
        { name: "Red Cards", value: data.redCards, increase: 0, color: "#FF0000" },
        { name: "Foul Wons", value: data.fowlsWon, increase: 0, color: "#041931" },
        { name: "Aeriel Duels", value: data.aerialDuels, increase: 0, color: "#0A2A56" },
        { name: "Crosses", value: data.crosses, increase: 0, color: "#041931" },
        { name: "Dribbles", value: data.dribbles, increase: 0, color: "#008000" },
        { name: "Interceptions", value: data.interceptions, increase: 0, color: "#101B8C" },
        { name: "Minutes P.", value: data.minutes, increase: 0, color: "#12B9D7" },
      ];
      setMetrics(realMetrics);
      setIsLoading(false); // Instantly stop loading when real data arrives
    }
  }, [data]);

  return (
    <div className="w-full shadow-custom rounded-[1rem] p-3 md:p-5 gap-4 bg-white flex flex-col">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-dark font-bold text-16-19">Key Metrics</h2>
        <button className="text-14-16 font-medium text-dark hover:text-opacity-80 transition-opacity">
          Edit
        </button>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {isLoading ? (
          // 2. Render Skeleton Loaders while loading
          // Using Array.from to create 10 placeholder items
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-[5rem] rounded-xl bg-gray-200 animate-pulse"
            />
          ))
        ) : (
          // 3. Render the actual metric cards when loading is finished
          metrics.map((metric, index) => (
            <div
              className={`w-full h-[5rem] rounded-xl bg-white shadow-custom p-3 gap-2 flex flex-col justify-between`}
              key={index}
            >
              <p className="text-14-16 font-bold" style={{ color: metric.color }}>
                {metric.name}
              </p>
              <div className="flex items-center justify-between w-full">
                <p className="text-28-33 text-dark text-opacity-[0.88]">
                  {metric.value.toString().padStart(2, "0")}
                </p>
                <div className="w-fit items-center gap-0.5 flex">
                  <p className="text-12-14 text-black">
                    {Math.abs(metric.increase)}%
                  </p>
                  {metric.increase > 0 ? (
                    <GoArrowUpRight className="text-10-12 text-green-700" />
                  ) : metric.increase < 0 ? (
                    <GoArrowDownRight className="text-10-12 text-red-700" />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KeyMetrics;