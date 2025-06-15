"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "@mantine/core";

// --- Helper Types & Functions (Now self-contained) ---

// Define the shape of our image data
interface ImageData {
  mediaUrl: string;
  createdDate: string; // Use ISO string format (e.g., "2023-10-27T10:00:00Z")
}

// A simple function to format the date header
const convertDateWithDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

// Groups images by the day they were created
function groupImagesByDay(images: ImageData[]): Map<string, ImageData[]> {
  const groups: Map<string, ImageData[]> = new Map();

  images.forEach((image) => {
    const imageDate = new Date(image.createdDate);
    const dateString = imageDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

    if (!groups.has(dateString)) {
      groups.set(dateString, []);
    }
    groups.get(dateString)!.push(image);
  });

  return groups;
}

// --- Mock Data Generation ---

// Your provided image URLs
const imageUrls = [
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002582_793_4993.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002585_793_4994.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002584_793_4991.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002583_793_4997-1.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002583_791_1993.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002579_791_1987.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002584_791_1994.png",
];

// Create dates for today, yesterday, and a few days ago to test grouping
const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const threeDaysAgo = new Date();
threeDaysAgo.setDate(today.getDate() - 3);

// This array simulates the data you would get from your API
const mockGalleryData: ImageData[] = [
  // Posts from Today
  { mediaUrl: imageUrls[0], createdDate: today.toISOString() },
  { mediaUrl: imageUrls[1], createdDate: today.toISOString() },

  // Posts from Yesterday
  { mediaUrl: imageUrls[2], createdDate: yesterday.toISOString() },
  { mediaUrl: imageUrls[3], createdDate: yesterday.toISOString() },
  { mediaUrl: imageUrls[4], createdDate: yesterday.toISOString() },

  // Posts from 3 days ago
  { mediaUrl: imageUrls[5], createdDate: threeDaysAgo.toISOString() },
  { mediaUrl: imageUrls[6], createdDate: threeDaysAgo.toISOString() },
];


// --- The Component ---

const Slides = () => {
  const [slides, setSlides] = useState<Map<string, ImageData[]>>(new Map());
  const [keys, setKeys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching data when the component mounts
  useEffect(() => {
    // To test the "empty" state, change `mockGalleryData` to `[]`
    const dataToLoad = mockGalleryData;

    const timer = setTimeout(() => {
      const groupedImages = groupImagesByDay(dataToLoad);
      setSlides(groupedImages);
      // Convert Map keys to an array to map over them
      setKeys(Array.from(groupedImages.keys()));
      setLoading(false);
    }, 1500); // Simulate a 1.5-second network delay

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="w-full min-h-[80vh] grid place-content-center bg-white shadow-custom rounded-[1rem]">
        <Loader color="blue" /> {/* Changed to a more generic color */}
      </div>
    );
  }

  // Empty State
  if (keys.length === 0) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center gap-5 bg-white shadow-custom rounded-[1rem]">
        {/* Make sure you have an image at `public/images/Void.png` or replace this */}
        {/* <Image
          src="/images/Void.png"
          alt="No media found"
          width={128}
          height={128}
          className="object-cover"
        /> */}
        <div className="text-gray-400">🖼️</div> {/* Placeholder icon */}
        <h2 className="text-dark text-lg font-medium">
          You have not posted any media yet
        </h2>
        <p className="text-gray-500 text-sm">Once you do, it will show up here.</p>
      </div>
    );
  }

  // Content State
  return (
    <div className="w-full min-h-[80vh] shadow-custom rounded-[1rem] py-6 px-5 gap-8 bg-white flex flex-col">
      {keys.map((dateKey, i) => {
        const imagesForDay = slides.get(dateKey)!;
        const dateHeader = imagesForDay[0]!.createdDate;

        return (
          <div className="w-full flex flex-col gap-5" key={i}>
            <h2 className="text-sm font-semibold text-gray-700 tracking-wide">
              {convertDateWithDayName(dateHeader).toUpperCase()}
            </h2>
            {/* RESPONSIVE GRID: 2 cols on mobile, 3 on small screens, 4 on large screens */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {imagesForDay.map((image, index) => (
                <div key={index} className="aspect-square w-full">
                  <Image
                    src={image.mediaUrl}
                    alt={`Gallery image ${index + 1}`}
                    width={300} // Provide a higher resolution for better quality
                    height={300}
                    className="object-cover rounded-lg w-full h-full shadow-md transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Slides;