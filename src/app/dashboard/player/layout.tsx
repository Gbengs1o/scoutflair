// /dashboard/player/PlayerLayout.jsx
"use client";

import { ReactNode, FC, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import clsx from 'clsx';

import Sidebar from "./sidebar/Sidebar"; 
import TopBar from "./TopBar/TopBar";

const MOBILE_SIDEBAR_EXPANDED_WIDTH_CLASS = "w-80";

const PlayerLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathName = usePathname();
  const [isSidebarOpenForMobile, setIsSidebarOpenForMobile] = useState(false);

  const toggleMobileSidebar = () => {
    setIsSidebarOpenForMobile(prev => !prev);
  };

  useEffect(() => {
    if (isSidebarOpenForMobile) setIsSidebarOpenForMobile(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (isSidebarOpenForMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isSidebarOpenForMobile]);

  return (
    <div className="w-screen h-screen font-lato bg-background-gray flex relative overflow-x-hidden">
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out flex-shrink-0",
          MOBILE_SIDEBAR_EXPANDED_WIDTH_CLASS,
          isSidebarOpenForMobile ? "translate-x-0 shadow-xl" : "-translate-x-full",
          "lg:relative lg:translate-x-0 lg:shadow-none lg:w-auto bg-primary-2"
        )}
        // Add aria-hidden for better accessibility when sidebar is off-screen on mobile
        aria-hidden={!isSidebarOpenForMobile && typeof window !== 'undefined' && window.innerWidth < 1024}
      >
        {/* Pass toggleMobileSidebar as onMobileClose to Sidebar */}
        <Sidebar onMobileClose={toggleMobileSidebar} />
      </div>

      {isSidebarOpenForMobile && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        ></div>
      )}

      <div className={clsx("flex-1 h-screen flex flex-col overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out")}>
        <div className="sticky top-0 z-10">
          {/* Pass toggleMobileSidebar and isSidebarOpenForMobile to TopBar */}
          <TopBar
            onToggleSidebar={toggleMobileSidebar}
            isMobileSidebarOpen={isSidebarOpenForMobile}
          />
        </div>
        <main className="flex-grow p-4 sm:p-5 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PlayerLayout;