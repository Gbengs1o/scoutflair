"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo"; // Assuming you have this Logo component

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Function to close the menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Effect to close the menu if the window is resized to a larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md">
      {/* Top bar - remains unchanged */}
      <div className="w-full bg-primary h-[30px]"></div>

      {/* Main Navbar container */}
      <div className="flex items-center shadow-sm justify-between w-full h-[76px] bg-white px-6 lg:px-[106px]">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} aria-label="Home">
          <Logo />
        </Link>

        {/* Desktop Navigation (Visible on lg screens and up) */}
        <div className="hidden lg:flex items-center gap-20">
          <ul className="flex gap-5 items-center">
            {navLinks.map(({ name, path }) => (
              <li key={name}>
                <Link
                  href={path}
                  className={`font-medium font-roboto text-base text-black-50 flex items-center gap-2 transition-all hover:text-black-80 ${
                    pathname === path
                      ? "font-bold text-lg text-black-80"
                      : "text-gray-600"
                  }`}
                >
                  {pathname === path && (
                    <span className="w-2 h-2 bg-black-80 rounded-full"></span>
                  )}
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

        {/* Mobile/Tablet Menu Toggle Button (Visible on screens smaller than lg) */}
        <button
          className="lg:hidden text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      <div
        className={`lg:hidden absolute top-[106px] left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out transform ${
          menuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-4 opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col items-center gap-5 py-5 border-b border-gray-200">
          {navLinks.map(({ name, path }) => (
            <li key={name} className="w-full text-center">
              <Link
                href={path}
                onClick={closeMenu} // Close menu on link click
                className={`w-full block py-2 font-medium text-base font-roboto transition-all ${
                  pathname === path
                    ? "font-bold text-lg text-black-80"
                    : "text-gray-600"
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-4 py-5">
          <Link href={"/auth/login"} onClick={closeMenu}>
            <button className="font-semibold text-black-50 text-base border-none font-poppins">
              Sign In
            </button>
          </Link>
          <Link href={"/auth/sign-up"} onClick={closeMenu}>
            <button className="font-semibold text-white rounded-[20px] font-poppins bg-primary-2 w-[109px] h-[42px] flex justify-center items-center text-base border-none">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;