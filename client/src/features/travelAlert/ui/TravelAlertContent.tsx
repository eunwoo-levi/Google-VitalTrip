'use client';

import { useTranslation } from '@/src/shared/lib/i18n';
import Image from 'next/image';
import { ALARM_LEVEL, TravelAlertItem } from '../types/travelAlert';

interface Props {
  items: TravelAlertItem[];
  alarmInfo: (typeof ALARM_LEVEL)[keyof typeof ALARM_LEVEL] | undefined;
}

export const TravelAlertContent = ({ items, alarmInfo }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='space-y-6'>
      {/* 경보단계 배너 */}
      {alarmInfo && (
        <div className={`rounded-2xl border-2 ${alarmInfo.border} ${alarmInfo.bg} p-8`}>
          <div className='flex items-center gap-4'>
            <AlarmBadge alarmInfo={alarmInfo} />
            <div>
              <h2 className={`text-2xl font-bold ${alarmInfo.text}`}>
                {t(`travelAlert.alarm_levels.${items[0].alarm_lvl}`)}
              </h2>
              <p className='mt-1 text-gray-600'>{t('travelAlert.ministry_designation')}</p>
            </div>
          </div>
        </div>
      )}

      {/* 경보 상세 목록 */}
      <div className='overflow-hidden rounded-2xl bg-white shadow-xl'>
        <div className='bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6 text-white'>
          <h2 className='text-xl font-bold'>{t('travelAlert.regional_detail_title')}</h2>
          <p className='mt-1 text-sm text-slate-300'>
            {t('travelAlert.total_regions', { count: items.length })}
          </p>
        </div>
        <div className='divide-y divide-gray-100'>
          {items.map((item, idx) => {
            const level = ALARM_LEVEL[item.alarm_lvl as keyof typeof ALARM_LEVEL];
            return (
              <div key={idx} className='flex items-start gap-4 p-6'>
                <div className='mt-1 flex-shrink-0'>
                  {level && (
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${level.bg} ${level.text}`}
                    >
                      {t('travelAlert.level_label', { level: item.alarm_lvl })} ·{' '}
                      {t(`travelAlert.alarm_levels.${item.alarm_lvl}`)}
                    </span>
                  )}
                </div>
                <div className='flex-1'>
                  <div className='font-semibold text-gray-900'>
                    {item.region_ty === '전체'
                      ? t('travelAlert.all_regions')
                      : item.remark || item.region_ty}
                  </div>
                  {item.written_dt && (
                    <p className='mt-1 text-sm text-gray-600'>
                      {t('travelAlert.updated_date', { date: item.written_dt })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 위험지도 */}
      {items[0]?.dang_map_download_url && (
        <div className='overflow-hidden rounded-2xl bg-white shadow-xl'>
          <div className='bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6 text-white'>
            <h2 className='text-xl font-bold'>{t('travelAlert.danger_map')}</h2>
          </div>
          <div className='p-6'>
            <Image
              src={items[0].dang_map_download_url}
              alt={t('travelAlert.danger_map')}
              width={0}
              height={0}
              sizes='100vw'
              className='h-auto w-full rounded-xl object-contain'
            />
          </div>
        </div>
      )}

      {/* 경보 단계 안내 */}
      <AlarmLevelGuide />

      {/* 출처 */}
      <p className='text-center text-sm text-gray-600'>
        {t('travelAlert.source')} (
        <a
          href='https://www.0404.go.kr'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          0404.go.kr
        </a>
        )
      </p>
    </div>
  );
};

const AlarmBadge = ({
  alarmInfo,
}: {
  alarmInfo: (typeof ALARM_LEVEL)[keyof typeof ALARM_LEVEL];
}) => {
  const emojiMap = { blue: '💙', yellow: '⚠️', orange: '🟠', red: '🚫' };
  return (
    <span className='text-5xl'>{emojiMap[alarmInfo.color as keyof typeof emojiMap] ?? '⚠️'}</span>
  );
};

const AlarmLevelGuide = () => {
  const { t } = useTranslation();
  return (
    <div className='overflow-hidden rounded-2xl bg-white shadow-xl'>
      <div className='bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6 text-white'>
        <h2 className='text-xl font-bold'>{t('travelAlert.alert_level_guide')}</h2>
      </div>
      <div className='grid grid-cols-2 gap-4 p-6 sm:grid-cols-4'>
        {Object.entries(ALARM_LEVEL).map(([level, info]) => (
          <div
            key={level}
            className={`rounded-xl border-2 ${info.border} ${info.bg} p-4 text-center`}
          >
            <div className={`text-2xl font-bold ${info.text}`}>
              {t('travelAlert.level_label', { level })}
            </div>
            <div className={`mt-1 text-sm font-semibold ${info.text}`}>
              {t(`travelAlert.alarm_levels.${level}`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
