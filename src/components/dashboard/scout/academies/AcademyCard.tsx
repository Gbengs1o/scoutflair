import React, { FC } from "react";
import { iAcademyResponse } from "@/hooks/academy";
import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";

// SVG Icons as React components
const StarIcon: FC<{ size?: number; className?: string }> = ({ size = 10, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const MedalIcon: FC<{ size?: number; className?: string }> = ({ size = 10, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M5 16L3 2l5.25 2L12 2l3.75 2L21 2l-2 14H5zm2.5-11c-.8 0-1.5.7-1.5 1.5S6.7 8 7.5 8 9 7.3 9 6.5 8.3 5 7.5 5zm9 0c-.8 0-1.5.7-1.5 1.5S15.7 8 16.5 8 18 7.3 18 6.5 17.3 5 16.5 5zM12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);

const LocationIcon: FC<{ size?: number; className?: string }> = ({ size = 12, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const AcademyCard: FC<{
  academy: iAcademyResponse;
  onSelected: () => void;
}> = ({ academy, onSelected }) => {
  return (
    <div
      onClick={onSelected}
      className="bg-white shadow-custom rounded-xl flex gap-3 p-3 cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-primary-2/5"
    >
      <div className="flex-shrink-0 flex flex-col items-center gap-1">
        <ProfileImageOrTextAvatar
          image={academy.imageUrl}
          name={academy.name}
          radius="rounded-lg"
          size="size-12"
        />
        <div className="flex items-center justify-center gap-0.5">
          <p className="text-xs text-dark font-medium">{academy.rating}</p>
          <StarIcon size={10} className="text-secondary-3" />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between items-start gap-2 w-full">
            <h2 className="text-sm font-semibold text-dark line-clamp-2">
              {academy.name}
            </h2>
            <div className="p-1 bg-primary-2 rounded-full grid place-content-center flex-shrink-0">
              <MedalIcon className="text-white" size={10} />
            </div>
          </div>
          <div className="flex items-center w-full gap-1">
            <LocationIcon className="text-dark flex-shrink-0" size={12} />
            <h2 className="text-xs text-dark/80 line-clamp-1">
              {academy.address}
            </h2>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 text-xs text-dark mt-2">
          <div className="flex flex-col">
            <h3 className="text-dark/70">Players:</h3>
            <p className="font-semibold">{academy.playersCount}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-dark/70">Wins:</h3>
            <p className="font-semibold">{academy.winCount}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-dark/70">Graduated:</h3>
            <p className="font-semibold">{academy.graduatedCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyCard;