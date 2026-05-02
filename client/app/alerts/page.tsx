import { AlertsPageClient } from '@/src/features/travelAlert/ui/AlertsPageClient';
import { fetchAllAlertCountries } from '@/src/features/travelAlert/services/travelAlertService';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Overseas Travel Alert | VitalTrip',
  description: 'Official travel alert information. Check destination safety before you travel.',
};

export default async function AlertsPage() {
  const countries = await fetchAllAlertCountries();

  const levelCounts = countries.reduce(
    (acc, c) => {
      acc[c.alarm_lvl] = (acc[c.alarm_lvl] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return <AlertsPageClient countries={countries} levelCounts={levelCounts} />;
}
