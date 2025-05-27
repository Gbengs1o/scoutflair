import React from "react";

interface GoldButtonProps {
    text: string;
}

const GoldButton: React.FC <GoldButtonProps> = ({text}) => {
    return (
        <button
            className="flex justify-center items-center w-[188px] h-10 relative gap-2.5 px-6 py-2.5 rounded-[20px] bg-[#f2a725]"
            style={{ boxShadow: "0px 16px 24px 2px rgba(0,0,0,0.14)" }}
        >
            <p className="text-base font-bold text-left text-black">{text}</p>
        </button>
    )
}

export default GoldButton