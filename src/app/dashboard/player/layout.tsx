"use client";

import { ReactNode, FC, useState } from "react"; // <-- Import useState

import SideBar, { iNavItem } from "@/components/reusable/SideBar";
import TopBar from "@/components/reusable/TopBar";

import SpotlightIcon from "@/public/icons/Spotlight Icon.svg";
import ProfileIcon from "@/public/icons/Profile Icon.svg";
import GalleryIcon from "@/public/icons/Gallery Icon.svg";
import SettingsIcon from "@/public/icons/Settings Icon.svg";
import { usePathname } from "next/navigation";

interface iAuthLayout {
  children: ReactNode;
}

const items: iNavItem[] = [
  {
    name: "Spotlight",
    icon: SpotlightIcon,
    link: "/dashboard/player/spotlight",
  },
  {
    name: "Profile",
    icon: ProfileIcon,
    link: "/dashboard/player/profile",
  },
  {
    name: "Gallery",
    icon: GalleryIcon,
    link: "/dashboard/player/gallery",
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    link: "/dashboard/player/settings",
  },
];

const PlayerLayout: FC<iAuthLayout> = ({ children }) => {
  // --- START OF MODIFICATIONS ---

  // 1. Add state to manage the sidebar's visibility on mobile devices.
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // 2. Create functions to control the sidebar state.
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // --- END OF MODIFICATIONS ---

  const pathName = usePathname();

  const determineIndex = () => {
    const current = pathName.split("/")[3];
    switch (current) {
      case "spotlight":
        return 0;
      case "profile":
        return 1;
      case "gallery":
        return 2;
      case "settings":
        return 3;
    }

    return -1;
  };

  const page = determineIndex();

  return (
    // This parent div sets up the main flex container for the page.
    <div className="flex h-screen w-full bg-background-gray font-lato">
      {/*
        3. Pass state and handlers to the SideBar.
           - `isOpen` controls if the sidebar is visible on mobile.
           - `onClose` allows the sidebar to close itself (e.g., by clicking the overlay or its close button).
      */}
      <SideBar
        items={items}
        active={page}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* This div contains the main content (TopBar + children).
          - `flex-1` makes it take up the remaining space next to the sidebar on large screens.
          - `h-screen` and `overflow-y-auto` make this section scrollable, not the whole page.
      */}
      <div className="flex h-screen flex-1 flex-col overflow-y-auto">
        {/*
          4. Pass the toggle handler to the TopBar.
             This allows the hamburger menu in the TopBar to open/close the sidebar.
        */}
        <header className="sticky top-0 z-20">
          <TopBar toggleSidebar={toggleSidebar} />
        </header>

        {/* The actual page content is rendered here. Added padding for better spacing. */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default PlayerLayout;