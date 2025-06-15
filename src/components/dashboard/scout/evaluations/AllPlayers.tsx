"use client";

import React, { useState } from "react";
import { IoPeopleOutline, IoFunnelOutline, IoSearchOutline } from "react-icons/io5";
import { Loader } from "@mantine/core";
import Image from "next/image";

import PlayerCard from "./PlayerCard";
import { useGetScoutsPlayers } from "@/hooks/scout";
import Void from "@/public/images/Void.png";

// Enhanced empty state SVG component
const EmptyStateIllustration = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      className="mb-6 text-gray-300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soccer field background */}
      <rect x="10" y="20" width="100" height="80" rx="8" fill="currentColor" opacity="0.1" />
      
      {/* Field lines */}
      <path d="M10 60 L110 60" stroke="currentColor" opacity="0.2" strokeWidth="2" />
      <circle cx="60" cy="60" r="20" stroke="currentColor" opacity="0.2" strokeWidth="2" fill="none" />
      <circle cx="60" cy="60" r="2" fill="currentColor" opacity="0.2" />
      
      {/* Player figures (simplified) */}
      <g opacity="0.3">
        <circle cx="35" cy="45" r="6" fill="currentColor" />
        <rect x="32" y="51" width="6" height="12" rx="3" fill="currentColor" />
        
        <circle cx="85" cy="75" r="6" fill="currentColor" />
        <rect x="82" y="81" width="6" height="12" rx="3" fill="currentColor" />
        
        <circle cx="60" cy="35" r="6" fill="currentColor" />
        <rect x="57" y="41" width="6" height="12" rx="3" fill="currentColor" />
      </g>
      
      {/* Search icon overlay */}
      <circle cx="90" cy="30" r="15" fill="white" stroke="currentColor" strokeWidth="2" />
      <circle cx="86" cy="26" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="m90 30 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
    
    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Players Found</h3>
    <p className="text-gray-500 text-center max-w-md">
      There are no players available at the moment. Check back later or try adjusting your filters.
    </p>
  </div>
);

// Enhanced loading component
const LoadingState = () => (
  <div className="w-full min-h-[24rem] flex flex-col justify-center items-center gap-4">
    <div className="relative">
      <Loader color="primary.6" size="lg" />
      <div className="absolute inset-0 animate-ping">
        <div className="w-full h-full border-2 border-primary-2 rounded-full opacity-20"></div>
      </div>
    </div>
    <p className="text-gray-500 font-medium">Loading players...</p>
  </div>
);

const AllPlayers = () => {
  const { data: players, loading } = useGetScoutsPlayers();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter players based on search term
  const filteredPlayers = players?.filter(player =>
    player.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Title Section */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-2/10 rounded-lg">
              <IoPeopleOutline size={24} className="text-primary-2" />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-gray-900">All Players</h2>
              <p className="text-sm text-gray-500">
                {loading ? "Loading..." : `${filteredPlayers?.length || 0} players found`}
              </p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <IoSearchOutline 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-2/20 focus:border-primary-2 transition-colors bg-white"
              />
            </div>

            {/* Filter Button */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-primary-2 border border-primary-2 px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-2 hover:text-white transition-all duration-200 hover:shadow-md whitespace-nowrap"
            >
              <IoFunnelOutline size={16} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Filter Panel (if expanded) */}
        {isFilterOpen && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-3 font-medium">Filter Options</p>
            <div className="flex flex-wrap gap-2">
              {['All', 'GK', 'DEF', 'MID', 'FWD'].map((position) => (
                <button
                  key={position}
                  className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  {position}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        {loading ? (
          <LoadingState />
        ) : filteredPlayers && filteredPlayers.length > 0 ? (
          <>
            {/* Players Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredPlayers.map((player) => (
                <PlayerCard key={player.playerId} player={player} />
              ))}
            </div>

            {/* Results Summary */}
            {searchTerm && (
              <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">{filteredPlayers.length}</span> player(s) found for "{searchTerm}"
                </p>
              </div>
            )}
          </>
        ) : (
          <EmptyStateIllustration />
        )}
      </div>
    </div>
  );
};

export default AllPlayers;