'use client';

import Navbar from '@/src/widgets/navbar/Navbar';
import { FeaturesSection, Footer, HeroSection, VideoSection } from '../about/_components';

export default function AboutClient() {
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
