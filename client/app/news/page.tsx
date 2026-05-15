import { Metadata } from 'next';
import Navbar from '@/src/widgets/navbar/Navbar';

export const metadata: Metadata = {
  title: 'First Aid Encyclopedia - Vital Trip',
  description:
    'Browse thousands of medical conditions and first aid guidelines. Search by condition name or category.',
  alternates: {
    canonical: '/news',
  },
  openGraph: {
    title: 'First Aid Encyclopedia - Vital Trip',
    description:
      'Browse thousands of medical conditions and first aid guidelines. Search by condition name or category.',
    url: '/news',
    type: 'website',
  },
};

export default function EncyclopediaPage() {
  return (
    <div className='min-h-screen bg-white pt-16'>
      <Navbar />
      <div className='flex min-h-[calc(100vh-64px)] items-center justify-center'>
        <p className='text-gray-400'>준비 중입니다.</p>
      </div>
    </div>
  );
}
