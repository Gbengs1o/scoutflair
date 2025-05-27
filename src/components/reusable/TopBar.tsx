"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { HiMenuAlt1 } from "react-icons/hi"; // Hamburger Icon Example
// import { IoMdNotificationsOutline } from "react-icons/io"; // If you re-enable
// import { IoSearchOutline } from "react-icons/io5"; // If you re-enable

import ProfileImageOrTextAvatar from "./ProfileImageOrTextAvatar";
import { useCurrentUserStore } from "@/stores/userStore";
import { Urls } from "@/constants/constants";

interface TopBarProps {
  onToggleSidebar?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const role = useCurrentUserStore((state) => state.role);
  const image = useCurrentUserStore((state) => state.image);
  const names = useCurrentUserStore((state) => state.name);

  const router = useRouter();

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const switchRoleAndCloseDropdown = () => {
    if (role === "SCOUT") {
      router.replace(Urls.PLAYER_SPOTLIGHT);
    } else if (role === "PLAYER") {
      router.replace(Urls.SCOUT_OVERVIEW);
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex justify-between items-center w-full bg-white shadow-custom h-16 px-4 sm:px-5 lg:px-6"> {/* Responsive padding for consistency with layout */}
      {/* Hamburger Menu Icon (Mobile & Tablet) */}
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="text-gray-600 hover:text-gray-800 focus:outline-none lg:hidden p-2 -ml-2" // Changed md:hidden to lg:hidden
          aria-label="Open sidebar"
        >
          <HiMenuAlt1 className="w-6 h-6" />
        </button>
      )}

      {/* Placeholder for other elements like a centered title or search bar */}
      {/* If you add a title or search, ensure it doesn't collide with the hamburger on smaller screens before lg */}
      <div className="flex-grow">
        {/* Example: Centered Title, hidden on small screens to give space to hamburger and profile */}
        {/* <h1 className="hidden sm:block text-center text-lg font-semibold text-gray-800">Dashboard</h1> */}
      </div>


      {/* Right side items: Notifications (commented) & User Profile */}
      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6"> {/* Responsive gap */}
        {/* Notifications Icon (Example: visible from sm upwards) */}
        {/* <div className="hidden sm:block lg:block"> {/* Adjust visibility as needed */}
        {/*  <IoMdNotificationsOutline className="text-2xl text-black cursor-pointer" />
        {/* </div> */}

        {/* User Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex gap-2 sm:gap-3 items-center cursor-pointer" onClick={toggleDropdown}>
            <ProfileImageOrTextAvatar
              image={image}
              name={names}
              radius="rounded-full"
              size="size-8 sm:size-9 lg:size-10" // Responsive avatar size
            />
            {/* User Name and Role - Conditionally hide role on very small screens if needed */}
            <div className="hidden xs:flex flex-col gap-0"> {/* 'xs' is a custom breakpoint or use 'sm' */}
                                                          {/* Or simply let truncation handle it */}
              <h3 className="text-dark font-lato font-bold text-sm truncate max-w-[80px] xs:max-w-[100px] sm:max-w-[120px] lg:max-w-[150px]">
                {names || "User Name"}
              </h3>
              <p className="text-placeholder text-xs font-semibold capitalize truncate max-w-[80px] xs:max-w-[100px] sm:max-w-[120px]">
                {role ? role.toLowerCase() : "Role"}
              </p>
            </div>
          </div>

          {showDropdown && (
            <div
              className="absolute top-full mt-2 right-0 z-20 bg-white rounded-lg shadow-xl w-auto min-w-[180px] sm:min-w-[200px] max-w-[240px] overflow-hidden"
            >
              <button
                onClick={switchRoleAndCloseDropdown}
                className="w-full text-left block px-4 py-3 text-sm text-dark font-lato hover:bg-primary-100 hover:text-primary-600 transition-colors duration-150 ease-in-out"
              >
                Switch to {role === "SCOUT" ? "Player" : role === "PLAYER" ? "Scout" : ""}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;