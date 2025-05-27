"use client";

import React, { useState, useEffect } from "react";

import Analysis from "@/public/dashboard/scout/match analysis.jpeg";
import Image, { StaticImageData } from "next/image";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

interface iArticle {
  heading: string;
  image: StaticImageData | string;
  news: string;
  date: Date;
}

const Feeds = () => {
  const [topArticle, setTopArticle] = useState<iArticle>({
    heading: "Local News",
    image: Analysis,
    date: new Date(),
    news: "Valuegate Football Academy Unveils New 300- Seater Local Stadium, Located in Abuja, Nigeria",
  });

  const [articles, setArticles] = useState<iArticle[]>(
    Array(5).fill({
      heading: "Sport News",
      image: Analysis,
      date: new Date(),
      news: "Valuegate Football Academy Unveils New 300- Seater Local Stadium, Located in Abuja, Nigeria",
    })
  );

  TimeAgo.setDefaultLocale("en-US");
  TimeAgo.addLocale(en);
  const time = new TimeAgo("en-US");

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-3 sm:px-5 gap-4 sm:gap-6 bg-white flex flex-col">
      <div className="w-full justify-between items-center flex">
        <h2 className="font-bold text-14-16 sm:text-16-19 text-dark">News Feed</h2>
        <p className="text-primary-2 text-9-11 sm:text-10-12 cursor-pointer hover:underline">View All</p>
      </div>
      
      {/* Featured Article */}
      <div className="w-full h-32 sm:h-36 overflow-hidden rounded-xl shadow-custom-2 bg-[url('../../public/dashboard/player/grass.jpeg')] bg-cover bg-no-repeat bg-center">
        <div className="w-full h-full flex items-center bg-[#041931]/70 px-3 sm:px-4 py-4 sm:py-6 gap-3 sm:gap-4">
          <div className="flex flex-col gap-1 sm:gap-2 flex-1 min-w-0">
            <h2 className="text-9-11 sm:text-10-12 font-semibold text-white">
              {topArticle.heading}
              {"  "}
              <span className="text-5-6 sm:text-6-7 text-white">
                &bull; {time.format(topArticle.date)}
              </span>
            </h2>
            <p className="text-9-13 sm:text-10-15 text-white line-clamp-2 sm:line-clamp-3">
              {topArticle.news}
            </p>
          </div>
          <Image
            src={topArticle.image}
            alt="article image"
            width={64}
            height={64}
            className="object-cover w-16 h-12 sm:w-20 sm:h-16 rounded flex-shrink-0"
          />
        </div>
      </div>
      
      {/* Articles List */}
      <div className="flex flex-col w-full px-[2%] sm:px-[5%]">
        {articles.map((article, i) => (
          <div key={i} className="flex flex-col w-full">
            <div className="w-full flex items-start gap-3 sm:gap-6">
              <Image
                src={article.image}
                alt="article image"
                width={64}
                height={64}
                className="object-cover size-12 sm:size-16 rounded flex-shrink-0 mt-1"
              />
              <div className="flex flex-col gap-1 sm:gap-2 flex-1 min-w-0">
                <h2 className="text-9-11 sm:text-10-12 font-semibold text-dark">
                  {article.heading}
                  {"  "}
                  <span className="text-5-6 sm:text-6-7 text-dark">
                    &bull; {time.format(article.date)}
                  </span>
                </h2>
                <p className="text-9-13 sm:text-10-15 text-dark line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {article.news}
                </p>
              </div>
            </div>

            {i < articles.length - 1 && (
              <hr className="w-full bg-[#E0E0E0] mt-2 mb-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feeds;