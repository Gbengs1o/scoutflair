"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronRight,
  Filter,
  ArrowDownUp,
  CalendarDays,
  Star,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Zap,
  BarChart3,
  SortAsc,
  SortDesc,
} from 'lucide-react';
import clsx from 'clsx';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- Image URLs for Analytics Page ---
const URL_Analytics_Dinamarca_Logo = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamarca_1_355_4591.png';
const URL_Analytics_Club_America_Logo = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Club_Am_rica_1_375_1277.png';
// Removed: URL_Analytics_Pitch_BG (Replaced by SVG)
// Removed: URL_Analytics_Player_Perf_Header (Replaced with dark blue bg)
// Removed: URL_Analytics_Formation_Header (Replaced with dark blue bg)

const PORTRAIT_URL_1 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/Generated-Image-June-04-2025-1_43AM.jpeg';
const PORTRAIT_URL_2 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/Generated-Image-June-04-2025-2_35AM.jpeg';
const PORTRAIT_URL_3 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/Generated-Image-June-04-2025-2_41AM.jpeg';
const PORTRAIT_URL_4 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/Generated-Image-June-04-2025-2_44AM.jpeg';
const PORTRAIT_URL_5 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2385_521_1868.png';
const PORTRAIT_URL_6 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2384_521_1847.png';


// --- Components ---
const PlaceholderImage = ({ src, alt, className, isTeamLogo = false, teamInitial = 'T', isPlayerPortrait = false, objectFit = 'cover' }) => {
  let imageToRender = src;
  let unoptimizedImage = false;
  if (!src) {
    const fallbackBg = isTeamLogo || isPlayerPortrait ? "#e2e8f0" : "#cbd5e1"; // slate-200 : slate-300
    const fallbackText = isTeamLogo || isPlayerPortrait ? "#475569" : "#64748b"; // slate-600 : slate-500
    const textContent = isTeamLogo ? teamInitial.toUpperCase() : isPlayerPortrait ? 'P' : 'Img';
    const radius = isTeamLogo || isPlayerPortrait ? '9999px' : '0px'; // Full-round for logos/portraits
    imageToRender = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%22${radius}%22%20fill%3D%22${encodeURIComponent(fallbackBg)}%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22central%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%22${isTeamLogo ? 40 : 16}px%22%20font-weight%3D%22bold%22%20fill%3D%22${encodeURIComponent(fallbackText)}%22%3E${textContent}%3C%2Ftext%3E%3C%2Fsvg%3E`;
    unoptimizedImage = true;
  } else if (typeof src === 'string' && src.startsWith('data:image/svg+xml')) {
    unoptimizedImage = true;
  }
  return (
    <div className={clsx("relative bg-slate-200/70 overflow-hidden", className)}>
      <Image
        src={imageToRender}
        alt={alt || 'Placeholder'}
        layout="fill"
        objectFit={objectFit}
        unoptimized={unoptimizedImage}
        onError={(e) => {
            const errorSvg = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23f1f5f9%22%2F%3E%3Cpath%20d%3D%22M25%2025%20L75%2075%20M75%2025%20L25%2075%22%20stroke%3D%22%23ef4444%22%20stroke-width%3D%224%22%2F%3E%3C%2Fsvg%3E`; // slate-100 bg, red-500 X
            e.currentTarget.srcset = errorSvg;
            e.currentTarget.src = errorSvg;
        }}
      />
    </div>
  );
};

const Card = ({ title, headerActions, children, className, contentClassName, noPadding = false }) => (
  <div className={clsx("bg-white rounded-xl shadow-lg overflow-hidden", className)}>
    {(title || headerActions) && (
      <div className="flex justify-between items-center p-4 sm:p-5 border-b border-slate-200">
        {title && <h3 className="text-base sm:text-lg font-semibold text-slate-800 uppercase tracking-wider">{title}</h3>}
        {headerActions && <div>{headerActions}</div>}
      </div>
    )}
    <div className={clsx(!noPadding && "p-4 sm:p-5", contentClassName)}>{children}</div>
  </div>
);

