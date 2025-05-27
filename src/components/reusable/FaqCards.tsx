import React from "react";
import Image, { StaticImageData } from "next/image";
import faqImage from "@/public/images/mystery-box-with-gifts-concept.png"; // Ensure this path is correct

interface FaqCardProps {
  question: string;
  answer: string;
}

export const FaqCardBlue: React.FC<FaqCardProps> = ({ question, answer }) => {
  return (
    <div
      className="flex flex-col justify-start items-center relative gap-3 sm:gap-4 px-4 sm:px-6 pt-4 pb-6 sm:pb-7 rounded-xl sm:rounded-2xl bg-[#4bbac1] border-[3px] sm:border-4 border-[#d1d1d1]"
      style={{ boxShadow: "0px 8px 10px 0 rgba(209,209,209,0.12)" }}
    >
      <Image
        src={faqImage}
        // Responsive image size, Tailwind opacity for consistency
        className="w-12 h-16 sm:w-[54px] sm:h-[72px] opacity-80 sm:opacity-[0.86] object-cover"
        alt="FAQ illustration with a question box" // Descriptive alt text
        // width/height props for Next/Image define intrinsic size and aspect ratio
        width={54} // Original intrinsic width
        height={72} // Original intrinsic height
      />
      <div className="flex flex-col justify-start items-center self-stretch relative gap-1.5 sm:gap-2">
        <p className="self-stretch w-full sm:w-fit opacity-90 sm:opacity-[0.92] text-xl sm:text-2xl font-semibold text-center text-white">
          {question}
        </p>
        <p className="self-stretch w-full sm:w-fit opacity-75 sm:opacity-80 text-sm text-center text-white leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const FaqCardWhite: React.FC<FaqCardProps> = ({ question, answer }) => {
  return (
    <div
      className="flex flex-col justify-start items-center relative gap-3 sm:gap-4 px-4 sm:px-6 pt-4 pb-6 sm:pb-7 rounded-xl sm:rounded-2xl bg-white border-[3px] sm:border-4 border-[#d1d1d1]"
      style={{ boxShadow: "0px 8px 10px 0 rgba(209,209,209,0.12)" }}
    >
      <Image
        src={faqImage}
        // Responsive image size, Tailwind opacity for consistency
        className="w-12 h-16 sm:w-[54px] sm:h-[72px] opacity-80 sm:opacity-[0.86] object-cover"
        alt="FAQ illustration with a question box" // Descriptive alt text
        // width/height props for Next/Image define intrinsic size and aspect ratio
        width={54} // Original intrinsic width
        height={72} // Original intrinsic height
      />
      <div className="flex flex-col justify-start items-center self-stretch relative gap-1.5 sm:gap-2">
        <p className="self-stretch w-full sm:w-fit opacity-90 sm:opacity-[0.92] text-xl sm:text-2xl font-semibold text-center text-black">
          {question}
        </p>
        <p className="self-stretch w-full sm:w-fit opacity-75 sm:opacity-80 text-sm text-center text-black leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};