"use client";

import React, { FC } from "react";
import { convertDateWithSlashes } from "@/functions/dateFunctions";
import { iPlayerFullDetails } from "@/hooks/scout"; // Assuming this type definition is correct
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";

const Info: FC<{ data: iPlayerFullDetails | null }> = ({ data }) => {
  if (data === null) {
    // Consider a more informative loading/empty state
    return <div className="p-4 text-center text-gray-500">Player data not available.</div>;
  }

  const names = data.fullName.split(" ");
  const firstName = names[0] || ""; // Handle cases with no first name
  const lastName = names.slice(1).join(" ") || data.fullName; // Handle single names or multiple last names

  // Responsive classes for ProfileImageOrTextAvatar
  // Adjust these based on your ProfileImageOrTextAvatar component's capabilities and design
  const avatarSizeClasses = "size-20 sm:size-24 md:size-[7rem]"; // e.g., 5rem, 6rem, 7rem
  const avatarTextClasses = "text-2xl sm:text-3xl md:text-4xl"; // Corresponds to size. Original: text-28-33

  // Font size translations (examples, adjust if your custom classes are already responsive)
  // text-12-14 -> text-xs sm:text-sm
  // text-14-16 -> text-xs sm:text-sm
  // text-16-19 -> text-sm sm:text-base
  // text-28-33 -> avatarTextClasses above
  // text-10-12 -> text-[10px] sm:text-xs (labels for stats)

  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white relative
                   p-3 sm:p-4 md:px-5
                   flex flex-col lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,3.5fr)]
                   gap-4 sm:gap-5 lg:gap-6"> {/* Main layout: stack mobile, grid desktop. Responsive padding & gap */}

      <p className="absolute top-2 right-3 text-dark font-medium text-xs sm:text-sm cursor-pointer hover:underline"> {/* Responsive font, interactive */}
        Edit
      </p>

      {/* Left Section: Avatar, Name, Jersey */}
      <div className="flex items-center gap-3 sm:gap-4"> {/* Responsive gap */}
        <ProfileImageOrTextAvatar
          size={avatarSizeClasses}
          image={data.imageUrl}
          name={data.fullName}
          radius="rounded-full"
          text={avatarTextClasses}
        />

        <div className="flex flex-col gap-0.5 sm:gap-1">
          <p className="text-dark text-xs sm:text-sm">
            {firstName}
          </p>
          <h2 className="font-bold text-dark/90 text-sm sm:text-base md:text-lg"> {/* text-opacity via /90 */}
            {lastName}
          </h2>
          {/* Optional: Country Flag if you re-add it
          <Image
            className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5" // Responsive size
            src={info.country} // Ensure info.country is defined
            alt={`${data.fullName} country`}
            width={20}
            height={20}
          /> */}
          <h1 className="text-dark font-bold text-xl sm:text-2xl md:text-3xl"> {/* Responsive Jersey # */}
            #{data.jerseyNumber || "N/A"}
          </h1>
        </div>
      </div>

      {/* Right Section: Stats Grid */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3"> {/* Responsive columns & gap */}
        {[
          { label: "DATE OF BIRTH", value: convertDateWithSlashes(new Date(data.dob)) },
          { label: "HEIGHT", value: `${data.height !== "" ? data.height : "0"}cm` },
          { label: "APPEARANCE", value: data.appearances?.toString() || "0" },
          { label: "POSITION", value: data.position || "N/A" },
          { label: "WEIGHT", value: `${data.weight !== "" ? data.weight : "0"}kg` },
          { label: "PREFERRED FOOT", value: data.preferredFoot || "N/A" },
        ].map((item, index) => (
          <div key={index} className="flex flex-col gap-1 sm:gap-1.5">
            <p className="text-dark/80 font-medium text-[10px] sm:text-xs uppercase tracking-wider"> {/* Responsive label, opacity, uppercase */}
              {item.label}
            </p>
            <div className="border border-border-gray w-full rounded-md
                           py-1.5 px-2 sm:py-2
                           flex items-center justify-center
                           text-dark font-medium text-xs sm:text-sm text-center break-words"> {/* Responsive padding, font, centered text */}
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;