"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CoachSignUp from "./coach/CoachSignUp";
import PlayerSignUp from "./player/PlayerSignUp";
import ScoutSignUp from "./scout/ScoutSignUp";
import Swal from "sweetalert2";
import Image from "next/image";

import playerImage from "@/public/images/_f01daf4f-70cd-44e5-ab9e-c269eb91d927-1.png";
import scoutImage from "@/public/images/_f01daf4f-70cd-44e5-ab9e-c269eb91d927-3.png";
import coachImage from "@/public/images/_a886120b-a28a-42e2-b365-d2435d9da6f5.png";

const Home: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [type, setType] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectionStyle, setSelectionStyle] = useState({
    opacity: 0,
    width: "0px",
    height: "0px",
    transform: "translateX(0px)",
  });

  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const coachRef = useRef<HTMLDivElement>(null);
  const scoutRef = useRef<HTMLDivElement>(null);

  const pathRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
    player: playerRef,
    coach: coachRef,
    scout: scoutRef,
  };

  useEffect(() => {
    if (selectedPath && pathRefs[selectedPath]?.current && optionsContainerRef.current) {
      const selectedElement = pathRefs[selectedPath].current;
      const containerRect = optionsContainerRef.current.getBoundingClientRect();
      const selectedRect = selectedElement.getBoundingClientRect();
      
      const relativeTop = selectedRect.top - containerRect.top;
      const relativeLeft = selectedRect.left - containerRect.left;

      setSelectionStyle({
        opacity: 1,
        width: `${selectedRect.width}px`,
        height: `${selectedRect.height}px`,
        transform: `translate(${relativeLeft}px, ${relativeTop}px)`,
      });
    } else {
      setSelectionStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [selectedPath]);

  useEffect(() => {
    const paramType = searchParams.get("type");
    setType(paramType);
  }, [searchParams]);

  const handleDivClick = (path: string) => {
    setSelectedPath(path);
  };

  const handleNextClick = () => {
    if (selectedPath) {
      router.push(`/auth/${selectedPath}/sign-up`);
    } else {
      Swal.fire({
        title: "Oops...",
        text: "Please select an option first",
        icon: "error",
      });
    }
  };

  const handleBackClick = () => {
    router.push(`/`);
  };

  if (!type || !["coach", "player", "scout"].includes(type)) {
    return (
      <div className="relative overflow-hidden bg-[#010e1d]/[0.84] xs:px-8 md:px-32 pb-32">
        <div
          className="mx-auto mt-16 lg:mt-32 w-full max-w-screen-lg lg:max-w-screen-xl h-auto overflow-hidden rounded-[32px]"
          style={{
            background:
              "linear-gradient(135.01deg, rgba(248,248,255,0.96) -38.3%, rgba(25,43,77,0.48) 201.74%)",
          }}
        >
          <div
            ref={optionsContainerRef}
            className="relative flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16 p-4 lg:p-12"
          >
            <div
              className="absolute top-0 left-0 rounded-2xl border-2 border-[#f2a725] transition-all duration-500 ease-in-out pointer-events-none"
              style={selectionStyle}
            />

            {/* Player Section */}
            <div
              ref={playerRef}
              className={`flex flex-col justify-start items-center gap-4 p-4 cursor-pointer z-10`}
              onClick={() => handleDivClick("player")}
            >
              <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                <div className="flex justify-center w-full h-full overflow-hidden rounded-full bg-white pt-6">
                  <Image
                    src={playerImage}
                    className="w-3/4 h-3/4 object-cover"
                    alt="player"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start items-center gap-2">
                <p className="text-lg font-bold text-center text-black/[0.72]">
                  Player
                </p>
                <p className="w-full lg:w-[177px] text-sm text-center text-black">
                  Actively participate in sports, utilizing skills and physical
                  abilities.
                </p>
              </div>
            </div>

            {/* Coach Section */}
            <div
              ref={coachRef}
              className={`flex flex-col justify-start items-center gap-4 p-4 cursor-pointer z-10`}
              onClick={() => handleDivClick("coach")}
            >
              <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                <div className="flex justify-center w-full h-full overflow-hidden rounded-full bg-white pt-6">
                  <Image
                    src={coachImage}
                    className="w-3/4 h-3/4 object-cover"
                    alt="coach"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start items-center gap-2">
                <p className="text-lg font-bold text-center text-black">
                  Coach
                </p>
                <p className="w-full lg:w-[177px] text-sm text-center text-black">
                  Guides and mentors athletes to enhance their performance.
                </p>
              </div>
            </div>

            {/* Scout Section */}
            <div
              ref={scoutRef}
              className={`flex flex-col justify-start items-center gap-4 p-4 cursor-pointer z-10`}
              onClick={() => handleDivClick("scout")}
            >
              <div className="relative w-32 h-32 lg:w-40 lg:h-40">
                <div className="flex justify-center w-full h-full overflow-hidden rounded-full bg-white pt-6">
                  <Image
                    src={scoutImage}
                    className="w-3/4 h-3/4 object-cover"
                    alt="scout"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start items-center gap-2">
                <p className="text-lg font-bold text-center text-black/[0.72]">
                  Scout
                </p>
                {/* THIS IS THE FIXED LINE */}
                <p className="w-full lg:w-[177px] text-sm text-center text-black/[0.72]">
                  Provide recommendations for recruitment and team development.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-between items-center lg:items-start lg:mx-32 gap-4 lg:gap-16 py-8">
            <div
              className="flex justify-center items-center w-32 lg:w-[188px] h-10 lg:h-12 gap-2.5 px-6 py-2.5 rounded-[20px] border border-black/80 cursor-pointer"
              style={{ filter: "drop-shadow(0px 16px 24px rgba(0,0,0,0.14))" }}
              onClick={handleBackClick}
            >
              <p className="opacity-[0.72] text-xl lg:text-2xl font-semibold text-center text-black">
                Back
              </p>
            </div>
            <div
              className="flex justify-center items-center w-32 lg:w-[188px] h-10 lg:h-12 gap-2.5 px-6 py-2.5 rounded-[20px] bg-[#f2a725] cursor-pointer"
              style={{ boxShadow: "0px 16px 24px rgba(0,0,0,0.14)" }}
              onClick={handleNextClick}
            >
              <p className="text-xl lg:text-2xl font-semibold text-center text-black">
                Next
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    switch (type) {
      case "coach":
        return <CoachSignUp />;
      case "player":
        return <PlayerSignUp />;
      case "scout":
        return <ScoutSignUp />;
      default:
        return null;
    }
  }
};

export default Home;