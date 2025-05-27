import { iAcademyResponse } from "@/hooks/academy"; // Assuming this path is correct
import React, { FC } from "react";
import Image from "next/image";
import { IoMdArrowBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";

// It's good practice to define props interface clearly
interface ViewAcademyProps {
  academy: iAcademyResponse;
  onClose: () => void;
}

const ViewAcademy: FC<ViewAcademyProps> = ({ academy, onClose }) => {
  const academyData: {
    value: string | number;
    key: string;
  }[] = [
    {
      key: "Academy Name",
      value: academy.name,
    },
    {
      key: "Coach Name",
      value: academy.principalOrCoach,
    },
    {
      key: "Address",
      value: academy.address,
    },
    {
      key: "Description",
      value: academy.description,
    },
    {
      key: "State",
      value: academy.state,
    },
    {
      key: "L.G.A",
      value: academy.lga,
    },
    {
      key: "Geo Location",
      value: `${academy.latitude ?? "N/A"}, ${academy.longitude ?? "N/A"}`, // Handle potential null/undefined
    },
    {
      key: "Number of Players",
      value: academy.playersCount ?? 0, // Provide default if null/undefined
    },
    {
      key: "Total Matches",
      value: academy.totalMatches ?? 0,
    },
    {
      key: "Win Count",
      value: academy.winCount ?? 0,
    },
    {
      key: "Lost Count",
      value: academy.lostCount ?? 0,
    },
    {
      key: "Graduated Count",
      value: academy.graduatedCount ?? 0,
    },
    {
      key: "Completed Count",
      value: academy.completedCount ?? 0,
    },
  ];

  const handleEdit = () => {
    try {
      const payload = Buffer.from(JSON.stringify(academy)).toString("base64");
      // Consider using Next.js router for client-side navigation if this is part of a Next.js app
      // import { useRouter } from 'next/navigation'; // or 'next/router' for older versions
      // const router = useRouter();
      // router.push(`/dashboard/scout/academies/edit?data=${payload}`);
      window.location.assign(
        `/dashboard/scout/academies/edit?data=${payload}`
      );
    } catch (error) {
      console.error("Error preparing edit data:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    // Added max-width for larger screens and centered, responsive padding
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 flex flex-col gap-5 sm:gap-6 bg-white rounded-lg shadow-md">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <IoMdArrowBack
            className="cursor-pointer text-dark hover:text-gray-700 transition-colors"
            onClick={onClose}
            size={26}
            aria-label="Go back"
          />
          {/* Responsive text size for the title */}
          <h2 className="text-[#0C1017BF] font-bold text-base sm:text-lg md:text-xl">
            Academy Details
          </h2>
        </div>
        <MdEdit
          className="cursor-pointer text-dark hover:text-gray-700 transition-colors"
          onClick={handleEdit}
          size={22}
          aria-label="Edit academy"
        />
      </div>

      {/* Responsive image: w-full, h-auto ensures it scales, object-cover maintains aspect ratio, max-h prevents excessive height */}
      <div className="w-full aspect-video sm:aspect-[16/9] md:max-h-[400px] overflow-hidden rounded-xl bg-gray-200">
        <Image
          src={academy.imageUrl || "/images/placeholder-academy.png"} // Fallback image
          alt={`${academy.name || "Academy"} image`} // More descriptive alt text
          width={800} // Provide a reasonably large width for quality
          height={450} // Matched to 16:9 aspect ratio
          className="w-full h-full object-cover" // Ensures image covers the container
          priority // Consider adding if this image is LCP (Largest Contentful Paint)
        />
      </div>

      {/* Responsive layout for data items: stack on small screens, side-by-side on larger */}
      <div className="w-full flex flex-col gap-3 sm:gap-4">
        {academyData.map((data, i) => (
          <div
            key={data.key} // Use a more stable key if possible, like data.key
            className={`w-full text-sm sm:text-base rounded-md px-3 py-2 sm:px-4 sm:py-3 flex flex-col md:flex-row md:items-center md:justify-between ${
              i % 2 === 0
                ? "bg-primary-2 text-white" // Assuming primary-2 is defined in your Tailwind config
                : "border border-primary-2 text-dark"
            }`}
          >
            <p className="font-semibold text-opacity-90">{data.key}:</p>
            {/* Allow text to wrap and align right on medium screens and up if desired */}
            <p className="md:text-right break-words">{String(data.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAcademy;