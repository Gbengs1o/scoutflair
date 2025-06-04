"use client";

import Image from 'next/image';
import {
  ChevronLeft,
  Heart,
  TrendingUp,
} from 'lucide-react';
import clsx from 'clsx';

// --- Image URLs for mapping ---
const URL_Player_Portrait_1 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1767.png';
const URL_Player_Portrait_2 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1850.png';
const URL_Player_Portrait_3 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1875.png';
const URL_Player_Portrait_4 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1924.png';
const URL_Player_Portrait_5 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_2095.png';
const URL_Player_Portrait_6 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1826.png';
const URL_Player_Portrait_7 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1795.png';
const URL_Player_Portrait_8 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_2071.png';
const URL_Player_Portrait_9 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1973.png';
const URL_Player_Portrait_10 = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002193_493_1948.png';


const URL_Players_Menu_Banner_BG = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Players_menu_banner_487_1756.png';
const URL_Banner_Stat_Card_1_BG = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002185_487_1752.png';
const URL_Banner_Stat_Card_2_BG = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002186_487_1753.png';
const URL_Banner_Stat_Card_3_BG = 'https://mediumslateblue-salamander-253615.hostingersite.com/wp-content/uploads/2025/06/C__Users_USER_Pictures_site2_Frame_1000002187_487_1754.png';
// --- End of Image URLs ---

const PlaceholderImage = ({
  src,
  alt,
  className,
  isTeamLogo = false,
  teamInitial = 'P',
  isPlayerPortrait = false,
  isBanner = false,
}) => {
  let imageToRender = src;
  let unoptimizedImage = false;

  if (!src) {
    if (isTeamLogo) {
      const bgColor = "#e2e8f0";
      const textColor = "#475569";
      imageToRender = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20viewBox%3D%220%200%2064%2064%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20rx%3D%2232%22%20fill%3D%22${encodeURIComponent(bgColor)}%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22central%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20font-weight%3D%22bold%22%20fill%3D%22${encodeURIComponent(textColor)}%22%3E${teamInitial.toUpperCase()}%3C%2Ftext%3E%3C%2Fsvg%3E`;
      unoptimizedImage = true;
    } else if (isPlayerPortrait) {
      imageToRender = `https://via.placeholder.com/200x280/CCCCCC/808080?Text=Portrait`;
    } else if (isBanner) {
      imageToRender = `https://via.placeholder.com/1200x300/CCCCCC/808080?Text=Banner`;
    } else {
      imageToRender = `https://via.placeholder.com/300x200/CCCCCC/808080?Text=Texture`;
    }
  } else if (typeof src === 'string' && src.startsWith('data:image/svg+xml')) {
    unoptimizedImage = true;
  }

  if (!imageToRender) {
    imageToRender = `https://via.placeholder.com/200x200/CCCCCC/808080?Text=Error`;
    unoptimizedImage = true;
  }

  return (
    <div className={clsx("relative bg-gray-300 overflow-hidden", className)}>
      <Image
        src={imageToRender}
        alt={alt}
        layout="fill"
        objectFit="cover"
        unoptimized={unoptimizedImage}
        priority={isBanner}
        onError={(e) => {
          const errorSvg = `data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%23f3f4f6%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2210px%22%20fill%3D%22%239ca3af%22%3ENo%20Img%3C%2Ftext%3E%3C%2Fsvg%3E`;
          e.currentTarget.srcset = errorSvg;
          e.currentTarget.src = errorSvg;
        }}
      />
    </div>
  );
};


