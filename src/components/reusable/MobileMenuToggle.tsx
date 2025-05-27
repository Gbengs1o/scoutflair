'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { Urls } from '@/constants/constants';

const MobileMenuToggle: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <button onClick={toggleMenu} className="text-black">
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            {isMenuOpen && (
                <div className="bg-[#192b4d] px-6 py-4">
                    <nav className="flex flex-col gap-4">
                        <Link href={Urls.HOME} className="text-xl text-white">
                            Home
                        </Link>
                        <Link href={Urls.ABOUT} className="text-xl text-white">
                            About
                        </Link>
                        <Link href={Urls.SERVICES} className="text-xl text-white">
                            Services
                        </Link>
                        <Link href={Urls.BLOGS} className="text-xl text-white">
                            Blogs
                        </Link>
                        <Link href={Urls.CONTACT} className="text-xl text-white">
                            Contact
                        </Link>
                        <Link href={Urls.SIGNUP} className="block mt-4">

                            <button className="w-full py-2 bg-[#f2a725] text-black font-bold rounded-lg shadow-md">
                                Sign Up
                            </button>

                        </Link>
                        <Link href={Urls.LOGIN} className="block mt-4">

                            <button className="w-full py-2 bg-[#f2a725] text-black font-bold rounded-lg shadow-md">
                                Log In
                            </button>

                        </Link>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default MobileMenuToggle;
