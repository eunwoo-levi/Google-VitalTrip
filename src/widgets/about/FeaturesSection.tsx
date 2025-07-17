'use client';

import { motion } from 'motion/react';
import { FaMapMarkedAlt, FaLanguage, FaRobot, FaHospitalAlt } from 'react-icons/fa';

export default function FeaturesSection() {
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mb-6"
                    >
                        <div className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg mb-4">
                            <span className="text-lg font-bold">🏆</span>
                            <span className="ml-2 text-sm md:text-base font-semibold">
                                2025 Google Asia-Pacific Solution Challenge - Top 10 Finalists
                            </span>
                        </div>
                    </motion.div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Why Choose VitalTrip?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Overcoming language barriers and quickly locating healthcare facilities worldwide
                    </p>
                </motion.div>

                <div className="mb-16">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="relative z-10">
                            <FaRobot className="text-5xl mb-6 mx-auto" />
                            <h3 className="text-3xl font-bold mb-4">AI First Aid</h3>
                            <p className="text-xl text-red-100">Get AI-powered emergency response advice and first aid guidance</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white border-l-4 border-green-500 p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
                    >
                        <FaLanguage className="text-green-500 text-3xl mb-4 mx-auto" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Smart Translation</h3>
                        <p className="text-gray-600 text-sm">Translate symptoms and communicate clearly with medical staff</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="bg-blue-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center"
                    >
                        <FaHospitalAlt className="text-3xl mb-4 mx-auto" />
                        <h3 className="text-lg font-bold mb-2">Emergency Locations</h3>
                        <p className="text-blue-100 text-sm">Find nearby hospitals & pharmacies with real-time location data</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white border border-purple-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative text-center"
                    >
                        <div className="absolute top-2 right-2 w-3 h-3 bg-purple-500 rounded-full"></div>
                        <FaMapMarkedAlt className="text-purple-500 text-3xl mb-4 mx-auto" />
                        <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
                        <p className="text-gray-600 text-sm">Access travel chatbot and emergency contacts anytime, anywhere</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}