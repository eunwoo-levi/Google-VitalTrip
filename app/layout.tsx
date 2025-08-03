import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import Analytics from '@/src/apps/lib/Analytics';
import StructuredData, {
  medicalWebsiteStructuredData,
  organizationStructuredData,
  websiteStructuredData,
} from '@/src/shared/ui/StructuredData';
import ConditionalBottomNavigateBar from '@/src/widgets/bottomNavigateBar/ui/ConditionalBottomNavigateBar';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import './globals.css';

const iansui = localFont({
  src: '../public/fonts/iansui.woff2',
  weight: '500',
  style: 'normal',
  display: 'swap',
});

const GA_ID = process.env.GOOGLE_ANALYTICS_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://aivitaltrip.com'),
  title: {
    default: 'VitalTrip - Your Emergency Travel Companion',
    template: '%s | VitalTrip',
  },
  description:
    'VitalTrip helps travelers respond quickly and effectively in emergency situations abroad. Find nearby hospitals, translate symptoms, get AI-powered first aid advice, and access emergency contacts worldwide.',
  keywords: [
    'vitaltrip',
    'Google Solution Challenge',
    'Google APAC Solution Challenge',
    '2025 Google APAC Solution Challenge',
    'first aid',
    'AI emergency',
    'travel safety',
    'emergency travel',
    'hospital finder',
    'medical translation',
    'first aid AI',
    'travel assistant',
    'emergency contacts',
    'medical emergency abroad',
    'travel health',
    'emergency services',
    'medical tourism',
    'healthcare travel',
  ],
  authors: [{ name: 'VitalTrip Team', url: 'https://aivitaltrip.com' }],
  creator: 'VitalTrip',
  publisher: 'VitalTrip',
  applicationName: 'VitalTrip',
  category: 'Travel Safety',
  classification: 'Travel & Health',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'ko-KR': '/ko',
    },
  },
  icons: {
    icon: [
      { url: '/logo.webp', sizes: '32x32', type: 'image/webp' },
      { url: '/logo.webp', sizes: '16x16', type: 'image/webp' },
    ],
    shortcut: '/logo.webp',
    apple: [{ url: '/logo.webp', sizes: '180x180', type: 'image/webp' }],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/logo.webp',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'VitalTrip',
    title: 'VitalTrip - Your Emergency Travel Companion',
    description:
      'Smart travel guide service for emergency situations abroad. Find hospitals, translate symptoms, and get AI-powered assistance.',
    images: [
      {
        url: '/vitalTrip.webp',
        width: 1200,
        height: 630,
        alt: 'VitalTrip - Emergency Travel Companion',
        type: 'image/webp',
      },
      {
        url: '/vitalTrip.webp',
        width: 800,
        height: 600,
        alt: 'VitalTrip Logo',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vitaltrip',
    creator: '@vitaltrip',
    title: 'VitalTrip - Your Emergency Travel Companion',
    description: 'Smart travel guide service for emergency situations abroad',
    images: ['/vitalTrip.webp'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-site-verification-code',
    other: {
      'msvalidate.01': 'bing-site-verification-code',
    },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'VitalTrip',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#2563eb',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link rel='dns-prefetch' href='https://maps.googleapis.com' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='color-scheme' content='light dark' />
      </head>
      <body className={`${iansui.className} antialiased`}>
        <StructuredData data={websiteStructuredData} />
        <StructuredData data={organizationStructuredData} />
        <StructuredData data={medicalWebsiteStructuredData} />
        {children}
        <ConditionalBottomNavigateBar />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
