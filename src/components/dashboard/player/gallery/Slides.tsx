"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Void from "@/public/images/Void.png";
import { convertDateWithDayName } from "@/functions/dateFunctions";
import { useGetUserGallery, ImageData } from "@/hooks/player";

import { Loader } from "@mantine/core";

function groupImagesByDay(images: ImageData[]): Map<string, ImageData[]> {
  const groups: Map<string, ImageData[]> = new Map();

  images.forEach((image) => {
    const imageDate = new Date(image.createdDate);
    const dateString = imageDate.toISOString().split("T")[0];

    if (!groups.has(dateString)) {
      groups.set(dateString, []);
    }
    groups.get(dateString)!.push(image);
  });

  return groups;
}

const Slides = () => {
  const [slides, setSlides] = useState<Map<string, ImageData[]>>(new Map());
  const [keys, setKeys] = useState<string[]>([]);
  const {
    loading: loadingGallery,
    data: gallery,
    success: loadedGalleries,
  } = useGetUserGallery();

  useEffect(() => {
    if (!loadingGallery && loadedGalleries) {
      const groupedImages = groupImagesByDay(gallery!);
      setSlides(groupedImages);
      setKeys(groupedImages.keys().toArray());
    }
  }, [loadingGallery, loadedGalleries]);

  return (
    <div className="w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] shadow-custom rounded-[1rem] py-3 sm:py-4 px-3 sm:px-5 gap-4 sm:gap-6 bg-white flex flex-col">
      {!loadingGallery &&
        keys.length > 0 &&
        keys.map((slide, i) => {
          const dateHeader = slides.get(slide)![0]!.createdDate;
          const images = slides.get(slide)!;

          return (
            <div className="w-full flex flex-col gap-3 sm:gap-5" key={i}>
              <h2 className="text-12-14 sm:text-14-16 text-dark font-medium">
                {convertDateWithDayName(dateHeader).toUpperCase()}
              </h2>
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-md group cursor-pointer"
                  >
                    <Image
                      src={image.mediaUrl}
                      alt="image"
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      
      {loadingGallery && (
        <div className="w-full h-full grid place-content-center min-h-[40vh]">
          <Loader color="primary.6" />
        </div>
      )}
      
      {!loadingGallery && keys.length === 0 && (
        <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] flex flex-col justify-center items-center gap-3 sm:gap-5 px-4">
          <Image
            src={Void}
            alt="no matches"
            width={100}
            height={100}
            className="w-24 sm:w-32 h-auto object-cover"
          />

          <h2 className="text-dark text-11-13 sm:text-12-14 font-medium text-center">
            You have not posted any media yet
          </h2>
        </div>
      )}
    </div>
  );
};

export default Slides;