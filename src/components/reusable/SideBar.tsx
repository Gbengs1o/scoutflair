"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { useToken } from "@/providers/AuthProvider";
import SignOutIcon from "@/public/icons/Sign Out Icon.svg";
import { clearUserData } from "@/stores/userStore";

export interface iNavItem {
  name: string;
  icon: StaticImageData;
  link: string;
}

const SideBar: React.FC<{
  items: iNavItem[];
  active: number;
  isOpen: boolean;
  onClose: () => void;
}> = ({ items, active, isOpen, onClose }) => {
  const { removeToken } = useToken();
  const router = useRouter();

  const handleSignOut = () => {
    removeToken();
    clearUserData();
    router.replace("/auth/login");
  };

  return (
    <>
      {/* Overlay: appears on mobile when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-72 flex-col
                   bg-primary-2 text-white
                   transform transition-transform duration-300 ease-in-out
                   lg:relative lg:w-[20%] lg:translate-x-0
                   ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col justify-between p-5 pl-6 lg:pl-10">
          {/* Top section: Logo and Nav */}
          <div>
            <div className="flex items-center justify-between mb-12">
              <Link href="/" aria-label="Go to homepage">
                <Logo color="white" />
              </Link>

              {/* Close button for mobile */}
              <button
                onClick={onClose}
                className="lg:hidden p-2 -mr-2 text-white"
                aria-label="Close sidebar"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {items.map((item, i) => (
                <NavComponent key={i} item={item} active={i === active} />
              ))}
            </nav>
          </div>

          {/* Bottom section: Sign Out */}
          <div>
            <div
              className="nav-item hover:scale-105 scale-100 transition-transform ease-out duration-200 h-12 leading-5 px-4 flex gap-2 items-center cursor-pointer rounded-md hover:bg-white/10"
              onClick={handleSignOut}
            >
              <Image
                src={SignOutIcon}
                alt="sign out"
                className="size-6"
                width={32}
                height={32}
              />
              <p>Sign Out</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

const NavComponent: React.FC<{
  item: iNavItem;
  active: boolean;
}> = ({ item, active }) => {
  return (
    <Link
      href={item.link}
      className={`nav-item hover:scale-105 scale-100 transition-transform ease-out duration-200 text-white h-12 leading-5 px-4 flex gap-2 items-center cursor-pointer ${
        active
          ? "bg-primary-4 border-[3px] border-y-0 border-r-0 border-secondary-3 rounded"
          : "hover:bg-white/10 rounded-md"
      }`}
    >
      <Image
        src={item.icon}
        alt={item.name}
        className="size-6"
        width={32}
        height={32}
      />
      <p>{item.name}</p>
    </Link>
  );
};

export default SideBar;