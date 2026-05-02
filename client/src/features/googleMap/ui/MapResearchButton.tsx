'use client';

import { useTranslation } from '@/src/shared/lib/i18n';

interface Props {
  show: boolean;
  onClick: () => void;
}

export function MapResearchButton({ show, onClick }: Props) {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <button
      onClick={onClick}
      className='absolute top-[195px] left-1/2 z-10 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-sm font-medium shadow-lg transition hover:bg-gray-50 lg:top-[145px]'
    >
      {t('map.research_area')}
    </button>
  );
}
