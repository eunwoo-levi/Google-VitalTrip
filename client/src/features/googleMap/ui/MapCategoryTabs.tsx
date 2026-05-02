'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import type { CategoryKey } from '../hooks/useMapControls';

interface Props {
  activeCategory: CategoryKey;
  onChange: (category: CategoryKey) => void;
}

export function MapCategoryTabs({ activeCategory, onChange }: Props) {
  const { t } = useTranslation();

  const categories: { key: CategoryKey; label: string }[] = [
    { key: 'all', label: t('map.category_all') },
    { key: 'pharmacy', label: t('medical.types.pharmacy') },
    { key: 'hospital', label: t('medical.types.hospital') },
  ];

  return (
    <div className='flex justify-center gap-2'>
      {categories.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium shadow-md transition ${
            activeCategory === key
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
