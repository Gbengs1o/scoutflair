import React from "react";
import Image, { StaticImageData } from "next/image";

interface HighlightCardProps {
  videoSrc: StaticImageData;
  profileSrc: StaticImageData;
  uploaderName: string;
  uploadDate: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ videoSrc, profileSrc, uploaderName, uploadDate }) => {
  return (
    <div className="rounded-xl border border-[#D1D1D1] w-[310px] h-[380px] shadow-md">
      <Image src={videoSrc} alt="Video" className="w-full" />
      <div className="px-4 pt-2 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image src={profileSrc} className="w-[48px] h-[48px]" alt="Profile" />
          <div className="flex flex-col gap-2">
            <p className="font-normal text-black text-xs">Uploaded By</p>
            <h2 className="font-bold text-black text-[16px] leading-[18px]">{uploaderName}</h2>
          </div>
        </div>
        <p className="font-normal text-[10px] leading-[11px]">{uploadDate}</p>
      </div>
      <div className="mt-5">
        <hr />
      </div>
      <div className="flex justify-center mt-3">
        <button>View Video</button>
      </div>
    </div>
  );
};

export default HighlightCard;
