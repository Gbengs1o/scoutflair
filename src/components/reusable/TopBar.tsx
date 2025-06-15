"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearchOutline, IoChevronDownCircleOutline } from "react-icons/io5";

import ProfileImageOrTextAvatar from "./ProfileImageOrTextAvatar";
import { useCurrentUserStore } from "@/stores/userStore";
import { Urls } from "@/constants/constants";

const TopBar: React.FC<{ toggleSidebar: () => void }> = ({
  toggleSidebar,
}) => {
  const [show, setShow] = React.useState(false);
  const toggle = () => setShow((prev) => !prev);
  const role = useCurrentUserStore((state) => state.role);
  const image = useCurrentUserStore((state) => state.image);
  const names = useCurrentUserStore((state) => state.name);

  const router = useRouter();

  const switchRole = () => {
    if (role === "SCOUT") {
      setShow(false);
      router.replace(Urls.PLAYER_SPOTLIGHT);
    } else if (role === "PLAYER") {
      setShow(false);
      router.replace(Urls.SCOUT_OVERVIEW);
    }
  };

  return (
    <div className="flex items-center w-full bg-white shadow-custom h-16 px-4 sm:px-6">
      {/* Hamburger Menu - visible on mobile/tablet */}
      <button
        onClick={toggleSidebar}
        className="text-gray-700 p-2 -ml-2 lg:hidden"
        aria-label="Open sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Right side content, pushed to the right */}
      <div className="flex items-center gap-4 sm:gap-8 ml-auto">
        {/*
        <div className="relative w-full max-w-xs hidden md:block">
            <input
            className="h-10 rounded-full w-full border pl-11 bg-[#F5F6FA] pr-4 text-sm border-border-gray placeholder:text-placeholder font-lato text-dark"
            placeholder="Search"
            />
            <IoSearchOutline className="absolute inset-y-1/2 -translate-y-1/2 left-4 text-xl text-placeholder" />
        </div>
        */}

        {/*
        <div className="w-fit flex gap-8 items-center">
          <IoMdNotificationsOutline className="text-2xl text-black" />
        </div>
        */}

        <div className="flex gap-3 items-center w-fit relative">
          <ProfileImageOrTextAvatar
            image={image}
            name={names}
            radius="rounded-full"
            size="size-11"
          />

          <div className="flex flex-col gap-1 cursor-pointer" onClick={toggle}>
            <h3 className="text-dark font-lato font-bold text-14-16">
              {names}
            </h3>
            <p className="text-placeholder text-12-14 font-semibold">{role}</p>
          </div>

          {show && (
            <div
              className="absolute top-full mt-2 right-0 w-48 bg-white rounded-lg shadow-lg z-50"
              onMouseLeave={() => setShow(false)}
            >
              <h3
                onClick={switchRole}
                className="hover:bg-primary hover:text-white rounded-lg p-4 text-dark font-lato font-bold text-14-16 cursor-pointer"
              >
                Switch to{" "}
                {role === "SCOUT" ? "Player" : role === "PLAYER" ? "Scout" : ""}
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;