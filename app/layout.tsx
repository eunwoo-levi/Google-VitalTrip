import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import localFont from 'next/font/local';
import ConditionalBottomNavigateBar from '@/src/widgets/bottomNavigateBar/ui/ConditionalBottomNavigateBar';

const iansui = localFont({
  src: '../public/fonts/iansui.woff2',
  weight: '500',
  style: 'normal',
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'VitalTrip - Your Emergency Travel Companion',
  description: 'VitalTrip helps travelers respond quickly and effectively in emergency situations abroad. Find nearby hospitals, translate symptoms, get AI-powered first aid advice, and access emergency contacts worldwide.',
  keywords: ['travel safety', 'emergency travel', 'hospital finder', 'medical translation', 'first aid AI', 'travel assistant', 'emergency contacts'],
  authors: [{ name: 'VitalTrip Team' }],
  creator: 'VitalTrip',
  publisher: 'VitalTrip',
  applicationName: 'VitalTrip',
  category: 'Travel Safety',
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
  openGraph: {
    title: 'VitalTrip - Your Emergency Travel Companion',
    description: 'Smart travel guide service for emergency situations abroad. Find hospitals, translate symptoms, and get AI-powered assistance.',
    type: 'website',
    locale: 'en_US',
    siteName: 'VitalTrip',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VitalTrip - Your Emergency Travel Companion',
    description: 'Smart travel guide service for emergency situations abroad',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${iansui.className} antialiased`}>
        {children}
        <ConditionalBottomNavigateBar />
      </body>
    </html>
  );
}
