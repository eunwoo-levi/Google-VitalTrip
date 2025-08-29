'use client';

import { useHydration } from '../../../shared/hooks/useHydration';
import { useTranslation } from '../../../shared/lib/i18n';
import { useMedicalList } from '../hooks/useMedicalList';
import { MedicalType } from '../types/medical';
import { formatDistance } from '../utils/formatDistance';
import { getMedicalTypeLabel } from '../utils/getMedicalTypeLabel';

export default function MedicalList() {
  const { t } = useTranslation();
  const hydrated = useHydration();
  const {
    medicalList,
    medicalType,
    radius,
    isLoading,
    error,
    handleMedicalTypeChange,
    handleRadiusChange,
  } = useMedicalList();

  if (!hydrated) {
    return <div className='flex h-full flex-col bg-gray-50' />;
  }

  return (
    <div className='flex h-full flex-col bg-gray-50'>
      <div className='border-b border-gray-200 bg-white shadow-sm'>
        <div className='px-6 py-5'>
          <div className='mb-6'>
            <h1 className='text-2xl font-bold text-gray-900'>{t('medical.title')}</h1>
            <p className='mt-1 text-sm text-gray-600'>{t('medical.subtitle')}</p>
          </div>

          <div className='grid grid-cols-1 gap-6'>
            <div>
              <label className='mb-3 block text-sm font-semibold text-gray-700'>
                {t('medical.facility_type')}
              </label>
              <div className='flex gap-1.5'>
                {(['hospital', 'pharmacy', 'emergency'] as MedicalType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleMedicalTypeChange(type)}
                    className={`min-w-0 flex-1 rounded-lg border px-2 py-2 text-xs font-medium transition-all duration-200 ${
                      medicalType === type
                        ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <span className='block truncate'>{getMedicalTypeLabel(type)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className='mb-3 flex items-center justify-between'>
                <label className='text-sm font-semibold text-gray-700'>
                  {t('medical.search_radius')}
                </label>
                <span className='text-lg font-bold text-blue-600'>{radius / 1000}km</span>
              </div>
              <div className='relative'>
                <input
                  type='range'
                  min='1000'
                  max='10000'
                  step='1000'
                  value={radius}
                  onChange={(e) => handleRadiusChange(Number(e.target.value))}
                  className='slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200'
                />
                <div className='mt-2 flex justify-between text-xs font-medium text-gray-500'>
                  <span>1km</span>
                  <span>10km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        {isLoading && (
          <div className='flex flex-col items-center justify-center py-16'>
            <div className='relative mb-4'>
              <div className='h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600'></div>
            </div>
            <h3 className='mb-1 text-lg font-semibold text-gray-900'>{t('medical.searching')}</h3>
            <p className='text-sm text-gray-600'>{t('medical.please_wait')}</p>
          </div>
        )}

        {error && (
          <div className='mx-6 mt-8 rounded-lg border border-red-200 bg-red-50 p-6 text-center'>
            <h3 className='mb-1 text-lg font-semibold text-red-800'>
              {t('medical.something_wrong')}
            </h3>
            <p className='text-sm text-red-600'>{t('medical.try_again')}</p>
          </div>
        )}

        {medicalList && medicalList.length === 0 && !isLoading && (
          <div className='mx-6 mt-8 rounded-lg border border-gray-200 bg-white p-8 text-center'>
            <h3 className='mb-1 text-lg font-semibold text-gray-900'>
              {t('medical.no_facilities_found', {
                type: getMedicalTypeLabel(medicalType).toLowerCase(),
              })}
            </h3>
            <p className='text-sm text-gray-600'>{t('medical.try_increase_radius')}</p>
          </div>
        )}

        {medicalList && medicalList.length > 0 && (
          <div className='w-full space-y-4 px-2 py-4'>
            <div className='mb-4 flex w-full items-center justify-between gap-2'>
              <h2 className='flex-shrink-0 text-lg font-semibold whitespace-nowrap text-gray-900'>
                {t('medical.facilities_found', {
                  count: medicalList.length,
                  type: getMedicalTypeLabel(medicalType).toLowerCase(),
                  plural: medicalList.length !== 1 ? 's' : '',
                })}
              </h2>
              <span className='flex-shrink-0 text-sm text-gray-600'>
                {t('medical.within_radius', { radius: radius / 1000 })}
              </span>
            </div>

            {medicalList.map((medical, index) => (
              <div
                key={index}
                className='group rounded-lg border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-blue-300 hover:shadow-md'
              >
                <div className='space-y-3'>
                  <h3 className='text-lg leading-tight font-bold break-words text-gray-900'>
                    {medical.name}
                  </h3>

                  <p className='text-sm leading-relaxed text-gray-600'>{medical.address}</p>

                  <div className='flex items-center justify-between gap-3'>
                    <div className='text-xl font-bold text-emerald-600'>
                      {formatDistance(medical.distance)}
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        medical.openNow
                          ? 'border border-emerald-200 bg-emerald-100 text-emerald-800'
                          : 'border border-red-200 bg-red-100 text-red-800'
                      }`}
                    >
                      {medical.openNow ? t('medical.open_now') : t('medical.closed')}
                    </span>
                  </div>

                  <div className='flex flex-wrap items-center gap-4'>
                    {medical.phoneNumber && (
                      <a
                        href={`tel:${medical.phoneNumber}`}
                        className='text-sm font-medium text-blue-600 transition-colors hover:text-blue-800'
                      >
                        {medical.phoneNumber}
                      </a>
                    )}

                    {medical.opendingHours && medical.opendingHours.length > 0 && (
                      <span className='text-sm text-gray-600'>{medical.opendingHours[0]}</span>
                    )}
                  </div>

                  {medical.websiteUrl && (
                    <a
                      href={medical.websiteUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={(e) => e.stopPropagation()}
                      className='text-sm font-medium text-blue-600 transition-colors hover:text-blue-800'
                    >
                      {t('medical.visit_website')}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
