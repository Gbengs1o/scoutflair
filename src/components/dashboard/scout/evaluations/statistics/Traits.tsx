"use client";

import { iPlayerFullDetails } from "@/hooks/scout"; // Assuming correct type import
import React, { FC } from "react"; // Removed useState as it's not used
import { FaStar, FaRegStar } from "react-icons/fa6";

interface iTrait {
  name: string;
  value: number; // Assuming value is 0-5 for star rating
}

const Traits: React.FC<{ data: iPlayerFullDetails | null }> = ({ data }) => {
  if (data === null) {
    // Consider a more informative loading/empty state
    return <div className="p-4 text-center text-gray-500">Player traits data not available.</div>;
  }

  const traits: iTrait[] = [
    { name: "Speed", value: data.speed },
    { name: "Stamina", value: data.stamina },
    { name: "Leadership", value: data.leader },
    { name: "Work Rate", value: data.workRate },
    { name: "Composure", value: data.composure },
    { name: "Agility", value: data.agility },
    { name: "Tactical Awareness", value: data.tacticalAwareness },
  ].filter(trait => typeof trait.value === 'number' && trait.value >= 0 && trait.value <= 5); // Ensure valid trait values

  // Font size translations (examples, adjust if your custom classes are already responsive)
  // text-16-19 -> text-sm sm:text-base md:text-lg (Title)
  // text-12-14 -> text-xs sm:text-sm (Edit text, Trait name)
  // text-14-16 (stars) -> text-base sm:text-lg (for star icons)

  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col
                   py-3 px-3 sm:py-4 sm:px-4 md:px-5 gap-3 sm:gap-4"> {/* Responsive padding & main gap */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-dark font-bold text-sm sm:text-base md:text-lg"> {/* Responsive title font */}
          Player Traits
        </h2>
        <p className="font-medium text-dark text-xs sm:text-sm whitespace-nowrap cursor-pointer hover:underline"> {/* Responsive edit font, interactive */}
          Edit
        </p>
      </div>

      {traits.length > 0 ? (
        <div className="flex flex-col w-full gap-2 sm:gap-2.5"> {/* Responsive gap between trait items */}
          {traits.map((trait, i) => (
            <div
              key={i}
              className="w-full flex items-center justify-between
                         py-1.5 px-1 sm:py-2 sm:px-1.5 rounded-md hover:bg-gray-50 transition-colors" /* Responsive padding, interactive hover */
            >
              <p className="text-dark text-xs sm:text-sm font-medium capitalize truncate" title={trait.name}> {/* Responsive name font, capitalize, truncate */}
                {trait.name.toLowerCase()}
              </p>
              <div className="flex gap-0.5 sm:gap-1 items-center flex-shrink-0"> {/* Responsive gap for stars, prevent shrinking */}
                {Array(5)
                  .fill(0)
                  .map((_, starIndex) => // Changed variable names for clarity
                    trait.value >= starIndex + 1 ? (
                      <FaStar
                        key={starIndex}
                        className="text-secondary-3 text-sm sm:text-base md:text-lg" /* Responsive star size */
                      />
                    ) : (
                      <FaRegStar
                        key={starIndex}
                        className="text-placeholder text-sm sm:text-base md:text-lg" /* Responsive star size */
                      />
                    )
                  )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4 text-sm">No player traits to display.</p>
      )}
    </div>
  );
};

export default Traits;