const FilterButton = ({ icon: Icon, children, ...props }) => (
  <button
    className="flex items-center bg-white text-slate-700 hover:bg-slate-50 px-3.5 py-2 rounded-lg shadow-sm text-sm border border-slate-300 transition-colors"
    {...props}
  >
    {Icon && <Icon className="w-4 h-4 mr-2 text-slate-500" />}
    {children}
  </button>
);

const ActionButton = ({ children, className, ...props }) => (
  <button
    className={clsx("flex items-center text-xs sm:text-sm font-medium text-primary-dark hover:text-primary-dark/80 transition-colors", className)}
    {...props}
  >
    {children}
  </button>
);

const SvgFootballPitch = ({ players, onPlayerClick }) => {
  const pitchWidth = 300;
  const pitchHeight = 200; // Adjusted for a more standard pitch aspect ratio
  const playerMarkerRadius = 7;

  return (
    <svg viewBox={`0 0 ${pitchWidth} ${pitchHeight}`} className="w-full h-full bg-green-600 rounded-lg border-2 border-white/30 shadow-inner">
      <rect x="5" y="5" width={pitchWidth - 10} height={pitchHeight - 10} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <line x1={pitchWidth / 2} y1="5" x2={pitchWidth / 2} y2={pitchHeight - 5} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <circle cx={pitchWidth / 2} cy={pitchHeight / 2} r={Math.min(pitchWidth, pitchHeight) * 0.15} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <circle cx={pitchWidth / 2} cy={pitchHeight / 2} r="1.5" fill="rgba(255,255,255,0.6)" />
      <rect x={pitchWidth * 0.12} y="5" width={pitchWidth * 0.76} height={pitchHeight * 0.18} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x={pitchWidth * 0.3} y="5" width={pitchWidth * 0.4} height={pitchHeight * 0.08} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x={pitchWidth * 0.12} y={pitchHeight - 5 - (pitchHeight * 0.18)} width={pitchWidth * 0.76} height={pitchHeight * 0.18} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <rect x={pitchWidth * 0.3} y={pitchHeight - 5 - (pitchHeight * 0.08)} width={pitchWidth * 0.4} height={pitchHeight * 0.08} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

      {players.map(player => (
        <g
          key={player.id}
          transform={`translate(${(player.x / 100) * pitchWidth}, ${(player.y / 100) * pitchHeight})`}
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onPlayerClick && onPlayerClick(player.pos)}
        >
          <circle r={playerMarkerRadius} fill="rgb(220, 38, 38)" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize={playerMarkerRadius * 0.9} fontWeight="bold" fill="white">
            {player.pos}
          </text>
        </g>
      ))}
    </svg>
  );
};


// --- Data ---
const initialAnalyticsStatsData = [
  { id: "wins", title: "Wins", value: 83, trend: "up", color: "text-emerald-500", bgColor: "bg-emerald-500", icon: TrendingUp },
  { id: "losses", title: "Losses", value: 12, trend: "down", color: "text-red-500", bgColor: "bg-red-500", icon: TrendingDown },
  { id: "skills", title: "Avg. Skill", value: 72, trend: "up", color: "text-blue-500", bgColor: "bg-blue-500", icon: Zap },
  { id: "possession", title: "Possession", value: 64, trend: "up", color: "text-amber-500", bgColor: "bg-amber-500", icon: BarChart3 },
];

