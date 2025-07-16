'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaHome, FaRegHospital, FaBars, FaTimes } from 'react-icons/fa';
import { MdGTranslate } from 'react-icons/md';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <img src="/VitalTrip.svg" alt="VitalTrip Logo" className="h-8 w-auto" />
                            <span className="text-xl font-bold text-blue-600">VitalTrip</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                            <FaHome size={18} />
                            <span>Home</span>
                        </Link>
                        <Link
                            href="/translate"
                            className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                            <MdGTranslate size={18} />
                            <span>Translate</span>
                        </Link>
                        <Link
                            href="/first-aid"
                            className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                            <FaRegHospital size={18} />
                            <span>First Aid</span>
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                            <span>About</span>
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                href="/"
                                onClick={closeMenu}
                                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                            >
                                <FaHome size={18} />
                                <span>Home</span>
                            </Link>
                            <Link
                                href="/translate"
                                onClick={closeMenu}
                                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                            >
                                <MdGTranslate size={18} />
                                <span>Translate</span>
                            </Link>
                            <Link
                                href="/first-aid"
                                onClick={closeMenu}
                                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                            >
                                <FaRegHospital size={18} />
                                <span>First Aid</span>
                            </Link>
                            <Link
                                href="/about"
                                onClick={closeMenu}
                                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                            >
                                <span>About</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
} 