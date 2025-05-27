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
    <div className={`bg-white border px-3 sm:px-4 lg:px-5 py-8 sm:py-10 lg:py-12 xl:py-16 rounded-[16px] sm:rounded-[18px] lg:rounded-[20px] w-full sm:w-[280px] md:w-[300px] lg:w-[310px] min-h-[240px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[300px] xl:min-h-[320px] group ${hoverColor} hover:text-white transition-all duration-300`}>
      <div className="flex items-center flex-col gap-3 sm:gap-4 lg:gap-5 h-full">
        <div className={`mb-1 sm:mb-2 lg:mb-4 text-${hoverColor} ${color} group-hover:text-white transition-all duration-300`}>
          {icon}
        </div>

        <hr className="border-black-50 border-[1px] w-full group-hover:border-white transition-all duration-300" />

        <div className="flex flex-col gap-1.5 sm:gap-2 text-center">
          <p className={`font-manrope font-semibold text-sm sm:text-base lg:text-lg text-${hoverColor} ${color} group-hover:text-white transition-all duration-300`}>
            {title}
          </p>
          <p className="font-lato font-normal text-xs sm:text-sm text-black-50 group-hover:text-white transition-all duration-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;