import React from "react";

interface iBadge {
  label: string;
  sub: string;
  value: number;
  color: string;
}

const Badges = () => {
  const badges: iBadge[] = [
    {
      label: "Experience",
      value: 0,
      sub: "Professional",
      color: "#FF0000",
    },
    {
      label: "Transfers",
      value: 0,
      sub: "Successful",
      color: "#008000",
    },
    {
      label: "Accuracy",
      value: 0,
      sub: "Scouting",
      color: "#04377C",
    },
  ];

  return (
    <div className="w-full h-auto md:h-[8.5rem] shadow-custom rounded-[1rem] py-4 px-5 bg-white flex flex-col justify-between">
      {/* Added mb-4 for spacing when badges stack vertically */}
      <h2 className="text-dark font-bold text-16-19 mb-4 md:mb-0"> 
        Scout's Badges
      </h2>
      {/* 
        - Mobile: 1 column, gap-4 (vertical gap)
        - Medium screens (md) and up: 3 columns, gap-6 (horizontal/vertical gap)
        - Removed fixed height h-[4.2rem] to allow natural flow, especially on mobile.
          If you need a fixed height for the row on md screens, add md:h-[4.2rem] here.
      */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="w-full py-2 px-1.5 rounded-lg text-dark flex flex-col bg-white shadow-custom-1"
          >
            <h4 className="text-10-12 font-semibold">{badge.label}</h4>
            {/* 
              For the value, you might consider responsive font sizes if text-32-38 is too large on mobile.
              e.g., className="text-2xl md:text-32-38 ..."
            */}
            <h1 className="w-full text-end text-32-38 font-bold text-opacity-[0.88]">
              {badge.value.toString().padStart(2, "0")}
            </h1>
            {/* 
              The text-4-4 class results in very small text. Ensure this is legible and intended.
              e.g., font-size: 4px, line-height: 4px.
              Perhaps you meant something like Tailwind's text-xs (12px) or text-sm (14px).
            */}
            <h4
              className="text-4-4 font-semibold" // This is extremely small
              style={{ color: badge.color }}
            >
              {badge.sub}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;