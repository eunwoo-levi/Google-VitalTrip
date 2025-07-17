import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Medical Translator',
    description: 'Translate medical symptoms, conditions, and emergency phrases instantly with AI-powered translation. Support for multiple languages to help you communicate health issues abroad.',
    keywords: [
        'vitaltrip',
        'Google Solution Challenge',
        'Google APAC Solution Challenge',
        '2025 Google APAC Solution Challenge',
        'first aid',
        'AI emergency',
        'medical translator',
        'AI translation',
        'medical translation',
        'symptom translator',
        'emergency phrases',
        'medical language translation',
        'health translation service',
        'multilingual medical help',
        'medical communication abroad',
        'emergency translation',
        'healthcare translation',
        'medical interpreter'
    ],
    openGraph: {
        title: 'AI Medical Translator | VitalTrip',
        description: 'Translate medical symptoms and emergency phrases instantly with AI-powered translation in multiple languages.',
        url: '/translate',
        images: [
            {
                url: '/vitalTrip.webp',
                width: 1200,
                height: 630,
                alt: 'VitalTrip AI Medical Translator',
            },
        ],
    },
    twitter: {
        title: 'AI Medical Translator | VitalTrip',
        description: 'Translate medical symptoms and emergency phrases instantly with AI-powered translation.',
    },
    alternates: {
        canonical: '/translate',
    },
};

export default function TranslateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
} 