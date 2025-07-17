'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen md:h-screen flex items-center md:items-start justify-center overflow-hidden ">
            <Image
                src="/landing-image.webp"
                alt="VitalTrip Landing Image"
                className="absolute inset-0 object-cover"
                fill
                priority
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative z-10 text-center text-white px-4 md:px-6 max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-6"
                >
                    <Image
                        src="/VitalTrip.svg"
                        alt="VitalTrip Logo"
                        width={100}
                        height={100}
                        className="w-auto h-auto"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mb-8"
                >
                    <p className="text-xl md:text-2xl font-semibold text-blue-100 mb-4">
                        Hospital Finder • Medical Translation • AI First Aid
                    </p>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Everything you need for medical emergencies abroad
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-wrap justify-center gap-4 md:mb-10"
                >
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    className="inline-block"
                >
                    <Link href="/" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl">
                        Find Help Nearby
                    </Link>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 h-3 bg-white/70 rounded-full mt-2"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}