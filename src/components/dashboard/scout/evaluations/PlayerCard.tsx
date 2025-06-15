import React, { FC } from "react";
import Link from "next/link";
import { getYearDifference } from "@/functions/dateFunctions";
import { iScoutPlayersResponse } from "@/hooks/scout";

// Helper to generate a random jersey number if one isn't provided
const getRandomJerseyNumber = () => Math.floor(Math.random() * 98) + 1;

// SVG Player Avatar Component
const PlayerAvatar: FC<{ name: string; position: string }> = ({ name, position }) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  // Color based on position for visual variety
  const getPositionColor = (pos: string) => {
    const positionColors = {
      'GK': '#10B981', // emerald
      'DEF': '#3B82F6', // blue
      'MID': '#F59E0B', // amber
      'FWD': '#EF4444', // red
      'ATT': '#EF4444', // red
    };
    
    const posKey = pos.toUpperCase().slice(0, 3);
    return positionColors[posKey as keyof typeof positionColors] || '#6366F1'; // indigo default
  };

  const bgColor = getPositionColor(position);

  return (
    <div className="relative flex-shrink-0">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className="rounded-xl shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle with position-based color */}
        <circle cx="32" cy="32" r="32" fill={bgColor} />
        
        {/* Player silhouette */}
        <g fill="rgba(255,255,255,0.3)">
          {/* Body */}
          <ellipse cx="32" cy="45" rx="12" ry="15" />
          {/* Head */}
          <circle cx="32" cy="22" r="8" />
          {/* Arms */}
          <ellipse cx="20" cy="35" rx="4" ry="10" transform="rotate(-20 20 35)" />
          <ellipse cx="44" cy="35" rx="4" ry="10" transform="rotate(20 44 35)" />
        </g>
        
        {/* Initials overlay */}
        <text
          x="32"
          y="38"
          textAnchor="middle"
          className="fill-white font-bold text-lg"
          style={{ fontSize: '16px', fontFamily: 'system-ui' }}
        >
          {initials}
        </text>
        
        {/* Jersey number in corner */}
        <circle cx="52" cy="12" r="8" fill="rgba(0,0,0,0.2)" />
        <text
          x="52"
          y="16"
          textAnchor="middle"
          className="fill-white font-bold text-xs"
          style={{ fontSize: '10px', fontFamily: 'system-ui' }}
        >
          #
        </text>
      </svg>
    </div>
  );
};

const PlayerCard: FC<{ player: iScoutPlayersResponse }> = ({ player }) => {
  const jerseyNumber = player.jerseyNumber || getRandomJerseyNumber();
  const playerAge = getYearDifference(new Date(), new Date(player.dob));

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
      <div className="flex flex-col sm:flex-row sm:items-stretch gap-4 p-4">
        
        {/* Player Avatar Section */}
        <div className="flex sm:flex-col items-center sm:items-start gap-3">
          <PlayerAvatar name={player.fullName} position={player.position} />
          
          {/* Jersey number - visible on mobile, hidden on desktop where it's in the avatar */}
          <div className="sm:hidden flex-1">
            <p className="text-2xl font-bold text-gray-400 text-right">
              #{jerseyNumber}
            </p>
          </div>
        </div>

        {/* Player Details Section */}
        <div className="flex-1 space-y-4">
          
          {/* Header: Name and Jersey (desktop only) */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-lg sm:text-xl leading-tight">
                {player.fullName}
              </h3>
              <p className="text-sm text-gray-500 font-medium mt-1">
                {player.position}
              </p>
            </div>
            <p className="hidden sm:block text-3xl font-bold text-gray-300">
              #{jerseyNumber}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Age
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
                {playerAge}
              </p>
            </div>
            
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Position
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {player.position}
              </p>
            </div>
            
            {/* Additional stat placeholder for desktop */}
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status
              </p>
              <p className="text-sm font-semibold text-green-600 mt-1">
                Active
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <Link
              href={`/dashboard/scout/evaluations/reports?id=${player.playerId}`}
              className="flex-1 bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 text-sm font-semibold px-4 py-2.5 rounded-xl border border-yellow-200 hover:from-yellow-200 hover:to-yellow-100 transition-all duration-200 text-center hover:shadow-md"
            >
              📊 Reports
            </Link>
            <Link
              href={`/dashboard/scout/evaluations/statistics?id=${player.playerId}`}
              className="flex-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 text-sm font-semibold px-4 py-2.5 rounded-xl border border-blue-200 hover:from-blue-200 hover:to-blue-100 transition-all duration-200 text-center hover:shadow-md"
            >
              📈 Statistics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;