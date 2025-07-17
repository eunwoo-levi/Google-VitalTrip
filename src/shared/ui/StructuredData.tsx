import Script from 'next/script';

interface StructuredDataProps {
    data: Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps) {
    return (
        <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

// 웹사이트 구조화된 데이터
export const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VitalTrip',
    description: 'Your Emergency Travel Companion - Find hospitals, translate symptoms, and get AI-powered first aid advice worldwide.',
    url: 'https://vitaltrip.com',
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://vitaltrip.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
    },
    publisher: {
        '@type': 'Organization',
        name: 'VitalTrip',
        logo: {
            '@type': 'ImageObject',
            url: 'https://vitaltrip.com/logo.webp',
        },
    },
};

// 웹 애플리케이션 구조화된 데이터
export const webApplicationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'VitalTrip',
    description: 'Emergency travel companion providing hospital finder, medical translation, and AI first aid assistance.',
    url: 'https://vitaltrip.com',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    author: {
        '@type': 'Organization',
        name: 'VitalTrip Team',
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
    },
};

// 조직 구조화된 데이터
export const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VitalTrip',
    description: 'Leading provider of emergency travel safety solutions worldwide.',
    url: 'https://vitaltrip.com',
    logo: 'https://vitaltrip.com/logo.webp',
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'Korean', 'Spanish', 'French', 'German', 'Japanese'],
    },
    sameAs: [
        'https://twitter.com/vitaltrip',
        'https://facebook.com/vitaltrip',
        'https://linkedin.com/company/vitaltrip',
    ],
};

// 의료 웹사이트 구조화된 데이터
export const medicalWebsiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'VitalTrip - Emergency Medical Travel Assistant',
    description: 'Comprehensive emergency medical assistance for travelers including hospital finder, symptom translation, and AI first aid guidance.',
    url: 'https://vitaltrip.com',
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