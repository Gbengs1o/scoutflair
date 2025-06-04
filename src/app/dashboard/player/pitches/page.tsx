"use client";

import React from 'react';

// --- Icon Components ---
// Simplified SVG representations based on names. Replace with actual SVGs or images.

const FlagNigeriaIcon = ({ className }: { className?: string }) => (
  <div className={`w-[18px] h-[18px] flex ${className}`}>
    <div className="w-1/3 h-full bg-[#008751]"></div>
    <div className="w-1/3 h-full bg-white"></div>
    <div className="w-1/3 h-full bg-[#008751]"></div>
  </div>
);

const FlagGhanaIcon = ({ className }: { className?: string }) => (
    <div className={`w-[18px] h-[18px] flex flex-col ${className}`}>
        <div className="h-1/3 w-full bg-[#CE1126]"></div>
        <div className="h-1/3 w-full bg-[#FCD116] flex items-center justify-center">
            <svg width="6" height="6" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
            </svg>
        </div>
        <div className="h-1/3 w-full bg-[#006B3F]"></div>
    </div>
);

const FlagTogoIcon = ({ className }: { className?: string }) => (
    <div className={`w-[18px] h-[18px] relative ${className}`}>
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

const FlagKenyaIcon = ({ className }: { className?: string }) => (
    <div className={`w-[18px] h-[18px] flex flex-col ${className}`}>
        <div className="h-1/3 w-full bg-black"></div>
        <div className="h-1/3 w-full bg-[#BB0000] relative flex items-center justify-center">
             <div className="absolute w-full h-[2px] bg-white top-0 left-0"></div>
             <div className="absolute w-full h-[2px] bg-white bottom-0 left-0"></div>
            {/* Simplified shield */}
            <div className="w-[6px] h-[8px] bg-black border border-white rounded-sm"></div>
        </div>
        <div className="h-1/3 w-full bg-[#006600]"></div>
    </div>
);

// Using a generic stadium icon as specific ones from "noto" or "emojione" are complex.
const StadiumIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0-4.418-3.582-8-8-8S5 5.582 5 10" />
    <path d="M3 10v10c0 1.105.895 2 2 2h14c1.105 0 2-.895 2-2V10" />
    <path d="M7 10v12" />
    <path d="M17 10v12" />
    <path d="M7 16h10" />
  </svg>
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

interface PitchListItemProps {
  flagIcon: React.ReactNode;
  name: string;
  address: string;
  isActive?: boolean; // To handle the slightly different styling for the first item
}
const PitchListItem: React.FC<PitchListItemProps> = ({ flagIcon, name, address, isActive }) => (
  <div className={`bg-white ${isActive ? 'opacity-100' : 'opacity-80'}`}>
    <div className="p-3"> {/* itemSpacing 12px */}
      <div className={`flex items-center gap-2 mb-1 ${isActive ? 'opacity-[0.92]' : 'opacity-[0.88]'}`}> {/* itemSpacing 8px, 4px */}
        {flagIcon}
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
  value: string | React.ReactNode; // Allow ReactNode for multi-line values
}
const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-lato font-bold text-black">{label}</span>
    <span className="text-xs font-lato font-normal text-black">{value}</span>
  </div>
);

interface GalleryImageProps {
  imageHash: string;
  altText: string;
  className?: string;
}
const GalleryImage: React.FC<GalleryImageProps> = ({ imageHash, altText, className = "w-[170px] h-[140px]" }) => (
  <div className={`${className} rounded-lg bg-gray-300 overflow-hidden`}>
    <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs p-2">
        Placeholder: {altText} ({imageHash.substring(0,6)})
    </div>
  </div>
);

