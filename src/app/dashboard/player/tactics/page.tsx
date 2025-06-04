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
  Shield,
  Repeat,
  Trophy,
  Users,
  BarChart2,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Minus,
  Settings, 
  Info,     
  RefreshCw,
} from 'lucide-react';
import clsx from 'clsx';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const URL_Tactics_MainBanner_BG = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Players_menu_banner_487_1756.png';
const URL_Tactics_DeltaFC_Logo = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamo_Zagreb_1_507_1762.png';
const URL_Tactics_BannerStatCard_1_BG = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002185_487_1752.png';
const URL_Tactics_BannerStatCard_2_BG = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002186_487_1753.png';
const URL_Tactics_BannerStatCard_3_BG = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002187_487_1754.png';
const URL_Tactics_RecentMatch_Team1_Logo = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Club_Am_rica_1_375_1277.png';
const URL_Tactics_RecentMatch_Team2_Logo = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamarca_1_355_4591.png';
const URL_Tactics_RecentMatch_PlayerPortrait1 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2385_521_1841.png';
const URL_Tactics_RecentMatch_PlayerPortrait2 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2385_521_1831.png';
const URL_Tactics_GamePerf_Sidebar_BG = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002002_365_1325.png';
const URL_Tactics_PlayerPerf_Header_BG = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000001965_375_1550.png';
const URL_Tactics_Formation_Header_BG = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000001965_378_1738.png';
const URL_Tactics_Match_Analysis_1 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002297_531_1819.png';

const PlaceholderImage = ({ src, alt, className, isTeamLogo = false, teamInitial = 'P', isPlayerPortrait = false, isBanner = false, uniqueKey }) => {
  let imageToRender = src; let unoptimizedImage = false;
  const generateSeed = () => { if (uniqueKey) return String(uniqueKey).replace(/[^a-zA-Z0-9-_]/g, ''); if (alt) return alt.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase(); return 'default-placeholder-seed'; };
  if (!src) {
    const seed = generateSeed();
    if (isTeamLogo) { const bgColor = "#e2e8f0"; const textColor = "#475569"; imageToRender = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%2064%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2232%22%20fill%3D%22${encodeURIComponent(bgColor)}%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22central%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20font-weight%3D%22bold%22%20fill%3D%22${encodeURIComponent(textColor)}%22%3E${teamInitial.toUpperCase()}%3C%2Ftext%3E%3C%2Fsvg%3E`; unoptimizedImage = true; }
    else if (isPlayerPortrait) { imageToRender = `https://via.placeholder.com/100/CCCCCC/808080?Text=P&seed=${seed}`; } else if (isBanner) { imageToRender = `https://via.placeholder.com/800x400/CCCCCC/808080?Text=Banner&seed=${seed}`; } else { imageToRender = `https://via.placeholder.com/300x200/CCCCCC/808080?Text=Img&seed=${seed}`; }
  } else if (typeof src === 'string' && src.startsWith('data:image/svg+xml')) { unoptimizedImage = true; }
  if (!imageToRender) { imageToRender = `https://via.placeholder.com/200/CCCCCC/808080?Text=Error&seed=errorFallback`; unoptimizedImage = true; }
  return ( <div className={clsx("relative bg-gray-300 overflow-hidden", className)}> <Image src={imageToRender} alt={alt || 'Placeholder image'} layout="fill" objectFit="cover" unoptimized={unoptimizedImage} priority={isBanner} onError={(e) => { const errorSvg = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23f3f4f6%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2210px%22%20fill%3D%22%239ca3af%22%3ENo%20Img%3C%2Ftext%3E%3C%2Fsvg%3E`; e.currentTarget.srcset = errorSvg; e.currentTarget.src = errorSvg; }}/> </div> );
};
const NigeriaFlagIcon = () => ( <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-sm"> <rect width="8" height="17.3333" transform="translate(0 3.33333)" fill="#008751"/> <rect width="8" height="17.3333" transform="translate(8 3.33333)" fill="#FFFFFF"/> <rect width="8" height="17.3333" transform="translate(16 3.33333)" fill="#008751"/> </svg> );
const StatTrendIcon = ({ trend = 'up' }) => { if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-500" />; if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-500" />; return <Minus className="w-4 h-4 text-gray-500" />; };
const AnalyticsStatCard = ({ title, value, unit, trend, color, barColor, onClick }) => ( <div className="bg-white p-3.5 rounded-lg shadow-md border border-black/10 flex flex-col justify-between min-h-[120px] hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}> <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3> <div className="flex items-end space-x-1 mb-1"> <StatTrendIcon trend={trend} /> <span className={`text-3xl font-medium ${color}`}>{value}</span> <span className={`text-xl font-medium ${color} pb-0.5`}>{unit}</span> </div> <div className={`w-full h-[8px] rounded-full ${barColor} bg-opacity-90`}></div> </div> );

const SvgFootballPitch = ({ players = [], onPlayerClick, className = "" }) => {
  const pitchWidth = 300; const pitchHeight = 450; 
  const playerMarkerRadius = 10;
  return (
    <svg viewBox={`0 0 ${pitchWidth} ${pitchHeight}`} className={clsx("w-full h-full bg-green-600 rounded-lg border-2 border-white/30 shadow-inner", className)}>
      <rect x="5" y="5" width={pitchWidth - 10} height={pitchHeight - 10} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <line x1={pitchWidth / 2} y1="5" x2={pitchWidth / 2} y2={pitchHeight - 5} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx={pitchWidth / 2} cy={pitchHeight / 2} r="40" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx={pitchWidth / 2} cy={pitchHeight / 2} r="1.5" fill="rgba(255,255,255,0.7)" />
      <rect x={pitchWidth * 0.15} y="5" width={pitchWidth * 0.7} height={pitchHeight * 0.18} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <rect x={pitchWidth * 0.3} y="5" width={pitchWidth * 0.4} height={pitchHeight * 0.08} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx={pitchWidth/2} cy={pitchHeight * 0.12} r="1" fill="rgba(255,255,255,0.7)"/>
      <rect x={pitchWidth * 0.15} y={pitchHeight - 5 - (pitchHeight * 0.18)} width={pitchWidth * 0.7} height={pitchHeight * 0.18} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <rect x={pitchWidth * 0.3} y={pitchHeight - 5 - (pitchHeight * 0.08)} width={pitchWidth * 0.4} height={pitchHeight * 0.08} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx={pitchWidth/2} cy={pitchHeight - (pitchHeight * 0.12)} r="1" fill="rgba(255,255,255,0.7)"/>

      {players.map(player => (
        <g key={player.id || player.pos} transform={`translate(${(player.x / 100) * pitchWidth}, ${(player.y / 100) * pitchHeight})`} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => onPlayerClick && onPlayerClick(player.pos)}>
          <circle r={playerMarkerRadius} fill="rgb(220, 38, 38)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize={playerMarkerRadius * 0.75} fontWeight="bold" fill="white">{player.pos}</text>
        </g>
      ))}
    </svg>
  );
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const generateRandomDataArray = (count, min, max) => Array.from({ length: count }, () => getRandomInt(min, max));

const initialTeamInfo = { name: "Delta FC", logoSrc: URL_Tactics_DeltaFC_Logo, trophyCount: 4, bestFormation: "4-3-3", avgWinRate: "62.65%", manager: "Joshua Fayomi", numPlayers: "50", bannerImageSrc: URL_Tactics_MainBanner_BG };
const initialTacticsBannerCards = [ { title: "BEST FORMATION", value: initialTeamInfo.bestFormation, icon: ClipboardList, color: "text-sky-600", imageSrc: URL_Tactics_BannerStatCard_1_BG }, { title: "AVERAGE WIN RATES", value: initialTeamInfo.avgWinRate, icon: BarChart2, color: "text-green-600", imageSrc: URL_Tactics_BannerStatCard_2_BG }, { title: "MANAGER", value: initialTeamInfo.manager, icon: Users, color: "text-purple-600", imageSrc: URL_Tactics_BannerStatCard_3_BG }, { title: "NUMBER OF PLAYERS", value: initialTeamInfo.numPlayers, icon: Users, color: "text-indigo-600", imageSrc: URL_Tactics_BannerStatCard_1_BG }, ];
const initialAnalyticsMenuStats = [ { title: "Wins", value: "83", unit: "%", trend: "up", color: "text-green-500", barColor: "bg-green-500" }, { title: "Losses", value: "12", unit: "%", trend: "down", color: "text-red-500", barColor: "bg-red-500" }, { title: "Skills", value: "72", unit: "%", trend: "up", color: "text-blue-500", barColor: "bg-blue-500" }, { title: "Possession", value: "64", unit: "%", trend: "up", color: "text-orange-500", barColor: "bg-orange-500" }, ];
const masterRecentMatchesData = [ { id: 1, matchday: "Matchday 17 of 34", date: "2023-09-20", team1: { name: "Jossh FC", logoSrc: URL_Tactics_RecentMatch_Team1_Logo, initial: "J" }, team2: { name: "Drift SC", logoSrc: URL_Tactics_RecentMatch_Team2_Logo, initial: "D" }, score: "2 - 4", player: { name: "Samuel Burke", team: "Drift SC", rating: 8.6, imageSrc: URL_Tactics_RecentMatch_PlayerPortrait1 } }, { id: 2, matchday: "Matchday 16 of 34", date: "2023-09-13", team1: { name: "Alpha FC", logoSrc: URL_Tactics_RecentMatch_Team1_Logo, initial: "A" }, team2: { name: "Beta FC", logoSrc: URL_Tactics_RecentMatch_Team2_Logo, initial: "B" }, score: "1 - 1", player: { name: "Elena Rodriguez", team: "Alpha FC", rating: 7.9, imageSrc: URL_Tactics_RecentMatch_PlayerPortrait2 } }, { id: 3, matchday: "Matchday 15 of 34", date: "2023-08-28", team1: { name: "Gamma City", logoSrc: URL_Tactics_RecentMatch_Team1_Logo, initial: "G" }, team2: { name: "Delta Utd", logoSrc: URL_Tactics_RecentMatch_Team2_Logo, initial: "D" }, score: "3 - 0", player: { name: "Kenji Tanaka", team: "Gamma City", rating: 9.1, imageSrc: URL_Tactics_RecentMatch_PlayerPortrait1 } }, ];
const masterPlayerPerformanceData = [ { id: 'pp1', name: "H. Fayomi", goals: 5, assists: 4, passAccuracy: "79%" }, { id: 'pp2', name: "A. Rahul", goals: 8, assists: 2, passAccuracy: "85%" }, { id: 'pp3', name: "C. Silva", goals: 3, assists: 6, passAccuracy: "72%" }, { id: 'pp4', name: "D. Lee", goals: 6, assists: 3, passAccuracy: "81%" }, { id: 'pp5', name: "E. Jones", goals: 2, assists: 7, passAccuracy: "90%" }, ];
const initialSetPiecesData = [ { type: "Corners", attempts: 7, scored: 5, successRate: "56%" }, { type: "Free Kicks", attempts: 4, scored: 2, successRate: "60%" }, { type: "Throw-Ins", attempts: 67, scored: 12, successRate: "55%" }, { type: "Goal Kicks", attempts: 35, scored: 12, successRate: "78%" }, { type: "Penalty Kicks", attempts: 24, scored: 3, successRate: "92%" }, ];
const initialMatchAnalysisData = [ { id: 'ma1', imageSrc: URL_Tactics_Match_Analysis_1, text: "Last Match (vs. ARISE FC): High pressing forced turnovers, created goal-scoring opportunities.", date: "21-05-2024" }, { id: 'ma2', imageSrc: URL_Tactics_Match_Analysis_1, text: "Key Player Focus: Midfield pivot crucial for maintaining possession and dictating tempo.", date: "18-05-2024" }, { id: 'ma3', imageSrc: URL_Tactics_Match_Analysis_1, text: "Set Piece Analysis: Corner kick routines leading to increased headed goal attempts.", date: "15-05-2024" }, ];

const PREDEFINED_FORMATIONS = {
  "4-3-3": { id: 'f1', name: "4-3-3", winRate: "86%", goalsScored: 56, goalsConceded: 16, players: [ { pos: 'GK', x: 50, y: 8 }, { pos: 'RB', x: 85, y: 25 }, { pos: 'RCB', x: 65, y: 20 }, { pos: 'LCB', x: 35, y: 20 }, { pos: 'LB', x: 15, y: 25 }, { pos: 'RCM', x: 70, y: 48 }, { pos: 'CM', x: 50, y: 42 }, { pos: 'LCM', x: 30, y: 48 }, { pos: 'RW', x: 80, y: 75 }, { pos: 'ST', x: 50, y: 85 }, { pos: 'LW', x: 20, y: 75 }, ] },
  "4-4-2": { id: 'f2', name: "4-4-2", winRate: "72%", goalsScored: 48, goalsConceded: 20, players: [ { pos: 'GK', x: 50, y: 8 }, { pos: 'RB', x: 88, y: 30 }, { pos: 'RCB', x: 63, y: 28 }, { pos: 'LCB', x: 37, y: 28 }, { pos: 'LB', x: 12, y: 30 }, { pos: 'RM', x: 85, y: 55 }, { pos: 'RCM', x: 60, y: 50 }, { pos: 'LCM', x: 40, y: 50 }, { pos: 'LM', x: 15, y: 55 }, { pos: 'RS', x: 58, y: 80 }, { pos: 'LS', x: 42, y: 80 }, ] },
  "3-5-2": { id: 'f3', name: "3-5-2", winRate: "45%", goalsScored: 24, goalsConceded: 14, players: [ { pos: 'GK', x: 50, y: 8 }, { pos: 'RCB', x: 70, y: 25 }, { pos: 'CB', x: 50, y: 20 }, { pos: 'LCB', x: 30, y: 25 }, { pos: 'RWB', x: 90, y: 50 }, { pos: 'RCM', x: 65, y: 50 }, { pos: 'DM', x: 50, y: 45 }, { pos: 'LCM', x: 35, y: 50 }, { pos: 'LWB', x: 10, y: 50 }, { pos: 'RS', x: 60, y: 82 }, { pos: 'LS', x: 40, y: 82 }, ] },
  "5-4-1": { id: 'f4', name: "5-4-1", winRate: "54%", goalsScored: 19, goalsConceded: 10, players: [ { pos: 'GK', x: 50, y: 8 }, { pos: 'RWB', x: 90, y: 35 }, { pos: 'RCB', x: 70, y: 25 }, { pos: 'CB', x: 50, y: 20 }, { pos: 'LCB', x: 30, y: 25 }, { pos: 'LWB', x: 10, y: 35 }, { pos: 'RM', x: 80, y: 60 }, { pos: 'RCM', x: 60, y: 55 }, { pos: 'LCM', x: 40, y: 55 }, { pos: 'LM', x: 20, y: 60 }, { pos: 'ST', x: 50, y: 85 }, ] },
};
const FORMATION_KEYS = Object.keys(PREDEFINED_FORMATIONS);

const TacticsPage = () => {
  const [teamInfo, setTeamInfo] = useState(initialTeamInfo);
  const [analyticsStats, setAnalyticsStats] = useState(initialAnalyticsMenuStats);
  const [displayedRecentMatches, setDisplayedRecentMatches] = useState(masterRecentMatchesData);
  const [teamFormationsData, setTeamFormationsData] = useState(Object.values(PREDEFINED_FORMATIONS));
  const [currentSidebarFormation, setCurrentSidebarFormation] = useState({ ...PREDEFINED_FORMATIONS["4-3-3"], mostUsed: "4-3-3 (Win Rate: 86%)", lastMatch: "4-4-2 (Loss)" });
  const [setPieces, setSetPieces] = useState(initialSetPiecesData);
  const [playerPerformance, setPlayerPerformance] = useState(masterPlayerPerformanceData);
  const [gamePerformanceChartData, setGamePerformanceChartData] = useState({ labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ label: 'Win %', data: generateRandomDataArray(6, 50, 90), backgroundColor: 'rgba(30, 64, 175, 0.6)', borderColor: 'rgb(30, 64, 175)', borderWidth: 1, }] });
  const [gamePerformanceTopPlayer, setGamePerformanceTopPlayer] = useState({ name: "M. Johnson", imageSrc: URL_Tactics_RecentMatch_PlayerPortrait1 });
  const [selectedChartSeason, setSelectedChartSeason] = useState("2023/2024");

  const randomizePageData = () => {
    setAnalyticsStats(prev => prev.map(s => ({ ...s, value: getRandomInt(30, 90).toString(), trend: getRandomElement(['up', 'down', 'neutral']) })));
    setGamePerformanceChartData(prev => ({ ...prev, datasets: [{ ...prev.datasets[0], data: generateRandomDataArray(6, 40, 95) }] }));
    setGamePerformanceTopPlayer(getRandomElement(masterPlayerPerformanceData));
    
    // Randomize Team Formations Table Data
    const newTeamFormationsData = Object.values(PREDEFINED_FORMATIONS).map(form => ({
      ...form,
      winRate: `${getRandomInt(30, 90)}%`,
      goalsScored: getRandomInt(10, 60),
      goalsConceded: getRandomInt(5, 30),
    }));
    setTeamFormationsData(newTeamFormationsData);

    // Randomize Current Sidebar Formation
    const randomFormationKey = getRandomElement(FORMATION_KEYS);
    const randomFormation = PREDEFINED_FORMATIONS[randomFormationKey];
    const randomMostUsedWinRate = getRandomInt(40,85);
    setCurrentSidebarFormation({ 
        ...randomFormation, 
        mostUsed: `${randomFormation.name} (Win Rate: ${randomMostUsedWinRate}%)`, 
        lastMatch: `${getRandomElement(FORMATION_KEYS)} (${Math.random() > 0.5 ? "Win" : "Loss"})` 
    });
    
    setPlayerPerformance([...masterPlayerPerformanceData].sort(() => 0.5 - Math.random()).slice(0, 5));
    
    // Randomize Set Pieces Data
    setSetPieces(prev => prev.map(sp => {
        const attempts = getRandomInt(5,80);
        const scored = getRandomInt(0, Math.floor(attempts * 0.8)); // Scored cannot be more than attempts
        const successRate = attempts > 0 ? Math.round((scored/attempts)*100) : 0;
        return {...sp, attempts, scored, successRate: `${successRate}%` };
    }));
  };

  const handleFormationSelect = (formationId) => {
    const selected = teamFormationsData.find(f => f.id === formationId);
    if (selected) {
      setCurrentSidebarFormation({
        ...selected, // This will now include the randomized winRate, goalsScored, goalsConceded
        players: PREDEFINED_FORMATIONS[selected.name].players, // Ensure original player positions are used
        mostUsed: `${selected.name} (Win Rate: ${selected.winRate})`, // Use the randomized winRate
        lastMatch: `${getRandomElement(FORMATION_KEYS)} (${Math.random() > 0.5 ? "Win" : "Loss"})`
      });
    }
  };

  const handleRecentMatchClick = (match) => {
    alert(`Match clicked: ${match.team1.name} vs ${match.team2.name}. Updating related stats...`);
    randomizePageData();
  };

  const handleGamePerformanceSeasonChange = () => {
    const newSeason = selectedChartSeason === "2023/2024" ? "2022/2023" : "2023/2024";
    setSelectedChartSeason(newSeason);
    setGamePerformanceChartData(prev => ({ ...prev, datasets: [{ ...prev.datasets[0], data: generateRandomDataArray(6, 45, 85) }] }));
  };

  const gamePerformanceLineChartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: { x: { grid: { display: false } }, y: { beginAtZero: true, max: 100, grid: { color: 'rgba(200,200,200,0.1)'} } },
  };


  return (
    <div className="space-y-6 lg:space-y-8 pb-10">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
        <div className="flex-grow xl:w-[calc(100%-25rem-2rem)] space-y-6 lg:space-y-8">
          <div className="relative rounded-2xl shadow-xl p-5 sm:p-6 min-h-[208px] bg-cover bg-center" style={{ backgroundColor: '#041931' }}>
            <PlaceholderImage src={teamInfo.bannerImageSrc} alt="Tactics banner background" className="absolute inset-0 opacity-[0.07] rounded-2xl" isBanner uniqueKey={`tacticsBanner-${teamInfo.bannerImageSrc}`}/>
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-x-8 xl:gap-x-[72px]">
              <div className="flex items-center gap-4 md:gap-6 flex-shrink-0 py-4">
                <PlaceholderImage src={teamInfo.logoSrc} alt={`${teamInfo.name} Logo`} className="w-20 h-20 sm:w-24 sm:h-24 rounded-md shadow-lg border-2 border-white/20" isTeamLogo teamInitial={teamInfo.name.charAt(0)} uniqueKey={`logo-${teamInfo.logoSrc}`}/>
                <div className="text-white">
                  <h2 className="text-2xl sm:text-[24px] font-bold">{teamInfo.name}</h2>
                  <div className="flex items-center mt-1"> <NigeriaFlagIcon /> </div>
                  <div className="mt-2 text-xs text-white/70">Championship Trophies</div>
                  <div className="flex items-center mt-1 opacity-90"> {Array.from({ length: teamInfo.trophyCount }).map((_, i) => ( <Trophy key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 mr-1.5" fill="currentColor"/> ))} </div>
                </div>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-5 flex-grow items-center">
                {initialTacticsBannerCards.map((card, index) => (
                  <div key={card.title} className="relative bg-white/95 backdrop-blur-sm p-3.5 rounded-lg shadow-md border border-gray-300/30 flex flex-col text-center h-full justify-center min-h-[112px] hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={() => alert(`${card.title}: ${card.value}`)}>
                    <PlaceholderImage src={card.imageSrc} alt="Card background texture" className="absolute inset-0 opacity-[0.03] rounded-lg" uniqueKey={`tacticsBannerCardBg-${index}`}/>
                    <div className="relative z-10"> <card.icon className={clsx("w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5", card.color)} /> <p className="text-[0.65rem] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">{card.title}</p> <p className={`text-lg sm:text-xl font-bold ${card.color} truncate`}>{card.value}</p> </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80 p-5 sm:p-7 opacity-[0.92]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
              {analyticsStats.map((stat) => ( <AnalyticsStatCard key={stat.title} {...stat} onClick={() => alert(`Stat clicked: ${stat.title}`)} /> ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-3 items-center">
              <button className="flex items-center bg-white text-gray-700 hover:bg-gray-100 px-4 py-2.5 rounded-2xl shadow text-sm border border-gray-300/70" onClick={() => alert('Filter clicked')}> <Filter className="w-4 h-4 mr-2 text-gray-500" /> Filter </button>
              <button className="flex items-center bg-white text-gray-700 hover:bg-gray-100 px-4 py-2.5 rounded-2xl shadow text-sm border border-gray-300/70" onClick={() => alert('Sort clicked')}> <ArrowDownUp className="w-4 h-4 mr-2 text-gray-500" /> Sort </button>
              <button className="flex items-center bg-white text-gray-700 hover:bg-gray-100 px-4 py-2.5 rounded-2xl shadow text-sm border border-gray-300/70" onClick={() => alert('Date clicked')}> <CalendarDays className="w-4 h-4 mr-2 text-gray-500" /> September, 2023 <ChevronDown className="w-3.5 h-3.5 ml-1.5 text-gray-500"/> </button>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80 p-5 sm:p-6 md:p-8">
              <div className="flex justify-between items-center mb-6"> <h3 className="text-lg sm:text-xl font-bold text-black uppercase">RECENT MATCH RESULTS</h3> <button className="flex items-center text-sm text-gray-700 hover:text-primary-dark" onClick={() => alert('View All Matches')}> View All <ChevronRight className="w-4 h-4 ml-1" /> </button> </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {displayedRecentMatches.map(match => (
                  <div key={match.id} className="bg-white p-3.5 rounded-lg shadow-md border border-black/10 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleRecentMatchClick(match)}>
                    <p className="text-xs text-gray-500 mb-1.5">{match.matchday}</p>
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex flex-col items-center text-center w-2/5"> <PlaceholderImage src={match.team1.logoSrc} alt={match.team1.name} className="w-9 h-9 sm:w-10 sm:h-10 mb-1" isTeamLogo teamInitial={match.team1.initial} uniqueKey={`recentmatch-${match.id}-t1-${match.team1.logoSrc}`} /> <span className="text-[0.8rem] font-medium text-gray-800 truncate w-full">{match.team1.name}</span> </div>
                      <div className="bg-black text-white px-2.5 py-1 rounded-md text-sm sm:text-base font-semibold"> {match.score} </div>
                      <div className="flex flex-col items-center text-center w-2/5"> <PlaceholderImage src={match.team2.logoSrc} alt={match.team2.name} className="w-9 h-9 sm:w-10 sm:h-10 mb-1" isTeamLogo teamInitial={match.team2.initial} uniqueKey={`recentmatch-${match.id}-t2-${match.team2.logoSrc}`} /> <span className="text-[0.8rem] font-medium text-gray-800 truncate w-full">{match.team2.name}</span> </div>
                    </div>
                    <div className="border-t border-gray-200 pt-2.5 flex items-center justify-between">
                      <div className="flex items-center"> <PlaceholderImage src={match.player.imageSrc} alt={match.player.name} className="w-6 h-6 rounded-full mr-1.5 border border-gray-300" isPlayerPortrait uniqueKey={`matchplayer-${match.id}-${match.player.name}`} /> <div> <p className="text-[0.7rem] font-medium text-gray-700">{match.player.name}</p> <p className="text-[0.65rem] text-gray-500">{match.player.team}</p> </div> </div>
                      <div className="flex items-center bg-primary-dark text-white px-1.5 py-0.5 rounded-sm text-[0.7rem]"> <Star className="w-2.5 h-2.5 mr-0.5 text-yellow-400" fill="currentColor" /> <span>{match.player.rating}</span> </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80">
              <div className="md:w-full flex-shrink-0 overflow-hidden rounded-t-2xl"> <PlaceholderImage src={URL_Tactics_GamePerf_Sidebar_BG} alt="Game Performance Header" className="w-full h-28 md:h-40 object-cover" isBanner uniqueKey="gamePerfHeaderTactics"/> </div>
              <div className="flex-grow p-5 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-4"> <h3 className="text-lg sm:text-xl font-bold text-black">Game Performance</h3> <button className="flex items-center text-sm text-gray-700 hover:text-primary-dark" onClick={handleGamePerformanceSeasonChange}> {selectedChartSeason} <ChevronDown className="w-4 h-4 ml-1.5" /> </button> </div>
                <div className="w-full h-56 sm:h-64"> <Line options={gamePerformanceLineChartOptions} data={gamePerformanceChartData} /> </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200"> <p className="text-xs text-gray-500 uppercase">WIN RATE</p> <p className="text-xl font-semibold text-primary-dark mt-1">{getRandomInt(60,80)}%</p> </div>
                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200"> <p className="text-xs text-gray-500 uppercase">AVG RATINGS</p> <p className="text-xl font-semibold text-primary-dark mt-1">{(Math.random()*2+7.5).toFixed(2)}</p> <p className="text-[0.65rem] text-gray-400">*Matchminder</p> </div>
                    <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-200"> <p className="text-xs text-gray-500 uppercase">TOP PERFORMER</p> <div className="flex items-center justify-center mt-1 space-x-1"> <PlaceholderImage src={gamePerformanceTopPlayer.imageSrc} alt={`Portrait of ${gamePerformanceTopPlayer.name}`} className="w-5 h-5 rounded-full" isPlayerPortrait uniqueKey={`top-performer-avatar-${gamePerformanceTopPlayer.name}`}/> <p className="text-xs font-medium text-primary-dark">{gamePerformanceTopPlayer.name}</p> </div> </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 lg:space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80 p-5 sm:p-6 md:p- shrunk-0">
                <h3 className="text-lg sm:text-xl text-center font-bold text-black uppercase mb-4">Team Formations</h3>
                <div className="overflow-x-auto max-h-[420px]">
                  <table className="w-full min-w-[450px] text-sm">
                    <thead className="bg-primary-dark bg-opacity-[0.96] text-white sticky top-0 z-10"><tr> <th className="py-2.5 px-2 font-semibold text-left">Formations</th> <th className="py-2.5 px-2 font-semibold text-center">Win Rate</th> <th className="py-2.5 px-2 font-semibold text-center">Goals Scored</th> <th className="py-2.5 px-2 font-semibold text-center">Goals Conceded</th></tr></thead>
                    <tbody className="text-gray-700">
                      {teamFormationsData.map((f) => ( <tr key={f.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-100 cursor-pointer" onClick={() => handleFormationSelect(f.id)}> <td className="py-3 px-2 font-semibold text-sm">{f.name}</td> <td className="py-3 px-2 text-center font-medium text-sm">{f.winRate}</td> <td className="py-3 px-2 text-center font-medium text-sm">{f.goalsScored}</td> <td className="py-3 px-2 text-center font-medium text-sm">{f.goalsConceded}</td></tr>))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80 p-5 sm:p-6 md:p-8 shrunk-0">
                <h3 className="text-lg sm:text-xl text-center font-bold text-black uppercase mb-4">Set Pieces</h3>
                <div className="overflow-x-auto max-h-[262px]">
                  <table className="w-full min-w-[450px] text-sm">
                    <thead className="bg-primary-dark bg-opacity-[0.96] text-white sticky top-0 z-10"><tr> <th className="py-2.5 px-2 font-semibold text-left">Type</th> <th className="py-2.5 px-2 font-semibold text-center">Attempts</th> <th className="py-2.5 px-2 font-semibold text-center">Scored</th> <th className="py-2.5 px-2 font-semibold text-center">Success Rate</th></tr></thead>
                    <tbody className="text-gray-700">
                      {setPieces.map((sp, index) => ( <tr key={index} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/70 cursor-pointer" onClick={() => alert(`Details for ${sp.type}`)}> <td className="py-3 px-2 font-semibold text-sm">{sp.type}</td> <td className="py-3 px-2 text-center font-medium text-sm">{sp.attempts}</td> <td className="py-3 px-2 text-center font-medium text-sm">{sp.scored}</td> <td className="py-3 px-2 text-center font-medium text-sm">{sp.successRate}</td></tr>))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80 overflow-hidden">
            <div className="bg-primary-dark bg-opacity-[0.96] p-3.5 text-center"> <h3 className="text-lg sm:text-xl font-bold text-white uppercase">Tactical Insights</h3></div>
            <div className="p-5 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"> <div> <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center"><Shield className="w-5 h-5 mr-2 text-blue-600"/>Defensive Strategy:</h4> <p className="text-sm text-gray-600 leading-relaxed">We maintain a solid backline, compact shape, and discipline positioning. Key elements includes zonal marking, pressing the ball, and quick recovery. This strategy minimizes space for opponents, reduces scoring opportunities, and allows effective counter-attacks.</p> </div> <div> <h4 className="text-md font-semibold text-gray-800 mb-2 flex items-center"><Repeat className="w-5 h-5 mr-2 text-green-600"/>Passing Style:</h4> <p className="text-sm text-gray-600 leading-relaxed">A quick accurate ball movement to maintain possession and control the game’s tempo. Key elements include, short, precise passes, off-the-ball movement, and creating passing triangles. This style breaks down defenses, creates scoring opportunities, and minimizes turnovers.</p> </div> </div>
            <div className="bg-primary-dark bg-opacity-[0.96] p-3.5 text-center mt-4"> <h3 className="text-lg sm:text-xl font-bold text-white uppercase">Match Analysis</h3></div>
            <div className="p-5 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {initialMatchAnalysisData.map((item, index) => ( <div key={item.id} className="bg-gray-50/70 p-3.5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => alert(`Analysis: ${item.text}`)}> <PlaceholderImage src={item.imageSrc} alt={`Match analysis image ${index + 1}`} className="w-full h-32 rounded-md mb-2.5" uniqueKey={`matchanalysis-${item.id}`} /> <p className="text-xs sm:text-sm text-gray-700 leading-snug mb-1.5 line-clamp-4">{item.text}</p> <p className="text-[0.7rem] text-gray-500">{item.date}</p> </div> ))}
            </div>
          </div>
        </div>

        <div className="xl:w-96 flex-shrink-0 space-y-6 lg:space-y-8">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80 overflow-hidden">
            <div className="h-32 bg-cover bg-center relative"> <PlaceholderImage src={URL_Tactics_PlayerPerf_Header_BG} alt="Performance Header" className="w-full h-full" isBanner uniqueKey="playerPerfHeaderTacticsPage"/> <div className="absolute inset-0 bg-primary-dark bg-opacity-80 flex items-center justify-center p-4"> <h3 className="text-xl font-bold text-white text-center uppercase tracking-wider">Player Performance Metrics</h3></div> </div>
            <div className="p-3 sm:p-4 max-h-[calc(6*3.5rem)] overflow-y-auto divide-y divide-gray-200/70">
              {playerPerformance.map((player) => ( <div key={player.id} className="py-2.5 px-1.5 hover:bg-gray-50/70 rounded-md cursor-pointer" onClick={() => alert(`Player: ${player.name}`)}> <div className="flex justify-between items-center text-sm"> <span className="font-medium text-gray-700 w-2/5 truncate pr-2">{player.name}</span> <div className="flex justify-around items-center text-center w-3/5"> <div className="w-1/3"> <span className="text-xs text-gray-500 block">Goals</span> <span className="font-semibold text-gray-800">{player.goals}</span> </div> <div className="w-1/3"> <span className="text-xs text-gray-500 block">Assists</span> <span className="font-semibold text-gray-800">{player.assists}</span> </div> <div className="w-1/3"> <span className="text-xs text-gray-500 block">Pass Acc.</span> <span className="font-semibold text-gray-800">{player.passAccuracy}</span> </div> </div> </div> </div> ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80 overflow-hidden sticky top-24">
            <div className="h-20 bg-cover bg-center relative"> <PlaceholderImage src={URL_Tactics_Formation_Header_BG} alt="Team Formation Header" className="w-full h-full" isBanner uniqueKey={`teamFormationHeader-sidebar`}/> <div className="absolute inset-0 bg-primary-dark bg-opacity-80 flex items-center justify-center p-4"> <h3 className="text-xl font-bold text-white uppercase tracking-wider">Team Formation</h3></div></div>
            <div className="p-3 sm:p-4">
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-lg overflow-hidden">
                <SvgFootballPitch players={currentSidebarFormation.players} onPlayerClick={(pos) => alert(`Clicked on ${pos} in sidebar formation`)} />
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200/80 text-xs text-gray-700 space-y-1.5">
                <div className="flex justify-between"> <span className="font-semibold">Current:</span> <span>{currentSidebarFormation.name}</span> </div>
                <div className="flex justify-between"> <span className="font-semibold">Most Used:</span> <span>{currentSidebarFormation.mostUsed}</span> </div>
                <div className="flex justify-between"> <span className="font-semibold">Last Match:</span> <span>{currentSidebarFormation.lastMatch}</span> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TacticsPage;