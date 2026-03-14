'use client';

import { ALARM_LEVEL, TravelAlertItem } from '../types/travelAlert';

interface Props {
  items: TravelAlertItem[];
  alarmInfo: (typeof ALARM_LEVEL)[keyof typeof ALARM_LEVEL] | undefined;
}

export const TravelAlertContent = ({ items, alarmInfo }: Props) => {
  return (
    <div className='space-y-6'>
      {/* 경보단계 배너 */}
      {alarmInfo && (
        <div className={`rounded-2xl border-2 ${alarmInfo.border} ${alarmInfo.bg} p-8`}>
          <div className='flex items-center gap-4'>
            <AlarmBadge alarmInfo={alarmInfo} />
            <div>
              <h2 className={`text-2xl font-bold ${alarmInfo.text}`}>{alarmInfo.label}</h2>
              <p className='mt-1 text-gray-600'>외교부 지정 여행경보 단계</p>
            </div>
          </div>
        </div>
      )}

      {/* 경보 상세 목록 */}
      <div className='overflow-hidden rounded-2xl bg-white shadow-xl'>
        <div className='bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6 text-white'>
          <h2 className='text-xl font-bold'>지역별 경보 상세</h2>
          <p className='mt-1 text-sm text-slate-300'>총 {items.length}개 지역</p>
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
                      {item.alarm_lvl}단계 · {level.label}
                    </span>
                  )}
                </div>
                <div className='flex-1'>
                  <div className='font-semibold text-gray-900'>
                    {item.region_ty === '전체' ? '전 지역' : item.remark || item.region_ty}
                  </div>
                  {item.written_dt && (
                    <p className='mt-1 text-sm text-gray-600'>갱신일: {item.written_dt}</p>
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
            <h2 className='text-xl font-bold'>위험지도</h2>
          </div>
          <div className='p-6'>
            <img
              src={items[0].dang_map_download_url}
              alt='위험지도'
              className='w-full rounded-xl object-contain'
            />
          </div>
        </div>
      )}

      {/* 경보 단계 안내 */}
      <AlarmLevelGuide />

      {/* 출처 */}
      <p className='text-center text-sm text-gray-600'>
        출처: 외교부 해외안전여행 (
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

const AlarmLevelGuide = () => (
  <div className='overflow-hidden rounded-2xl bg-white shadow-xl'>
    <div className='bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6 text-white'>
      <h2 className='text-xl font-bold'>여행경보 단계 안내</h2>
    </div>
    <div className='grid grid-cols-2 gap-4 p-6 sm:grid-cols-4'>
      {Object.entries(ALARM_LEVEL).map(([level, info]) => (
        <div
          key={level}
          className={`rounded-xl border-2 ${info.border} ${info.bg} p-4 text-center`}
        >
          <div className={`text-2xl font-bold ${info.text}`}>{level}단계</div>
          <div className={`mt-1 text-sm font-semibold ${info.text}`}>{info.label}</div>
        </div>
      ))}
    </div>
  </div>
);
