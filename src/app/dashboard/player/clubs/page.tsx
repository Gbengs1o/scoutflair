"use client";

import React from 'react';

// --- Constants for Image URLs ---
const IMAGE_URLS = {
  DLFC_LOGO_STRIP: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002575_793_4422.png",
  SAUDI_HEART_FLAG: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Saudi_arabia_heart_flag_793_4461.png",
  HEART_FLAG_BACKGROUND: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002576_793_4424.png",
  GALLERY_IMG_F4ED11: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002584_793_4991.png", // Corresponds to Gallery Img 3 (f4ed11)
  GALLERY_IMG_9CFD8E: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002582_793_4993.png", // Corresponds to Gallery Img 2 (9cfd8e)
  GALLERY_IMG_E835DE: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002585_793_4994.png", // Corresponds to Gallery Img 4 (e835de)
  VIDEO_THUMB_98153B: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002583_793_4997.png", // Corresponds to Video 1 (98153b)
  VIDEO_THUMB_A6AE3D: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002586_793_5003.png", // Corresponds to Video 2 (a6ae3d)
  CLUB_LOGO_DINAMO: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamo_Zagreb_1_793_4448.png", // Corresponds to 5a0b0d in club list
};

// --- Icon Components ---
const ClubLogoIcon = ({ className, imageUrl, altText = "Club Logo" }: { className?: string, imageUrl: string, altText?: string }) => (
  <img
    src={imageUrl}
    alt={altText}
    className={`w-[18px] h-[18px] rounded-sm object-cover ${className || ''}`}
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.src = `https://via.placeholder.com/18x18?text=${encodeURIComponent(altText.substring(0,3))}`;
      target.alt = 'Error loading logo';
    }}
  />
);

const SaudiHeartFlag = ({className, imageUrl}: {className?: string, imageUrl: string}) => (
    <img
        src={imageUrl}
        alt="Saudi Heart Flag"
        className={`object-contain ${className || ''}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://via.placeholder.com/183x183?text=Flag'; 
          target.alt = 'Error loading flag';
        }}
    />
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

interface ClubListItemProps {
  logoImageUrl: string;
  name: string;
  address: string;
  isActive?: boolean;
}
const ClubListItem: React.FC<ClubListItemProps> = ({ logoImageUrl, name, address, isActive }) => (
  <div className={`bg-white ${isActive ? 'opacity-100' : 'opacity-80'}`}>
    <div className="p-3">
      <div className={`flex items-center gap-2 mb-1 ${isActive ? 'opacity-[0.92]' : 'opacity-[0.88]'}`}>
        <ClubLogoIcon imageUrl={logoImageUrl} altText={`${name} Logo`} />
        <h3 className={`text-base font-lato font-bold text-black ${isActive ? 'opacity-95': ''}`}>{name}</h3>
      </div>
      <p className={`text-xs font-lato font-normal text-black leading-tight ${isActive ? 'opacity-[0.88]' : 'opacity-80'}`}>
        {address}
      </p>
    </div>
    <hr className="border-t-2 border-[#D1D1D1]" />
  </div>
);

interface InfoItemProps {
  label: string;
  value: string | React.ReactNode;
}
const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-lato font-bold text-black">{label}</span>
    <span className="text-xs font-lato font-normal text-black">{value}</span>
  </div>
);

interface GalleryImageProps {
  imageUrl?: string; 
  altText: string;
  className?: string;
  imageHashForPlaceholder?: string;
}
const GalleryImage: React.FC<GalleryImageProps> = ({ imageUrl, altText, className = "w-[170px] h-[140px]", imageHashForPlaceholder }) => (
  <div className={`${className} rounded-lg bg-gray-300 overflow-hidden`}>
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://via.placeholder.com/170x140?text=${encodeURIComponent(altText)}`;
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
  imageUrl: string;
  altText: string;
}
const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ imageUrl, altText }) => (
  <div className="w-full h-[141px] rounded-lg bg-gray-700 relative overflow-hidden group">
    <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://via.placeholder.com/341x141?text=Video:${encodeURIComponent(altText)}`;
          target.alt = `Error loading: ${altText}`;
        }}
    />
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

const LocationMapPlaceholder = ({imageHash}: {imageHash: string}) => (
    <div className="h-[561px] bg-gray-200 flex items-center justify-center text-gray-500 relative">
        Map Placeholder (Image Hash: {imageHash.substring(0,6)})
        <div className="absolute top-[45%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 w-5 h-8 bg-red-500 rounded-t-full rounded-b-full shadow-md">
            <div className="w-1 h-1 bg-white rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
        </div>
         <div className="absolute top-[40%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 w-5 h-8 bg-red-500 rounded-t-full rounded-b-full shadow-md">
            <div className="w-1 h-1 bg-white rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
        </div>
        <div className="absolute top-[50%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 w-5 h-8 bg-red-500 rounded-t-full rounded-b-full shadow-md">
            <div className="w-1 h-1 bg-white rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
        </div>
    </div>
);


