"use client";

import React, { useState } from "react";
import PlayerImage from "@/public/dashboard/scout/Rectangle 13.png";
import Image, { StaticImageData } from "next/image";

const Gallery = () => {
  const [images, setImages] = useState<(StaticImageData | string)[]>(
    Array(6).fill(PlayerImage)
  );

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-5 gap-5 bg-white flex flex-col justify-between">
      <h2 className="text-dark font-bold text-16-19">Gallery</h2>
      <div className="w-full grid grid-cols-2 gap-4">
        {images.map((image, i) => (
          <Image
            src={image}
            alt="player image"
            key={i}
            className="w-full h-[5rem] object-cover rounded-xl"
            width={200}
            height={200}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
