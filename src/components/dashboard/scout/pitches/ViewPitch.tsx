import { iLocalPitchResponse } from "@/hooks/pitch"; // Ensure this path is correct
import React, { FC, useMemo } from "react";
import { MdEdit } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import Image from "next/image";
import Link from "next/link"; // For Next.js client-side navigation

// Default image if pitch.imageUrl is null or empty
const DEFAULT_PITCH_IMAGE = "/images/default-pitch-large.png"; // Path to a default placeholder image (larger variant)

interface PitchDetailItem {
  key: string;
  value: string | number | undefined;
  isGeo?: boolean; // For special formatting if needed
}

const ViewPitch: FC<{ pitch: iLocalPitchResponse; onClose: () => void }> = ({
  pitch,
  onClose,
}) => {
  const displayImageUrl = pitch.imageUrl || DEFAULT_PITCH_IMAGE;

  // Using useMemo to create pitchData only when pitch object changes
  const pitchData: PitchDetailItem[] = useMemo(() => [
    { key: "Pitch Name", value: pitch.name },
    { key: "Address", value: pitch.address },
    { key: "State", value: pitch.state },
    { key: "L.G.A", value: pitch.lga },
    { key: "Geo Location", value: `${pitch.latitude || 'N/A'}, ${pitch.longitude || 'N/A'}`, isGeo: true },
    { key: "Length", value: pitch.length ? `${pitch.length}m` : "N/A" },
    { key: "Width", value: pitch.width ? `${pitch.width}m` : "N/A" },
    { key: "Surface", value: pitch.surface },
    { key: "Facilities", value: pitch.facilities },
    {
      key: "Year of Est.", // Shortened for better fit
      value: pitch.estYear ? (new Date(pitch.estYear).getFullYear() || pitch.estYear) : "N/A",
    },
    { key: "Rating", value: pitch.rating ? `${pitch.rating}/5` : "N/A" },
  ], [pitch]);

  const editPayload = useMemo(() => {
    return Buffer.from(JSON.stringify(pitch)).toString("base64");
  }, [pitch]);

  return (
    // Main container: responsive padding and gap
    // This component might be placed in a container that handles its overall height and scrolling.
    // If ViewPitch itself needs to scroll, add overflow-y-auto here and ensure it has a max-height from its parent.
    <div className="w-full p-3 sm:p-4 md:p-6 flex flex-col gap-4 sm:gap-5 bg-white">
      {/* Header Section */}
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-2 sm:gap-3 items-center">
          <button
            onClick={onClose}
            aria-label="Go back"
            className="p-1.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-2 transition-colors"
          >
            <IoMdArrowBack
              className="text-dark"
              size={22} // Base size, can adjust with sm: if needed
            />
          </button>
          <h2 className="text-dark/90 font-bold text-base sm:text-lg md:text-xl">
            Local Pitch Details
          </h2>
        </div>
        <Link
          href={`/dashboard/scout/pitches/edit?data=${editPayload}`}
          aria-label="Edit pitch details"
          className="p-1.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-2 transition-colors"
        >
          <MdEdit
            className="text-dark"
            size={20} // Base size
          />
        </Link>
      </div>

      {/* Image Section */}
      <div className="w-full aspect-video sm:aspect-[16/8] md:aspect-[16/7] rounded-lg sm:rounded-xl overflow-hidden relative shadow-sm">
        <Image
          src={displayImageUrl}
          alt={`${pitch.name || "Pitch"} image`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px" // Adjust sizes based on layout
          className="object-cover"
          priority // Consider adding priority if this image is LCP
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_PITCH_IMAGE;
          }}
        />
      </div>

      {/* Pitch Details List */}
      <div className="w-full flex flex-col gap-2.5 sm:gap-3">
        {pitchData.map((item, i) => (
          <div
            key={item.key + i} // Using item.key for more stable keying if order doesn't change
            className={`w-full flex flex-col sm:flex-row sm:items-center sm:justify-between p-2.5 sm:p-3 rounded-md
                        ${
                          i % 2 === 0
                            ? "bg-primary-2 text-white"
                            : "border border-primary-2/80 text-dark" // Slightly less prominent border
                        }`}
          >
            <p className="font-medium text-xs sm:text-sm">{item.key}:</p>
            <p className={`text-xs sm:text-sm mt-0.5 sm:mt-0 ${i % 2 === 0 ? 'text-white/90' : 'text-dark/80'} sm:text-right break-words`}>
              {String(item.value ?? "N/A")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPitch;