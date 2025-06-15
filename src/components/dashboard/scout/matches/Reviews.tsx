"use client";

import React, { useState } from "react";

import Image, { StaticImageData } from "next/image";
import Player from "@/public/dashboard/scout/Rectangle 14.png";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { HiMiniTrophy } from "react-icons/hi2";

interface iReview {
  image: StaticImageData | string;
  academy: string;
  name: string;
  target: string;
  fitness: number;
  dribble: number;
  pace: number;
  composure: number;
  overall: number;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<iReview[]>(
    Array(4).fill({
      image: Player,
      name: "Paul Attah",
      academy: "Scoutflair Academy",
      target: "00 G/A Promising",
      fitness: 0,
      dribble: 0,
      pace: 0,
      composure: 0,
      overall: 18,
    })
  );

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 bg-white flex flex-col gap-6">
      <h2 className="text-dark font-bold text-16-19 px-5">Player Reviews</h2>
      <div className={` w-full flex flex-col `}>
        {reviews.map((review, i) => (
          <div
            className={`w-full flex justify-between px-5 items-center gap-4 py-4 border-border-gray ${
              i !== reviews.length - 1 && "border-b"
            } `}
            key={i}
          >
            <div className="flex gap-1 w-fit items-center">
              <Image
                src={review.image}
                alt="image"
                width={40}
                height={40}
                className="size-[3.75rem] object-cover rounded-lg"
              />
              <div className="flex flex-col gap-1">
                <p className="text-8-9 text-primary-2 font-medium">
                  {review.academy}
                </p>
                <div className="flex flex-col">
                  <h2 className="text-14-15 text-dark font-medium">
                    {review.name}
                  </h2>
                  <p className="text-placeholder text-10-12 font-medium">
                    {review.target}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-fit items-center gap-2">
              <div className="flex flex-col gap-1 items-start">
                <h3 className="font-medium text-8-9 text-dark">Fitness</h3>
                <h2 className="w-full text-14-15 font-bold text-dark">
                  {review.fitness.toString().padStart(2, "0")}%
                </h2>
                <h3 className="font-medium text-8-9 text-dark">Improved</h3>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h3 className="font-medium text-8-9 text-dark">Dribble</h3>
                <h2 className="w-full text-14-15 font-bold text-dark">
                  {review.dribble.toString().padStart(2, "0")}%
                </h2>
                <h3 className="font-medium text-8-9 text-dark">Good</h3>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h3 className="font-medium text-8-9 text-dark">Pace</h3>
                <h2 className="w-full text-14-15 font-bold text-dark">
                  {review.pace.toString().padStart(2, "0")}%
                </h2>
                <h3 className="font-medium text-8-9 text-dark">Excellent</h3>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h3 className="font-medium text-8-9 text-dark">Composure</h3>
                <h2 className="w-full text-14-15 font-bold text-dark">
                  {review.composure.toString().padStart(2, "0")}%
                </h2>
                <h3 className="font-medium text-8-9 text-dark">Improved</h3>
              </div>
            </div>

            <div className="w-fit flex items-center gap-2">
              <div style={{ width: 40, height: 40 }}>
                <CircularProgressbar
                  value={review.overall}
                  text={`${review.overall}%`}
                  strokeWidth={12}
                  styles={buildStyles({
                    rotation: 0.5,
                    strokeLinecap: "round",
                    textSize: "18px",
                    pathTransitionDuration: 0.5,
                    pathColor: `#041931`,
                    textColor: "#222222",
                    trailColor: "#D9D9D9",
                  })}
                />
              </div>
              <div className="grid place-content-center size-10 rounded-full bg-secondary-3 text-dark">
                <HiMiniTrophy className="text-16-19" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
