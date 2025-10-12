import { FeaturesSection, Footer, HeroSection, VideoSection } from '@/app/about/_components';
import {
  defaultLanguage,
  getTranslations,
  isValidLanguage,
  supportedLanguages,
} from '@/app/about/_utils/translations';
import Navbar from '@/src/widgets/navbar/Navbar';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';
export const dynamicParams = false;

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateStaticParams() {
  return supportedLanguages.map((lang) => ({
    lang,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;

  const validLang = isValidLanguage(lang) ? lang : defaultLanguage;
  const translations = getTranslations(validLang);
  const isDefault = validLang === defaultLanguage;

  const languageUrls = supportedLanguages.reduce<Record<string, string>>((acc, language) => {
    acc[language] = language === defaultLanguage ? '/about' : `/about/${language}`;
    return acc;
  }, {});

  return {
    title: translations.meta.title,
    description: translations.meta.description,
    keywords: translations.meta.keywords,
    openGraph: {
      title: translations.meta.openGraph.title,
      description: translations.meta.openGraph.description,
      type: 'website',
      url: isDefault ? '/about' : `/about/${validLang}`,
      images: [
        {
          url: '/vitalTrip.webp',
          width: 1200,
          height: 630,
          alt: translations.meta.openGraph.title,
        },
      ],
    },
    twitter: {
      title: translations.meta.twitter.title,
      description: translations.meta.twitter.description,
    },
    alternates: {
      canonical: isDefault ? '/about' : `/about/${validLang}`,
      languages: languageUrls,
    },
  };
}

export default async function AboutLangPage({ params }: PageProps) {
  const { lang } = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  const translations = getTranslations(lang);

  return (
    <div className='min-h-screen overflow-x-hidden md:pt-16'>
      <Navbar />
      <HeroSection translations={translations} />
      <FeaturesSection translations={translations} />

      <VideoSection translations={translations} />
      <Footer translations={translations} />
    </div>
  );
}
