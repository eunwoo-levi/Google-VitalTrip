import { fetchEncyclopedia } from '@/src/features/encyclopedia/api/encyclopediaApi';
import { EncyclopediaClient } from '@/src/features/encyclopedia/ui/EncyclopediaClient';
import Navbar from '@/src/widgets/navbar/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '응급 사전 - Vital Trip',
  description: '500개 이상의 의료 질환과 응급처치 가이드를 검색하세요.',
  alternates: { canonical: '/encyclopedia' },
  openGraph: {
    title: '응급 사전 - Vital Trip',
    description: '500개 이상의 의료 질환과 응급처치 가이드를 검색하세요.',
    url: '/encyclopedia',
    type: 'website',
  },
};

export default async function EncyclopediaPage() {
  const { total, items } = await fetchEncyclopedia();

  return (
    <div className='pt-16'>
      <Navbar />
      <EncyclopediaClient initialItems={items} total={total} />
    </div>
  );
}
