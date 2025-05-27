"use client";

import React, { useState } from "react";
import PlayerImage from "@/public/dashboard/scout/Rectangle 13.png"; // Ensure this path is correct
import Image, { StaticImageData } from "next/image";

const Gallery: React.FC = () => {
  const [images, setImages] = useState<(StaticImageData | string)[]>(
    Array(6).fill(PlayerImage)
  );

  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col
                   py-3 px-4 sm:py-4 sm:px-5 gap-3 sm:gap-4 md:gap-5">
      <h2 className="text-dark font-bold text-base sm:text-lg md:text-xl">
        Gallery
      </h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {images.map((image, i) => (
          <div
            key={i}
            className="aspect-square relative overflow-hidden rounded-lg sm:rounded-xl group"
            // Or aspect-[4/3], aspect-video, etc.
            // `group` class is for potential hover effects on children
          >
            <Image
              src={image}
              alt={`Player image ${i + 1}`}
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 768px) 50vw, 33vw" // Adjust based on columns
              className="transition-transform duration-300 ease-in-out group-hover:scale-105" // Example hover
              // width={...} height={...} // Optional: for optimization, hint original aspect ratio
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;