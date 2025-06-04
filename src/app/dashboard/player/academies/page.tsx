"use client";

import React from 'react';

// --- Constants for AcademicsPage Image URLs ---
const ACADEMY_IMAGE_URLS = {
  SCFA_LOGO_STRIP: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002575_791_1967.png",
  SCFA_SIDE_LOGO_ROTATED: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002576_791_1968.png",
  GALLERY_IMG_1: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002579_791_1987.png", // Corresponds to imageHash "0562ae"
  GALLERY_IMG_2: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002582_791_1992.png", // Corresponds to imageHash "915578"
  GALLERY_IMG_3: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002584_791_1994.png", // Corresponds to imageHash "8be3a5"
  GALLERY_IMG_4: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002585_791_1996.png", // Corresponds to imageHash "93625f"
  VIDEO_THUMB_1: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002583_791_1993.png", // Corresponds to imageHash "26c96f"
  VIDEO_THUMB_2: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002586_791_1997.png", // Corresponds to imageHash "22e05b"
};

// --- Icon Components (Flags - simplified) ---
const NigeriaFlagIcon = ({ className }: { className?: string }) => (
  <div className={`w-[18px] h-[18px] flex ${className || ''}`}>
    <div className="w-1/3 h-full bg-[#008751]"></div>
    <div className="w-1/3 h-full bg-white"></div>
    <div className="w-1/3 h-full bg-[#008751]"></div>
  </div>
);

const GhanaFlagIcon = ({ className }: { className?: string }) => (
    <div className={`w-[18px] h-[18px] flex flex-col ${className || ''}`}>
        <div className="h-1/3 w-full bg-[#CE1126]"></div>
        <div className="h-1/3 w-full bg-[#FCD116] flex items-center justify-center">
            <svg width="6" height="6" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
            </svg>
        </div>
        <div className="h-1/3 w-full bg-[#006B3F]"></div>
    </div>
);

const TogoFlagIcon = ({ className }: { className?: string }) => (
    <div className={`w-[18px] h-[18px] relative ${className || ''}`}>
        <div className="absolute top-0 left-0 w-full h-1/5 bg-[#006A4E]"></div>
        <div className="absolute top-[20%] left-0 w-full h-1/5 bg-[#FFCE00]"></div>
        <div className="absolute top-[40%] left-0 w-full h-1/5 bg-[#006A4E]"></div>
        <div className="absolute top-[60%] left-0 w-full h-1/5 bg-[#FFCE00]"></div>
        <div className="absolute top-[80%] left-0 w-full h-1/5 bg-[#006A4E]"></div>
        <div className="absolute top-0 left-0 w-[43%] h-[60%] bg-[#D21034] flex items-center justify-center">
             <svg width="10" height="10" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/></svg>
        </div>
    </div>
);

const KenyaFlagIcon = ({ className }: { className?: string }) => (
    <div className={`w-[18px] h-[18px] flex flex-col ${className || ''}`}>
        <div className="h-1/3 w-full bg-black"></div>
        <div className="h-1/3 w-full bg-[#BB0000] relative flex items-center justify-center">
             <div className="absolute w-full h-[2px] bg-white top-0 left-0"></div>
             <div className="absolute w-full h-[2px] bg-white bottom-0 left-0"></div>
            <div className="w-[6px] h-[8px] bg-black border border-white rounded-sm"></div>
        </div>
        <div className="h-1/3 w-full bg-[#006600]"></div>
    </div>
);

// --- Reusable Components ---
interface SectionHeaderProps {
  title: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <div className="h-[47px] bg-[#041931] flex items-center px-4 shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
    <h2 className="text-lg font-lato font-bold text-white">{title}</h2>
  </div>
);

interface AcademyItemProps {
  flagIcon: React.ReactNode;
  name: string;
  address: string;
}
const AcademyItem: React.FC<AcademyItemProps> = ({ flagIcon, name, address }) => (
  <div className="bg-white">
    <div className="p-3">
      <div className="flex items-center gap-2 mb-1 opacity-[0.92]">
        {flagIcon}
        <h3 className="text-base font-lato font-bold text-black opacity-95">{name}</h3>
      </div>
      <p className="text-xs font-lato font-normal text-black opacity-[0.88] leading-tight">
        {address}
      </p>
    </div>
    <hr className="border-t-2 border-[#D1D1D1]" />
  </div>
);

