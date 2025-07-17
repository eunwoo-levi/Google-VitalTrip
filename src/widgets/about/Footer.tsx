import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <img src="/VitalTrip.svg" alt="VitalTrip Logo" className="h-12 w-auto" />
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Your essential travel safety companion. <br />
                            Helping travelers handle medical emergencies abroad with confidence.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-blue-400">Features</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <Link href="/" className="hover:text-blue-400 transition-colors duration-200">
                                    Hospital & Pharmacy Nearby
                                </Link>
                            </li>
                            <li>
                                <Link href="/translate" className="hover:text-blue-400 transition-colors duration-200">
                                    Medical Translation
                                </Link>
                            </li>
                            <li>
                                <Link href="/first-aid" className="hover:text-blue-400 transition-colors duration-200">
                                    AI First Aid Assistant
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-blue-400">Get in Touch</h3>
                        <div className="flex space-x-4 flex-col gap-2">
                            <a
                                href="mailto:eunwoo1341@gmail.com"
                                className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors duration-200"
                            >
                                <FaEnvelope size={18} />
                                <span>Contact Us</span>
                            </a>
                            <span>eunwoo1341@gmail.com</span>

                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-6 pt-6">
                    <div className="text-center text-gray-400 text-sm">
                        © {currentYear} VitalTrip. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
} 