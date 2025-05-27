import React, { FC } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { iLocalPitchResponse } from "@/hooks/pitch"; // Ensure this path is correct

// Default image if pitch.imageUrl is null or empty
const DEFAULT_PITCH_IMAGE = "/images/default-pitch.png"; //  Path to a default placeholder image

const PitchCard: FC<{
  pitch: iLocalPitchResponse;
  onSelected: () => void;
}> = ({ pitch, onSelected }) => {
  const displayImageUrl = pitch.imageUrl || DEFAULT_PITCH_IMAGE;

  // Defensive date parsing for estYear
  let yearDisplay = "N/A";
  if (pitch.estYear) {
    const date = new Date(pitch.estYear);
    if (!isNaN(date.getFullYear())) {
      yearDisplay = date.getFullYear().toString();
    } else if (typeof pitch.estYear === 'string' && /^\d{4}$/.test(pitch.estYear)) {
      // If it's already a 4-digit year string
      yearDisplay = pitch.estYear;
    }
  }


  return (
    <div
      className="bg-white hover:bg-primary-2 hover:bg-opacity-10 shadow-custom rounded-lg sm:rounded-xl flex gap-3 sm:gap-4 p-2.5 sm:p-3 cursor-pointer transition-all duration-150 ease-in-out"
      onClick={onSelected}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onSelected()}
    >
      {/* Image and Rating Section */}
      <div className="flex-shrink-0 w-16 sm:w-20 flex flex-col items-center gap-1">
        <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded overflow-hidden">
          <Image
            src={displayImageUrl}
            alt={`${pitch.name || 'Pitch'} image`}
            fill // Use fill to cover the parent div
            sizes="(max-width: 640px) 64px, 80px" // Responsive sizes for Next.js Image optimization
            className="object-cover"
            onError={(e) => { // Fallback for broken image URLs not caught by initial check
              (e.target as HTMLImageElement).src = DEFAULT_PITCH_IMAGE;
            }}
          />
        </div>
        <div className="items-center justify-center flex w-fit gap-0.5">
          <p className="text-dark font-medium text-xs sm:text-sm">
            {pitch.rating || "N/A"}
          </p>
          <FaStar className="text-yellow-400 w-2.5 h-2.5 sm:w-3 sm:h-3" /> {/* Using Tailwind yellow */}
        </div>
      </div>

      {/* Text Content Section */}
      <div className="flex-1 flex flex-col gap-1.5 sm:gap-2 justify-between min-w-0"> {/* min-w-0 for flex truncation */}
        <div className="flex flex-col gap-0.5 sm:gap-1 w-full">
          {/* Pitch Name */}
          <h2 className="text-sm sm:text-base font-semibold text-dark truncate" title={pitch.name}>
            {pitch.name || "Unnamed Pitch"}
          </h2>
          {/* Address */}
          <div className="flex items-center w-full gap-0.5 sm:gap-1 text-dark">
            <IoLocationOutline className="flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <p className="text-xs sm:text-sm line-clamp-1" title={pitch.address}>
              {pitch.address || "No address provided"}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="w-full grid grid-cols-3 gap-1 sm:gap-2 text-dark">
          <div className="flex flex-col">
            <h3 className="text-[10px] sm:text-xs text-gray-600">Year:</h3>
            <p className="text-xs sm:text-sm font-medium">
              {yearDisplay}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[10px] sm:text-xs text-gray-600">Length:</h3>
            <p className="text-xs sm:text-sm font-medium">
              {pitch.length ? `${pitch.length}m` : "N/A"}
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[10px] sm:text-xs text-gray-600">Width:</h3>
            <p className="text-xs sm:text-sm font-medium">
              {pitch.width ? `${pitch.width}m` : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchCard;