import Image from "next/image";
import React from "react";
import logo from "@/public/images/Logo.png";

interface LogoProps {
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ color = "black" }) => {
  return (
    <div className="flex items-center gap-2">
      <Image src={logo} alt="Logo" className="w-[42px] h-[42px]" />
      <h2 className={`font-bold text-2xl`} style={{ color }}>
        Scout<span className="font-normal">Flair</span>
      </h2>
    </div>
  );
};

export default Logo;
