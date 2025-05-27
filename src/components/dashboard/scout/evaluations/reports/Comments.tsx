import React, { FC } from "react";
import Image from "next/image";

import Void from "@/public/images/Void.png"; // Make sure this path is correct

const Comments: FC<{ comment?: string }> = ({ comment }) => {
  return (
    <div className="w-full shadow-custom rounded-[1rem] bg-white flex flex-col
                   py-3 px-4 sm:py-4 sm:px-5 gap-3 sm:gap-4 md:gap-5"> {/* Responsive padding and gap */}
      <h2 className="text-dark font-bold text-sm sm:text-base md:text-lg"> {/* Example of responsive font size using Tailwind defaults */}
      {/* Or, if your custom class text-16-19 is already responsive: */}
      {/* <h2 className="text-dark font-bold text-16-19"> */}
        Scout's Comments
      </h2>

      {!comment && (
        <div className="w-full flex flex-col justify-center items-center
                       gap-3 sm:gap-4 py-8 sm:py-10 md:py-12"> {/* Responsive gap and vertical padding */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"> {/* Responsive container for Image */}
            <Image
              src={Void}
              alt="no comments"
              layout="fill" // Use fill to make it responsive within the parent
              objectFit="contain" // or "cover" depending on how Void.png looks
              // width and height props are not strictly needed with layout="fill"
              // but can be provided for initial aspect ratio if known, though parent div now controls size.
            />
          </div>

          <h2 className="text-dark font-medium text-xs sm:text-sm md:text-base text-center"> {/* Responsive font size & centered */}
          {/* Or, if your custom class text-12-14 is already responsive: */}
          {/* <h2 className="text-dark text-12-14 font-medium text-center"> */}
            There are no comments available
          </h2>
        </div>
      )}

      {comment && (
        <p className="text-dark text-sm sm:text-base break-words"> {/* Responsive font size & word break */}
        {/* Or, if your custom class text-14-16 is already responsive: */}
        {/* <p className="text-14-16 text-dark break-words"> */}
          {comment}
        </p>
      )}
    </div>
  );
};

export default Comments;