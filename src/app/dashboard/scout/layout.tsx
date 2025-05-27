"use client";

import { ReactNode, FC, useState, useEffect } from "react"; // Added useState, useEffect
import { usePathname } from "next/navigation";

import SideBar, { iNavItem } from "@/components/reusable/SideBar";
import TopBar from "@/components/reusable/TopBar";

import OverviewIcon from "@/public/icons/Overview Icon.svg";
import AnalyticsIcon from "@/public/icons/Analytics Icon.svg";
import ProfileIcon from "@/public/icons/Profile Icon.svg";
import MatchesIcon from "@/public/icons/Matches Icon.svg";
import AcademicIcon from "@/public/icons/Academic Icon.svg";
import FootballClubIcon from "@/public/icons/Footbal Club Icon.svg";
import SettingsIcon from "@/public/icons/Settings Icon.svg";
// import MenuIcon from "@/public/icons/MenuIcon.svg"; // You'll need a menu icon for TopBar

interface iScoutLayout { // Renamed interface for clarity, though not strictly necessary
  children: ReactNode;
}

const items: iNavItem[] = [
  { name: "Overview", icon: OverviewIcon, link: "/dashboard/scout/overview" },
  { name: "Evaluations", icon: AnalyticsIcon, link: "/dashboard/scout/evaluations" },
  { name: "Players", icon: ProfileIcon, link: "/dashboard/scout/players" },
  { name: "Matches", icon: MatchesIcon, link: "/dashboard/scout/matches" },
  { name: "Academies", icon: AcademicIcon, link: "/dashboard/scout/academies" },
  { name: "Local Pitches", icon: FootballClubIcon, link: "/dashboard/scout/pitches" },
  { name: "Settings", icon: SettingsIcon, link: "/dashboard/scout/settings" },
];

// Define sidebar widths (adjust as needed)
const SIDEBAR_WIDTH_DESKTOP = "w-64"; // e.g., 16rem
const SIDEBAR_WIDTH_MOBILE = "w-60"; // e.g., 15rem

const ScoutLayout: FC<iScoutLayout> = ({ children }) => {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const determineIndex = () => {
    const current = pathName.split("/")[3];
    switch (current) {
      case "overview": return 0;
      case "evaluations": return 1;
      case "players": return 2;
      case "matches": return 3;
      case "academies": return 4;
      case "pitches": return 5;
      case "settings": return 6;
      default: return -1;
    }
  };

  const page = determineIndex();

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathName]);

  return (
    <div className="w-screen h-screen font-lato bg-background-gray flex relative overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:z-auto
          ${SIDEBAR_WIDTH_MOBILE} md:${SIDEBAR_WIDTH_DESKTOP}
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          bg-primary-blue text-white shadow-lg md:shadow-none /* Example bg, adjust as per your SideBar's actual style */
        `}
      >
        <SideBar
          items={items}
          active={page}
          isOpen={isSidebarOpen} // Pass state to SideBar
          onClose={() => setIsSidebarOpen(false)} // Allow SideBar to close itself (e.g. on item click)
        />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Main Content Area */}
      <div
        className={`
          flex-1 h-screen flex flex-col transition-all duration-300 ease-in-out
          overflow-y-auto
        `}
      >
        <div className="sticky top-0 z-10 bg-background-gray"> {/* Ensure TopBar BG */}
          <TopBar
            onToggleSidebar={toggleSidebar} // Pass toggle function to TopBar
            // You might also pass isSidebarOpen if TopBar needs to change its icon (e.g., Menu to X)
          />
        </div>
        <main className="flex-grow p-4 md:p-6"> {/* Use <main> for semantic content area, add padding */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default ScoutLayout;