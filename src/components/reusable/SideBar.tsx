"use client"; // Keep this if you use client-side hooks like useRouter, useToken

import React from "react";
import Logo from "./Logo"; // Assuming Logo component exists
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToken } from "@/providers/AuthProvider"; // Assuming AuthProvider and useToken exist
import SignOutIcon from "@/public/icons/Sign Out Icon.svg"; // This is an SVG, ensure it's handled correctly
import { clearUserData } from "@/stores/userStore"; // Assuming userStore exists

// Assuming SignOutIcon is used as StaticImageData, if it's a ReactComponent, type needs adjustment
// If SignOutIcon is an SVG path string, then it's fine.
// For consistency with iNavItem, let's assume it can be treated like StaticImageData
// or you might need a more generic icon type.
// For this example, we'll cast it or assume it's compatible.

export interface iNavItem {
  name: string;
  icon: StaticImageData; // Or a more generic type if icons can be components
  link: string;
}

// Updated Props for SideBar
interface iSideBarProps {
  items: iNavItem[];
  active: number;
  isOpen?: boolean;      // For mobile: is the sidebar currently open?
  onClose?: () => void;  // For mobile: function to call to close the sidebar
}

const SideBar: React.FC<iSideBarProps> = ({
  items,
  active,
  isOpen,
  onClose,
}) => {
  const { removeToken } = useToken();
  const router = useRouter();

  const handleSignOut = () => {
    if (isOpen && onClose) { // If mobile and sidebar is open, close it first
      onClose();
    }
    removeToken();
    clearUserData();
    router.replace("/auth/login");
  };

  return (
    // The parent layout now controls the exact width and fixed/relative positioning.
    // This div should fill the container given by the parent.
    // bg-primary-2 and text-white are good defaults for the sidebar's own theme.
    <div className="w-full h-full flex flex-col bg-primary-2 text-white">
      {/* Top Section: Logo and Mobile Close Button */}
      <div className={`
        flex items-center justify-between
        px-6 h-16 md:h-20 shrink-0  // Consistent padding & height, md for larger logo/spacing
        border-b border-primary-3/30   // Optional: separator line
      `}>
        <Logo color="white" />
        {isOpen && onClose && ( // Show close button only in mobile-open state
          <button
            onClick={onClose}
            className="md:hidden p-2 -mr-2 text-white hover:bg-primary-3/50 rounded-full" // -mr-2 for better spacing
            aria-label="Close menu"
          >
            {/* Simple X SVG icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation Items - Scrollable */}
      <nav className="flex-grow overflow-y-auto py-4 px-2 md:px-4">
        {items.map((item, i) => (
          <NavComponent
            key={i}
            item={item}
            active={i === active}
            isMobileOpen={isOpen} // Pass down to NavComponent
            onMobileNavClick={onClose} // Pass down to NavComponent
          />
        ))}
      </nav>

      {/* Sign Out Button - at the bottom */}
      <div className={`
        px-6 py-4 shrink-0         // Consistent padding
        border-t border-primary-3/30 // Optional: separator line
      `}>
        <button // Changed to button for better accessibility and clear intent
          onClick={handleSignOut}
          className="w-full nav-item hover:bg-primary-3/40 hover:scale-105 scale-100 transition-all ease-out duration-200 text-white h-12 leading-5 px-4 flex gap-3 items-center cursor-pointer rounded-md"
        >
          <Image
            src={SignOutIcon as StaticImageData} // Cast if necessary, or ensure type compatibility
            alt="Sign out"
            className="size-5 md:size-6" // Slightly smaller icon for consistency
            width={24} // Adjust if needed
            height={24} // Adjust if needed
          />
          <p className="text-sm md:text-base">Sign Out</p>
        </button>
      </div>
    </div>
  );
};

// Updated Props for NavComponent
interface NavComponentProps {
  item: iNavItem;
  active: boolean;
  isMobileOpen?: boolean;
  onMobileNavClick?: () => void;
}

const NavComponent: React.FC<NavComponentProps> = ({
  item,
  active,
  isMobileOpen,
  onMobileNavClick,
}) => {
  const handleClick = () => {
    if (isMobileOpen && onMobileNavClick) {
      onMobileNavClick(); // Close sidebar on mobile when a nav item is clicked
    }
  };

  return (
    <Link
      href={item.link}
      onClick={handleClick}
      className={`
        nav-item group hover:bg-primary-3/40 transition-colors ease-out duration-200
        text-white h-11 md:h-12 leading-5 px-3 md:px-4 mx-1 md:mx-0 mb-1
        flex gap-3 items-center cursor-pointer rounded-md
        text-sm md:text-base
        focus:outline-none focus:ring-2 focus:ring-secondary-3/70  // Accessibility
        ${active
          ? "bg-primary-4 border-l-4 border-secondary-3 rounded-r-md rounded-l-none font-semibold" // Active state: left border
          : "border-l-4 border-transparent" // Inactive state: transparent border for consistent alignment
        }
      `}
    >
      <Image
        src={item.icon}
        alt={item.name}
        className="size-5 md:size-6 group-hover:scale-110 transition-transform" // Icon slightly smaller, hover effect
        width={24} // Adjust if needed
        height={24} // Adjust if needed
      />
      <p className="truncate">{item.name}</p> {/* Truncate long names */}
    </Link>
  );
};

export default SideBar;