import React, { FC } from "react";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { iLocalPitchResponse } from "@/hooks/pitch";

const PitchSVG: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Pitch background */}
    <rect
      x="2"
      y="4"
      width="36"
      height="32"
      rx="2"
      fill="#22C55E"
      stroke="#16A34A"
      strokeWidth="1"
    />
    
    {/* Center circle */}
    <circle
      cx="20"
      cy="20"
      r="6"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1.5"
    />
    <circle
      cx="20"
      cy="20"
      r="1"
      fill="#FFFFFF"
    />
    
    {/* Center line */}
    <line
      x1="20"
      y1="4"
      x2="20"
      y2="36"
      stroke="#FFFFFF"
      strokeWidth="1.5"
    />
    
    {/* Left goal area */}
    <rect
      x="2"
      y="12"
      width="8"
      height="16"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1.5"
    />
    <rect
      x="2"
      y="16"
      width="4"
      height="8"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1.5"
    />
    
    {/* Right goal area */}
    <rect
      x="30"
      y="12"
      width="8"
      height="16"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1.5"
    />
    <rect
      x="34"
      y="16"
      width="4"
      height="8"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1.5"
    />
    
    {/* Corner arcs */}
    <path
      d="M2 4 Q4 4 4 6"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1"
    />
    <path
      d="M38 4 Q36 4 36 6"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1"
    />
    <path
      d="M2 36 Q4 36 4 34"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1"
    />
    <path
      d="M38 36 Q36 36 36 34"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1"
    />
  </svg>
);

const PitchCard: FC<{
  pitch: iLocalPitchResponse;
  onSelected: () => void;
}> = ({ pitch, onSelected }) => {
  return (
    <div
      className={`bg-white hover:bg-secondary hover:bg-opacity-20 shadow-custom rounded-xl flex gap-5 px-3 py-2 cursor-pointer`}
      onClick={onSelected}
    >
      <div className="w-10 flex flex-col items-center gap-1">
        <div className="size-10 rounded bg-gray-100 flex items-center justify-center">
          <PitchSVG className="size-8" />
        </div>
        <div className="items-center justify-center flex w-fit gap-0.5">
          <p className="text-12-14 text-dark font-medium">{pitch.rating}</p>
          <FaStar size={8} className={`text-secondary-3`} />
        </div>
      </div>
      <div className="w-[calc(100%-3.75rem)] flex flex-col gap-1 justify-between">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-12-14 font-semibold text-dark">{pitch.name}</h2>
          </div>
          <div className="flex items-center w-fit gap-0.5">
            <IoLocationOutline className={`text-dark`} size={10} />
            <h2 className="text-10-12 text-dark line-clamp-1">
              {pitch.address}
            </h2>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 text-8-9 text-dark">
          <div className="flex flex-col w-full">
            <h3 className="text-8-9">Year Built:</h3>
            <p className="text-10-12">
              {new Date(pitch.estYear).getFullYear()}
            </p>
          </div>
          <div className="flex flex-col w-full">
            <h3 className="text-8-9">Length:</h3>
            <p className="text-10-12">{pitch.length}m</p>
          </div>
          <div className="flex flex-col w-full">
            <h3 className="text-8-9">Width:</h3>
            <p className="text-10-12">{pitch.width}m</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchCard;