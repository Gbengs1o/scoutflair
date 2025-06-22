"use client"; // This is required for useState and onClick handlers

import React, { useState } from "react";
import Image from "next/image";
import { Star, Medal, Gem, Users, Filter, ArrowLeft } from "lucide-react";

// --- TYPE DEFINITIONS ---
type BadgeData = {
  title: string;
  value: string;
  label: string;
  color: string;
};

type PlayerData = {
    id: number;
    nameFirst: string;
    nameLast: string;
    number: string;
    age: string;
    nationality: string;
    position: string;
    imageUrl: string;
    badges: {
        experience: string;
        transfers: string;
        accuracy: string;
    };
};

type ActivityItemData = {
    name: string;
    action: string;
    time: string;
    imageUrl: string;
};


// --- DYNAMIC & STATIC DATA ---
const scoutedPlayersAvatars = [
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_4_105_625.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_5_105_626.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_6_105_627.png",
  "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_7_105_628.png",
];

const topProspects = [
  {
    name: "Tobi Irefin",
    stats: "10 G/A",
    imageUrl: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_105_651.png",
  },
  {
    name: "Tobi Irefin",
    stats: "10 G/A",
    imageUrl: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_105_658.png",
  },
  {
    name: "Tobi Irefin",
    stats: "10 G/A",
    imageUrl: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_8_105_665.png",
  },
];

const playerImageUrls = [
    "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/Generated-Image-June-22-2025-11_32AM.jpeg",
    "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/image-3.png",
    "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/image-2.png",
    "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/image-1.png",
    "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/image.png",
    "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/Generated-Image-June-22-2025-11_36AM.jpeg",
];

const firstNames = ["James", "Tobi", "Adams", "Kasim", "Henry", "David"];
const lastNames = ["Irefin", "Taylor", "Segun", "Isah", "Boyega", "Smith"];

const allPlayersData: PlayerData[] = Array.from({ length: 6 }).map((_, index) => ({
    id: index,
    nameFirst: firstNames[index],
    nameLast: lastNames[index],
    number: `${Math.floor(Math.random() * 30) + 1}`,
    age: `${Math.floor(Math.random() * 5) + 17}`,
    nationality: "Nigerian",
    position: "Midfielder",
    imageUrl: playerImageUrls[index % playerImageUrls.length],
    badges: {
        experience: String(Math.floor(Math.random() * 10)).padStart(2, '0'),
        transfers: String(Math.floor(Math.random() * 5)).padStart(2, '0'),
        accuracy: `${Math.floor(Math.random() * 15) + 85}`
    }
}));

const activityFeedData: ActivityItemData[] = [
  {
    name: "John Boyega", action: "Submitted a report on Henry Isah.", time: "Yesterday",
    imageUrl: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_11_41_697.png",
  },
  {
    name: "John Boyega", action: "Added Tobi Irefin to Top Prospect list.", time: "Yesterday",
    imageUrl: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_11_41_704.png",
  },
  {
    name: "John Boyega", action: "Attended a Local match in Kaduna", time: "Yesterday",
    imageUrl: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_11_41_711.png",
  },
  {
    name: "John Boyega", action: "Added a note on Tobi Irefin", time: "Yesterday",
    imageUrl: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_11_41_718.png",
  },
  {
    name: "John Boyega", action: "Scouted Kasim Segun in Abuja.", time: "Yesterday",
    imageUrl: "https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Ellipse_11_41_725.png",
  },
];


// --- HELPER COMPONENTS ---
const StarRating = ({ rating, totalStars = 5 }: { rating: number, totalStars?: number }) => (
  <div className="flex">
    {Array.from({ length: totalStars }, (_, i) => (
      <Star key={i} className={`w-6 h-6 ${ i < rating ? "text-[#FFD700] fill-current" : "text-gray-300 fill-gray-300"}`} />
    ))}
  </div>
);

const PlayerCardButton = ({ children }: { children: React.ReactNode }) => (
    <button className="h-[24px] w-[74px] rounded-full border border-[#FFA500] shadow-[0_4px_8px_rgba(209,209,209,0.12)] text-[10px] font-medium text-[rgba(34,34,34,0.8)] hover:bg-orange-50 transition-colors flex-shrink-0">
        {children}
    </button>
);


