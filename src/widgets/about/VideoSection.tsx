'use client';

import { motion } from 'motion/react';

export default function VideoSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-4xl mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        See VitalTrip in Action
                    </h2>
                    <p className="text-xl text-gray-600">
                        Watch how VitalTrip helps travelers in emergency situations
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl"
                >
                    <iframe
                        src="https://www.youtube.com/embed/Ikz8brbULTk"
                        title="VitalTrip Demo"
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </motion.div>
            </div>
        </section>
    );
}