interface InfoItemProps {
  label: string;
  value: string | React.ReactNode; // Changed to allow ReactNode for GPS
}
const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-lato font-bold text-black">{label}</span>
    <span className="text-xs font-lato font-normal text-black">{typeof value === 'string' ? value : <>{value}</>}</span>
  </div>
);

interface GalleryImageProps {
  imageUrl?: string;
  imageHashForPlaceholder?: string; // Used if imageUrl is not provided
  altText: string;
  className?: string;
}
const GalleryImage: React.FC<GalleryImageProps> = ({ imageUrl, imageHashForPlaceholder, altText, className = "w-[170px] h-[140px]" }) => (
  <div className={`${className} rounded-lg bg-gray-300 overflow-hidden`}>
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://via.placeholder.com/170x140?text=${encodeURIComponent(altText.substring(0,10))}`;
          target.alt = `Error loading: ${altText}`;
        }}
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs p-2 text-center">
          Placeholder: {altText} {imageHashForPlaceholder ? `(${imageHashForPlaceholder.substring(0,6)})` : ''}
      </div>
    )}
  </div>
);

interface VideoThumbnailProps {
  imageUrl?: string;
  imageHashForPlaceholder?: string; // Used if imageUrl is not provided
  altText: string;
}
const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ imageUrl, imageHashForPlaceholder, altText }) => (
  <div className="w-full h-[141px] rounded-lg bg-gray-700 relative overflow-hidden group">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://via.placeholder.com/341x141?text=Video:${encodeURIComponent(altText.substring(0,10))}`; // Default dimensions from Figma
          target.alt = `Error loading: ${altText}`;
        }}
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs p-2 text-center">
        Video: {altText} {imageHashForPlaceholder ? `(${imageHashForPlaceholder.substring(0,6)})` : ''}
      </div>
    )}
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-300">
      <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center mr-2.5">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.75 2.41842L12.1875 7.50008L3.75 12.5817V2.41842Z" fill="#FF0000"/>
        </svg>
      </div>
      <span className="text-sm font-lato font-bold text-white">Watch</span>
    </div>
  </div>
);

const UpdateItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="h-[33px] bg-[#F6F3F3]/[0.08] border border-[#D1D1D1]/[0.48] flex items-center px-4">
    <p className="text-sm font-lato font-normal text-black/80 truncate">{text}</p>
  </div>
);

