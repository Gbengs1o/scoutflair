import { iLocalPitchResponse } from "@/hooks/pitch";
import React, { FC } from "react";
import { MdEdit } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";

const DetailedPitchSVG: FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 400 300"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field background */}
    <rect x="0" y="0" width="400" height="300" rx="8" fill="#16A34A" />

    {/* Field stripes for texture */}
    <defs>
      <pattern
        id="stripes"
        patternUnits="userSpaceOnUse"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="#16A34A" />
        <rect width="20" height="20" fill="#15803D" fillOpacity="0.3" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="400" height="300" fill="url(#stripes)" rx="8" />

    {/* Outer boundary */}
    <rect
      x="10"
      y="10"
      width="380"
      height="280"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
      rx="4"
    />

    {/* Center line */}
    <line
      x1="200"
      y1="10"
      x2="200"
      y2="290"
      stroke="#FFFFFF"
      strokeWidth="3"
    />

    {/* Center circle */}
    <circle
      cx="200"
      cy="150"
      r="50"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />
    <circle cx="200" cy="150" r="3" fill="#FFFFFF" />

    {/* Left penalty area */}
    <rect
      x="10"
      y="75"
      width="65"
      height="150"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />

    {/* Left goal area */}
    <rect
      x="10"
      y="115"
      width="25"
      height="70"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />

    {/* Left goal */}
    <rect x="5" y="135" width="5" height="30" fill="#FFFFFF" />

    {/* Left penalty spot */}
    <circle cx="55" cy="150" r="2" fill="#FFFFFF" />

    {/* Left penalty arc */}
    <path
      d="M 75 120 A 20 20 0 0 1 75 180"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />

    {/* Right penalty area */}
    <rect
      x="325"
      y="75"
      width="65"
      height="150"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />

    {/* Right goal area */}
    <rect
      x="365"
      y="115"
      width="25"
      height="70"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />

    {/* Right goal */}
    <rect x="390" y="135" width="5" height="30" fill="#FFFFFF" />

    {/* Right penalty spot */}
    <circle cx="345" cy="150" r="2" fill="#FFFFFF" />

    {/* Right penalty arc */}
    <path
      d="M 325 120 A 20 20 0 0 0 325 180"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />

    {/* Corner arcs */}
    <path
      d="M 10 20 A 10 10 0 0 1 20 10"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />
    <path
      d="M 380 10 A 10 10 0 0 1 390 20"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />
    <path
      d="M 390 280 A 10 10 0 0 1 380 290"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />
    <path
      d="M 20 290 A 10 10 0 0 1 10 280"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="3"
    />

    {/* Stadium lights */}
    <circle cx="50" cy="40" r="4" fill="#FCD34D" opacity="0.8" />
    <circle cx="150" cy="30" r="4" fill="#FCD34D" opacity="0.8" />
    <circle cx="250" cy="30" r="4" fill="#FCD34D" opacity="0.8" />
    <circle cx="350" cy="40" r="4" fill="#FCD34D" opacity="0.8" />

    <circle cx="50" cy="260" r="4" fill="#FCD34D" opacity="0.8" />
    <circle cx="150" cy="270" r="4" fill="#FCD34D" opacity="0.8" />
    <circle cx="250" cy="270" r="4" fill="#FCD34D" opacity="0.8" />
    <circle cx="350" cy="260" r="4" fill="#FCD34D" opacity="0.8" />
  </svg>
);

const ViewPitch: FC<{ pitch: iLocalPitchResponse; onClose: () => void }> = ({
  pitch,
  onClose,
}) => {
  const pitchData: {
    value: string | number;
    key: string;
  }[] = [
    {
      key: "Pitch Name",
      value: pitch.name,
    },
    {
      key: "Address",
      value: pitch.address,
    },
    {
      key: "State",
      value: pitch.state,
    },
    {
      key: "L.G.A",
      value: pitch.lga,
    },
    {
      key: "Geo Location",
      value: `${pitch.latitude}, ${pitch.longitude}`,
    },
    {
      key: "Length",
      value: pitch.length,
    },
    {
      key: "Width",
      value: pitch.width,
    },
    {
      key: "Surface",
      value: pitch.surface,
    },
    {
      key: "Facilities",
      value: pitch.facilities,
    },
    {
      key: "Year of Establishment",
      value: pitch.estYear,
    },
    {
      key: "Rating",
      value: pitch.rating,
    },
  ];

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Hero section containing the map and overlaid header */}
      <div className="relative w-full">
        {/* Map visualization */}
        <div className="w-full bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
          <DetailedPitchSVG className="w-full max-w-2xl h-auto" />
        </div>

        {/* Header content overlaid on the map */}
        <div className="absolute top-0 left-0 w-full flex items-center justify-between p-4">
          <div className="w-fit flex gap-3 items-center">
            <IoMdArrowBack
              className="cursor-pointer text-white"
              onClick={onClose}
              size={28}
            />
            <h2 className="text-white font-bold text-lg drop-shadow-md">
              Local Pitch Details
            </h2>
          </div>
          <MdEdit
            className="cursor-pointer text-white"
            onClick={() => {
              const payload = Buffer.from(JSON.stringify(pitch)).toString(
                "base64"
              );

              window.location.assign(
                `/dashboard/scout/pitches/edit?data=${payload}`
              );
            }}
            size={26}
          />
        </div>
      </div>

      {/* Details section with padding */}
      <div className="w-full p-6 flex flex-col gap-4">
        {pitchData.map((pit, i) => (
          <div
            key={i}
            className={`w-full text-12-14 flex items-center justify-between py-2 rounded px-4 ${
              i % 2 === 0
                ? "bg-primary-2 text-white"
                : "border border-primary-2 text-dark"
            }`}
          >
            <p>{pit.key}:</p>
            <p>{pit.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPitch;