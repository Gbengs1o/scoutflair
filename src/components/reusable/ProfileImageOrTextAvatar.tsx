import React, { FC, useState, useEffect } from "react";

// Different SVG avatar designs
const avatarDesigns = [
  // Design 1: Geometric Person
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="50" fill="#4F46E5"/>
    <circle cx="50" cy="35" r="15" fill="#E5E7EB"/>
    <path d="M25 75 Q50 60 75 75 L75 100 L25 100 Z" fill="#E5E7EB"/>
  </svg>,
  
  // Design 2: Abstract Face
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="50" fill="#059669"/>
    <circle cx="40" cy="40" r="5" fill="#1F2937"/>
    <circle cx="60" cy="40" r="5" fill="#1F2937"/>
    <path d="M35 60 Q50 70 65 60" stroke="#1F2937" strokeWidth="3" fill="none"/>
  </svg>,
  
  // Design 3: Minimalist Portrait
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="50" fill="#DC2626"/>
    <ellipse cx="50" cy="40" rx="20" ry="25" fill="#FEF3C7"/>
    <circle cx="43" cy="35" r="2" fill="#374151"/>
    <circle cx="57" cy="35" r="2" fill="#374151"/>
    <ellipse cx="50" cy="45" rx="1" ry="3" fill="#374151"/>
  </svg>,
  
  // Design 4: Robot Style
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="50" fill="#7C3AED"/>
    <rect x="35" y="30" width="30" height="25" rx="5" fill="#E5E7EB"/>
    <rect x="40" y="35" width="6" height="6" fill="#059669"/>
    <rect x="54" y="35" width="6" height="6" fill="#059669"/>
    <rect x="45" y="45" width="10" height="3" fill="#374151"/>
    <rect x="30" y="60" width="40" height="15" rx="7" fill="#E5E7EB"/>
  </svg>,
  
  // Design 5: Artistic Portrait
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="50" fill="#F59E0B"/>
    <path d="M30 40 Q50 20 70 40 Q60 60 50 55 Q40 60 30 40" fill="#FDE68A"/>
    <circle cx="42" cy="42" r="3" fill="#92400E"/>
    <circle cx="58" cy="42" r="3" fill="#92400E"/>
    <path d="M45 52 Q50 55 55 52" stroke="#92400E" strokeWidth="2" fill="none"/>
  </svg>
];

const ProfileImageOrTextAvatar: FC<{
  image: string;
  name: string;
  radius: string;
  size: string;
  text?: string;
}> = ({ name, size, image, radius, text }) => {
  const [currentDesign, setCurrentDesign] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDesign((prev) => (prev + 1) % avatarDesigns.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {image.startsWith("https") ? (
        <div className={`${radius} ${size} overflow-hidden relative`}>
          <div className="transition-all duration-1000 ease-in-out">
            {React.cloneElement(avatarDesigns[currentDesign], {
              className: `${radius} ${size} object-cover transition-opacity duration-1000`
            })}
          </div>
        </div>
      ) : (
        <div
          className={`${radius} ${size} text-white ${
            text !== undefined ? `${text}` : "text-16-19"
          } font-bold bg-primary-2 grid place-content-center`}
        >
          {name.substring(0, 1)}
        </div>
      )}
    </div>
  );
};

export default ProfileImageOrTextAvatar;