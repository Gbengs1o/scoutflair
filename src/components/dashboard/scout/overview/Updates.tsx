import Image, { StaticImageData } from "next/image";
import React from "react";
import { MdOutlineUpdate } from "react-icons/md";

import Pic from "@/public/dashboard/scout/ellipse-2374.png"; // Ensure this path is correct
import { convertTime } from "@/functions/dateFunctions"; // Ensure this path is correct

interface iUpdate {
  image: string | StaticImageData;
  content: string;
  date: Date;
}

const Updates = () => {
  // Mock data - consider adding unique keys if this were real data
  const updates: iUpdate[] = Array(5).fill({
    image: Pic,
    content:
      "Scoutflair will roll out new features next month, and these updates will be available for premium users only. Make sure to check them out!",
    date: new Date(),
  });

  return (
    <div className="w-full shadow-custom rounded-xl sm:rounded-2xl py-3 sm:py-4 bg-white flex flex-col gap-3 sm:gap-4">
      {/* Header */}
      <div className="w-full justify-between items-center flex px-3 sm:px-4 md:px-5">
        <div className="flex gap-1 sm:gap-1.5 w-fit items-center text-dark">
          <MdOutlineUpdate className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
          <h2 className="font-bold text-sm sm:text-base md:text-lg">Updates</h2>
        </div>
        {/* "View All" could be a link or button styled text */}
        <button className="text-dark hover:text-primary-2 text-xs sm:text-sm font-medium focus:outline-none">
          View All
        </button>
      </div>

      {/* Update Items List */}
      <div className="flex flex-col">
        {updates.map((update, i) => (
          <div
            key={i} // For mock data, index is okay. For real data, use a unique ID.
            // Item container: responsive padding, border only on bottom (except last)
            className={`w-full flex justify-between items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2.5 sm:py-3
                        ${i < updates.length - 1 ? "border-b border-border-gray" : ""}`}
          >
            {/* Content section: Image and Text */}
            <div className="flex gap-2 sm:gap-3 items-center flex-grow overflow-hidden"> {/* overflow-hidden for line-clamp */}
              <Image
                src={update.image}
                alt="update-related-image" // More descriptive alt text
                width={36} // Next.js Image width prop
                height={36} // Next.js Image height prop
                className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full"
              />
              {/*
                Using line-clamp plugin from @tailwindcss/line-clamp if available,
                or a simple CSS approach for modern browsers.
                Here, `truncate` is a simple single-line solution.
                For multi-line, you'd typically use @tailwindcss/line-clamp classes like `line-clamp-2`.
                I'll use `line-clamp-2` assuming the plugin is available.
                If not, `truncate` provides single-line truncation.
              */}
              <p className="text-xs sm:text-sm text-dark line-clamp-2"> {/* line-clamp-2 for two lines */}
                {update.content}
              </p>
            </div>

            {/* Date section */}
            <p className="text-placeholder text-[10px] sm:text-xs flex-shrink-0 whitespace-nowrap">
              {convertTime(update.date)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;