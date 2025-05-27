"use client";

import { ReactNode, FC, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import SideBar, { iNavItem } from "@/components/reusable/SideBar";
import TopBar from "@/components/reusable/TopBar";

import SpotlightIcon from "@/public/icons/Spotlight Icon.svg";
import ProfileIcon from "@/public/icons/Profile Icon.svg";
import GalleryIcon from "@/public/icons/Gallery Icon.svg";
import SettingsIcon from "@/public/icons/Settings Icon.svg";

interface iPlayerLayout {
  children: ReactNode;
}

const items: iNavItem[] = [
  { name: "Spotlight", icon: SpotlightIcon, link: "/dashboard/player/spotlight" },
  { name: "Profile", icon: ProfileIcon, link: "/dashboard/player/profile" },
  { name: "Gallery", icon: GalleryIcon, link: "/dashboard/player/gallery" },
  { name: "Settings", icon: SettingsIcon, link: "/dashboard/player/settings" },
];

// Define sidebar widths (adjust these Tailwind classes as needed)
// You can have different widths for different breakpoints if desired
const SIDEBAR_BASE_WIDTH = "w-60";         // Mobile overlay width (e.g., 15rem)
const SIDEBAR_DESKTOP_WIDTH = "lg:w-64"; // Desktop sidebar width (e.g., 16rem for large screens and up)
                                        // If you want it wider on xl, you could add "xl:w-72"

const PlayerLayout: FC<iPlayerLayout> = ({ children }) => {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const determineIndex = () => {
    const current = pathName.split("/")[3];
    switch (current) {
      case "spotlight": return 0;
      case "profile": return 1;
      case "gallery": return 2;
      case "settings": return 3;
      default: return -1;
    }
  };

  const page = determineIndex();

  useEffect(() => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  return (
    <div className="w-screen h-screen font-lato bg-background-gray flex relative overflow-hidden">
      {/* Sidebar Container */}
      <div
        className={`
          fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
          ${SIDEBAR_BASE_WIDTH} ${SIDEBAR_DESKTOP_WIDTH} /* Apply base and then desktop override */
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:z-auto /* Changed md: to lg: */
          bg-primary-2 text-white shadow-lg lg:shadow-none /* Example: Match SideBar's own bg or provide one */
        `}
      >
        <SideBar
          items={items}
          active={page}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Overlay for mobile/tablet when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" /* Changed md:hidden to lg:hidden */
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Main Content Area */}
      <div
        className={`
          flex-1 h-screen flex flex-col
          overflow-y-auto
          transition-all duration-300 ease-in-out
        `}
      >
        <div className="sticky top-0 z-10 bg-background-gray">
          <TopBar
            onToggleSidebar={toggleSidebar}
            // The TopBar's hamburger icon should now use `lg:hidden` as well if it's to match this layout
          />
        </div>
        <main className="flex-grow p-4 sm:p-5 lg:p-6"> {/* Responsive padding */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default PlayerLayout;