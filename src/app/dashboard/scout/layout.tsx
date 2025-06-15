"use client";

import { ReactNode, FC, useState } from "react";
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

const items: iNavItem[] = [
  {
    name: "Overview",
    icon: OverviewIcon,
    link: "/dashboard/scout/overview",
  },
  {
    name: "Evaluations",
    icon: AnalyticsIcon,
    link: "/dashboard/scout/evaluations",
  },
  {
    name: "Players",
    icon: ProfileIcon,
    link: "/dashboard/scout/players",
  },
  {
    name: "Matches",
    icon: MatchesIcon,
    link: "/dashboard/scout/matches",
  },
  {
    name: "Academies",
    icon: AcademicIcon,
    link: "/dashboard/scout/academies",
  },
  {
    name: "Local Pitches",
    icon: FootballClubIcon,
    link: "/dashboard/scout/pitches",
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    link: "/dashboard/scout/settings",
  },
];

const ScoutLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const pathName = usePathname();

  const determineIndex = () => {
    const current = pathName.split("/")[3];
    switch (current) {
      case "overview":
        return 0;
      case "evaluations":
        return 1;
      case "players":
        return 2;
      case "matches":
        return 3;
      case "academies":
        return 4;
      case "pitches":
        return 5;
      case "settings":
        return 6;
      default:
        return -1;
    }
  };

  const page = determineIndex();

  return (
    <div className="w-screen h-screen font-lato bg-background-gray flex relative">
      <SideBar
        items={items}
        active={page}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="w-full lg:w-[80%] h-screen flex flex-col flex-1">
        {/* Sticky TopBar */}
        <div className="sticky top-0 z-20">
          <TopBar toggleSidebar={toggleSidebar} />
        </div>

        {/* Page Content with scrolling */}
        <main className="flex-grow overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ScoutLayout;