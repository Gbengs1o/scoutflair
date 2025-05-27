import React from "react";
import { MdArrowRightAlt } from "react-icons/md";

const NextButton = () => {
    return (
        <>
        <div>
        <button className="flex gap-2 items-center justify-center w-[200px] h-[40px] bg-[#041931] text-white rounded-lg border border-black">
            <p className="font-lato font-semibold text-[14px] leading-[24px]">Next Player</p>
            <span><MdArrowRightAlt /></span>
            </button>
        </div>
        </>
    )
}

export default NextButton;