// --- Main Page Structure ---
const FootballClubsPage = () => {
  const clubs = [
    { logoImageUrl: IMAGE_URLS.CLUB_LOGO_DINAMO, name: "Delta Football Club", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria.", isActive: true },
    { logoImageUrl: IMAGE_URLS.CLUB_LOGO_DINAMO, name: "Delta Football Club", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { logoImageUrl: IMAGE_URLS.CLUB_LOGO_DINAMO, name: "Delta Football Club", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { logoImageUrl: IMAGE_URLS.CLUB_LOGO_DINAMO, name: "Delta Football Club", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { logoImageUrl: IMAGE_URLS.CLUB_LOGO_DINAMO, name: "Delta Football Club", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { logoImageUrl: IMAGE_URLS.CLUB_LOGO_DINAMO, name: "Delta Football Club", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { logoImageUrl: IMAGE_URLS.CLUB_LOGO_DINAMO, name: "Delta Football Club", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { logoImageUrl: IMAGE_URLS.CLUB_LOGO_DINAMO, name: "Delta Football Club", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { logoImageUrl: IMAGE_URLS.CLUB_LOGO_DINAMO, name: "Delta Football Club", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { logoImageUrl: IMAGE_URLS.CLUB_LOGO_DINAMO, name: "Delta Football Club", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { logoImageUrl: IMAGE_URLS.CLUB_LOGO_DINAMO, name: "Delta Football Club", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
  ];

  const updates = [
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
  ];

  return (
    <div className="bg-[#F8F9FA] py-6 font-lato min-h-screen">
      <div className="max-w-[1098px] mx-auto flex flex-col lg:flex-row gap-6">

        <div className="w-full lg:w-[319px] flex-shrink-0 shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
          <SectionHeader title="Available Football Clubs" />
          <div className="bg-white max-h-[calc(1043px-47px)] overflow-y-auto">
            {clubs.map((club, index) => (
              <ClubListItem key={index} logoImageUrl={club.logoImageUrl} name={club.name} address={club.address} isActive={club.isActive} />
            ))}
          </div>
        </div>

        <div className="flex-grow flex flex-col gap-5"> 
           <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-grow">
              <SectionHeader title="Information" />
              <div className="bg-white p-3 shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)] flex">
                <div className="flex flex-col gap-4 w-1/2 pr-2">
                  <InfoItem label="Club Name:" value="Joshua A. Local Stadium" />
                  <InfoItem label="Address:" value="Ahmadu Bello way, behind government secondary school, Jabi, Abuja" />
                  <InfoItem label="GPS Coordinates:" value={<>Longitude: 001245<br/>Latitude:    116788</>} />
                  <InfoItem label="Founded:" value="January 14, 2015" />
                </div>
                 <div className="flex flex-col gap-4 w-1/2 pl-2">
                  <InfoItem label="Stadium" value="ValueGate Arena" />
                  <InfoItem label="All Time Score" value="Peters Umeh" />
                  <InfoItem label="Matches Lost" value="45" />
                  <InfoItem label="Team Color" value="Black and Gold" />
                </div>
              </div>
            </div>
             <div className="w-full md:w-auto flex flex-col">
                <div className="h-[40px] w-full md:w-[332px] bg-gray-300 flex items-center justify-center text-white font-merriweather font-bold text-2xl shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]"
                     style={{
                        backgroundImage: `url('${IMAGE_URLS.DLFC_LOGO_STRIP}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                     }}
                >
                </div>
                 <div className="h-[226px] w-full md:w-[215px] bg-gray-400 self-end md:self-auto mt-0 md:mt-0 relative"
                     style={{
                        backgroundImage: `url('${IMAGE_URLS.HEART_FLAG_BACKGROUND}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                     }}
                 >
                    <div className="absolute inset-0 flex items-center justify-center p-[21.5px]">
                        <SaudiHeartFlag imageUrl={IMAGE_URLS.SAUDI_HEART_FLAG} className="w-full h-full" />
                    </div>
                </div>
            </div>
          </div>

          <div className="bg-white shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
            <SectionHeader title="Gallery" />
            <div className="p-3">
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
                            <GalleryImage altText="Gallery Img 1" imageHashForPlaceholder="345a42" />
                            <GalleryImage imageUrl={IMAGE_URLS.GALLERY_IMG_F4ED11} altText="Gallery Img 3" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <GalleryImage imageUrl={IMAGE_URLS.GALLERY_IMG_9CFD8E} altText="Gallery Img 2" />
                            <GalleryImage imageUrl={IMAGE_URLS.GALLERY_IMG_E835DE} altText="Gallery Img 4" />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4 opacity-[0.92]">
                        <VideoThumbnail imageUrl={IMAGE_URLS.VIDEO_THUMB_98153B} altText="Video 1" />
                        <VideoThumbnail imageUrl={IMAGE_URLS.VIDEO_THUMB_A6AE3D} altText="Video 2" />
                    </div>
                </div>
            </div>
          </div>

          <div className="bg-white shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
            <SectionHeader title="Updates" />
            <div className="p-[6px]">
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

export default FootballClubsPage;

/*
Tailwind Config Notes (ensure these are covered):
theme: {
  extend: {
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
      merriweather: ['Merriweather', 'serif'],
    },
    opacity: { 
      '40': '0.40',
      '48': '0.48', 
      '70': '0.70',
      '72': '0.72',
      '80': '0.80',
      '88': '0.88',
      '92': '0.92',
      '95': '0.95',
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