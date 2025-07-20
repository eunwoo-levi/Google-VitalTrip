import FirstAidResult from '@/src/features/firstAid/ui/FirstAidResult';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI-Powered First Aid Assistant',
  description: 'Get instant AI-powered first aid guidance for medical emergencies. Describe your symptoms and receive step-by-step instructions for emergency care.',
  keywords: [
    'vitaltrip',
    'Google Solution Challenge',
    'Google APAC Solution Challenge',
    '2025 Google APAC Solution Challenge',
    'first aid',
    'AI emergency',
    'first aid AI',
    'emergency medical assistance',
    'medical symptoms',
    'first aid guidance',
    'emergency care',
    'medical emergency help',
    'AI medical assistant',
    'symptom checker',
    'emergency first aid',
    'medical advice'
  ],
  openGraph: {
    title: 'AI-Powered First Aid Assistant | VitalTrip',
    description: 'Get instant AI-powered first aid guidance for medical emergencies and symptoms.',
    url: '/first-aid',
    images: [
      {
        url: '/vitalTrip.webp',
        width: 1200,
        height: 630,
        alt: 'VitalTrip AI First Aid Assistant',
      },
    ],
  },
  twitter: {
    title: 'AI-Powered First Aid Assistant | VitalTrip',
    description: 'Get instant AI-powered first aid guidance for medical emergencies and symptoms.',
  },
  alternates: {
    canonical: '/first-aid',
  },
};

export default function FirstAidPage() {
  return (
    <>
      <FirstAidResult />
    </>
  );
}
