import { FeaturesSection, HeroSection, VideoSection, Footer } from '@/src/widgets/about';
import Navbar from '@/src/widgets/navbar/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About VitalTrip - Your Essential Travel Safety Companion',
  description:
    "Learn about VitalTrip's mission to provide comprehensive travel safety solutions. Find hospitals, translate symptoms, and get AI first aid guidance. Everything you need for medical emergencies abroad.",
  keywords: [
    'vitaltrip',
    'Google Solution Challenge',
    'Google APAC Solution Challenge',
    '2025 Google APAC Solution Challenge',
    'first aid',
    'AI emergency',
    'travel safety companion',
    'emergency medical services',
    'hospital finder app',
    'medical translation service',
    'first-aid AI technology',
    'travel health solutions',
    'emergency travel assistance',
    'medical tourism support',
    'healthcare travel guide',
    'emergency preparedness',
    'travel safety features',
  ],
  openGraph: {
    title: 'About VitalTrip - Your Essential Travel Safety Companion',
    description:
      'Discover how VitalTrip revolutionizes travel safety with AI-powered medical assistance, hospital finding, and emergency translation services.',
    type: 'website',
    url: '/about',
    images: [
      {
        url: '/vitalTrip.webp',
        width: 1200,
        height: 630,
        alt: 'VitalTrip About - Travel Safety Solutions',
      },
    ],
  },
  twitter: {
    title: 'About VitalTrip - Your Essential Travel Safety Companion',
    description:
      'Discover how VitalTrip revolutionizes travel safety with AI-powered medical assistance and emergency services.',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className='min-h-screen overflow-x-hidden md:pt-16'>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <VideoSection />
      <Footer />
    </div>
  );
}