const masterRecentMatchesData = [
  { id: 1, matchday: "Matchday 17 of 34", date: "2023-09-20", team1: { name: "Jossh FC", logo: URL_Analytics_Club_America_Logo, initial: "J" }, team2: { name: "Drift SC", logo: URL_Analytics_Dinamarca_Logo, initial: "D" }, score: "2 - 4", player: { name: "Samuel Burke", team: "Drift SC", rating: 8.6, image: PORTRAIT_URL_1 } },
  { id: 2, matchday: "Matchday 16 of 34", date: "2023-09-13", team1: { name: "Alpha FC", logo: null, initial: "A" }, team2: { name: "Beta FC", logo: URL_Analytics_Dinamarca_Logo, initial: "B" }, score: "1 - 1", player: { name: "Elena Rodriguez", team: "Alpha FC", rating: 7.9, image: PORTRAIT_URL_2 } },
  { id: 3, matchday: "Matchday 15 of 34", date: "2023-08-28", team1: { name: "Gamma City", logo: URL_Analytics_Club_America_Logo, initial: "G" }, team2: { name: "Delta Utd", logo: null, initial: "D" }, score: "3 - 0", player: { name: "Kenji Tanaka", team: "Gamma City", rating: 9.1, image: PORTRAIT_URL_3 } },
  { id: 4, matchday: "Matchday 14 of 34", date: "2023-08-21", team1: { name: "Zeta Rovers", logo: URL_Analytics_Club_America_Logo, initial: "Z" }, team2: { name: "Omega FC", logo: URL_Analytics_Dinamarca_Logo, initial: "O" }, score: "0 - 2", player: { name: "Chloe Davis", team: "Omega FC", rating: 8.2, image: PORTRAIT_URL_4 } },
  { id: 5, matchday: "Matchday 13 of 34", date: "2023-10-01", team1: { name: "Jossh FC", logo: URL_Analytics_Club_America_Logo, initial: "J" }, team2: { name: "Alpha FC", logo: URL_Analytics_Club_America_Logo, initial: "A" }, score: "1 - 0", player: { name: "M. Johnson", team: "Jossh FC", rating: 8.0, image: PORTRAIT_URL_5 } },
];

const masterPlayerPerformanceData = [
  { id: 'p1', name: "Samuel Burke", goals: 5, assists: 4, passAccuracy: 79, image: PORTRAIT_URL_1 }, { id: 'p2', name: "Elena Rodriguez", goals: 8, assists: 2, passAccuracy: 85, image: PORTRAIT_URL_2 }, { id: 'p3', name: "Kenji Tanaka", goals: 3, assists: 6, passAccuracy: 72, image: PORTRAIT_URL_3 }, { id: 'p4', name: "Chloe Davis", goals: 6, assists: 3, passAccuracy: 81, image: PORTRAIT_URL_4 }, { id: 'p5', name: "M. Johnson", goals: 2, assists: 7, passAccuracy: 90, image: PORTRAIT_URL_5 }, { id: 'p6', name: "A. Walker", goals: 7, assists: 1, passAccuracy: 75, image: PORTRAIT_URL_6 }, { id: 'p7', name: "G. Stones", goals: 1, assists: 3, passAccuracy: 88, image: PORTRAIT_URL_1 }, { id: 'p8', name: "H. Kane", goals: 12, assists: 2, passAccuracy: 70, image: PORTRAIT_URL_2 }, { id: 'p9', name: "L. Messi", goals: 15, assists: 10, passAccuracy: 92, image: PORTRAIT_URL_3 }, { id: 'p10', name: "C. Ronaldo", goals: 18, assists: 5, passAccuracy: 80, image: PORTRAIT_URL_4 },
];

