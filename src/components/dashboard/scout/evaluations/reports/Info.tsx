"use client";

import React, { FC } from "react";
import Image from "next/image"; // Not directly used in the final render, ProfileImageOrTextAvatar might use it.
import { convertDateWithSlashes } from "@/functions/dateFunctions";
import { iPlayerFullDetails } from "@/hooks/scout"; // Assuming this type definition is correct
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";

const Info: FC<{ data: iPlayerFullDetails | null }> = ({ data }) => {
  if (data === null) {
    // Optionally, render a loading skeleton or a "No data" message here
    return <div className="p-4 text-center text-gray-500">Loading player data or data not available...</div>;
  }

  // Define responsive classes for ProfileImageOrTextAvatar
  // Adjust these values as per your design for ProfileImageOrTextAvatar
  const avatarSizeClasses = "w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-60 xl:h-60";
  const avatarTextClasses = "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl";
  // If your text-48-57 was already responsive, you might re-evaluate.
  // This example uses Tailwind's scale.

  return (
    <div className="w-full h-fit shadow-custom rounded-[1rem] bg-white flex flex-col
                   py-3 px-4 sm:py-4 sm:px-5 gap-4 sm:gap-6"> {/* Responsive padding & main gap */}

      {/* Player Information Header */}
      <h2 className="text-dark font-bold text-base sm:text-lg md:text-xl"> {/* Responsive font size */}
      {/* Or, if your custom class text-16-19 is already responsive: */}
      {/* <h2 className="text-dark font-bold text-16-19"> */}
        Player Information
      </h2>

      {/* Profile Section: Avatar + Details */}
      <div className="w-full flex flex-col lg:flex-row gap-4 sm:gap-6 items-center lg:items-start p-2 sm:p-4">
        <div className="flex-shrink-0"> {/* Wrapper for avatar to control its size and prevent squishing in flex row */}
          <ProfileImageOrTextAvatar
            size={avatarSizeClasses} // Pass responsive Tailwind classes
            image={data.imageUrl}
            name={data.fullName}
            radius="rounded-md" // Consistent rounding, or keep "rounded" if it's different
            text={avatarTextClasses}  // Pass responsive Tailwind classes
          />
        </div>

        <div className="w-full lg:flex-1 border border-border-gray flex flex-col text-dark">
          {[
            { label: "Name", value: data.fullName },
            { label: "Date of Birth", value: convertDateWithSlashes(new Date(data.dob)) },
            { label: "Nationality", value: data.nationality },
            { label: "Team", value: data.currentTeam },
            { label: "Position", value: data.position },
            { label: "Appearance", value: data.appearances },
            { label: "Height", value: `${data.height !== "" ? data.height : "0"}cm` },
            { label: "Weight", value: `${data.weight !== "" ? data.weight : "0"}kg` },
            { label: "Preferred Foot", value: data.preferredFoot, isLast: true },
          ].map((item, index) => (
            <div
              key={item.label}
              className={`flex items-stretch text-xs sm:text-sm 
                         ${!item.isLast ? "border-b border-border-gray" : ""}`}
            >
              <p className="font-semibold w-[100px] sm:w-[120px] md:w-[140px] flex-shrink-0 border-r border-border-gray py-1.5 sm:py-2 px-2">
                {item.label}
              </p>
              <p className="flex-1 py-1.5 sm:py-2 px-2 break-words">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Psychological Insights Header */}
      <h2 className="text-dark font-bold text-base sm:text-lg md:text-xl mt-2 sm:mt-0"> {/* Responsive font size, added margin top for spacing */}
        Psychological Insights
      </h2>

      {/* Strengths and Weaknesses Section */}
      <div className="w-full flex flex-col gap-3 sm:gap-4 px-2 sm:px-4 pb-2"> {/* Added padding bottom */}
        <div className="flex flex-col gap-1">
          <h3 className="text-dark font-semibold text-sm sm:text-base"> {/* Changed to h3 for semantics, responsive font */}
            Strengths
          </h3>
          <p className={`text-xs sm:text-sm ${data.strength === "" ? "text-placeholder italic" : "text-dark"} break-words`}>
            {data.strength === "" ? "No data provided" : data.strength}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-dark font-semibold text-sm sm:text-base"> {/* Changed to h3, responsive font */}
            Weaknesses
          </h3>
          <p className={`text-xs sm:text-sm ${data.weakness === "" ? "text-placeholder italic" : "text-dark"} break-words`}>
            {data.weakness === "" ? "No data provided" : data.weakness}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;