"use client"; // Enables client-side interactivity (useState, onClick)

import { useState } from "react";
import Image from "next/image";
import { Gem, Medal, Star, Clipboard, RefreshCw } from "lucide-react";

// --- TYPE DEFINITIONS ---
type BadgeData = {
  experience: number;
  transfers: number;
  accuracy: number;
};

// --- DUMMY DATA WITH PLAYER-SPECIFIC BADGES ---
const initialScoutBadges: BadgeData = {
  experience: 12,
  transfers: 4,
  accuracy: 92,
};

const totalPlayersData = {
  count: 150,
  avatars: ["https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_4_18_51.png", "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_5_18_52.png", "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_6_18_53.png", "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_7_18_54.png"],
  rating: 4,
};

const topProspects = [
  { name: "Tobi Irefin", stat: "10 G/A", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_18_83.png", badges: { experience: 8, transfers: 2, accuracy: 88 } },
  { name: "Dele Adebayo", stat: "15 G/A", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_18_92.png", badges: { experience: 15, transfers: 7, accuracy: 95 } },
  { name: "Femi Kuti", stat: "8 G/A", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_18_99.png", badges: { experience: 5, transfers: 1, accuracy: 82 } },
];

const scoutingPlanPlayers = [
  { team: "Scoutflair FC", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_10_18_179.png", rating: 5, name: "Abubakar Kabir", position: "Midfielder", height: 178, weight: 69, stats: { games: 50, assists: 15, goals: 5 }, badges: { experience: 25, transfers: 11, accuracy: 94 } },
  { team: "Scoutflair FC", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_10_29_27.png", rating: 4, name: "Samuel Okoro", position: "Forward", height: 182, weight: 75, stats: { games: 45, assists: 10, goals: 22 }, badges: { experience: 22, transfers: 8, accuracy: 91 } },
  { team: "Scoutflair FC", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_4_18_51.png", rating: 5, name: "Chidi Nwakali", position: "Defender", height: 185, weight: 80, stats: { games: 60, assists: 2, goals: 3 }, badges: { experience: 30, transfers: 15, accuracy: 98 } },
  { team: "Scoutflair FC", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_5_18_52.png", rating: 3, name: "Ikenna Eze", position: "Goalkeeper", height: 190, weight: 85, stats: { games: 55, assists: 0, goals: 0 }, badges: { experience: 18, transfers: 3, accuracy: 85 } },
];

const top3Players = [
  { name: 'Abubakar Mansoor', position: 'Midfielder', avatar: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_18_83.png', badges: { experience: 19, transfers: 9, accuracy: 93 } },
  { name: 'Emeka Chukwu', position: 'Forward', avatar: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_18_92.png', badges: { experience: 14, transfers: 6, accuracy: 89 } },
  { name: 'Yusuf Aliyu', position: 'Defender', avatar: 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_18_99.png', badges: { experience: 21, transfers: 10, accuracy: 96 } },
];

const updates = [
  { avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2380_128_1213.png", text: "Kaduna State’s Ministry of Sports pledges support to grassroot football.", time: "3 hrs ago" },
  { avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2380_128_1220.png", text: "Valuegate football academy are going to meet with Fc Jabi next Saturday.", time: "2 mins ago" },
  { avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_2380_128_1227.png", text: "Valuegate football academy set to unveil their newly constructed 500 seater mini stadia", time: "4 hrs ago" },
  { avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_7_18_54.png", text: "Scoutflair will roll out new features next month, will be available for premium users only", time: "Yesterday" },
];

const activityFeed = [
  { name: "John Boyega", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_4_18_51.png", action: "Submitted a report on Henry Isah.", time: "Yesterday" },
  { name: "John Boyega", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_9_18_175.png", action: "Added Tobi Irefin to Top Prospect list.", time: "Yesterday" },
  { name: "John Boyega", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_6_18_53.png", action: "Attended a Local match in Kaduna", time: "Yesterday" },
  { name: "John Boyega", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_7_18_54.png", action: "Added a note on Tobi Irefin", time: "Yesterday" },
  { name: "John Boyega", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_18_83.png", action: "Scouted Kasim Segun in Abuja.", time: "Yesterday" },
  { name: "John Boyega", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_18_92.png", action: "Scouted Kasim Segun in Abuja.", time: "Yesterday" },
  { name: "John Boyega", avatar: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_18_99.png", action: "Scouted Kasim Segun in Abuja.", time: "Yesterday" },
];


// --- SVG & ICON COMPONENTS ---
const NigeriaFlag = ({ className = "" }: { className?: string }) => (<svg className={className} viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_29_18)"><path d="M12 0H18V13H12V0Z" fill="#008751" /><path d="M0 0H6V13H0V0Z" fill="#008751" /><path d="M6 0H12V13H6V0Z" fill="#FFF" /></g><defs><clipPath id="clip0_29_18"><rect width="18" height="13" fill="white" /></clipPath></defs></svg>);
const StarIcon = ({ filled, className = "" }: { filled: boolean; className?: string; }) => (<Star className={`${className} ${filled ? "text-[#FFD700]" : "text-[#D9D9D9]"}`} fill={filled ? "#FFD700" : "#E0E0E0"} strokeWidth={0} />);

// --- REUSABLE & STATIC SUB-COMPONENTS ---
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => <div className={`bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] ${className}`}>{children}</div>;

const TotalPlayersScoutedCard = () => (
    <Card className="p-4 pl-5">
      <div className="flex justify-between h-full">
        <div className="flex flex-col justify-between">
          <h3 className="text-base font-bold font-lato text-[#222222]">Total Players Scouted</h3>
          <div className="flex">
            {totalPlayersData.avatars.map((src, index) => (
              <Image key={index} src={src} alt={`Player ${index + 1}`} width={32} height={32} className={`rounded-full border-2 border-white ${index > 0 ? "-ml-2" : ""}`} />
            ))}
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < totalPlayersData.rating} className="w-6 h-6" />)}
          </div>
        </div>
        <div className="relative text-right">
          <Medal className="absolute top-0 right-0 w-5 h-5 text-[#222222]" />
          <div className="flex flex-col h-full items-end justify-center pt-2">
            <p className="font-lato font-bold text-[#041931] text-[48px] leading-none">{totalPlayersData.count}</p>
            <p className="font-lato font-medium text-[#555555] text-xs">Players Scouted</p>
          </div>
        </div>
      </div>
    </Card>
  );

const UpdatesSection = () => (
    <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] font-lato">
        <div className="flex justify-between items-center p-5 pb-3 border-b border-[#E0E0E0]">
            <div className="flex items-center gap-1"><RefreshCw className="w-5 h-5 text-black"/><h3 className="text-base font-bold text-[#222222]">Updates</h3></div>
            <a href="#" className="text-[10px] text-[#222222]">View All</a>
        </div>
        <div className="flex flex-col px-5">
            {updates.map((update, index) => (
                <div key={index} className={`flex items-center gap-4 py-3 ${index < updates.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <Image src={update.avatar} alt="Update" width={36} height={36} className="rounded-full flex-shrink-0 object-cover" />
                    <p className="text-sm text-[#222222] grow">{update.text}</p>
                    <p className="text-xs text-[#555555] flex-shrink-0 whitespace-nowrap">{update.time}</p>
                </div>
            ))}
        </div>
    </div>
);

const ActivityFeed = () => (
  <div className="bg-white p-5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex flex-col gap-5 h-full font-lato">
    <div className="flex justify-between items-center"><h3 className="text-base font-bold text-[#222222]">Activity Feed</h3><a href="#" className="text-[10px] text-[#222222]">View All</a></div>
    <div className="flex flex-col gap-[18px] overflow-y-auto -mr-3 pr-3 opacity-90">
        {activityFeed.map((activity, index) =>(
            <div key={index} className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2"><Image src={activity.avatar} alt={activity.name} width={32} height={32} className="rounded-full object-cover" /><p className="text-sm font-semibold text-[#222222]">{activity.name}</p></div>
                    <p className="text-xs text-[#555555]">{activity.action}</p>
                </div>
                <p className="text-[10px] text-[#555555] flex-shrink-0 whitespace-nowrap mt-2">{activity.time}</p>
            </div>
        ))}
    </div>
  </div>
);

// --- INTERACTIVE SUB-COMPONENTS ---

const TopProspectsCard = ({ onPlayerSelect }: { onPlayerSelect: (badges: BadgeData) => void }) => (
    <Card className="rounded-xl p-[15px]">
        <div className="flex flex-col gap-3 h-full">
            <div className="flex justify-between items-center"><h3 className="text-base font-bold font-lato text-[#222222]">Top Prospects</h3><Gem className="w-5 h-5 text-[#222222]" /></div>
            <div className="grid grid-cols-3 gap-3 h-full">
                {topProspects.map((prospect, index) => (
                    <div key={index} onClick={() => onPlayerSelect(prospect.badges)} className="bg-[#FFFBFB] rounded-lg flex flex-col items-center justify-end text-center relative pt-[40px] cursor-pointer hover:bg-gray-100 transition-colors">
                        <Image src={prospect.avatar} alt={prospect.name} width={44} height={40} className="absolute top-0"/>
                        <div className="flex flex-col pb-2"><p className="text-[10px] font-lato leading-tight text-[#222222]">{prospect.name}</p><p className="text-[8px] font-lato font-semibold leading-tight text-[#222222]">{prospect.stat}</p></div>
                    </div>
                ))}
            </div>
        </div>
    </Card>
);

const BadgeItem = ({ title, value, subtitle, color }: { title: string, value: number, subtitle: string, color: string }) => (
    <div className="bg-white rounded-md p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex flex-col justify-between h-[64px] opacity-90">
        <div className="flex justify-between items-start">
            <p className="text-[8px] font-semibold font-lato text-[#222222] mt-1 ml-1">{title}</p>
            <p className="text-[32px] font-bold font-lato text-[#222222] leading-none">{String(value).padStart(2, '0')}</p>
        </div>
        <div className="flex flex-col items-start gap-1 ml-1">
           <div className="w-[36px] h-[0.24px] bg-[#E0E0E0]"></div>
           <p className={`text-[4px] font-bold font-lato ${color}`}>{subtitle}</p>
        </div>
    </div>
);

const ScoutBadgesCard = ({ badges }: { badges: BadgeData }) => (
    <Card className="rounded-xl p-4 font-roboto">
        <div className="flex flex-col gap-4 h-full">
            <h3 className="text-base font-bold text-[#222222]">Scout’s Badges</h3>
            <div className="grid grid-cols-3 gap-6">
                <BadgeItem title="Experience" value={badges.experience} subtitle="Professional" color="text-[#FF0000]" />
                <BadgeItem title="Transfers" value={badges.transfers} subtitle="Successful" color="text-[#008000]" />
                <BadgeItem title="Accuracy" value={badges.accuracy} subtitle="Scouting" color="text-[#04377C]" />
            </div>
        </div>
    </Card>
);

const ScoutingPlan = ({ onPlayerSelect }: { onPlayerSelect: (badges: BadgeData) => void }) => (
    <div className="bg-white p-5 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex flex-col gap-3 font-lato">
        <div className="flex justify-between items-center"><div className="flex items-center gap-1"><Clipboard className="w-5 h-5 text-[#222222]" /><h3 className="text-base font-bold text-[#222222]">Scouting Plan</h3></div><button className="text-[10px] font-bold text-[#041931] border border-[#041931] rounded-md px-2.5 py-1 shadow-[0_4px_20px_rgba(0,0,0,0.12)]">Add Task</button></div>
        <hr className="border-t-[0.16px] border-[#555555]"/>
        <div className="flex items-center gap-1 py-1"><Image src="https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_9_18_175.png" alt="Joshua Fayomi" width={32} height={32} className="rounded-full" /><p className="text-xs text-[#222222]">Joshua Fayomi</p></div>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-5 px-5">
            {scoutingPlanPlayers.map((player, index) => (
                <div key={index} onClick={() => onPlayerSelect(player.badges)} className="flex-shrink-0 w-[151px] bg-[#FFFBFB] rounded-lg border-[0.24px] border-[#555555] p-3 flex flex-col gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start"><p className="text-xs font-medium text-[#222222]">{player.team}</p><NigeriaFlag className="w-[18px] h-[18px]"/></div>
                    <div className="flex flex-col items-center gap-1"><Image src={player.avatar} alt={player.name} width={60} height={60} className="rounded-full object-cover"/><div className="flex gap-1">{[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < player.rating} className="w-2 h-2"/>)}</div><p className="text-[10px] font-semibold text-[#222222] text-center">{player.name}</p></div>
                    <hr className="border-t-[0.16px] border-[#555555] w-full"/>
                    <div className="flex flex-col items-center text-center gap-2"><div className="flex flex-col gap-1"><p className="text-[8px] font-bold text-[#041931]">{player.position}</p><div className="flex gap-2 text-[6px] font-medium text-[#222222]"><span>Height {player.height}</span><span>Weight {player.weight}</span></div></div><div className="text-center w-full flex flex-col gap-1"><p className="text-[8px] font-medium text-[#222222]">Academy Stats</p><div className="flex justify-between text-[6px] font-medium text-[#222222] px-1"><div><p>{player.stats.games}</p><p>Games</p></div><div><p>{player.stats.assists}</p><p>Assists</p></div><div><p>{player.stats.goals}</p><p>Goals</p></div></div></div></div>
                </div>
            ))}
        </div>
        <hr className="border-t-[0.16px] border-[#555555]"/>
        <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-[#222222]">Top 3 players</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
                {top3Players.map((player, index) => (
                    <div key={index} onClick={() => onPlayerSelect(player.badges)} className="bg-[#FFFBFB] rounded-xl border-[0.24px] border-[#555555] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 flex items-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors">
                        <Image src={player.avatar} alt={player.name} width={40} height={40} className="rounded-full object-cover flex-shrink-0"/>
                        <NigeriaFlag className="w-6 h-auto rounded-[4px] flex-shrink-0" />
                        <div className="flex-grow flex flex-col justify-center gap-1"><p className="text-xs font-bold text-[#222222]">{player.name}</p><p className="text-[8px] font-bold text-[#041931] text-right">{player.position}</p></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// --- MAIN OVERVIEW COMPONENT ---

export default function Overview() {
  const [displayedBadges, setDisplayedBadges] = useState<BadgeData>(initialScoutBadges);

  const handlePlayerSelect = (badges: BadgeData) => {
    setDisplayedBadges(badges);
  };

  return (
    <main className="p-6 bg-[#F8F9FA]">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          <TotalPlayersScoutedCard />
          <TopProspectsCard onPlayerSelect={handlePlayerSelect} />
          <ScoutBadgesCard badges={displayedBadges} />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_350px] gap-6">
            <div className="flex flex-col gap-6">
                 <ScoutingPlan onPlayerSelect={handlePlayerSelect} />
                 <UpdatesSection />
            </div>
            <div className="hidden xl:block min-h-[774px]">
                 <ActivityFeed />
            </div>
        </div>
      </div>
    </main>
  );
};