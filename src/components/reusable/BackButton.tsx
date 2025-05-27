import React from "react";
import { BiArrowBack } from "react-icons/bi";

const BackButton = () => {
  return (
    <>
      <div>
        <button className="flex gap-2 items-center justify-center w-[200px] text-black h-[40px] rounded-lg border border-black">
          <span>
            <BiArrowBack />
          </span>
          <p className="font-lato font-semibold text-[14px] leading-[24px] ">
            Previous Player
          </p>
        </button>
      </div>
    </>
  );
};

export default BackButton;
