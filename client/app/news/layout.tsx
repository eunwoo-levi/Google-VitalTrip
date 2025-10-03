import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical News - Vital Trip',
  description:
    'Stay updated with the latest medical news, health research, and healthcare developments from around the world.',
  alternates: {
    canonical: '/news/1',
  },
  openGraph: {
    title: 'Medical News - Vital Trip',
    description:
      'Stay updated with the latest medical news, health research, and healthcare developments from around the world.',
    url: '/news/1',
    type: 'website',
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