// --- Main Page Structure ---
const AcademicsPage = () => {
  const academies = [
    { flag: <NigeriaFlagIcon />, name: "ScoutFlair Football Academy", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <GhanaFlagIcon />, name: "ScoutFlair Football Academy", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <TogoFlagIcon />, name: "ScoutFlair Football Academy", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <KenyaFlagIcon />, name: "ScoutFlair Football Academy", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <NigeriaFlagIcon />, name: "ScoutFlair Football Academy", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <NigeriaFlagIcon />, name: "ScoutFlair Football Academy", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <NigeriaFlagIcon />, name: "ScoutFlair Football Academy", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <NigeriaFlagIcon />, name: "ScoutFlair Football Academy", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <NigeriaFlagIcon />, name: "ScoutFlair Football Academy", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <NigeriaFlagIcon />, name: "ScoutFlair Football Academy", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <NigeriaFlagIcon />, name: "ScoutFlair Football Academy", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
  ];

  const updates = [
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
  ];

  return (
    <div className="bg-[#F8F9FA] py-6 font-lato min-h-screen">
      <div className="max-w-[1099px] mx-auto flex flex-col lg:flex-row gap-5">

        <div className="w-full lg:w-[319px] flex-shrink-0 shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
          <SectionHeader title="Available Academics" />
          <div className="bg-white max-h-[calc(1043px-47px)] overflow-y-auto">
            {academies.map((academy, index) => (
              <AcademyItem key={index} flagIcon={academy.flag} name={academy.name} address={academy.address} />
            ))}
          </div>
        </div>

        <div className="flex-grow flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-grow">
              <SectionHeader title="Information" />
              <div className="bg-white p-3 shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)] flex">
                <div className="flex flex-col gap-4 w-1/2 pr-2">
                  <InfoItem label="Academy:" value="ScoutFlair Football Academy" />
                  <InfoItem label="Address:" value="Ahmadu Bello way, behind government secondary school, Jabi, Abuja" />
                  <InfoItem label="GPS Coordinates:" value={<>Longitude: 001245<br/>Latitude:    116788</>} />
                  <InfoItem label="Founded:" value="January 14, 2020" />
                </div>
                 <div className="flex flex-col gap-4 w-1/2 pl-2">
                  <InfoItem label="Matches Lost" value="67" />
                  <InfoItem label="Top Player" value="Peters Umeh" />
                  <InfoItem label="Team Color" value="Blue and White" />
                  <InfoItem label="Nickname" value="Fayomi Boys" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-0 md:gap-0">
                <div className="h-[40px] md:h-auto md:w-[117px] bg-gray-300 flex items-center justify-center text-white font-merriweather font-bold text-2xl shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]"
                     style={{
                        backgroundImage: `url('${ACADEMY_IMAGE_URLS.SCFA_LOGO_STRIP}')`,
                        backgroundSize: 'cover', // Or 'contain' depending on image aspect ratio and desired look
                        backgroundPosition: 'center' // Adjust as needed. Figma data x:180 for "SCFA" suggests partial visibility or specific crop
                     }}
                >
                    {/* SCFA text is intended to be part of the background image */}
                </div>
                 <div className="h-[226px] md:w-[72px] bg-gray-400" // Dimensions for the rotated part
                     style={{
                        backgroundImage: `url('${ACADEMY_IMAGE_URLS.SCFA_SIDE_LOGO_ROTATED}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        // Note: CSS rotation is transform: rotate(-180deg); if the image itself isn't pre-rotated.
                        // The Figma data specifies rotation: -180 on the frame.
                        // If the image URL provides an already rotated image, this is fine.
                        // Otherwise, you might need to add `transform: 'rotate(-180deg)'` to the style,
                        // but this can complicate layout if the container isn't set up for it.
                        // For now, assuming the image from URL is as desired or rotation is handled by image content.
                     }}
                 >
                </div>
            </div>
          </div>

          <div>
            <SectionHeader title="Gallery" />
            <div className="bg-white p-3 shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center">
                        <h4 className="text-base font-lato font-bold text-black">Photos</h4>
                        <button className="text-[8px] font-lato font-normal text-black ml-[270px] opacity-70 hover:underline">See All</button>
                    </div>
                    <div className="flex items-center">
                        <h4 className="text-base font-lato font-bold text-black opacity-[0.88]">Videos</h4>
                         <button className="text-[8px] font-lato font-normal text-black ml-[244px] opacity-70 hover:underline">See All</button>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-4">
                            <GalleryImage imageUrl={ACADEMY_IMAGE_URLS.GALLERY_IMG_1} altText="Gallery Img 1" imageHashForPlaceholder="0562ae" />
                            <GalleryImage imageUrl={ACADEMY_IMAGE_URLS.GALLERY_IMG_3} altText="Gallery Img 3" imageHashForPlaceholder="8be3a5" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <GalleryImage imageUrl={ACADEMY_IMAGE_URLS.GALLERY_IMG_2} altText="Gallery Img 2" imageHashForPlaceholder="915578" />
                            <GalleryImage imageUrl={ACADEMY_IMAGE_URLS.GALLERY_IMG_4} altText="Gallery Img 4" imageHashForPlaceholder="93625f" />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4 opacity-[0.92]">
                        <VideoThumbnail imageUrl={ACADEMY_IMAGE_URLS.VIDEO_THUMB_1} altText="Video 1" imageHashForPlaceholder="26c96f" />
                        <VideoThumbnail imageUrl={ACADEMY_IMAGE_URLS.VIDEO_THUMB_2} altText="Video 2" imageHashForPlaceholder="22e05b" />
                    </div>
                </div>
            </div>
          </div>

          <div>
            <SectionHeader title="Updates" />
            <div className="bg-white p-[6px] shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
              <div className="flex flex-col gap-4">
                {updates.map((update, index) => (
                  <UpdateItem key={index} text={update} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AcademicsPage;

/*
Tailwind Config Notes (similar to previous, ensure these are covered):
theme: {
  extend: {
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
      merriweather: ['Merriweather', 'serif'],
    },
    opacity: { 
      '40': '0.40', '48': '0.48', '70': '0.70', '72': '0.72', 
      '80': '0.80', '88': '0.88', '92': '0.92', '95': '0.95',
    },
    backgroundColor: theme => ({
        ...theme('colors'),
        'F6F3F3/8': 'rgba(246, 243, 243, 0.07999999821186066)',
    }),
    borderColor: theme => ({
        ...theme('colors'),
         'D1D1D1/48': 'rgba(209, 209, 209, 0.47999998927116394)',
    }),
  },
},
*/