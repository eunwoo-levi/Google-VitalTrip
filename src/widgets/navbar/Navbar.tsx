'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'motion/react';

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
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <img src="/VitalTrip.svg" alt="VitalTrip Logo" className="h-12 w-auto" />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8 font-bold">
                        <Link
                            href="/"
                            className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                            <span>Home</span>
                        </Link>
                        <Link
                            href="/translate"
                            className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                            <span>Translate</span>
                        </Link>
                        <Link
                            href="/first-aid"
                            className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                            <span>First Aid</span>
                        </Link>

                    </div>

                    <Link
                        href="/login"
                        onClick={closeMenu}
                        className="hidden md:flex items-center space-x-2 px-3 py-2 mx-2 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 justify-center"
                    >
                        <span>로그인</span>
                    </Link>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        >
                            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden border-t border-gray-200"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            <motion.div
                                className="px-2 pt-2 pb-3 space-y-1"
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <Link
                                    href="/"
                                    onClick={closeMenu}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 justify-center"
                                >
                                    <span>Hospital & Pharmacy Nearby</span>
                                </Link>
                                <Link
                                    href="/translate"
                                    onClick={closeMenu}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 justify-center"
                                >
                                    <span>Translate</span>
                                </Link>
                                <Link
                                    href="/first-aid"
                                    onClick={closeMenu}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 justify-center"
                                >
                                    <span>First Aid</span>
                                </Link>
                                <Link
                                    href="/login"
                                    onClick={closeMenu}
                                    className="flex items-center space-x-2 px-3 py-2 mx-2 mt-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 justify-center"
                                >
                                    <span>로그인</span>
                                </Link>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav >
    );
} 