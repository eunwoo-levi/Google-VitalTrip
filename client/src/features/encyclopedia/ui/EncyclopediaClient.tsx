'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from '@/src/shared/lib/i18n';
import { CATEGORY_ICONS, CategoryKey, EncyclopediaItem, getCategory } from '../types';
import { EncyclopediaCard } from './EncyclopediaCard';

const CATEGORY_KEYS: CategoryKey[] = [
  'all',
  'infectious',
  'cardiovascular',
  'respiratory',
  'digestive',
  'neurological',
  'injury',
  'other',
];

interface Props {
  items: EncyclopediaItem[];
}

export function EncyclopediaClient({ items }: Props) {
  const { t } = useTranslation('common');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryKey>('all');
  const parentRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === 'all' || getCategory(item.icdCode) === category;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.synonyms?.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [items, query, category]);

  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
    paddingEnd: 96,
  });

  return (
    <div className='flex flex-col bg-slate-50' style={{ height: 'calc(100vh - 64px)' }}>
      {/* 헤더 + 검색 */}
      <div className='flex-shrink-0 bg-gradient-to-br from-red-600 via-red-600 to-rose-700 px-6 py-8'>
        <div className='mx-auto max-w-3xl'>
          <div className='mb-1 flex items-center gap-2'>
            <span className='text-3xl'>🏥</span>
            <h1 className='text-3xl font-bold tracking-tight text-white'>
              {t('encyclopedia.title')}
            </h1>
          </div>
          <p className='mb-6 text-sm text-red-100'>
            {t('encyclopedia.subtitle', { count: items.length })}
          </p>
          <div className='relative'>
            <span className='pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-lg text-gray-400'>
              🔍
            </span>
            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('encyclopedia.search_placeholder')}
              className='w-full rounded-2xl bg-white py-3.5 pr-12 pl-11 text-base shadow-lg outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/50'
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label={t('encyclopedia.clear_search')}
                className='absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600'
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className='flex-shrink-0 border-b border-gray-100 bg-white shadow-sm'>
        <div className='mx-auto max-w-3xl px-4 py-3'>
          <div className='flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            {CATEGORY_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  category === key
                    ? 'bg-red-500 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <span>{CATEGORY_ICONS[key]}</span>
                <span>{t(`encyclopedia.categories.${key}`)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 결과 카운터 */}
      <div className='mx-auto flex w-full max-w-3xl flex-shrink-0 items-center justify-between px-6 py-2.5'>
        <span className='text-sm text-gray-500'>
          {query || category !== 'all'
            ? t('encyclopedia.results', { count: filtered.length })
            : t('encyclopedia.total', { count: items.length })}
        </span>
        <span className='text-xs text-gray-400 tabular-nums'>
          {t('encyclopedia.dom_counter', {
            rendered: virtualizer.getVirtualItems().length,
            total: filtered.length,
          })}
        </span>
      </div>

      {/* 가상화 리스트 */}
      <div className='mx-auto min-h-0 w-full max-w-3xl flex-1 px-2'>
        {filtered.length === 0 ? (
          <div className='flex h-full flex-col items-center justify-center rounded-2xl bg-white text-gray-400'>
            <span className='mb-3 text-5xl'>🔍</span>
            <p className='font-medium text-gray-500'>{t('encyclopedia.no_results')}</p>
            <p className='mt-1 text-sm'>{t('encyclopedia.no_results_hint')}</p>
          </div>
        ) : (
          <div ref={parentRef} className='h-full overflow-y-auto'>
            <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const item = filtered[virtualItem.index];
                const categoryLabel = t(`encyclopedia.categories.${getCategory(item.icdCode)}`);
                return (
                  <div
                    key={virtualItem.key}
                    data-index={virtualItem.index}
                    ref={virtualizer.measureElement}
                    style={{
                      position: 'absolute',
                      top: virtualItem.start,
                      left: 0,
                      width: '100%',
                    }}
                  >
                    <EncyclopediaCard item={item} categoryLabel={categoryLabel} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
