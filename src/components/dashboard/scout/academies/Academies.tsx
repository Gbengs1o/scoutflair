"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "@mantine/core";

import Map from "@/components/reusable/MapImage";
import Void from "@/public/images/Void.png";
import AcademyCard from "./AcademyCard";
import ViewAcademy from "./ViewAcademy";
import { iAcademyResponse, useGetAcademies } from "@/hooks/academy";

const Academies = () => {
  const { data, loading } = useGetAcademies();
  const [currentAcademy, setCurrentAcademy] = useState<iAcademyResponse | null>(null);

  // --- RENDER LOGIC ---

  // If no academy is selected, show the list view.
  // This layout takes the full screen on all devices.
  if (currentAcademy === null) {
    return (
      <div className="w-full h-full-minus-header p-4 sm:p-6">
        <div className="flex flex-col h-full w-full shadow-custom rounded-2xl bg-white overflow-hidden p-4 sm:p-5 gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-dark font-bold">Available Academies</h2>
            <Link
              href="/dashboard/scout/academies/add"
              className="border-primary-2 border rounded-md px-3 py-1 text-primary-2 text-sm font-semibold hover:bg-primary-2 hover:text-white transition-colors"
            >
              Add New
            </Link>
          </div>
          {loading ? (
            <div className="w-full flex-grow grid place-content-center">
              <Loader color="primary.6" />
            </div>
          ) : data && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pr-2">
              {data.map((academy) => (
                <AcademyCard
                  key={academy.id}
                  academy={academy}
                  onSelected={() => setCurrentAcademy(academy)}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex-grow flex flex-col justify-center items-center gap-5">
              <Image
                src={Void}
                alt="No academies found"
                width={100}
                height={100}
                className="w-32 h-auto object-cover"
              />
              <h2 className="text-dark text-sm font-medium text-center">
                There are no academies available yet.
              </h2>
            </div>
          )}
        </div>
      </div>
    );
  }

  // If an academy IS selected, show the master-detail view.
  return (
    <div className="w-full h-full-minus-header p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
      
      {/* Academy Details Panel (Left side on Desktop) */}
      {/* It's given a specific width on large screens and will stretch vertically by default. */}
      {/* The `ViewAcademy` component inside it will handle its own scrolling. */}
      <div className="order-2 lg:order-1 w-full lg:w-[40%] xl:w-1/3 shadow-custom rounded-2xl bg-white overflow-hidden flex-shrink-0">
        <ViewAcademy
          academy={currentAcademy}
          onClose={() => setCurrentAcademy(null)}
        />
      </div>

      {/* Map Panel (Right side on Desktop) */}
      {/* KEY FIX: `h-80` for mobile/tablet view, `lg:h-auto` lets flexbox control the height on desktop. */}
      {/* This allows the Map to correctly fill the available vertical space. */}
      <div className="order-1 lg:order-2 w-full lg:w-[60%] xl:w-2/3 h-80 lg:h-auto rounded-2xl overflow-hidden shadow-custom">
        <Map
          latitude={Number.parseFloat(currentAcademy.latitude)}
          longitude={Number.parseFloat(currentAcademy.longitude)}
        />
      </div>
    </div>
  );
};

export default Academies;