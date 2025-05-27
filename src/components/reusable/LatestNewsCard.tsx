import React from "react";

const LatestNewsCard: React.FC = () => {
    return (
        <div
            className="flex flex-col justify-start items-start relative gap-4 p-4 rounded-2xl bg-white border-2 border-[#d1d1d1] shadow-lg md:max-w-lg"
            style={{ boxShadow: "0px 8px 10px 0 rgba(209,209,209,0.12)" }}
        >
            <div className="flex justify-between items-center w-full">
                <p className="text-xl font-bold text-left text-black">LATEST NEWS</p>
                <div className="flex items-center gap-2 cursor-pointer">
                    <p className="text-base text-left text-black">View All</p>
                    <svg
                        width={6}
                        height={10}
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-grow-0 flex-shrink-0"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M1 8.75L4.75 5L1 1.25"
                            stroke="black"
                            strokeWidth="1.125"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-4">
                {Array(5).fill(0).map((_, index) => (
                    <div key={index} className="flex justify-start items-center gap-3 w-full">
                        <div className="w-20 h-20 relative overflow-hidden rounded-2xl bg-cover bg-no-repeat bg-center"
                            style={{ backgroundImage: "url('./frame-1000001962.jpeg')" }}
                        />
                        <div className="flex flex-col justify-start items-start flex-grow gap-1">
                            <p className="text-base font-semibold text-left text-black">
                                Golden Shoe 2022/2023 League’s Top Scorer
                            </p>
                            <p className="opacity-[0.92] text-[10px] text-left text-black">
                                The race is once more this season, who is going to be crowned the league’s leading goal scorer....
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestNewsCard
