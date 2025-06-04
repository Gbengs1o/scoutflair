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
  RefreshCw, 
} from 'lucide-react';
import clsx from 'clsx';

// --- Image URLs for Matches Page ---
const URL_Matches_Upcoming_Player_Silhouette = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_unsplash_t8vRE7QpM2M_531_2621.png';
const URL_Matches_DeltaFC_Logo = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamo_Zagreb_1_507_1762.png';
const URL_Matches_RhinosFC_Logo = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Kashima_Antlers_1_531_2618.png';
const URL_Matches_Recent_JosshFC_Logo = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Club_Am_rica_1_531_2482.png';
const URL_Matches_Recent_DriftSC_Logo = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamarca_1_531_2487.png';
const URL_Matches_Recent_PlayerPortrait_A = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2385_521_1841.png';
const URL_Matches_Recent_PlayerPortrait_B = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2385_521_1831.png';
const URL_Matches_Analysis_BG_1 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002297_531_1819.png';
const URL_Matches_Analysis_BG_2 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_unsplash_t8vRE7QpM2M_531_2621.png';

// --- Utility Functions ---
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- PlaceholderImage Component ---
const PlaceholderImage = ({ src, alt, className, isTeamLogo = false, teamInitial = 'P', isPlayerPortrait = false, isBanner = false, uniqueKey }) => {
  let imageToRender = src; let unoptimizedImage = false;
  const generateSeed = () => { if (uniqueKey) return String(uniqueKey).replace(/[^a-zA-Z0-9-_]/g, ''); if (alt) return alt.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase(); return 'default-placeholder-seed'; };
  if (!src) {
    const seed = generateSeed();
    if (isTeamLogo) { const bgColor = "#e2e8f0"; const textColor = "#475569"; imageToRender = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%22%2064%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2232%22%20fill%3D%22${encodeURIComponent(bgColor)}%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22central%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20font-weight%3D%22bold%22%20fill%3D%22${encodeURIComponent(textColor)}%22%3E${teamInitial.toUpperCase()}%3C%2Ftext%3E%3C%2Fsvg%3E`; unoptimizedImage = true; }
    else if (isPlayerPortrait) { imageToRender = `https://via.placeholder.com/100/CCCCCC/808080?Text=P&seed=${seed}`; } else if (isBanner) { imageToRender = `https://via.placeholder.com/1200x300/CCCCCC/808080?Text=Banner&seed=${seed}`; } else { imageToRender = `https://via.placeholder.com/300x200/CCCCCC/808080?Text=Img&seed=${seed}`; }
  } else if (typeof src === 'string' && src.startsWith('data:image/svg+xml')) { unoptimizedImage = true; }
  if (!imageToRender) { imageToRender = `https://via.placeholder.com/200/CCCCCC/808080?Text=Error&seed=errorFallback`; unoptimizedImage = true; }
  return ( <div className={clsx("relative bg-gray-300 overflow-hidden", className)}> <Image src={imageToRender} alt={alt || 'Placeholder image'} layout="fill" objectFit="cover" unoptimized={unoptimizedImage} priority={isBanner} onError={(e) => { const errorSvg = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23f3f4f6%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2210px%22%20fill%3D%22%239ca3af%22%3ENo%20Img%3C%2Ftext%3E%3C%2Fsvg%3E`; e.currentTarget.srcset = errorSvg; e.currentTarget.src = errorSvg; }}/> </div> );
};

// --- SVG Football Pitch Component ---
const SvgFootballPitch = ({ players = [], onPlayerClick, className = "" }) => {
  const pitchWidth = 300; const pitchHeight = 450; 
  const playerMarkerRadius = 10;
  return (
    <svg viewBox={`0 0 ${pitchWidth} ${pitchHeight}`} className={clsx("w-full h-full bg-green-700 rounded-lg border-2 border-white/30 shadow-inner", className)}> {/* Darker green pitch */}
      <rect x="5" y="5" width={pitchWidth - 10} height={pitchHeight - 10} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" /> {/* Thicker, less prominent lines */}
      <line x1={pitchWidth / 2} y1="5" x2={pitchWidth / 2} y2={pitchHeight - 5} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <circle cx={pitchWidth / 2} cy={pitchHeight / 2} r="40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <circle cx={pitchWidth / 2} cy={pitchHeight / 2} r="2" fill="rgba(255,255,255,0.5)" />
      <rect x={pitchWidth * 0.15} y="5" width={pitchWidth * 0.7} height={pitchHeight * 0.18} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <rect x={pitchWidth * 0.3} y="5" width={pitchWidth * 0.4} height={pitchHeight * 0.08} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <circle cx={pitchWidth/2} cy={pitchHeight * 0.12} r="1.5" fill="rgba(255,255,255,0.5)"/>
      <rect x={pitchWidth * 0.15} y={pitchHeight - 5 - (pitchHeight * 0.18)} width={pitchWidth * 0.7} height={pitchHeight * 0.18} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <rect x={pitchWidth * 0.3} y={pitchHeight - 5 - (pitchHeight * 0.08)} width={pitchWidth * 0.4} height={pitchHeight * 0.08} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <circle cx={pitchWidth/2} cy={pitchHeight - (pitchHeight * 0.12)} r="1.5" fill="rgba(255,255,255,0.5)"/>

      {players.map(player => (
        <g key={player.id || player.pos} transform={`translate(${(player.x / 100) * pitchWidth}, ${(player.y / 100) * pitchHeight})`} className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => onPlayerClick && onPlayerClick(player.pos)}>
          <circle r={playerMarkerRadius} fill="#DC2626" stroke="rgba(255,255,255,0.9)" strokeWidth="2" /> {/* Brighter red, thicker white border */}
          <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize={playerMarkerRadius * 0.7} fontWeight="bold" fill="white"  style={{ paintOrder: 'stroke', stroke: '#00000040', strokeWidth: '0.5px' }}>{player.pos}</text>
        </g>
      ))}
    </svg>
  );
};

// --- Initial Data Definitions ---
const initialUpcomingMatchData = { title: "UPCOMING MATCH", date: "Fri, 12 June, 2024", league: "Uptown ScoutFlair League", team1: { name: "Deltas FC", logoSrc: URL_Matches_DeltaFC_Logo, initial: "D" }, time: "17:00", team2: { name: "Rhinos FC", logoSrc: URL_Matches_RhinosFC_Logo, initial: "R" }, playerImageSrc: URL_Matches_Upcoming_Player_Silhouette, };
const masterRecentMatchesData = [ { id: 1, matchday: "Matchday 17 of 34", date: "2023-09-20", team1: { name: "Jossh FC", logoSrc: URL_Matches_Recent_JosshFC_Logo, initial: "J" }, team2: { name: "Drift SC", logoSrc: URL_Matches_Recent_DriftSC_Logo, initial: "D" }, score: "2 - 4", player: { name: "Samuel Burke", team: "Drift SC", rating: 8.6, imageSrc: URL_Matches_Recent_PlayerPortrait_A } }, { id: 2, matchday: "Matchday 16 of 34", date: "2023-09-13", team1: { name: "Alpha Kings", logoSrc: null, initial: "A" }, team2: { name: "Beta Warriors", logoSrc: URL_Matches_Recent_DriftSC_Logo, initial: "B" }, score: "1 - 1", player: { name: "Elena Rodriguez", team: "Alpha Kings", rating: 7.9, imageSrc: URL_Matches_Recent_PlayerPortrait_B } }, { id: 3, matchday: "Matchday 15 of 34", date: "2023-08-28", team1: { name: "Gamma City", logoSrc: URL_Matches_Recent_JosshFC_Logo, initial: "G" }, team2: { name: "Delta Utd", logoSrc: null, initial: "D" }, score: "3 - 0", player: { name: "Kenji Tanaka", team: "Gamma City", rating: 9.1, imageSrc: URL_Matches_Recent_PlayerPortrait_A } }, { id: 4, matchday: "Matchday 14 of 34", date: "2023-08-21", team1: { name: "Zeta Rovers", logoSrc: URL_Matches_Recent_JosshFC_Logo, initial: "Z" }, team2: { name: "Omega FC", logoSrc: URL_Matches_Recent_DriftSC_Logo, initial: "O" }, score: "0 - 2", player: { name: "Chloe Davis", team: "Omega FC", rating: 8.2, imageSrc: URL_Matches_Recent_PlayerPortrait_B } }, { id: 5, matchday: "Matchday 13 of 34", date: "2023-10-01", team1: { name: "Sigma Athletic", logoSrc: URL_Matches_Recent_JosshFC_Logo, initial: "S" }, team2: { name: "Kappa United", logoSrc: URL_Matches_Recent_DriftSC_Logo, initial: "K" }, score: "2 - 2", player: { name: "Liam Miller", team: "Kappa United", rating: 7.5, imageSrc: URL_Matches_Recent_PlayerPortrait_A } }, { id: 6, matchday: "Matchday 12 of 34", date: "2023-10-08", team1: { name: "Nova FC", logoSrc: null, initial: "N" }, team2: { name: "Orion Stars", logoSrc: URL_Matches_Recent_DriftSC_Logo, initial: "O" }, score: "1 - 0", player: { name: "Sofia Chen", team: "Nova FC", rating: 8.8, imageSrc: URL_Matches_Recent_PlayerPortrait_B } }, ];
const masterPlayerPerformanceData = [ { id: 'pp1', name: 'M. Rashford', goals: 12, assists: 5, passAccuracy: '82%' }, { id: 'pp2', name: 'B. Fernandes', goals: 8, assists: 15, passAccuracy: '78%' }, { id: 'pp3', name: 'L. Caicedo', goals: 10, assists: 7, passAccuracy: '85%' }, { id: 'pp4', name: 'K. De Bruyne', goals: 6, assists: 18, passAccuracy: '88%' }, { id: 'pp5', name: 'S. Smith', goals: 15, assists: 3, passAccuracy: '75%' }, { id: 'pp6', name: 'A. Morgan', goals: 11, assists: 6, passAccuracy: '80%' }, { id: 'pp7', name: 'J. Bellingham', goals: 9, assists: 9, passAccuracy: '90%' }, ];
const PREDEFINED_FORMATIONS = {
    "4-3-3": { players: [ { id: 'tfp_gk_433', pos: 'GK', x: 50, y: 90 }, { id: 'tfp_rb_433', pos: 'RB', x: 85, y: 75 }, { id: 'tfp_rcb_433', pos: 'CB', x: 65, y: 78 }, { id: 'tfp_lcb_433', pos: 'CB', x: 35, y: 78 }, { id: 'tfp_lb_433', pos: 'LB', x: 15, y: 75 }, { id: 'tfp_rcm_433', pos: 'CM', x: 70, y: 50 }, { id: 'tfp_cm_433', pos: 'CM', x: 50, y: 55 }, { id: 'tfp_lcm_433', pos: 'CM', x: 30, y: 50 }, { id: 'tfp_rw_433', pos: 'RW', x: 80, y: 25 }, { id: 'tfp_st_433', pos: 'ST', x: 50, y: 20 }, { id: 'tfp_lw_433', pos: 'LW', x: 20, y: 25 }, ] },
    "4-4-2": { players: [ { id: 'tfp_gk_442', pos: 'GK', x: 50, y: 90 }, { id: 'tfp_rb_442', pos: 'RB', x: 88, y: 70 }, { id: 'tfp_rcb_442', pos: 'CB', x: 63, y: 72 }, { id: 'tfp_lcb_442', pos: 'CB', x: 37, y: 72 }, { id: 'tfp_lb_442', pos: 'LB', x: 12, y: 70 }, { id: 'tfp_rm_442', pos: 'RM', x: 85, y: 45 }, { id: 'tfp_rcm_442', pos: 'CM', x: 60, y: 50 }, { id: 'tfp_lcm_442', pos: 'CM', x: 40, y: 50 }, { id: 'tfp_lm_442', pos: 'LM', x: 15, y: 45 }, { id: 'tfp_rs_442', pos: 'ST', x: 58, y: 20 }, { id: 'tfp_ls_442', pos: 'ST', x: 42, y: 20 }, ] },
    "3-5-2": { players: [ { id: 'tfp_gk_352', pos: 'GK', x: 50, y: 90 }, { id: 'tfp_rcb_352', pos: 'CB', x: 70, y: 75 }, { id: 'tfp_cb_352', pos: 'CB', x: 50, y: 78 }, { id: 'tfp_lcb_352', pos: 'CB', x: 30, y: 75 }, { id: 'tfp_rwb_352', pos: 'RWB', x: 90, y: 50 }, { id: 'tfp_rcm_352', pos: 'CM', x: 65, y: 50 }, { id: 'tfp_dm_352', pos: 'DM', x: 50, y: 55 }, { id: 'tfp_lcm_352', pos: 'CM', x: 35, y: 50 }, { id: 'tfp_lwb_352', pos: 'LWB', x: 10, y: 50 }, { id: 'tfp_rs_352', pos: 'ST', x: 60, y: 20 }, { id: 'tfp_ls_352', pos: 'ST', x: 40, y: 20 }, ] },
};
const FORMATION_KEYS = Object.keys(PREDEFINED_FORMATIONS);
const initialCurrentTeamFormationData = { mostUsed: "4-4-2 (Win Rate: 60%)", lastMatch: "4-3-3 (Win)", players: PREDEFINED_FORMATIONS["4-4-2"].players };
const initialMatchAnalysisData = [ { id: 'ma1', imageSrc: URL_Matches_Analysis_BG_1, text: "Last Match (vs. ARISE FC): High pressing forced turnovers, created goal-scoring opportunities.", date: "21-05-2024" }, { id: 'ma2', imageSrc: URL_Matches_Analysis_BG_2, text: "Key Player Focus: Midfield pivot crucial for maintaining possession and dictating tempo.", date: "18-05-2024" }, { id: 'ma3', imageSrc: URL_Matches_Analysis_BG_1, text: "Set Piece Analysis: Corner kick routines leading to increased headed goal attempts.", date: "15-05-2024" }, ];
const MONTHS = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const MatchesPage = () => {
  const [upcomingMatch, setUpcomingMatch] = useState(initialUpcomingMatchData);
  const [displayedRecentMatches, setDisplayedRecentMatches] = useState(masterRecentMatchesData.slice(0,6));
  const [matchFilterConfig, setMatchFilterConfig] = useState({ month: "All", year: 2023, sortKey: 'date', sortOrder: 'desc'});
  const [displayedPlayerPerformance, setDisplayedPlayerPerformance] = useState(shuffleArray(masterPlayerPerformanceData).slice(0, 5)); // Corrected useState
  const [currentTeamFormation, setCurrentTeamFormation] = useState(initialCurrentTeamFormationData);
  const [displayedMatchAnalysis, setDisplayedMatchAnalysis] = useState(initialMatchAnalysisData);

  const randomizePageData = useCallback(() => {
    const randomTeam1 = getRandomElement(masterRecentMatchesData).team1;
    const randomTeam2 = getRandomElement(masterRecentMatchesData).team2;
    const randomDate = new Date(Date.now() + getRandomInt(1, 30) * 24 * 60 * 60 * 1000);
    setUpcomingMatch(prev => ({ ...prev, date: randomDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }), team1: { ...randomTeam1, logoSrc: randomTeam1.logoSrc || URL_Matches_DeltaFC_Logo }, team2: { ...randomTeam2, logoSrc: randomTeam2.logoSrc || URL_Matches_RhinosFC_Logo }, time: `${getRandomInt(12, 20)}:${getRandomInt(0,3)*15 === 0 ? '00' : getRandomInt(0,3)*15}` }));
    
    // Randomize Recent Matches but keep filter applied
    let filteredMaster = [...masterRecentMatchesData];
     if (matchFilterConfig.month !== "All") {
      const monthIndex = MONTHS.indexOf(matchFilterConfig.month);
      filteredMaster = filteredMaster.filter(match => {
        const matchDateParts = match.date.split("-");
        const matchDate = new Date(parseInt(matchDateParts[0]), parseInt(matchDateParts[1]) - 1, parseInt(matchDateParts[2]));
        return matchDate.getFullYear() === matchFilterConfig.year && (matchDate.getMonth() + 1) === monthIndex;
      });
    }
    setDisplayedRecentMatches(shuffleArray(filteredMaster).slice(0, getRandomInt(3, Math.min(6, filteredMaster.length))));


    setDisplayedPlayerPerformance(shuffleArray(masterPlayerPerformanceData).slice(0, getRandomInt(4, masterPlayerPerformanceData.length)));
    const randomFormationKey = getRandomElement(FORMATION_KEYS);
    setCurrentTeamFormation({ mostUsed: `${randomFormationKey} (Win Rate: ${getRandomInt(40, 75)}%)`, lastMatch: `${getRandomElement(FORMATION_KEYS)} (${getRandomElement(['Win', 'Loss', 'Draw'])})`, players: PREDEFINED_FORMATIONS[randomFormationKey].players });
    setDisplayedMatchAnalysis(shuffleArray(initialMatchAnalysisData).slice(0, getRandomInt(2,3)));
  }, [matchFilterConfig]); // Added matchFilterConfig as dependency

  useEffect(() => {
    let filteredMatches = [...masterRecentMatchesData];
    if (matchFilterConfig.month !== "All") {
      const monthIndex = MONTHS.indexOf(matchFilterConfig.month);
      filteredMatches = filteredMatches.filter(match => {
        const matchDateParts = match.date.split("-");
        const matchDate = new Date(parseInt(matchDateParts[0]), parseInt(matchDateParts[1]) - 1, parseInt(matchDateParts[2]));
        return matchDate.getFullYear() === matchFilterConfig.year && (matchDate.getMonth() + 1) === monthIndex;
      });
    }
    filteredMatches.sort((a, b) => {
      let valA = a.id, valB = b.id; 
      if (matchFilterConfig.sortKey === 'date') { 
        const dateAParts = a.date.split("-"); const dateBParts = b.date.split("-");
        valA = new Date(parseInt(dateAParts[0]), parseInt(dateAParts[1]) - 1, parseInt(dateAParts[2])); 
        valB = new Date(parseInt(dateBParts[0]), parseInt(dateBParts[1]) - 1, parseInt(dateBParts[2])); 
      }
      else if (matchFilterConfig.sortKey === 'rating') { valA = a.player.rating; valB = b.player.rating; }
      if (valA < valB) return matchFilterConfig.sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return matchFilterConfig.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setDisplayedRecentMatches(filteredMatches.slice(0,6));
  }, [matchFilterConfig]);

  const handleFilterChange = (type) => {
    if (type === 'month') { setMatchFilterConfig(prev => ({...prev, month: MONTHS[(MONTHS.indexOf(prev.month) + 1) % MONTHS.length]})); } 
    else if (type === 'year') { setMatchFilterConfig(prev => ({...prev, year: prev.year === 2023 ? 2022 : 2023})); }
  };
  const handleSortChange = () => { setMatchFilterConfig(prev => ({ ...prev, sortKey: prev.sortKey === 'date' ? 'rating' : 'date', sortOrder: prev.sortOrder === 'desc' ? 'asc' : 'desc' })); };
  const handleViewAllRecentMatches = () => { setMatchFilterConfig({ month: "All", year: 2023, sortKey: 'date', sortOrder: 'desc' }); setDisplayedRecentMatches(masterRecentMatchesData); alert("Showing all recent matches."); };
  const handleFormationPlayerClick = (playerPos) => alert(`Clicked on ${playerPos} in formation display.`);
  const handleRecentMatchCardClick = (match) => {
    // alert(`Viewing details for match ID: ${match.id}. Page data will now randomize.`);
    randomizePageData();
  }


  return (
    <div className="space-y-6 lg:space-y-8 pb-10">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
        <div className="flex-grow xl:w-[calc(100%-24rem-2rem)] space-y-6 lg:space-y-8">
          <div className="relative w-full h-60 rounded-2xl shadow-lg overflow-hidden group bg-primary-dark">
            <div className="relative z-10 h-full p-5 sm:p-7 flex flex-col justify-between md:flex-row md:items-end">
              <div className="text-white space-y-3 md:space-y-6">
                <div> <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide"> {upcomingMatch.title} </h2> <p className="text-base sm:text-lg opacity-90"> {upcomingMatch.date} <span className="opacity-70 mx-1">|</span> {upcomingMatch.league} </p> </div>
                <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
                  <div className="flex items-center space-x-2 sm:space-x-3"> <span className="text-xl sm:text-2xl font-semibold">{upcomingMatch.team1.name}</span> <PlaceholderImage src={upcomingMatch.team1.logoSrc} alt={`${upcomingMatch.team1.name} logo`} className="w-6 h-6 sm:w-7 sm:h-7" isTeamLogo teamInitial={upcomingMatch.team1.initial} uniqueKey={`teamlogo-upcoming-${upcomingMatch.team1.name}`}/> </div>
                  <div className="bg-black/80 text-white px-3 py-1.5 rounded-md text-sm sm:text-base font-bold shadow-md"> {upcomingMatch.time} </div>
                  <div className="flex items-center space-x-2 sm:space-x-3"> <PlaceholderImage src={upcomingMatch.team2.logoSrc} alt={`${upcomingMatch.team2.name} logo`} className="w-6 h-6 sm:w-7 sm:h-7" isTeamLogo teamInitial={upcomingMatch.team2.initial} uniqueKey={`teamlogo-upcoming-${upcomingMatch.team2.name}`}/> <span className="text-xl sm:text-2xl font-semibold">{upcomingMatch.team2.name}</span> </div>
                </div>
              </div>
            </div>
            {upcomingMatch.playerImageSrc && ( <div className="hidden md:block absolute right-0 bottom-0 w-[38%] h-full overflow-hidden rounded-r-lg pointer-events-none"> <PlaceholderImage src={upcomingMatch.playerImageSrc} alt="Player silhouette" className="w-full h-full opacity-50 md:opacity-70 object-contain object-bottom" uniqueKey={`matchPlayerSilhouette-${upcomingMatch.playerImageSrc}`} isBanner /> </div> )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80 p-5 sm:p-6 md:p-8">
            <div className="flex flex-wrap gap-3 items-center mb-6">
                <button onClick={() => handleFilterChange('month')} className="flex items-center bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full shadow-sm text-sm border border-gray-300/70 transition-colors duration-150"> <Filter className="w-3.5 h-3.5 mr-2 text-gray-500" /> {matchFilterConfig.month} </button>
                <button onClick={handleSortChange} className="flex items-center bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full shadow-sm text-sm border border-gray-300/70 transition-colors duration-150"> <ArrowDownUp className="w-3.5 h-3.5 mr-2 text-gray-500" /> Sort ({matchFilterConfig.sortKey} {matchFilterConfig.sortOrder}) </button>
                <button onClick={() => handleFilterChange('year')} className="flex items-center bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full shadow-sm text-sm border border-gray-300/70 transition-colors duration-150"> <CalendarDays className="w-3.5 h-3.5 mr-2 text-gray-500" /> {matchFilterConfig.year} <ChevronDown className="w-3 h-3 ml-1.5 text-gray-500"/> </button>
                <button onClick={randomizePageData} className="flex items-center bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-full shadow-sm text-sm border border-blue-600 transition-colors duration-150"> <RefreshCw className="w-3.5 h-3.5 mr-2" /> Randomize All </button>
            </div>
            <div className="flex justify-between items-center mb-5"> <h3 className="text-lg sm:text-xl font-bold text-black uppercase">RECENT MATCH RESULTS</h3> <button onClick={handleViewAllRecentMatches} className="flex items-center text-sm text-gray-700 hover:text-primary-dark"> View All <ChevronRight className="w-4 h-4 ml-1" /> </button> </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {displayedRecentMatches.map(match => (
                <div 
                    key={match.id} 
                    className="bg-white p-3.5 rounded-lg shadow-md border border-gray-200/70 hover:shadow-xl transition-shadow cursor-pointer" 
                    onClick={() => handleRecentMatchCardClick(match)} // Updated to call specific handler
                >
                  <p className="text-xs text-gray-500 mb-1.5">{match.matchday}</p>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex flex-col items-center text-center w-2/5"> <PlaceholderImage src={match.team1.logoSrc} alt={match.team1.name} className="w-9 h-9 sm:w-10 sm:h-10 mb-1" isTeamLogo teamInitial={match.team1.initial} uniqueKey={`matchCardTeam1-${match.id}-${match.team1.name}`} /> <span className="text-[0.8rem] font-medium text-gray-800 truncate w-full">{match.team1.name}</span> </div>
                    <div className="bg-black text-white px-2.5 py-1 rounded-md text-sm sm:text-base font-semibold"> {match.score} </div>
                    <div className="flex flex-col items-center text-center w-2/5"> <PlaceholderImage src={match.team2.logoSrc} alt={match.team2.name} className="w-9 h-9 sm:w-10 sm:h-10 mb-1" isTeamLogo teamInitial={match.team2.initial} uniqueKey={`matchCardTeam2-${match.id}-${match.team2.name}`} /> <span className="text-[0.8rem] font-medium text-gray-800 truncate w-full">{match.team2.name}</span> </div>
                  </div>
                  <div className="border-t border-gray-200/80 pt-2.5 flex items-center justify-between">
                    <div className="flex items-center"> <PlaceholderImage src={match.player.imageSrc} alt={match.player.name} className="w-6 h-6 rounded-full mr-1.5 border border-gray-300" isPlayerPortrait uniqueKey={`matchCardPlayer-${match.id}-${match.player.name}`} /> <div> <p className="text-[0.7rem] font-medium text-gray-700">{match.player.name}</p> <p className="text-[0.65rem] text-gray-500">{match.player.team}</p> </div> </div>
                    <div className="flex items-center bg-primary-dark text-white px-1.5 py-0.5 rounded-sm text-[0.7rem]"> <Star className="w-2.5 h-2.5 mr-0.5 text-yellow-400" fill="currentColor" /> <span>{match.player.rating}</span> </div>
                  </div>
                </div>
              ))}
              {displayedRecentMatches.length === 0 && <p className="col-span-full text-center text-gray-500 py-4">No matches for selected filters.</p>}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80 overflow-hidden">
            <div className="bg-primary-dark bg-opacity-[0.96] p-3.5 text-center"> <h3 className="text-lg sm:text-xl font-bold text-white uppercase">Match Analysis</h3></div>
            <div className="p-5 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {displayedMatchAnalysis.map((item, index) => (
                    <div key={item.id} className="bg-gray-50/70 p-3.5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => alert(`Analysis: ${item.text}`)}>
                        <PlaceholderImage src={item.imageSrc} alt={`Match analysis image ${index + 1}`} className="w-full h-36 sm:h-40 rounded-md mb-2.5" uniqueKey={`matchAnalysisImg-${item.id}`} />
                        <p className="text-xs sm:text-sm text-gray-700 leading-snug mb-1.5 line-clamp-3 sm:line-clamp-4">{item.text}</p>
                        <p className="text-[0.7rem] text-gray-500">{item.date}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>

        <div className="xl:w-96 flex-shrink-0 space-y-6 lg:space-y-8">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80 overflow-hidden">
            <div className="h-32 bg-primary-dark flex items-center justify-center p-4"> <h3 className="text-xl font-bold text-white text-center uppercase tracking-wider">Player Performance Metrics</h3> </div>
            <div className="p-3 sm:p-4 max-h-[calc(7*3.3rem)] overflow-y-auto divide-y divide-gray-200/70">
              {displayedPlayerPerformance.length > 0 ? displayedPlayerPerformance.map((player) => (
                <div key={player.id} className="py-2.5 px-1.5 hover:bg-gray-50/70 rounded-md cursor-pointer" onClick={() => alert(`Player: ${player.name}`)}>
                    <div className="flex justify-between items-center text-sm"> <span className="font-medium text-gray-700 w-2/5 truncate pr-2">{player.name}</span> <div className="flex justify-around items-center text-center w-3/5"> <div className="w-1/3"> <span className="text-xs text-gray-500 block">Goals</span> <span className="font-semibold text-gray-800">{player.goals}</span> </div> <div className="w-1/3"> <span className="text-xs text-gray-500 block">Assists</span> <span className="font-semibold text-gray-800">{player.assists}</span> </div> <div className="w-1/3"> <span className="text-xs text-gray-500 block">Pass Acc.</span> <span className="font-semibold text-gray-800">{player.passAccuracy}</span> </div> </div> </div>
                </div>
              )) : ( <p className="py-4 text-center text-gray-500 text-sm">No player performance data.</p> )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/80 overflow-hidden sticky top-24">
             <div className="h-20 bg-primary-dark flex items-center justify-center p-4"> <h3 className="text-xl font-bold text-white uppercase tracking-wider">Team Formation</h3></div>
            <div className="p-3 sm:p-4">
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-lg overflow-hidden"> {/* Adjusted aspect ratio */}
                 <SvgFootballPitch players={currentTeamFormation.players} onPlayerClick={handleFormationPlayerClick} />
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200/80 text-xs text-gray-700 space-y-1.5">
                <div className="flex justify-between"> <span className="font-semibold">Most Used:</span> <span>{currentTeamFormation.mostUsed || 'N/A'}</span> </div>
                <div className="flex justify-between"> <span className="font-semibold">Last Match:</span> <span>{currentTeamFormation.lastMatch || 'N/A'}</span> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .bg-primary-dark { background-color: #041931; } /* Define your primary dark color */
        .text-primary-dark { color: #041931; }
      `}</style>
    </div>
  );
};

export default MatchesPage;