"use client";

import React, { useState } from "react";
import Map from "@/components/reusable/MapImage";
import Void from "@/public/images/Void.png";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineFilterAlt } from "react-icons/md";
import { Loader } from "@mantine/core";
import AcademyCard from "./AcademyCard";
import { iAcademyResponse, useGetAcademies } from "@/hooks/academy";
import ViewAcademy from "./ViewAcademy";

const Academies = () => {
  const { data, loading, success } = useGetAcademies();
  const [currentAcademy, setCurrentAcademy] = useState<iAcademyResponse | null>(
    null
  );

  return (
    <div className="w-full min-h-screen p-3 sm:p-4 md:p-6">
      <div
        className={`w-full h-full grid ${
          currentAcademy === null 
            ? "grid-cols-1" 
            : "grid-cols-1 lg:grid-cols-2"
        } gap-4 sm:gap-5 md:gap-6 transition-all duration-300 ease-out`}
      >
        <div className="flex flex-col h-full w-full shadow-custom rounded-[1rem] py-3 sm:py-4 bg-white">
          {currentAcademy === null && (
            <>
              <div className="flex flex-col w-full h-full px-3 sm:px-4 md:px-5 gap-4 sm:gap-5 md:gap-6">
                <div className="w-full items-center flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
                  <h2 className="text-16-19 text-dark font-bold text-center sm:text-left">
                    Available Academies
                  </h2>
                  <Link
                    href={"/dashboard/scout/academies/add"}
                    className="border-primary-2 border rounded px-3 py-2 text-primary-2 text-12-14 whitespace-nowrap"
                  >
                    Add New
                  </Link>
                </div>
                {!loading && data.length > 0 && (
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 transition-all duration-300 ease-out">
                    {data.map((academy, i) => (
                      <AcademyCard
                        key={i}
                        academy={academy}
                        onSelected={() => {
                          setCurrentAcademy(academy);
                        }}
                      />
                    ))}
                  </div>
                )}
                {loading && (
                  <div className="w-full h-64 sm:h-80 md:h-[80vh] grid place-content-center">
                    <Loader color="primary.6" />
                  </div>
                )}
                {!loading && data.length === 0 && (
                  <div className="w-full h-full flex flex-col justify-center items-center gap-4 sm:gap-5 my-8 sm:my-12 md:my-16">
                    <Image
                      src={Void}
                      alt="no matches"
                      width={100}
                      height={100}
                      className="w-24 sm:w-28 md:w-32 h-auto object-cover"
                    />
                    <h2 className="text-dark text-10-12 sm:text-12-14 font-medium text-center px-4">
                      There are no academies available yet
                    </h2>
                  </div>
                )}
              </div>
            </>
          )}
          {currentAcademy !== null && (
            <ViewAcademy
              academy={currentAcademy}
              onClose={() => setCurrentAcademy(null)}
            />
          )}
        </div>
        
        {currentAcademy !== null && (
          <div className="w-full h-64 sm:h-80 lg:h-full rounded-[1rem] overflow-hidden shadow-custom">
            <Map
              latitude={Number.parseFloat(currentAcademy.latitude)}
              longitude={Number.parseFloat(currentAcademy.longitude)}
            />
          </div>
        )}
      </div>
      
      {/* Mobile Map Modal/Overlay for better UX on small screens */}
      {currentAcademy !== null && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full h-2/3 bg-white rounded-t-[1rem] overflow-hidden">
            <div className="w-full p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-dark">Academy Location</h3>
              <button
                onClick={() => setCurrentAcademy(null)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="w-full h-full">
              <Map
                latitude={Number.parseFloat(currentAcademy.latitude)}
                longitude={Number.parseFloat(currentAcademy.longitude)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Academies;