const PlayersPage = () => {
  const bannerStats = [
    { title: "Games Played", metric: "27/80", imageSrc: URL_Banner_Stat_Card_1_BG },
    { title: "Total Passes Completed", metric: "3,298", imageSrc: URL_Banner_Stat_Card_2_BG },
    { title: "Season Form Overview", metric: "86%", graph: true, imageSrc: URL_Banner_Stat_Card_3_BG },
    { title: "Performance Improvement", metric: "+34%", graph: true, imageSrc: URL_Banner_Stat_Card_1_BG }, // Re-using first card BG for the 4th stat
  ];

  const playersData = [
    { id: 1, firstName: "Adams", lastName: "TAYLOR", jerseyNumber: 1, age: 21, nationality: "ENGLAND", position: "GOALKEEPER", imageSrc: URL_Player_Portrait_1 },
    { id: 2, firstName: "Jane", lastName: "SMITH", jerseyNumber: 4, age: 24, nationality: "USA", position: "DEFENDER", imageSrc: URL_Player_Portrait_7 },
    { id: 3, firstName: "Carlos", lastName: "GOMEZ", jerseyNumber: 3, age: 22, nationality: "SPAIN", position: "MIDFIELDER", imageSrc: URL_Player_Portrait_6 },
    { id: 4, firstName: "Aisha", lastName: "KHAN", jerseyNumber: 6, age: 20, nationality: "PAKISTAN", position: "FORWARD", imageSrc: URL_Player_Portrait_2 },
    { id: 5, firstName: "Ben", lastName: "MILLER", jerseyNumber: 8, age: 26, nationality: "AUSTRALIA", position: "MIDFIELDER", imageSrc: URL_Player_Portrait_3 },
    { id: 6, firstName: "Sofia", lastName: "CHEN", jerseyNumber: 9, age: 23, nationality: "CHINA", position: "FORWARD", imageSrc: URL_Player_Portrait_4 },
    { id: 7, firstName: "Leo", lastName: "DAVIS", jerseyNumber: 10, age: 28, nationality: "BRAZIL", position: "ATTACKER", imageSrc: URL_Player_Portrait_10 },
    { id: 8, firstName: "Mia", lastName: "WILSON", jerseyNumber: 5, age: 25, nationality: "GERMANY", position: "DEFENDER", imageSrc: URL_Player_Portrait_9 },
  ];

  return (
    <div className="space-y-6 lg:space-y-10 pb-10">
      {/* Players menu banner */}
      <div
        className="relative rounded-2xl shadow-xl p-5 sm:p-6 min-h-[186px] bg-cover bg-center"
        style={{ backgroundColor: '#041931' }} // primary-dark
      >
        <PlaceholderImage
          src={URL_Players_Menu_Banner_BG}
          alt="Players banner background"
          className="absolute inset-0 opacity-[0.07] rounded-2xl"
          isBanner
        />
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {bannerStats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3.5 sm:p-4 border border-gray-300/30 overflow-hidden min-h-[134px] flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
            >
              <PlaceholderImage
                src={stat.imageSrc}
                alt="Card background texture"
                className="absolute inset-0 opacity-[0.03] rounded-xl" // Figma shows opacity 0.47 for this fill, but that would be too strong. Adjusted for subtlety.
              />
              <div className="relative z-10">
                <h4 className="text-[0.8rem] sm:text-sm font-medium text-gray-700 mb-1">{stat.title}</h4>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stat.metric.includes('/') ? (
                    <>
                      <span className="text-primary-dark">{stat.metric.split('/')[0]}</span>
                      <span className="text-gray-400 text-xl">/{stat.metric.split('/')[1]}</span>
                    </>
                  ) : (
                    stat.metric
                  )}
                </p>
              </div>
              {stat.graph && (
                <div className="relative z-10 h-10 mt-2 flex items-end justify-start text-xs text-gray-400">
                  <TrendingUp className="w-10 h-10 text-green-400 -ml-2 -mb-2 opacity-70" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Players information frame */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {playersData.map((player) => (
            <div key={player.id} className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/60 p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 hover:shadow-xl transition-shadow duration-300">
              <PlaceholderImage
                src={player.imageSrc}
                alt={`${player.firstName} ${player.lastName}`}
                className="w-36 h-48 sm:w-44 sm:h-[210px] rounded-lg flex-shrink-0 border-2 border-gray-200 shadow-md"
                isPlayerPortrait
              />
              <div className="flex-grow text-center sm:text-left w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-2 sm:mb-3">
                  <div>
                    <p className="text-lg font-normal text-gray-700">{player.firstName}</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-primary-dark -mt-1 uppercase">{player.lastName}</h3>
                  </div>
                  <span className="text-4xl sm:text-5xl font-bold text-gray-300 mt-1 sm:mt-0">#{player.jerseyNumber}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs sm:text-[0.8rem] text-gray-600 mb-4 sm:mb-6 py-2 border-y border-gray-200/70">
                  <div className="text-center sm:text-left">
                    <p className="font-bold text-gray-500 uppercase">AGE</p>
                    <p className="font-medium text-gray-800">{player.age}</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="font-bold text-gray-500 uppercase">NATIONALITY</p>
                    <p className="font-medium text-gray-800 truncate">{player.nationality}</p>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="font-bold text-gray-500 uppercase">POSITION</p>
                    <p className="font-medium text-gray-800 truncate">{player.position}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                  <button className="w-full sm:w-auto flex-grow bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm shadow-sm hover:shadow-md">
                    View Profile
                  </button>
                  <button className="w-full sm:w-auto flex-grow bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2.5 px-5 rounded-lg border border-gray-400/80 transition-colors text-sm shadow-sm hover:shadow-md flex items-center justify-center">
                    <Heart className="w-4 h-4 mr-2 text-red-500 opacity-70" /> Add Favorite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Players menu */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 mt-6">
        <button className="flex items-center justify-center w-full sm:w-auto text-gray-800 hover:text-black bg-white hover:bg-gray-100 border border-gray-400/80 font-semibold py-3 px-6 rounded-lg transition-colors text-sm shadow-sm hover:shadow-md">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Return to Menu
        </button>
        <button className="flex items-center justify-center w-full sm:w-auto bg-primary-dark hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm shadow-md hover:shadow-lg">
          View All Players
        </button>
      </div>
    </div>
  );
};

export default PlayersPage;