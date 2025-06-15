import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  hoverColor: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, hoverColor, color }) => {
  return (
    <div className={`bg-white border px-[20px] py-[64px] rounded-[20px] w-[310px] min-h-[320px] group ${hoverColor} hover:text-white transition-all duration-300`}>
      <div className="flex items-center flex-col gap-5 h-full">
        <div className={`mb-4 text-${hoverColor} ${color} group-hover:text-white transition-all duration-300`}>
          {icon}
        </div>

        <hr className="border-black-50 border-[1px] w-full group-hover:border-white transition-all duration-300" />

        <div className="flex flex-col gap-2">
          <p className={`font-manrope font-semibold text-lg text-${hoverColor} ${color} group-hover:text-white transition-all duration-300`}>
            {title}
          </p>
          <p className="font-lato font-normal text-sm text-black-50 group-hover:text-white transition-all duration-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
