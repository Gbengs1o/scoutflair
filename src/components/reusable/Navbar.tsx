"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      {/* Top bar */}
      <div className="w-full bg-primary h-[30px]"></div>

      {/* Navbar container */}
      {/* Padding: px-6 for mobile, md:px-[106px] for tablet and up */}
      <div className="flex items-center shadow-sm justify-between w-full h-[76px] bg-white px-6 md:px-[106px]">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <Logo />
        </Link>

        {/* Desktop navigation: hidden on small & medium screens, flex on large screens and up */}
        {/* Responsive gap between nav links and auth buttons for desktop views */}
        <div className="hidden lg:flex items-center lg:gap-10 xl:gap-20">
          <ul className="flex gap-5 items-center">
            {navLinks.map(({ name, path }) => (
              <li key={name}>
                <Link
                  href={path}
                  className={`font-medium font-roboto text-base text-black-50 flex items-center gap-2 transition-all hover:text-black-80 ${
                    pathname === path ? "font-bold text-lg text-black-80" : ""
                  }`}
                >
                  {pathname === path && <span className="w-2 h-2 bg-black-80 rounded-full"></span>}
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <Link href={"/auth/login"}>
              <button className="font-semibold text-black-50 text-base font-poppins border-none hover:text-black-80 transition-colors">
                Sign In
              </button>
            </Link>
            <Link href={"/auth/sign-up"}>
              <button className="font-semibold text-white rounded-[20px] font-poppins bg-primary-2 w-[109px] h-[42px] flex justify-center items-center text-base border-none hover:opacity-90 transition-opacity">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile/Tablet menu toggle button: shown on small and medium screens (lg:hidden) */}
        <button
          className="lg:hidden text-black-80 focus:outline-none focus:ring-2 focus:ring-primary/50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-tablet-menu"
        >
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile/Tablet menu dropdown: shown when menuOpen is true and on small/medium screens */}
      {menuOpen && (
        <div
          id="mobile-tablet-menu"
          className="lg:hidden absolute top-[106px] left-0 w-full bg-white shadow-lg"
        >
          <ul className="flex flex-col items-center gap-1 py-4">
            {navLinks.map(({ name, path }) => (
              <li key={name} className="w-full">
                <Link
                  href={path}
                  onClick={toggleMenu}
                  className={`font-medium text-base font-roboto py-3 flex items-center gap-2 justify-center transition-all w-full hover:bg-gray-100 ${
                    pathname === path ? "font-bold text-lg text-black-80" : "text-black-50"
                  }`}
                >
                  {pathname === path && <span className="w-2 h-2 bg-black-80 rounded-full"></span>}
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-3 pb-5 pt-4 border-t border-gray-200">
            <Link href={"/auth/login"} className="w-full px-6">
              <button
                onClick={toggleMenu}
                className="font-semibold text-black-50 text-base font-poppins border-none w-full py-2.5 hover:bg-gray-100 rounded-md transition-colors"
              >
                Sign In
              </button>
            </Link>
            <Link href={"/auth/sign-up"} className="w-full px-6">
              <button
                onClick={toggleMenu}
                className="font-semibold text-white rounded-[20px] font-poppins bg-primary-2 w-full h-[42px] flex justify-center items-center text-base border-none hover:opacity-90 transition-opacity"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;