const PREDEFINED_FORMATIONS = { // Y-axis: 0 is top (opponent goal), 100 is bottom (own goal)
  "4-4-2": { text: "4-4-2", players: [ { id: 'gk', pos: 'GK', x: 50, y: 90 }, { id: 'rb', pos: 'RB', x: 85, y: 72 }, { id: 'rcb', pos: 'CB', x: 62, y: 75 }, { id: 'lcb', pos: 'CB', x: 38, y: 75 }, { id: 'lb', pos: 'LB', x: 15, y: 72 }, { id: 'rm', pos: 'RM', x: 80, y: 48 }, { id: 'rcm', pos: 'CM', x: 60, y: 50 }, { id: 'lcm', pos: 'CM', x: 40, y: 50 }, { id: 'lm', pos: 'LM', x: 20, y: 48 }, { id: 'rs', pos: 'ST', x: 58, y: 18 }, { id: 'ls', pos: 'ST', x: 42, y: 18 }, ] },
  "4-3-3": { text: "4-3-3", players: [ { id: 'gk', pos: 'GK', x: 50, y: 90 }, { id: 'rb', pos: 'RB', x: 88, y: 70 }, { id: 'rcb', pos: 'CB', x: 65, y: 75 }, { id: 'lcb', pos: 'CB', x: 35, y: 75 }, { id: 'lb', pos: 'LB', x: 12, y: 70 }, { id: 'rcm', pos: 'RCM', x: 70, y: 48 }, { id: 'cm', pos: 'DM', x: 50, y: 52 },  { id: 'lcm', pos: 'LCM', x: 30, y: 48 }, { id: 'rw', pos: 'RW', x: 80, y: 20 }, { id: 'st', pos: 'ST', x: 50, y: 12 }, { id: 'lw', pos: 'LW', x: 20, y: 20 }, ] },
  "3-5-2": { text: "3-5-2", players: [ { id: 'gk', pos: 'GK', x: 50, y: 90 }, { id: 'rcb', pos: 'CB', x: 70, y: 72 }, { id: 'cb', pos: 'CB', x: 50, y: 78 }, { id: 'lcb', pos: 'CB', x: 30, y: 72 }, { id: 'rwb', pos: 'RWB', x: 90, y: 50 }, { id: 'rcm', pos: 'RCM', x: 65, y: 45 }, { id: 'cdm', pos: 'DM', x: 50, y: 55 }, { id: 'lcm', pos: 'LCM', x: 35, y: 45 }, { id: 'lwb', pos: 'LWB', x: 10, y: 50 }, { id: 'rs', pos: 'ST', x: 60, y: 15 }, { id: 'ls', pos: 'ST', x: 40, y: 15 }, ] },
  "5-3-2": { text: "5-3-2", players: [ { id: 'gk', pos: 'GK', x: 50, y: 90 }, { id: 'rwb', pos: 'RWB', x: 90, y: 65 }, { id: 'rcb', pos: 'CB', x: 70, y: 75 }, { id: 'cb', pos: 'CB', x: 50, y: 80 }, { id: 'lcb', pos: 'CB', x: 30, y: 75 }, { id: 'lwb', pos: 'LWB', x: 10, y: 65 }, { id: 'rcm', pos: 'RCM', x: 65, y: 45 }, { id: 'cm', pos: 'CM', x: 50, y: 50 }, { id: 'lcm', pos: 'LCM', x: 35, y: 45 }, { id: 'rs', pos: 'ST', x: 60, y: 15 }, { id: 'ls', pos: 'ST', x: 40, y: 15 }, ] },
};
const FORMATION_KEYS = Object.keys(PREDEFINED_FORMATIONS);

