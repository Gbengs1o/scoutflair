// /TopBar/TopBar.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Menu, Search, Bell, Settings, ChevronDown,
  User, LogOut, UserCheck, X as XIcon 
} from "lucide-react";
import clsx from 'clsx';

import ProfileImageOrTextAvatar from "@/components/reusable/ProfileImageOrTextAvatar";
import { useCurrentUserStore } from "@/stores/userStore";
import { Urls } from "@/constants/constants";

const TopBar = ({ onToggleSidebar, isMobileSidebarOpen }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const profileDropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  // Fetch user details from the store, similar to the first TopBar example
  const {
    role: rawRole, // Store the raw role
    image,
    name: rawName, // Store the raw name
    email: userEmail // Store the raw email
  } = useCurrentUserStore(state => ({
    role: state.role,
    image: state.image,
    name: state.name,      // Make sure your store provides 'name'
    email: state.email,    // Make sure your store provides 'email'
  }));

  // Prepare display versions with fallbacks, similar to the first TopBar
  const displayName = rawName || "User"; // Fallback to "User" (or "User Name" if you prefer)
  const displayRole = rawRole ? rawRole.toLowerCase() : "Role"; // Fallback to "Role" and lowercase

  const router = useRouter();

  const toggleProfileDropdown = () => setShowProfileDropdown(prev => !prev);

  const handleNavigationAndCloseDropdown = (url, isReplace = false) => {
    if (url) { 
        isReplace ? router.replace(url) : router.push(url);
    }
    setShowProfileDropdown(false);
  };
  
  const switchRoleAndCloseDropdown = () => {
    const targetUrl = rawRole === "SCOUT" ? Urls.PLAYER_SPOTLIGHT :
                      rawRole === "PLAYER" ? Urls.SCOUT_OVERVIEW :
                      "/dashboard/scout/overview"; 
    handleNavigationAndCloseDropdown(targetUrl, true);
  };

  const handleLogout = () => {
    console.log("Logging out..."); 
    // TODO: Add actual logout logic here
    handleNavigationAndCloseDropdown(Urls.LOGIN_PAGE || "/login");
  };

  const handleProfile = () => handleNavigationAndCloseDropdown(Urls.PROFILE_PAGE || "/dashboard/profile");
  const handleSettingsPage = () => handleNavigationAndCloseDropdown(Urls.SETTINGS_PAGE || "/dashboard/settings");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedSearch = searchValue.trim();
    if (trimmedSearch) {
      console.log("Searching for:", trimmedSearch);
      // TODO: Implement actual search logic
      if (showMobileSearch) setShowMobileSearch(false); 
      setSearchValue(""); 
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    if (showMobileSearch && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    } else if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    if (showProfileDropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileDropdown]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        if (showProfileDropdown) setShowProfileDropdown(false);
        if (showMobileSearch) setShowMobileSearch(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showProfileDropdown, showMobileSearch]);

  useEffect(() => {
    if (showMobileSearch && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [showMobileSearch]);

  const iconButtonClasses = "inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500";

  const profileDropdownItems = [
    { label: "View Profile", icon: User, action: handleProfile, id: "profile-view" },
    { 
      label: `Switch to ${rawRole === "SCOUT" ? "Player" : (rawRole === "PLAYER" ? "Scout" : "Other Role")}`,
      icon: UserCheck, 
      action: switchRoleAndCloseDropdown, 
      id: "profile-switch" 
    },
    { label: "Settings", icon: Settings, action: handleSettingsPage, mobileOnly: true, id: "profile-settings-mobile" },
  ];


  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className={clsx(iconButtonClasses, "lg:hidden mr-2 sm:mr-3")}
              aria-label={isMobileSidebarOpen ? "Close sidebar" : "Open sidebar"}
              aria-expanded={isMobileSidebarOpen}
            >
              {isMobileSidebarOpen ? (
                <XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          )}
          <div className="min-w-0">
            {/* Uses displayName which includes fallback */}
            <h1 className="text-gray-800 text-lg sm:text-xl font-semibold font-lato truncate">
              <span className="hidden sm:inline">Welcome, </span>
              <span className="sm:hidden">Hi, </span>
              {displayName}
            </h1>
          </div>
        </div>

        <div className="hidden md:flex flex-1 justify-center px-4 lg:px-8 max-w-lg">
          {/* Search form ... */}
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                ref={searchInputRef}
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search anything..."
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile search toggle, notifications, settings ... */}
          <button 
            onClick={() => setShowMobileSearch(s => !s)}
            className={clsx(iconButtonClasses, "md:hidden")}
            aria-label={showMobileSearch ? "Close search" : "Open search"}
            aria-expanded={showMobileSearch}
            aria-controls="mobile-search-form"
          >
            {showMobileSearch ? <XIcon className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          <div className="relative">
            <button className={iconButtonClasses} aria-label="Notifications">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              {/* <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span> */}
            </button>
          </div>

          <button onClick={handleSettingsPage} className={clsx(iconButtonClasses, "hidden sm:inline-flex")} aria-label="Settings">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* User Profile Dropdown Trigger */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              id="user-menu-button"
              onClick={toggleProfileDropdown}
              className="flex items-center gap-2 p-1 sm:p-1.5 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-expanded={showProfileDropdown}
              aria-haspopup="true"
              aria-controls="profile-dropdown-menu"
              aria-label={rawName && rawName !== "User" ? `${rawName}'s profile menu` : "User profile menu"}
            >
              <ProfileImageOrTextAvatar image={image} name={displayName} radius="rounded-full" size="w-8 h-8 sm:w-9" />
              <div className="hidden sm:flex flex-col items-start min-w-0">
                {/* Uses displayName */}
                <span className="text-gray-800 font-semibold text-sm truncate max-w-[100px] lg:max-w-[150px]">
                  {displayName}
                </span>
                {/* Uses displayRole */}
                <span className="text-gray-500 text-xs font-medium capitalize truncate max-w-[100px]">
                  {displayRole}
                </span>
              </div>
              <ChevronDown className={clsx("w-4 h-4 text-gray-400 transition-transform duration-200", showProfileDropdown && 'rotate-180')} />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileDropdown && (
              <>
                <div className="sm:hidden fixed inset-0 bg-black/20 z-40" onClick={() => setShowProfileDropdown(false)} aria-hidden="true" />
                <div
                  id="profile-dropdown-menu"
                  className="absolute top-full mt-2 right-0 z-50 bg-white rounded-lg shadow-xl border border-gray-100 w-56 sm:w-60 overflow-hidden py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  {/* Header in Dropdown for mobile-like view */}
                  <div className="sm:hidden px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <ProfileImageOrTextAvatar image={image} name={displayName} radius="rounded-full" size="w-10 h-10" />
                      <div className="min-w-0">
                        <p className="text-gray-900 font-semibold text-sm truncate">
                          {displayName} {/* Uses displayName */}
                        </p>
                        <p className="text-gray-500 text-xs font-medium capitalize truncate">
                          {displayRole} {/* Uses displayRole */}
                        </p>
                        {/* Display userEmail if available */}
                        {userEmail && (
                          <p className="text-gray-500 text-xs truncate" title={userEmail}>
                            {userEmail}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {profileDropdownItems.map(item => ( /* ... dropdown items ... */
                    <button
                      key={item.id}
                      onClick={item.action}
                      className={clsx(
                        "flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors",
                        item.mobileOnly && "sm:hidden"
                      )}
                      role="menuitem"
                    >
                      <item.icon className="w-4 h-4 text-gray-500" aria-hidden="true" />
                      {item.label}
                    </button>
                  ))}
                  <div className="border-t border-gray-100 my-1" role="separator"></div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    role="menuitem"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true"/>
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Form ... */}
      {showMobileSearch && (
        <div className="md:hidden border-t border-gray-200 px-4 py-3 bg-white shadow-md">
          <form onSubmit={handleSearchSubmit} id="mobile-search-form">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                ref={mobileSearchInputRef}
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search anything..."
                className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default TopBar;