interface VideoThumbnailProps {
  imageHash: string;
  altText: string;
}
const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ imageHash, altText }) => (
  <div className="w-full h-[141px] rounded-lg bg-gray-700 relative overflow-hidden flex items-center justify-center">
     <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs p-2">
        Video: {altText} ({imageHash.substring(0,6)})
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
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
    <div className="h-[561px] bg-gray-200 flex items-center justify-center text-gray-500">
        Map Placeholder (Image Hash: {imageHash.substring(0,6)})
        {/* Red marker pins would be overlaid here in a real map implementation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-8 bg-red-500 rounded-t-full rounded-b-full shadow-md">
            <div className="w-1 h-1 bg-white rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
        </div>
    </div>
);


// --- Main Page Structure ---
const PitchesPage = () => {
  const pitches = [
    { flag: <StadiumIcon className="text-gray-600"/>, name: "Joshua A. Local Stadium", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria.", isActive: true },
    { flag: <StadiumIcon className="text-gray-500 opacity-80"/>, name: "Joshua A. Local Stadium", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <StadiumIcon className="text-gray-500 opacity-80"/>, name: "Joshua A. Local Stadium", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <StadiumIcon className="text-gray-500 opacity-80"/>, name: "Joshua A. Local Stadium", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <StadiumIcon className="text-gray-500 opacity-80"/>, name: "Joshua A. Local Stadium", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <StadiumIcon className="text-gray-500 opacity-80"/>, name: "Joshua A. Local Stadium", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <StadiumIcon className="text-gray-500 opacity-80"/>, name: "Joshua A. Local Stadium", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <StadiumIcon className="text-gray-500 opacity-80"/>, name: "Joshua A. Local Stadium", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <StadiumIcon className="text-gray-500 opacity-80"/>, name: "Joshua A. Local Stadium", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <StadiumIcon className="text-gray-500 opacity-80"/>, name: "Joshua A. Local Stadium", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
    { flag: <StadiumIcon className="text-gray-500 opacity-80"/>, name: "Joshua A. Local Stadium", address: "Ahmadu Bello way, behind government secondary scchool, Jabi, Abuja., Nigeria." },
  ];

  const updates = [
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
    "Next home match pre camping is going to resume tomorrow, all players will be available except injured ones are out",
  ];

  return (
    <div className="bg-[#F8F9FA] py-6 font-lato min-h-screen">
      <div className="max-w-[1099px] mx-auto flex flex-col lg:flex-row gap-6"> {/* Overall container */}

        {/* Left Column: Available Local Pitches */}
        <div className="w-full lg:w-[319px] flex-shrink-0 shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
          <SectionHeader title="Available Local Pitches" />
          <div className="bg-white max-h-[calc(960px-47px)] overflow-y-auto"> {/* Max height for scroll based on Group 1000002026 height and header */}
            {pitches.map((pitch, index) => (
              <PitchListItem key={index} flagIcon={pitch.flag} name={pitch.name} address={pitch.address} isActive={pitch.isActive} />
            ))}
          </div>
        </div>

        {/* Right Column: Information, Gallery, Updates, Location */}
        <div className="flex-grow flex flex-col gap-5"> {/* Right content area */}
          {/* Top Section: Logo and Info */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex-grow">
              <SectionHeader title="Information" />
              <div className="bg-white p-3 shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)] flex">
                <div className="flex flex-col gap-4 w-1/2 pr-2">
                  <InfoItem label="Pitch Name:" value="Joshua A. Local Stadium" />
                  <InfoItem label="Address:" value="Ahmadu Bello way, behind government secondary school, Jabi, Abuja" />
                  <InfoItem label="GPS Coordinates:" value={<>Longitude: 001245<br/>Latitude:    116788</>} />
                  <InfoItem label="Year Built:" value="January 14, 2023" />
                </div>
                 <div className="flex flex-col gap-4 w-1/2 pl-2">
                  <InfoItem label="Capacity" value="2500" />
                  <InfoItem label="Ass. Supervisor" value="Peters Umeh" />
                  <InfoItem label="Sponsor" value="ValueGate" />
                  <InfoItem label="Nickname" value="Fayomi Base" />
                </div>
              </div>
            </div>
            {/* Logo sections */}
            <div className="w-full md:w-auto flex flex-col">
                <div className="h-[40px] w-full md:w-[332px] bg-gray-300 flex items-center justify-center text-white font-merriweather font-bold text-2xl shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]"
                     style={{backgroundImage: "url('https://via.placeholder.com/332x40/333940/FFFFFF?Text=FAY_BASE+Bg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  {/* FAY_BASE text is part of the image based on Figma structure, this is an approximation */}
                </div>
                 <div className="h-[226px] w-full md:w-[215px] bg-gray-400 self-end md:self-auto mt-0 md:mt-0" // self-end for mobile might be too aggressive
                     style={{backgroundImage: "url('https://via.placeholder.com/215x268/CCCCCC/FFFFFF?Text=Side+Img')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                 >
                    {/* This is the rotated image placeholder. Actual rotation would be on the image element if not pre-rotated. */}
                </div>
            </div>
          </div>

          {/* Location Map Section */}
           <div className="bg-white shadow-[0px_4px_8px_0px_rgba(209,209,209,0.12)]">
                <div className="px-4 pt-1.5 pb-0"> {/* Padding to match text x:0 y:6 */}
                    <h3 className="text-lg font-lato font-bold text-black">Location</h3>
                </div>
                <LocationMapPlaceholder imageHash="2e8531" />
           </div>

        </div>
      </div>
    </div>
  );
};

export default PitchesPage;

/*
Tailwind Config Notes (ensure these are covered):
theme: {
  extend: {
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
      merriweather: ['Merriweather', 'serif'],
    },
    // ... other extensions like opacity, spacing, colors
     borderColor: theme => ({ // For specific opacity borders
        ...theme('colors'),
        'black/40': 'rgba(0, 0, 0, 0.47999998927116394)',
        'D1D1D1/48': 'rgba(209, 209, 209, 0.47999998927116394)',
    }),
    backgroundColor: theme => ({
        ...theme('colors'),
        'F6F3F3/8': 'rgba(246, 243, 243, 0.07999999821186066)',
    }),
  },
},

Key Considerations for this file:
1.  **Icons**:
    *   Flag icons are placeholders. Use actual SVGs or images.
    *   The "noto:stadium" and "emojione-v1:stadium" are generic identifiers from Figma. I've used a single simplified `StadiumIcon` as a placeholder. You'll need to source or create the specific icons if their exact appearance is crucial.
2.  **Image Placeholders**:
    *   **`Frame 1000002575` (FAY_BASE Logo Strip)**: Similar to the previous "SCFA" logo, this is an image fill with text likely embedded. I've used a placeholder background.
    *   **`Frame 1000002576` (Rotated Image)**: Placeholder background. The `-180` rotation means it's upside down; the image asset itself might be oriented correctly, or you'd apply `transform rotate-180` to an `<img>` tag.
    *   **Map Image (`anyrgb 4`)**: Replaced with `LocationMapPlaceholder`. A real map would use a library like Google Maps, Leaflet, or Mapbox. The red marker pins are conceptually placed.
3.  **Layout**:
    *   The overall two-column layout (sidebar for pitches, main content on the right) is maintained.
    *   The right column's top section now has a different logo arrangement. The "FAY_BASE" strip is above the rotated image.
    *   The "Gallery" and "Updates" sections are removed from this Figma JSON, and a "Location" map section is added.
4.  **Scrollable Pitches List**: The left sidebar for "Available Local Pitches" is made scrollable. The `max-h` is calculated based on the parent group's height minus the header.
5.  **Text Opacities**: Applied as accurately as possible using Tailwind's opacity classes or arbitrary values.
6.  **Responsive**: The page should stack on mobile and become two columns on `lg` screens. The logo/info area within the right column also has an `md:flex-row` for responsiveness.
*/