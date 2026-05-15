import { CATEGORY_BORDER, CATEGORY_COLORS, CATEGORY_ICONS, EncyclopediaItem, getCategory } from '../types';

interface Props {
  item: EncyclopediaItem;
  categoryLabel: string;
}

export function EncyclopediaCard({ item, categoryLabel }: Props) {
  const category = getCategory(item.categories);
  const borderClass = CATEGORY_BORDER[category];
  const badgeClass = CATEGORY_COLORS[category];
  const icon = CATEGORY_ICONS[category];
  const visibleAltTitles = item.altTitles.slice(0, 2).filter(Boolean);

  return (
    <div className='px-4 py-1.5'>
      <a
        href={item.url}
        target='_blank'
        rel='noopener noreferrer'
        className={`block rounded-xl border border-gray-100 border-l-4 ${borderClass} bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:border-gray-200 hover:shadow-md`}
      >
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0 flex-1'>
            <p className='font-semibold leading-snug text-gray-900'>{item.title}</p>
            {visibleAltTitles.length > 0 && (
              <p className='mt-0.5 truncate text-sm italic text-gray-400'>
                {visibleAltTitles.join(' · ')}
              </p>
            )}
            {item.summary && (
              <p className='mt-1.5 line-clamp-2 text-sm text-gray-500'>{item.summary}</p>
            )}
          </div>
          <span
            className={`inline-flex flex-shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
          >
            <span>{icon}</span>
            <span>{categoryLabel}</span>
          </span>
        </div>
      </a>
    </div>
  );
}
