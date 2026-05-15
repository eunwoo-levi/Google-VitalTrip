import {
  CATEGORY_BORDER,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  EncyclopediaItem,
  getCategory,
} from '../types';

interface Props {
  item: EncyclopediaItem;
  categoryLabel: string;
}

export function EncyclopediaCard({ item, categoryLabel }: Props) {
  const category = getCategory(item.icdCode);
  const borderClass = CATEGORY_BORDER[category];
  const badgeClass = CATEGORY_COLORS[category];
  const icon = CATEGORY_ICONS[category];
  const visibleSynonyms = item.synonyms?.slice(0, 2).filter(Boolean) ?? [];

  return (
    <div className='px-4 py-1.5'>
      <div
        className={`rounded-xl border border-l-4 border-gray-100 ${borderClass} bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-md`}
      >
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0 flex-1'>
            <p className='leading-snug font-semibold text-gray-900'>{item.name}</p>
            {visibleSynonyms.length > 0 && (
              <p className='mt-1 truncate text-sm text-gray-400 italic'>
                {visibleSynonyms.join(' · ')}
              </p>
            )}
          </div>
          <div className='flex flex-shrink-0 flex-col items-end gap-1.5'>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
            >
              <span>{icon}</span>
              <span>{categoryLabel}</span>
            </span>
            {item.icdCode && (
              <span className='font-mono text-xs text-gray-400'>{item.icdCode}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