const initialTeamFormationData = {
  ...PREDEFINED_FORMATIONS["4-4-2"], // Default formation
  mostUsed: "4-4-2 (Win Rate: 60%)",
  lastMatch: "4-3-3 (Win)",
  // Header images are no longer needed here as they are replaced by solid backgrounds
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const generateRandomDataArray = (count, min, max) => Array.from({ length: count }, () => getRandomInt(min, max));
const MONTHS = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SEASONS = ["2023/2024", "2022/2023", "2021/2022"];

// --- Main Page Component ---
const AnalyticsPage = () => {
  const [analyticsStats, setAnalyticsStats] = useState(initialAnalyticsStatsData);
  const [displayedPlayerPerformance, setDisplayedPlayerPerformance] = useState([]);
  const [playerSortConfig, setPlayerSortConfig] = useState({ key: 'goals', order: 'desc' });

  const [allRecentMatches, setAllRecentMatches] = useState(masterRecentMatchesData);
  const [displayedRecentMatches, setDisplayedRecentMatches] = useState([]);
  const [matchFilterConfig, setMatchFilterConfig] = useState({ month: 'All', year: 2023, sortKey: 'date', sortOrder: 'desc' });

  const [selectedPerformanceSeason, setSelectedPerformanceSeason] = useState(SEASONS[0]);
  const [gamePerformanceStats, setGamePerformanceStats] = useState({
      winRate: 72,
      avgRating: 8.94,
      topPerformer: { name: "M. Johnson", position: "Midfielder", image: PORTRAIT_URL_1 }
  });
  const [gamePerformanceChartData, setGamePerformanceChartData] = useState({
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
    datasets: [{ label: 'Team Performance', data: generateRandomDataArray(7, 60, 95), borderColor: 'rgb(30, 64, 175)', backgroundColor: 'rgba(30, 64, 175, 0.1)', tension: 0.3, fill: true, pointBackgroundColor: 'rgb(30, 64, 175)', pointBorderColor: '#fff', pointHoverRadius: 7, pointRadius: 5, }],
  });
  const [teamFormation, setTeamFormation] = useState(initialTeamFormationData);

  useEffect(() => {
    const initialRandomPlayers = masterPlayerPerformanceData.sort(() => 0.5 - Math.random()).slice(0, 6);
    // Apply initial sort to the randomly selected players
    const sortedInitialPlayers = [...initialRandomPlayers].sort((a, b) => {
        if (a[playerSortConfig.key] < b[playerSortConfig.key]) return playerSortConfig.order === 'asc' ? -1 : 1;
        if (a[playerSortConfig.key] > b[playerSortConfig.key]) return playerSortConfig.order === 'asc' ? 1 : -1;
        return 0;
    });
    setDisplayedPlayerPerformance(sortedInitialPlayers);
  }, []); // Run once on mount, playerSortConfig dependency removed to prevent re-randomizing

  useEffect(() => {
    let filteredMatches = [...allRecentMatches];
    if (matchFilterConfig.month !== "All") {
      const monthIndex = MONTHS.indexOf(matchFilterConfig.month);
      if (monthIndex > 0) { // Ensure monthIndex is valid (not -1 for "All")
        filteredMatches = filteredMatches.filter(match => {
          const matchDate = new Date(match.date);
          return matchDate.getFullYear() === matchFilterConfig.year && (matchDate.getMonth() + 1) === monthIndex;
        });
      }
    }
    filteredMatches.sort((a, b) => {
      let valA, valB;
      if (matchFilterConfig.sortKey === 'date') { valA = new Date(a.date); valB = new Date(b.date); } 
      else if (matchFilterConfig.sortKey === 'rating') { valA = a.player.rating; valB = b.player.rating; } 
      else { return 0; }
      if (valA < valB) return matchFilterConfig.sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return matchFilterConfig.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setDisplayedRecentMatches(filteredMatches);
  }, [allRecentMatches, matchFilterConfig]);
  
  useEffect(() => {
    setGamePerformanceChartData(prev => ({ ...prev, datasets: [{ ...prev.datasets[0], data: generateRandomDataArray(7, 50, 98) }] }));
  }, [selectedPerformanceSeason]);

  const updatePlayerMetricsSection = useCallback(() => {
    const numPlayersToShow = getRandomInt(5, 8);
    const randomPlayers = [...masterPlayerPerformanceData].sort(() => 0.5 - Math.random()).slice(0, numPlayersToShow);
    
    if (playerSortConfig.key) {
      randomPlayers.sort((a, b) => {
        if (a[playerSortConfig.key] < b[playerSortConfig.key]) return playerSortConfig.order === 'asc' ? -1 : 1;
        if (a[playerSortConfig.key] > b[playerSortConfig.key]) return playerSortConfig.order === 'asc' ? 1 : -1;
        return 0;
      });
    }
    setDisplayedPlayerPerformance(randomPlayers);
  }, [playerSortConfig]);

  const updateGamePerformanceSection = useCallback(() => {
    setGamePerformanceChartData(prev => ({
        ...prev,
        datasets: [{ ...prev.datasets[0], data: generateRandomDataArray(7, 55, 96) }]
    }));
    const randomTopPerformer = getRandomElement(masterPlayerPerformanceData);
    setGamePerformanceStats({
        winRate: getRandomInt(40, 85),
        avgRating: parseFloat((Math.random() * (9.5 - 6.0) + 6.0).toFixed(2)),
        topPerformer: { name: randomTopPerformer.name, position: "Forward", image: randomTopPerformer.image } // Simplified position
    });
  }, []);

  const updateTopAnalyticsStatsSection = useCallback(() => {
    setAnalyticsStats(prevStats =>
        prevStats.map(stat => ({
          ...stat,
          value: getRandomInt(Math.max(0, stat.value - 15), Math.min(100, stat.value + 15)),
          trend: Math.random() > 0.5 ? 'up' : 'down',
        }))
      );
  }, []);

  const updateTeamFormationSection = useCallback(() => {
    const randomFormationKey = getRandomElement(FORMATION_KEYS);
    const newFormation = PREDEFINED_FORMATIONS[randomFormationKey];
    setTeamFormation(prev => ({
        ...prev,
        ...newFormation,
        mostUsed: `${newFormation.text} (Win Rate: ${getRandomInt(40,75)}%)`,
        lastMatch: `${getRandomElement(FORMATION_KEYS)} (${Math.random() > 0.5 ? "Win" : "Loss"})`
    }));
  }, []);

  const handleMatchClick = useCallback((match) => {
    // console.log(`Match Clicked: ${match.team1.name} vs ${match.team2.name}. Updating dashboard...`);
    updatePlayerMetricsSection();
    updateGamePerformanceSection();
    updateTopAnalyticsStatsSection();
    updateTeamFormationSection();
  }, [updatePlayerMetricsSection, updateGamePerformanceSection, updateTopAnalyticsStatsSection, updateTeamFormationSection]);
  
  const handlePlayerSort = useCallback((key) => {
    const newOrder = playerSortConfig.key === key && playerSortConfig.order === 'desc' ? 'asc' : 'desc';
    setPlayerSortConfig({ key, order: newOrder });

    const sortedList = [...displayedPlayerPerformance].sort((a, b) => {
        if (a[key] < b[key]) return newOrder === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return newOrder === 'asc' ? 1 : -1;
        return 0;
    });
    setDisplayedPlayerPerformance(sortedList);
  }, [playerSortConfig, displayedPlayerPerformance]);
  
  const handleGenericFilter = () => alert("Advanced filter panel not implemented yet.");
  const handleRecentMatchSort = () => { setMatchFilterConfig(prev => { const newSortKey = prev.sortKey === 'date' ? 'rating' : 'date'; const newSortOrder = prev.sortKey === newSortKey ? (prev.sortOrder === 'desc' ? 'asc' : 'desc') : 'desc'; return { ...prev, sortKey: newSortKey, sortOrder: newSortOrder }; }); };
  const handleChangeMatchMonth = () => { setMatchFilterConfig(prev => { const currentMonthIndex = MONTHS.indexOf(prev.month); const nextMonthIndex = (currentMonthIndex + 1) % MONTHS.length; return { ...prev, month: MONTHS[nextMonthIndex] }; }); };
  const handleViewAllMatches = () => { setMatchFilterConfig(prev => ({ ...prev, month: "All" })); /* alert("Showing all matches for the selected period."); */ };
  const handleMotmPlayerClick = (player) => { /* alert(`Player ${player.name} (MOTM) clicked.`); */ };
  const handleChangePerformanceSeason = () => { setSelectedPerformanceSeason(prev => { const currentIndex = SEASONS.indexOf(prev); return SEASONS[(currentIndex + 1) % SEASONS.length]; });};
  const handleFormationPlayerClick = (playerPos) => { /* alert(`Clicked on ${playerPos} position.`); */};
  
  const chartOptions = useMemo(() => ({ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: true, backgroundColor: 'rgba(0,0,0,0.7)', titleFont: { size: 14 }, bodyFont: { size: 12 }, padding: 10, cornerRadius: 4, }, }, scales: { x: { grid: { display: false }, ticks: { color: '#64748b'} }, y: { beginAtZero: true, max: 100, grid: { color: 'rgba(200,200,200,0.1)'}, ticks: {color: '#64748b'} }, }, }), []);
  const SortIcon = ({ sortKey, currentSortKey, currentOrder }) => { if (sortKey !== currentSortKey) return <ArrowDownUp className="w-3 h-3 ml-1 text-slate-400 group-hover:text-slate-600 inline-block" />; return currentOrder === 'desc' ? <SortDesc className="w-3.5 h-3.5 ml-1 text-primary-dark inline-block" /> : <SortAsc className="w-3.5 h-3.5 ml-1 text-primary-dark inline-block" />; };

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="space-y-6 lg:space-y-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          <div className="flex-grow xl:w-[calc(100%-24rem-2rem)] space-y-6 lg:space-y-8"> {/* Main content area */}
            
            {/* Top Analytics Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {analyticsStats.map((stat) => (
                <Card key={stat.id} noPadding className="overflow-visible cursor-pointer hover:shadow-md transition-shadow" onClick={() => {/* alert(`Viewing details for ${stat.title}`) */}}>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-1"> <h3 className="text-sm font-medium text-slate-600">{stat.title}</h3> <stat.icon className={`w-5 h-5 ${stat.color} opacity-70`} /> </div>
                    <div className="flex items-baseline space-x-1 mb-3"> <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span> <span className={`text-xl font-medium ${stat.color}`}>%</span> {stat.trend === 'up' ? <TrendingUp className={`w-4 h-4 ${stat.color} self-end mb-1`} /> : <TrendingDown className={`w-4 h-4 ${stat.color} self-end mb-1`} />} </div>
                  </div>
                  <div className="relative h-1.5 bg-slate-200"> <div className={`absolute top-0 left-0 h-full rounded-r-full ${stat.bgColor} transition-all duration-500 ease-out`} style={{ width: `${stat.value}%` }}></div> </div>
                </Card>
              ))}
            </div>

            {/* Recent Matches and Game Performance Section */}
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3 items-center">
                <FilterButton icon={Filter} onClick={handleGenericFilter}>Filter</FilterButton>
                <FilterButton icon={ArrowDownUp} onClick={handleRecentMatchSort}>Sort ({matchFilterConfig.sortKey} {matchFilterConfig.sortOrder})</FilterButton>
                <FilterButton icon={CalendarDays} onClick={handleChangeMatchMonth}> {matchFilterConfig.month}, {matchFilterConfig.year} <ChevronDown className="w-3.5 h-3.5 ml-1.5 text-slate-500"/> </FilterButton>
              </div>
              <Card title="RECENT MATCH RESULTS" headerActions={<ActionButton onClick={handleViewAllMatches}>View All <ChevronRight className="w-4 h-4 ml-1" /></ActionButton>}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayedRecentMatches.map(match => (
                    <div key={match.id} className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => handleMatchClick(match)}>
                      <p className="text-xs text-slate-500 mb-2">{match.matchday} ({new Date(match.date).toLocaleDateString()})</p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex flex-col items-center text-center w-[35%]"> <PlaceholderImage src={match.team1.logo} alt={match.team1.name} className="w-8 h-8 sm:w-10 sm:h-10 mb-1 rounded-full" isTeamLogo teamInitial={match.team1.initial} /> <span className="text-xs sm:text-sm font-medium text-slate-700 truncate w-full">{match.team1.name}</span> </div>
                        <div className="bg-slate-800 text-white px-3 py-1 rounded-md text-sm sm:text-base font-semibold">{match.score}</div>
                        <div className="flex flex-col items-center text-center w-[35%]"> <PlaceholderImage src={match.team2.logo} alt={match.team2.name} className="w-8 h-8 sm:w-10 sm:h-10 mb-1 rounded-full" isTeamLogo teamInitial={match.team2.initial} /> <span className="text-xs sm:text-sm font-medium text-slate-700 truncate w-full">{match.team2.name}</span> </div>
                      </div>
                      <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                        <div className="flex items-center min-w-0 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleMotmPlayerClick(match.player); }}> <PlaceholderImage src={match.player.image} alt={match.player.name} className="w-7 h-7 rounded-full mr-2 border border-slate-300" isPlayerPortrait />
                          <div className="min-w-0"> <p className="text-xs font-medium text-slate-700 truncate">{match.player.name}</p> <p className="text-xs text-slate-500 truncate">{match.player.team}</p> </div>
                        </div>
                        <div className="flex items-center bg-amber-400 text-white px-1.5 py-0.5 rounded text-xs font-semibold"> <Star className="w-3 h-3 mr-1" fill="currentColor" /> <span>{match.player.rating}</span> </div>
                      </div>
                    </div>
                  ))}
                </div>
                {displayedRecentMatches.length === 0 && <p className="text-center text-slate-500 py-4">No matches found for this filter.</p>}
              </Card>
            </div>

            <Card title="GAME PERFORMANCE" headerActions={<FilterButton onClick={handleChangePerformanceSeason}>{selectedPerformanceSeason} <ChevronDown className="w-3.5 h-3.5 ml-1.5" /></FilterButton>}>
              <div className="h-72 w-full mb-6"><Line options={chartOptions} data={gamePerformanceChartData} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200"> <p className="text-xs text-slate-500 uppercase">WIN RATE</p> <p className="text-2xl font-semibold text-primary-dark mt-1">{gamePerformanceStats.winRate}%</p> </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200"> <p className="text-xs text-slate-500 uppercase">AVG. RATING</p> <p className="text-2xl font-semibold text-primary-dark mt-1">{gamePerformanceStats.avgRating}</p> </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200"> <p className="text-xs text-slate-500 uppercase">TOP PERFORMER</p> <div className="flex items-center justify-center mt-1 space-x-2"> <PlaceholderImage src={gamePerformanceStats.topPerformer.image} alt={gamePerformanceStats.topPerformer.name} className="w-6 h-6 rounded-full" isPlayerPortrait/> <p className="text-sm font-medium text-primary-dark truncate">{gamePerformanceStats.topPerformer.name}</p> </div> </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="xl:w-96 flex-shrink-0 space-y-6 lg:space-y-8">
            {/* Player Metrics Card - MODIFIED HEADER */}
            <Card noPadding className="overflow-hidden">
              <div className="h-28 sm:h-32 bg-primary-dark flex items-center justify-center p-4">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Player Metrics</h3>
              </div>
              <div className="px-1 pt-1">
                <div className="flex justify-between items-center text-xs text-slate-500 p-2.5 border-b border-slate-200 font-medium">
                    <div className="w-2/5">Player</div>
                    <div className="flex justify-end items-center text-center w-3/5 space-x-2">
                        {['goals', 'assists', 'passAccuracy'].map(key => (
                            <div key={key} className="w-1/3 cursor-pointer group flex items-center justify-center" onClick={() => handlePlayerSort(key)}>
                                <span className="capitalize">{key === 'passAccuracy' ? 'Pass %' : key}</span>
                                <SortIcon sortKey={key} currentSortKey={playerSortConfig.key} currentOrder={playerSortConfig.order} />
                            </div>
                        ))}
                    </div>
                </div>
              </div>
              <div className="p-1 max-h-[310px] overflow-y-auto custom-scrollbar">
                {displayedPlayerPerformance.map((player) => (
                  <div key={player.id + player.name} className="p-2.5 hover:bg-slate-50 rounded-md border-b border-slate-100 last:border-b-0 cursor-pointer" onClick={() => { /* alert(`Detailed stats for ${player.name}`) */}}>
                      <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center w-2/5 min-w-0"> <PlaceholderImage src={player.image} alt={player.name} className="w-7 h-7 rounded-full mr-2.5" isPlayerPortrait /> <span className="font-medium text-slate-700 truncate">{player.name}</span> </div>
                          <div className="flex justify-end items-center text-center w-3/5 space-x-2">
                              <div className="w-1/3"> <span className="text-sm font-semibold text-slate-800">{player.goals}</span> </div>
                              <div className="w-1/3"> <span className="text-sm font-semibold text-slate-800">{player.assists}</span> </div>
                              <div className="w-1/3"> <span className="text-sm font-semibold text-slate-800">{player.passAccuracy}%</span> </div>
                          </div>
                      </div>
                  </div>
                ))}
                 {displayedPlayerPerformance.length === 0 && <p className="text-center text-slate-400 py-4 text-sm">No player data.</p>}
              </div>
            </Card>

            {/* Team Formation Card - MODIFIED HEADER */}
            <Card noPadding className="overflow-hidden sticky top-6 xl:top-8">
              <div className="h-20 sm:h-24 bg-primary-dark flex items-center justify-center p-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">Team Formation</h3>
              </div>
              <div className="p-3 sm:p-4">
                <div className="relative w-full aspect-[4/3] sm:aspect-[3/2.2]"> {/* Adjusted aspect ratio for better pitch view */}
                  <SvgFootballPitch players={teamFormation.players} onPlayerClick={handleFormationPlayerClick} />
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between"> <span className="font-semibold text-slate-700">Most Used:</span> <span>{teamFormation.mostUsed}</span> </div>
                  <div className="flex justify-between"> <span className="font-semibold text-slate-700">Last Match:</span> <span>{teamFormation.lastMatch}</span> </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; /* slate-300 */ border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; /* slate-400 */ }
        /* Assuming primary-dark is #041931 from your Tailwind config */
        /* If text-primary-dark is different, define it here or in Tailwind */
        /* .text-primary-dark { color: #041931; }  This would make ActionButton use the same dark blue */
        .bg-primary-dark { background-color: #041931 !important; } /* Use !important if Tailwind specificity is an issue, ideally resolve via config */

      `}</style>
    </div>
  );
};

export default AnalyticsPage;