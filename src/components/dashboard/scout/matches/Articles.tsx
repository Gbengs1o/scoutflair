"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

import Analysis from "@/public/dashboard/scout/match analysis.jpeg"; // Assuming this is a valid path
import { convertDateFullAndTime } from "@/functions/dateFunctions";

interface iArticle {
  id: number; // Add an id for a stable key
  image: StaticImageData | string;
  news: string;
  date: Date;
}

const Articles = () => {
  // Initialize with unique IDs for keys
  const [articles, setArticles] = useState<iArticle[]>(
    Array(5)
      .fill(null)
      .map((_, index) => ({
        id: index, // Use index for unique ID in this mock data
        image: Analysis,
        date: new Date(new Date().setDate(new Date().getDate() - index)), // Vary dates slightly
        news: "Lorem ipsum dolor sit amet consectetur. Lectus nec egestas eget tincidunt. Id sapien enim dictum ut ullamcorper interdum quam orci. Fusce eget nec od",
      }))
  );

  return (
    <div className="w-full shadow-custom rounded-xl sm:rounded-2xl py-4 px-4 sm:px-5 bg-white flex flex-col gap-4 sm:gap-6">
      {/* Title - Adjusted text size for responsiveness if needed, keeping custom for now */}
      <h2 className="text-dark font-bold text-base sm:text-lg md:text-16-19"> {/* Example of responsive text size */}
        Latest Articles
      </h2>

      <div className="flex flex-col gap-3 sm:gap-4 w-full">
        {articles.map((article) => (
          <div
            key={article.id} // Use a stable ID for the key
            className="w-full flex items-start sm:items-center gap-3 sm:gap-4" // items-start for potentially multi-line text
          >
            {/* Image - Adjusted size for responsiveness */}
            <div className="flex-shrink-0"> {/* Prevents image from shrinking too much */}
              <Image
                src={article.image}
                alt="article image"
                width={60} // Intrinsic width of the source image (adjust if different)
                height={60} // Intrinsic height of the source image (adjust if different)
                className="rounded-md sm:rounded-lg w-14 h-14 sm:w-16 sm:h-16 object-cover"
                // w-14 h-14 (56px) for small screens
                // sm:w-16 sm:h-16 (64px) for sm and up
                // object-cover to maintain aspect ratio and fill
              />
            </div>

            <div className="flex-1 flex flex-col gap-0.5 sm:gap-1 min-w-0"> {/* flex-1 and min-w-0 for text truncation if needed */}
              {/* News Headline - Adjusted text size & added line-clamping for long text */}
              <h3 className="font-medium text-xs sm:text-sm md:text-10-15 text-dark leading-snug line-clamp-2 sm:line-clamp-3">
                {/* line-clamp-X requires @tailwindcss/line-clamp plugin or custom CSS */}
                {/* Example responsive text: text-xs sm:text-sm */}
                {article.news}
              </h3>
              {/* Date - Adjusted text size */}
              <h4 className="text-placeholder text-[10px] sm:text-xs md:text-8-15">
                {/* Example responsive text: text-[10px] sm:text-xs */}
                {convertDateFullAndTime(article.date)}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;