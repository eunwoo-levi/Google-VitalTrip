import Script from 'next/script';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id='structured-data'
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VitalTrip',
  description:
    'Your Emergency Travel Companion - Find hospitals, translate symptoms, and get AI-powered first aid advice worldwide.',
  url: 'https://aivitaltrip.com',
  publisher: {
    '@type': 'Organization',
    name: 'VitalTrip',
    logo: {
      '@type': 'ImageObject',
      url: 'https://aivitaltrip.com/logo.webp',
    },
  },
};

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VitalTrip',
  description: 'Leading provider of emergency travel safety solutions worldwide.',
  url: 'https://aivitaltrip.com',
  logo: 'https://aivitaltrip.com/logo.webp',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Korean', 'Spanish', 'French', 'German', 'Japanese'],
  },
};

export const medicalWebsiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'VitalTrip - Emergency Medical Travel Assistant',
  description:
    'Comprehensive emergency medical assistance for travelers including hospital finder, symptom translation, and AI first aid guidance.',
  url: 'https://aivitaltrip.com',
  medicalAudience: {
    '@type': 'Patient',
    name: 'International Travelers',
  },
  about: {
    '@type': 'MedicalCondition',
    name: 'Travel-related Medical Emergencies',
  },
  author: {
    '@type': 'Organization',
    name: 'VitalTrip Medical Team',
  },
  dateModified: new Date().toISOString(),
  inLanguage: ['en', 'ko', 'es', 'fr', 'de', 'ja'],
};
