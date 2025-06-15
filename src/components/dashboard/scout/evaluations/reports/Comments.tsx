import React, { FC } from "react";
import Image from "next/image";

import Void from "@/public/images/Void.png";

const Comments: FC<{ comment?: string }> = ({ comment }) => {
  return (
    <div className="w-full shadow-custom rounded-[1rem] py-4 px-5 gap-5 bg-white flex flex-col">
      <h2 className="text-dark font-bold text-16-19">Scout&apos;s Comments</h2>
      {!comment && (
        <div className="w-full h-[20rem] flex flex-col justify-center items-center gap-5">
          <Image
            src={Void}
            alt="no comments"
            width={100}
            height={100}
            className="w-40 h-auto object-cover"
          />

          <h2 className="text-dark text-12-14 font-medium">
            There are no comments available
          </h2>
        </div>
      )}
      {comment && <p className="text-14-16 text-dark">{comment}</p>}
    </div>
  );
};

export default Comments;
