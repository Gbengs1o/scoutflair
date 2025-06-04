"use client";

import Image from 'next/image';
import { ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import React, { useState, useMemo } from 'react';

// --- Image Asset Constants ---
const IMAGE_ASSETS = {
  GENERATED_STADIUM: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/Generated-Image-June-04-2025-2_44AM.jpeg',
  GENERATED_ACTION: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/Generated-Image-June-04-2025-2_41AM.jpeg',
  GENERATED_FANS: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/Generated-Image-June-04-2025-2_35AM.jpeg',
  GENERATED_PORTRAIT: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/Generated-Image-June-04-2025-1_43AM.jpeg',
  DINAMO_LOGO: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamo_Zagreb_1_354_4527.png',
  PLAYER_PORTRAIT_ELLIPSE: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2373_355_4578.png',
  NEWS_ITEM_FRAME: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000001962_353_4500.png',
  TOP_SCORER_BANNER_FRAME: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000001965_353_4516.png',
  PLAYER_SILHOUETTE: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_unsplash_t8vRE7QpM2M_352_2001.png',
  UPCOMING_BANNER_BG: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Upcoming_matches_banner_352_1950.png',
  DINAMARCA_LOGO: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Dinamarca_1_355_4591.png',
};

// --- New Player Portrait Images ---
const NEW_PLAYER_PORTRAIT_IMAGES = [
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2385_521_1868.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2384_521_1847.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2385_521_1877.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2384_521_1865.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2384_521_1856.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2384_521_1838.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2384_521_1828.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2385_521_1841.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1948.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1973.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1795.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1826.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1997.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1899.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_2095.png',
    'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1924.png',
    IMAGE_ASSETS.GENERATED_PORTRAIT,
    IMAGE_ASSETS.GENERATED_ACTION, // Can be used for dynamic player poses too
    IMAGE_ASSETS.PLAYER_PORTRAIT_ELLIPSE,
];

// --- Initial Static Data (can be fetched from API in real app) ---
const initialUpcomingMatchData = {
    title: "UPCOMING MATCH",
    date: "Fri, 12 June, 2024",
    league: "Uptown ScoutFlair League",
    team1: { name: "Deltas FC", logo: IMAGE_ASSETS.DINAMO_LOGO, initial: "D" },
    time: "17:00",
    team2: { name: "Rhinos FC", logo: IMAGE_ASSETS.DINAMARCA_LOGO, initial: "R" },
    playerImage: IMAGE_ASSETS.PLAYER_SILHOUETTE
};

const initialLeagueStandingsData = [
    { pos: 1, team: "Deltas FC", logo: IMAGE_ASSETS.DINAMO_LOGO, initial: "D", mp: 24, w: 20, d: 5, l: 7, gf: 67, ga: 24, pts: 65 },
    { pos: 2, team: "Warriors Utd", logo: IMAGE_ASSETS.DINAMARCA_LOGO, initial: "W", mp: 24, w: 18, d: 4, l: 2, gf: 55, ga: 18, pts: 60 },
    { pos: 3, team: "Lion Kings", logo: IMAGE_ASSETS.GENERATED_STADIUM, initial: "L", mp: 24, w: 17, d: 3, l: 4, gf: 50, ga: 20, pts: 58 },
    { pos: 4, team: "Rhinos FC", logo: IMAGE_ASSETS.DINAMARCA_LOGO, initial: "R", mp: 24, w: 15, d: 6, l: 3, gf: 48, ga: 22, pts: 55 },
    { pos: 5, team: "Eagles City", logo: IMAGE_ASSETS.GENERATED_ACTION, initial: "E", mp: 24, w: 14, d: 5, l: 5, gf: 45, ga: 25, pts: 50 },
    { pos: 6, team: "Panthers FC", logo: IMAGE_ASSETS.GENERATED_FANS, initial: "P", mp: 24, w: 13, d: 4, l: 7, gf: 40, ga: 30, pts: 46 },
];

const initialNewsItemsData = [
    { id: 1, title: "Golden Shoe 2023/2024 League’s Top Scorer Race Heats Up!", summary: "The competition is fierce this season as star strikers vie for the coveted Golden Shoe award...", image: IMAGE_ASSETS.NEWS_ITEM_FRAME },
    { id: 2, title: "Transfer Window Buzz: Major Signings Shake Up the League", summary: "Clubs are making bold moves in the transfer market, with several high-profile players changing teams...", image: IMAGE_ASSETS.GENERATED_STADIUM },
    { id: 3, title: "Youth Academy Spotlight: Future Stars Emerge", summary: "A promising young talent from our academy has made their senior debut, impressing fans and pundits alike...", image: IMAGE_ASSETS.GENERATED_ACTION },
    { id: 4, title: "Stadium Expansion Plans Unveiled for Next Season", summary: "The club announced ambitious plans to increase stadium capacity to meet growing fan demand...", image: IMAGE_ASSETS.GENERATED_FANS },
];

// --- Data Generation Helpers ---
const FIRST_NAMES = ["Liam", "Noah", "Olivia", "Emma", "Ava", "William", "James", "Oliver", "Benjamin", "Elijah", "Lucas", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn", "Owen", "Daniel", "Chloe", "Ella", "Jackson", "Aiden", "Sophia", "Isabella", "Mason", "Ethan", "Layla", "Zoe", "Mateo", "Sofia", "Leo", "David", "Aria", "Grace"];
const LAST_NAMES = ["Smith", "Jones", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King", "Wright", "Scott"];
const POSITIONS = ["Forward", "Midfielder", "Defender", "Goalkeeper"];

let playerImageCounter = 0;
const getNextPlayerImage = () => {
    const img = NEW_PLAYER_PORTRAIT_IMAGES[playerImageCounter];
    playerImageCounter = (playerImageCounter + 1) % NEW_PLAYER_PORTRAIT_IMAGES.length;
    return img;
};

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generatePlayerStats = () => {
    const statNames = ["Mentality", "Balance", "Composure", "Aggression", "Vision", "Passing", "Stamina", "Teamwork", "Finishing", "Speed", "Dribbling", "Strength", "Tackling", "Positioning", "Agility", "Jumping"];
    const selectedStats = [];
    const numStats = 4;
    const availableStats = [...statNames];
    for (let i = 0; i < numStats; i++) {
        if (availableStats.length === 0) break;
        const randomIndex = Math.floor(Math.random() * availableStats.length);
        selectedStats.push({ name: availableStats.splice(randomIndex, 1)[0], value: getRandomInt(55, 95) });
    }
    return selectedStats;
};

const generateAllPlayersData = (leagueClubsData) => {
    const allPlayers = [];
    const playersByClub = {};
    playerImageCounter = 0; // Reset for consistent generation if function is recalled

    leagueClubsData.forEach(club => {
        playersByClub[club.team] = [];
        const numPlayers = getRandomInt(5, 10); // Generate 5 to 10 players per club
        for (let i = 0; i < numPlayers; i++) {
            const position = getRandomElement(POSITIONS);
            let goals = 0;
            if (position === "Forward") goals = getRandomInt(5, 30);
            else if (position === "Midfielder") goals = getRandomInt(1, 15);
            else goals = getRandomInt(0, 3); // Defenders/GK

            const player = {
                name: `${getRandomElement(FIRST_NAMES)} ${getRandomElement(LAST_NAMES)}`,
                team: club.team,
                goals: goals,
                image: getNextPlayerImage(),
                teamLogo: club.logo,
                teamInitial: club.initial,
                age: getRandomInt(18, 36),
                position: position,
                stats: generatePlayerStats(),
            };
            allPlayers.push(player);
            playersByClub[club.team].push(player);
        }
    });
    return { allPlayers, playersByClub };
};


// --- Reusable UI Components ---
const PlaceholderImage = ({ src, alt, className, isTeamLogo = false, teamInitial = 'P', isPlayerPortrait = false, isBanner = false, objectFit = 'cover' }) => {
  let imageToRender = src;
  let unoptimizedImage = false;
  if (!src) {
    if (isTeamLogo) {
      const bgColor = "#e2e8f0"; const textColor = "#475569";
      imageToRender = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%2064%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2232%22%20fill%3D%22${encodeURIComponent(bgColor)}%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22central%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20font-weight%3D%22bold%22%20fill%3D%22${encodeURIComponent(textColor)}%22%3E${teamInitial.toUpperCase()}%3C%2Ftext%3E%3C%2Fsvg%3E`;
      unoptimizedImage = true;
    } else if (isPlayerPortrait) {
      imageToRender = `data:image/svg+xml;charset=UTF-8,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23cbd5e1" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="10px" fill="%2364748b">Portrait</text></svg>`;
      unoptimizedImage = true;
    } else if (isBanner) {
      imageToRender = `data:image/svg+xml;charset=UTF-8,%3Csvg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="400" fill="%23cbd5e1" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="30px" fill="%2364748b">Banner</text></svg>`;
      unoptimizedImage = true;
    } else {
      imageToRender = `data:image/svg+xml;charset=UTF-8,%3Csvg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="%23cbd5e1" /><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20px" fill="%2364748b">Image</text></svg>`;
      unoptimizedImage = true;
    }
  } else if (typeof src === 'string' && src.startsWith('data:image/svg+xml')) {
    unoptimizedImage = true;
  }
  if (!imageToRender) {
    imageToRender = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23f1f5f9%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2212px%22%20fill%3D%22%2394a3b8%22%3EError%3C%2Ftext%3E%3C%2Fsvg%3E`;
    unoptimizedImage = true;
  }
  return (
    <div className={clsx("relative bg-slate-200/50 overflow-hidden", className)}>
      <Image src={imageToRender} alt={alt} layout="fill" objectFit={objectFit} unoptimized={unoptimizedImage} priority={isBanner}
        onError={(e) => {
          const errorSvg = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23f1f5f9%22%2F%3E%3Cpath%20d%3D%22M25%2025%20L75%2075%20M75%2025%20L25%2075%22%20stroke%3D%22%23ef4444%22%20stroke-width%3D%224%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2210px%22%20fill%3D%22%23ef4444%22%3EError%3C%2Ftext%3E%3C%2Fsvg%3E`;
          e.currentTarget.srcset = errorSvg; e.currentTarget.src = errorSvg;
        }} />
    </div>);
};
const Card = ({ title, headerActions, children, className }) => (
  <div className={clsx("bg-white rounded-xl shadow-lg overflow-hidden", className)}>
    {(title || headerActions) && (
      <div className="flex justify-between items-center p-4 sm:p-5 border-b border-slate-200">
        {title && <h3 className="text-base sm:text-lg font-semibold text-slate-800 uppercase tracking-wider">{title}</h3>}
        {headerActions && <div>{headerActions}</div>}
      </div>)}
    <div className={clsx(!title && !headerActions ? "" : "p-4 sm:p-5")}>{children}</div>
  </div>);
const ActionButton = ({ children, ...props }) => (<button className="flex items-center text-xs sm:text-sm font-medium text-primary-dark hover:text-primary-dark/80 transition-colors" {...props}>{children}</button>);


const OverviewPage = () => {
  const [upcomingMatch, setUpcomingMatch] = useState(initialUpcomingMatchData);
  const [leagueStandings, setLeagueStandings] = useState(initialLeagueStandingsData);
  const [newsItems, setNewsItems] = useState(initialNewsItemsData);
  const [selectedLeagueYear, setSelectedLeagueYear] = useState("2023/2024");

  const { allPlayers: generatedPlayers, playersByClub: generatedPlayersByClub } = useMemo(
    () => generateAllPlayersData(initialLeagueStandingsData), 
    [initialLeagueStandingsData] // Dependency: regenerate if league data changes
  );

  const sortedAllPlayersByGoals = useMemo(() => 
    [...generatedPlayers].sort((a, b) => b.goals - a.goals), 
    [generatedPlayers]
  );
  
  const defaultMainScorer = useMemo(() => {
    if (sortedAllPlayersByGoals.length > 0) {
      const topPlayer = sortedAllPlayersByGoals[0];
      return { ...topPlayer, bannerImage: IMAGE_ASSETS.TOP_SCORER_BANNER_FRAME };
    }
    return { name: "N/A", team: "N/A", goals: 0, image: IMAGE_ASSETS.GENERATED_PORTRAIT, teamLogo: IMAGE_ASSETS.DINAMO_LOGO, teamInitial: "X", bannerImage: IMAGE_ASSETS.TOP_SCORER_BANNER_FRAME, age: 0, position: "N/A", stats: [] };
  }, [sortedAllPlayersByGoals]);

  const defaultTopScorersList = useMemo(() => 
    sortedAllPlayersByGoals.slice(1, 6), // Next 5 players
    [sortedAllPlayersByGoals]
  );

  const defaultScoutReports = useMemo(() => {
    const reports = [];
    const usedNames = new Set();
    if (defaultMainScorer && defaultMainScorer.name !== "N/A") {
        reports.push(defaultMainScorer);
        usedNames.add(defaultMainScorer.name);
    }
    const diversePlayers = generatedPlayers
        .filter(p => !usedNames.has(p.name))
        .sort(() => 0.5 - Math.random()); // Shuffle
    
    for(const player of diversePlayers){
        if(reports.length >= 3) break;
        if(!usedNames.has(player.name)){
            reports.push(player);
            usedNames.add(player.name);
        }
    }
    return reports.slice(0, 3).map(p => ({ name: p.name, age: p.age, position: p.position, image: p.image, stats: p.stats || generatePlayerStats() }));
  }, [generatedPlayers, defaultMainScorer]);

  const [currentMainTopScorer, setCurrentMainTopScorer] = useState(defaultMainScorer);
  const [currentTopScorersList, setCurrentTopScorersList] = useState(defaultTopScorersList);
  const [currentScoutReports, setCurrentScoutReports] = useState(defaultScoutReports);

  const handleLeagueStandingClubClick = (club) => {
    const clubName = club.team;
    const clubPlayersSorted = (generatedPlayersByClub[clubName] || [])
        .slice()
        .sort((a, b) => b.goals - a.goals);

    if (clubPlayersSorted.length > 0) {
      const bestClubScorer = clubPlayersSorted[0];
      setCurrentMainTopScorer({ ...bestClubScorer, bannerImage: IMAGE_ASSETS.TOP_SCORER_BANNER_FRAME });
      setCurrentTopScorersList(clubPlayersSorted.slice(0, 5)); // Show top N for the club
      handleTopScorerOrPlayerClick(bestClubScorer); // Update scout report for this player
    } else {
      setCurrentMainTopScorer({ name: `No Scorer Data for ${clubName}`, team: clubName, goals: 0, image: IMAGE_ASSETS.PLAYER_PORTRAIT_ELLIPSE, teamLogo: club.logo, teamInitial: club.initial, bannerImage: IMAGE_ASSETS.TOP_SCORER_BANNER_FRAME, age: 0, position: "N/A", stats: [] });
      setCurrentTopScorersList([]);
      setCurrentScoutReports([]);
    }
  };

  const handleTopScorerOrPlayerClick = (player) => {
    const reportForPlayer = { name: player.name, age: player.age, position: player.position, image: player.image, stats: player.stats || generatePlayerStats() };
    const otherPlayers = generatedPlayers
        .filter(p => p.name !== player.name && p.team !== player.team) // try to get diverse players
        .sort(() => 0.5 - Math.random()) 
        .slice(0, 2);
    
    const newScoutReports = [reportForPlayer, ...otherPlayers.map(p => ({ name: p.name, age: p.age, position: p.position, image: p.image, stats: p.stats || generatePlayerStats() }))].slice(0,3);
    setCurrentScoutReports(newScoutReports);
  };
  
  const handleNewsItemClick = (newsItem) => { alert(`Displaying news (simulated): ${newsItem.title}`); };
  const handleViewAllNews = () => { alert("Viewing all news articles (simulated)."); };
  const handleChangeLeagueYear = () => { alert(`Changing league year to ${selectedLeagueYear === "2023/2024" ? "2022/2023" : "2023/2024"} (simulated). This would fetch new data.`); setSelectedLeagueYear(prev => prev === "2023/2024" ? "2022/2023" : "2023/2024");};

  const handleViewAllTopScorers = () => {
    setCurrentMainTopScorer(defaultMainScorer);
    setCurrentTopScorersList(defaultTopScorersList);
    setCurrentScoutReports(defaultScoutReports);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="space-y-6 lg:space-y-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-grow lg:w-2/3 space-y-6 lg:space-y-8 xl:w-[calc(100%-25rem-2rem)]">
            <div className={clsx("relative w-full h-52 sm:h-60 md:h-64 rounded-2xl shadow-lg overflow-hidden group", "bg-white")}>
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[40%] sm:w-[45%] lg:w-[22rem] pointer-events-none z-0">
                 <PlaceholderImage src={upcomingMatch.playerImage} alt="Upcoming match player" className="w-full h-full opacity-60 group-hover:opacity-70 transition-opacity duration-300" objectFit="cover"/>
              </div>
              <div className="relative p-4 sm:p-5 md:p-6 flex flex-col justify-center h-full z-10">
                <div className="space-y-2 md:space-y-3">
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide text-primary-dark">{upcomingMatch.title}</h2>
                    <p className="text-xs sm:text-sm md:text-base text-slate-500">{upcomingMatch.date} <span className="opacity-70 mx-1">|</span> {upcomingMatch.league}</p>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                    <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 text-right">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-slate-700 truncate max-w-[70px] sm:max-w-[90px] md:max-w-[120px]">{upcomingMatch.team1.name}</span>
                      <PlaceholderImage src={upcomingMatch.team1.logo} alt={`${upcomingMatch.team1.name} logo`} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full shadow-sm border border-slate-200" isTeamLogo teamInitial={upcomingMatch.team1.initial}/>
                    </div>
                    <div className="bg-slate-100 text-primary-dark px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-xs sm:text-sm md:text-base font-bold shadow-sm border border-slate-200">{upcomingMatch.time}</div>
                    <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
                       <PlaceholderImage src={upcomingMatch.team2.logo} alt={`${upcomingMatch.team2.name} logo`} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full shadow-sm border border-slate-200" isTeamLogo teamInitial={upcomingMatch.team2.initial}/>
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-slate-700 truncate max-w-[70px] sm:max-w-[90px] md:max-w-[120px]">{upcomingMatch.team2.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Card title="LEAGUE STANDING" headerActions={<ActionButton onClick={handleChangeLeagueYear}>{selectedLeagueYear}<ChevronDown className="w-4 h-4 ml-1.5" /></ActionButton>}>
              <div className="overflow-x-auto -mx-4 sm:-mx-5 px-4 sm:px-5">
                <table className="w-full min-w-[600px] sm:min-w-[640px] text-sm">
                  <thead>
                    <tr className="text-left text-slate-600 border-b-2 border-slate-200">
                      <th className="py-3 px-1 sm:px-2 font-medium w-8 sm:w-10">#</th>
                      <th className="py-3 px-1 sm:px-2 font-medium">Club</th>
                      <th className="py-3 px-1 sm:px-2 font-medium text-center">MP</th>
                      <th className="py-3 px-1 sm:px-2 font-medium text-center">W</th>
                      <th className="py-3 px-1 sm:px-2 font-medium text-center">D</th>
                      <th className="py-3 px-1 sm:px-2 font-medium text-center">L</th>
                      <th className="py-3 px-1 sm:px-2 font-medium text-center hidden sm:table-cell">GF</th>
                      <th className="py-3 px-1 sm:px-2 font-medium text-center hidden sm:table-cell">GA</th>
                      <th className="py-3 px-1 sm:px-2 font-medium text-center">Pts</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {leagueStandings.map((row) => (
                      <tr key={row.pos} onClick={() => handleLeagueStandingClubClick(row)} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-100 transition-colors duration-150 cursor-pointer">
                        <td className="py-3 sm:py-3.5 px-1 sm:px-2 font-semibold text-slate-500">{row.pos}.</td>
                        <td className="py-3 sm:py-3.5 px-1 sm:px-2 flex items-center">
                          <PlaceholderImage src={row.logo} alt={`${row.team} logo`} className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 rounded-full flex-shrink-0" isTeamLogo teamInitial={row.initial} />
                          <span className="text-xs sm:text-sm md:text-base font-medium text-slate-800 truncate">{row.team}</span>
                        </td>
                        <td className="py-3 sm:py-3.5 px-1 sm:px-2 text-center">{row.mp}</td>
                        <td className="py-3 sm:py-3.5 px-1 sm:px-2 text-center">{row.w}</td>
                        <td className="py-3 sm:py-3.5 px-1 sm:px-2 text-center">{row.d}</td>
                        <td className="py-3 sm:py-3.5 px-1 sm:px-2 text-center">{row.l}</td>
                        <td className="py-3 sm:py-3.5 px-1 sm:px-2 text-center hidden sm:table-cell">{row.gf}</td>
                        <td className="py-3 sm:py-3.5 px-1 sm:px-2 text-center hidden sm:table-cell">{row.ga}</td>
                        <td className="py-3 sm:py-3.5 px-1 sm:px-2 text-center font-bold text-primary-dark">{row.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card title="SCOUT REPORT">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                {currentScoutReports.length > 0 ? currentScoutReports.map((report, index) => (
                  <div key={report.name + index} className="bg-slate-50/70 p-3 sm:p-4 rounded-lg border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col items-center text-center">
                    <PlaceholderImage src={report.image} alt={`Portrait of ${report.name}`} className="w-14 h-14 sm:w-16 md:w-20 md:h-20 rounded-full mb-2 sm:mb-3 object-cover border-2 border-white shadow-md" isPlayerPortrait/>
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-primary-dark truncate w-full px-1">{report.name}</h4>
                    <p className="text-xs sm:text-sm text-slate-600">{report.age} yrs • {report.position}</p>
                    <div className="w-full space-y-1 sm:space-y-1.5 text-xs sm:text-sm mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-slate-200">
                      {report.stats.map(stat => (
                        <div key={stat.name} className="flex justify-between items-center">
                          <span className="text-slate-700 text-left w-2/5 truncate pr-1">{stat.name}</span>
                          <div className="w-3/5 bg-slate-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                            <div className={clsx("h-full rounded-full transition-all duration-500 ease-out", stat.value >= 75 ? "bg-emerald-500" : stat.value >= 50 ? "bg-amber-400" : "bg-red-500")} style={{ width: `${stat.value}%` }} title={`${stat.value}%`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )) : <p className="text-slate-500 col-span-full text-center py-4">No scout report. Click a player in Top Scorers.</p>}
              </div>
            </Card>
          </div>

          <div className="lg:w-1/3 xl:w-[25rem] flex-shrink-0 space-y-6 lg:space-y-8">
            <Card title="LATEST NEWS" headerActions={<ActionButton onClick={handleViewAllNews}>View All<ChevronRight className="w-3.5 h-3.5 ml-1" /></ActionButton>}>
              <div className="space-y-3 max-h-[28rem] sm:max-h-[30rem] overflow-y-auto pr-1 -mr-2 custom-scrollbar">
                {newsItems.map((item) => (
                  <a key={item.id} href="#" onClick={(e) => { e.preventDefault(); handleNewsItemClick(item); }} className="flex items-start space-x-3 sm:space-x-4 group p-2 sm:p-2.5 hover:bg-slate-100 rounded-lg transition-colors block cursor-pointer">
                     <PlaceholderImage src={item.image} alt={`News: ${item.title}`} className="w-14 h-14 sm:w-16 md:w-20 md:h-20 rounded-lg object-cover flex-shrink-0 shadow-sm" />
                    <div className="flex-grow min-w-0">
                      <h4 className="text-xs sm:text-sm md:text-base font-semibold text-primary-dark group-hover:text-blue-600 transition-colors line-clamp-2 mb-0.5">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 sm:line-clamp-3">{item.summary}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

             <div className="lg:sticky lg:top-8">
              <div className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] rounded-xl shadow-lg overflow-hidden group mb-4 sm:mb-5">
                <PlaceholderImage src={currentMainTopScorer.bannerImage || IMAGE_ASSETS.TOP_SCORER_BANNER_FRAME} alt="Top scorer banner background" className="w-full h-full" isBanner/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 sm:p-4 md:p-5 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white uppercase tracking-wider drop-shadow-sm">TOP SCORER</h3>
                        <ActionButton onClick={handleViewAllTopScorers} className="text-white/90 hover:text-white !text-xs bg-white/10 hover:bg-white/20 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md backdrop-blur-sm cursor-pointer">
                            View All<ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1" />
                        </ActionButton>
                    </div>
                    <div className="flex items-end space-x-2 sm:space-x-3 w-full cursor-pointer" onClick={() => currentMainTopScorer.name !== "N/A" && handleTopScorerOrPlayerClick(currentMainTopScorer)} title={currentMainTopScorer.name !== "N/A" ? `View scout report for ${currentMainTopScorer.name}` : currentMainTopScorer.name}>
                        <PlaceholderImage src={currentMainTopScorer.image} alt={`Portrait of ${currentMainTopScorer.name}`} className="w-12 h-12 sm:w-14 md:w-16 md:h-16 rounded-full border-2 border-white/70 object-cover shadow-md flex-shrink-0" isPlayerPortrait/>
                        <div className="flex-grow min-w-0">
                            <h4 className="text-white text-sm sm:text-base md:text-lg font-semibold truncate drop-shadow-sm">{currentMainTopScorer.name}</h4>
                            <p className="text-white/90 text-xs sm:text-sm md:text-base font-medium drop-shadow-sm">{currentMainTopScorer.goals} Goals</p>
                        </div>
                        {currentMainTopScorer.teamLogo && (<PlaceholderImage src={currentMainTopScorer.teamLogo} alt={`${currentMainTopScorer.team}'s team logo`} className="w-5 h-5 sm:w-6 md:w-7 md:h-7 rounded-full border border-white/30 self-center shadow" isTeamLogo teamInitial={currentMainTopScorer.teamInitial}/>)}
                    </div>
                </div>
              </div>

              <Card className="p-0"> 
                <div className="space-y-0.5 max-h-[20rem] sm:max-h-[24rem] overflow-y-auto custom-scrollbar">
                  {currentTopScorersList.length > 0 ? currentTopScorersList.map((scorer, index) => (
                    <a key={scorer.name + index + scorer.team} href="#" onClick={(e) => { e.preventDefault(); handleTopScorerOrPlayerClick(scorer); }} className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 p-2.5 sm:p-3 md:p-4 hover:bg-slate-100/80 transition-colors border-b border-slate-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl cursor-pointer" title={`View scout report for ${scorer.name}`}>
                      <PlaceholderImage src={scorer.image} alt={`Portrait of ${scorer.name}`} className="w-9 h-9 sm:w-10 md:w-11 md:h-11 rounded-full object-cover border border-slate-200 flex-shrink-0" isPlayerPortrait/>
                      <div className="flex-grow min-w-0">
                        <h5 className="text-xs sm:text-sm md:text-base font-medium text-slate-800 truncate">{scorer.name}</h5>
                        <div className="flex items-center text-xs sm:text-sm text-slate-500">
                           <PlaceholderImage src={scorer.teamLogo} alt={`${scorer.team} logo`} className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 md:mr-2 rounded-full flex-shrink-0" isTeamLogo teamInitial={scorer.teamInitial}/>
                          <span className="truncate text-xs sm:text-sm">{scorer.team}</span>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm md:text-base font-semibold text-primary-dark whitespace-nowrap">{scorer.goals} G</span>
                    </a>
                  )) : <p className="text-slate-500 text-center p-4">No top scorers for this selection.</p>}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent; }
        .text-primary-dark { color: #1e3a8a; /* slate-800 or your chosen primary dark */ } 
      `}</style>
    </div>
  );
};

export default OverviewPage;