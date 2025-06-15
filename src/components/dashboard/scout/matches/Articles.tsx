"use client";

import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

import Analysis from "@/public/dashboard/scout/match analysis.jpeg";
import { convertDateFullAndTime } from "@/functions/dateFunctions";

interface iArticle {
  image: StaticImageData | string;
  news: string;
  date: Date;
}

const Articles = () => {
  const [articles, setArticles] = useState<iArticle[]>(
    Array(5).fill({
      image: Analysis,
      date: new Date(),
      news: "Lorem ipsum dolor sit amet consectetur. Lectus nec egestas eget tincidunt. Id sapien enim dictum ut ullamcorper interdum quam orci. Fusce eget nec od",
    })
  );

  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-5 bg-white flex flex-col gap-6">
      <h2 className="text-dark font-bold text-16-19">Latest Articles</h2>
      <div className="flex flex-col gap-4 w-full">
        {articles.map((article, i) => (
          <div key={i} className="w-full flex items-center gap-4">
            <Image
              src={article.image}
              alt="article image"
              width={64}
              height={64}
              className="rounded-lg w-20 h-[3.75rem]"
            />

            <div className="w-full flex flex-col gap-1">
              <h3 className="font-medium text-10-15 text-dark">
                {article.news}
              </h3>
              <h4 className="text-placeholder text-8-15">
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
