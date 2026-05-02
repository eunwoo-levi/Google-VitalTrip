import { fetchTravelAlertByCountry } from '@/src/features/travelAlert/services/travelAlertService';
import { ALARM_LEVEL } from '@/src/features/travelAlert/types/travelAlert';
import { TravelAlertCountryClient } from '@/src/features/travelAlert/ui/TravelAlertCountryClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ countryCode: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { countryCode } = await params;
  const items = await fetchTravelAlertByCountry(countryCode);
  const country = items?.[0];

  if (!country) return { title: 'Travel Alert | VitalTrip' };

  const alarmInfo = ALARM_LEVEL[country.alarm_lvl as keyof typeof ALARM_LEVEL];

  return {
    title: `${country.country_eng_nm} Travel Alert | VitalTrip`,
    description: `${country.country_eng_nm} current travel alert: ${alarmInfo?.label ?? 'No information'}. Check safety information before traveling abroad.`,
  };
}

export default async function TravelAlertPage({ params }: Props) {
  const { countryCode } = await params;
  const items = await fetchTravelAlertByCountry(countryCode);

  if (!items || items.length === 0) notFound();

  return <TravelAlertCountryClient items={items} />;
}
