import { FeaturesSection, HeroSection, VideoSection, Footer } from '@/src/widgets/about';
import Navbar from '@/src/widgets/navbar/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'VitalTrip - Your Essential Travel Safety Companion',
    description: 'Find hospitals, translate symptoms, and get AI first aid guidance. Everything you need for medical emergencies abroad.',
    keywords: ['vitaltrip', 'travel safety', 'emergency medical', 'hospital finder', 'medical translation', 'first-aid'],
    openGraph: {
        title: 'VitalTrip - Your Essential Travel Safety Companion',
        description: 'Find hospitals, translate symptoms, and get AI first aid guidance. Everything you need for medical emergencies abroad.',
        type: 'website',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen overflow-x-hidden md:pt-16">
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <VideoSection />
            <Footer />
        </div>
    );
}