// --- SECTIONAL COMPONENTS ---
const TotalPlayersScoutedCard = () => (
    <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-5 flex min-h-[138px]">
        <div className="flex flex-col justify-between flex-grow">
            <h3 className="text-base font-bold text-[#222222]">Total Players Scouted</h3>
            <div className="flex -space-x-2">
                {scoutedPlayersAvatars.map((src, index) => (
                    <div key={index} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white bg-white">
                        <Image src={src} alt={`Player ${index + 1}`} width={32} height={32} className="object-cover" />
                    </div>
                ))}
            </div>
            <StarRating rating={4} />
        </div>
        <div className="flex flex-col items-end justify-between text-right pl-2 sm:pl-4">
             <Medal className="w-5 h-5 text-[#222222]" />
             <div>
                <p className="text-5xl font-bold text-[#041931]">150</p>
                <p className="text-xs font-medium text-[#555555]">Players Scouted</p>
             </div>
        </div>
    </div>
);

const TopProspectsCard = () => (
    <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-4 flex flex-col gap-3 min-h-[138px]">
        <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-[#222222]">Top Prospects</h3>
            <Gem className="w-5 h-5 text-[#222222]" />
        </div>
        <div className="flex flex-wrap justify-center sm:justify-between gap-3">
            {topProspects.map((prospect, index) => (
                <div key={index} className="w-[98px] h-[78px] relative">
                    <div className="bg-[#FAF9F9] rounded-lg w-full h-[72px] absolute top-[6px] left-0"></div>
                    <div className="absolute top-0 w-full flex flex-col items-center gap-2">
                        <div className="w-[44px] h-[40px] rounded-full overflow-hidden">
                            <Image src={prospect.imageUrl} alt={prospect.name} width={44} height={40} className="object-cover" />
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] text-[#222222] leading-tight">{prospect.name}</p>
                            <p className="text-[8px] font-semibold text-[#222222]">{prospect.stats}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Badge = ({ badge }: { badge: BadgeData }) => (
    <div className="relative w-[88px] h-[64px] bg-white rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-1.5 flex flex-col justify-between flex-shrink-0">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-[8px] font-semibold text-black/90">{badge.title}</p>
                <div className="mt-4 w-[36px] h-[0.24px] bg-[#E0E0E0]"></div>
                <p className={`text-[4px] font-bold ${badge.color}`}>{badge.label}</p>
            </div>
            <p className="text-3xl font-bold text-black/90">{badge.value}</p>
        </div>
    </div>
);

const ScoutsBadgesCard = ({ badges }: { badges: BadgeData[] }) => (
    <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-4 flex flex-col gap-4 min-h-[138px]">
        <h3 className="font-roboto text-base font-bold text-[#222222]">Scout’s Badges</h3>
        <div className="flex flex-wrap justify-center sm:justify-between gap-4">
            {badges.map((badge, index) => <Badge key={index} badge={badge} />)}
        </div>
    </div>
);

const PlayerCard = ({ player, onSelect, isSelected }: { player: PlayerData; onSelect: () => void; isSelected: boolean }) => (
  <div onClick={onSelect} className={`bg-[#FEFDFD] border rounded-lg p-3.5 flex flex-col sm:flex-row gap-[15px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] cursor-pointer transition-all duration-200 ${isSelected ? 'ring-2 ring-orange-500 border-transparent' : 'border-[#E0E0E0]'}`}>
    <div className="w-full sm:w-[122px] h-[160px] sm:h-[133px] flex-shrink-0">
      <Image src={player.imageUrl} alt={`${player.nameFirst} ${player.nameLast}`} width={122} height={133} className="rounded-lg object-cover w-full h-full" />
    </div>
    <div className="flex flex-col justify-between py-1 flex-grow">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-black/90">{player.nameFirst}</p>
            <p className="text-base font-bold text-black/90 uppercase">{player.nameLast}</p>
          </div>
          <p className="text-2xl font-bold text-black/90">{player.number}</p>
        </div>
        <div className="flex justify-between mt-3 text-center">
          <div>
            <p className="text-[10px] font-semibold text-black/90">AGE</p>
            <p className="text-[8px] text-black/80">{player.age}</p>
          </div>
          <div className="px-2">
            <p className="text-[10px] font-semibold text-black/90">NATIONALITY</p>
            <p className="text-[8px] text-black/80 flex items-center justify-center gap-1">{player.nationality} <span>🇳🇬</span></p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-black/90">POSITION</p>
            <p className="text-[8px] text-black/80">{player.position}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 sm:mt-0">
        <PlayerCardButton>Reports</PlayerCardButton>
        <PlayerCardButton>Statistics</PlayerCardButton>
      </div>
    </div>
  </div>
);

const ActivityItem = ({ item }: { item: ActivityItemData }) => (
    <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                    <Image src={item.imageUrl} alt={item.name} width={32} height={32} className="object-cover" />
                </div>
                <p className="text-sm font-semibold text-[#222222]">{item.name}</p>
            </div>
            <p className="text-xs text-[#555555]">{item.action}</p>
        </div>
        <p className="text-[10px] text-[#555555] self-start mt-2.5 flex-shrink-0 ml-2">{item.time}</p>
    </div>
);

const ActivityFeed = () => (
    <div className="w-full lg:max-w-[350px] bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-4 md:p-5 flex flex-col h-auto max-h-[500px] lg:h-[853px] lg:max-h-full">
        <div className="flex justify-between items-baseline mb-5">
            <h3 className="text-base font-bold text-[#222222]">Activity Feed</h3>
            <a href="#" className="text-[10px] text-[#222222] hover:underline">View All</a>
        </div>
        <div className="flex-1 overflow-y-auto space-y-[18px] opacity-90 pr-2">
             {activityFeedData.concat(activityFeedData).map((item, index) => (
                <ActivityItem key={index} item={item} />
            ))}
        </div>
    </div>
);

const AllPlayersSection = ({ onPlayerSelect, selectedPlayerId }: { onPlayerSelect: (player: PlayerData) => void; selectedPlayerId: number | null }) => (
    <div className="w-full bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-4 md:p-6 space-y-4">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#222222]" />
                <h3 className="text-base font-bold text-[#222222]">All Players</h3>
            </div>
            <button className="flex items-center gap-1 border border-[#555555] border-opacity-50 rounded px-2.5 py-1 text-xs text-[#555555]">
                <Filter className="w-3 h-3" />
                <span>Filter</span>
            </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
            {allPlayersData.map((player) => (
                <PlayerCard key={player.id} player={player} onSelect={() => onPlayerSelect(player)} isSelected={selectedPlayerId === player.id} />
            ))}
        </div>
        <div className="pt-4 flex justify-center">
            <button className="h-[36px] w-[140px] flex items-center justify-center gap-2.5 border border-[#555555] rounded-lg text-sm font-medium text-black/90 hover:bg-gray-100 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Menu</span>
            </button>
        </div>
    </div>
);


// --- MAIN PAGE COMPONENT ---
const Evaluations = () => {
  const initialBadges: BadgeData[] = [
    { title: 'Experience', value: '00', label: 'Professional', color: 'text-red-500' },
    { title: 'Transfers', value: '00', label: 'Successful', color: 'text-green-600' },
    { title: 'Accuracy', value: '00', label: 'Scouting', color: 'text-blue-800' },
  ];

  const [currentBadges, setCurrentBadges] = useState<BadgeData[]>(initialBadges);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  const handlePlayerSelect = (player: PlayerData) => {
    const newBadges = [
        { ...initialBadges[0], value: player.badges.experience },
        { ...initialBadges[1], value: player.badges.transfers },
        { ...initialBadges[2], value: player.badges.accuracy },
    ];
    setCurrentBadges(newBadges);
    setSelectedPlayerId(player.id);
  };

  return (
    <main className="font-lato bg-[#F8F9FA] p-4 lg:p-6 min-h-screen">
      {/* Top Bar */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <TotalPlayersScoutedCard />
        <TopProspectsCard />
        <ScoutsBadgesCard badges={currentBadges} />
      </section>

      {/* Main Content */}
      <section className="mt-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:flex-1">
          <AllPlayersSection onPlayerSelect={handlePlayerSelect} selectedPlayerId={selectedPlayerId} />
        </div>
        <div className="w-full lg:w-auto flex-shrink-0">
          <ActivityFeed />
        </div>
      </section>
    </main>
  );
};

export default Evaluations;