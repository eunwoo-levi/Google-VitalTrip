'use client';

import EmergencyCallBanner from '@/src/features/firstAid/ui/EmergencyCallBanner';
import { useHydration } from '@/src/shared/hooks/useHydration';
import { useTranslation } from 'react-i18next';
import { BsCheckCircle } from 'react-icons/bs';
import { FiActivity, FiExternalLink, FiInfo } from 'react-icons/fi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { MdArrowForward, MdErrorOutline, MdMedicalServices } from 'react-icons/md';
import { Medical } from '../../medical/types/medical';
import { formatDistance } from '../../medical/utils/formatDistance';
import { useFirstAidCombined } from '../hooks/useFirstAidCombined';
import { useSymptomStore } from '../store/useSymptomStore';
import { LoadingSpinner } from './LoadingSpinner';

export const FirstAidResult = () => {
  const { t } = useTranslation('common');
  const { symptomType, symptomDetail } = useSymptomStore();
  const { combined, isPending, isError, locationError } = useFirstAidCombined();
  const hydrated = useHydration();

  if (!hydrated) {
    return <div className='mx-auto max-w-6xl px-6 py-10 pb-[100px]' />;
  }

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError || locationError) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-50'>
        <div className='mx-4 w-full max-w-md rounded-2xl border bg-white p-10 text-center shadow-xl'>
          <div>
            <MdErrorOutline className='mx-auto mb-6 text-6xl text-red-500' />
          </div>
          <h2 className='mb-3 text-2xl font-bold text-gray-900'>{t('firstaid.analysis_failed')}</h2>
          <p className='mb-8 text-gray-600'>
            {locationError ? t('firstaid.location_error') : t('firstaid.analysis_error')}
          </p>
          <button
            onClick={() => window.location.reload()}
            className='rounded-xl bg-red-500 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-red-600 hover:shadow-xl active:scale-95'
          >
            {t('firstaid.try_again')}
          </button>
        </div>
      </div>
    );
  }

  if (!combined) {
    return <LoadingSpinner />;
  }

  if (!combined.firstAid || !combined.firstAid.content) {
    return <LoadingSpinner />;
  }

  return (
    <div className='mx-auto max-w-6xl px-6 py-10 pb-[100px]'>
      <div>
        <EmergencyCallBanner
          emergencyContact={combined.firstAid?.identificationResponse?.emergencyContact || {}}
          countryName={combined.firstAid?.identificationResponse?.countryName || 'Unknown'}
        />
      </div>

      <div className='mt-10 space-y-8'>
        <SymptomSummary symptomType={symptomType} symptomDetail={symptomDetail} />
        <SymptomSummaryResult summary={combined.firstAid?.summary || ''} />
        <FirstAidSteps firstAidSteps={combined.firstAid?.content || ''} />
        <NearbyFacilitiesCombined
          hospitals={combined.hospitals || []}
          pharmacies={combined.pharmacies || []}
        />
        <AdditionalResources blogLinks={combined.firstAid?.blogLinks || []} />
        <AlertDisclaimer disclaimer={combined.firstAid?.disclaimer || ''} />
      </div>
    </div>
  );
};

const NearbyFacilitiesCombined = ({
  hospitals,
  pharmacies,
}: {
  hospitals: Medical[];
  pharmacies: Medical[];
}) => {
  const { t } = useTranslation('common');
  const hydrated = useHydration();

  if (!hydrated) return null;

  const topHospitals = hospitals || [];
  const topPharmacies = pharmacies || [];

  if (topHospitals.length === 0 && topPharmacies.length === 0) {
    return (
      <div className='overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-xl backdrop-blur-sm'>
        <div className='p-8 text-center'>
          <p className='text-gray-500'>{t('medical.no_facilities_found')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-xl backdrop-blur-sm'>
      <div className='bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 text-white'>
        <div className='flex items-center gap-3'>
          <div className='rounded-lg bg-white/20 p-2'>
            <span className='text-2xl'>🏥</span>
          </div>
          <h2 className='text-2xl font-bold'>{t('firstaid.nearby_facilities')}</h2>
        </div>
        <p className='mt-2 text-red-100'>
          {t('firstaid.nearest_facilities_description', {
            hospitalCount: topHospitals.length,
            pharmacyCount: topPharmacies.length,
          })}
        </p>
      </div>

      <div className='grid gap-6 p-8 sm:grid-cols-2'>
        {topHospitals.length > 0 && (
          <div>
            <h3 className='mb-4 flex items-center gap-2 text-xl font-bold text-gray-900'>
              <span className='text-2xl'>🏥</span>
              {t('firstaid.hospitals', { count: topHospitals.length })}
            </h3>
            <ul className='space-y-3'>
              {topHospitals.map((hospital, idx) => (
                <li
                  key={`h-${idx}`}
                  className='group cursor-pointer rounded-xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:scale-105 hover:border-red-300 hover:shadow-md active:scale-95'
                  onClick={() => {
                    if (hospital.websiteUrl) {
                      window.open(hospital.websiteUrl, '_blank');
                    } else {
                      const query = encodeURIComponent(`${hospital.name} ${hospital.address}`);
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${query}`,
                        '_blank',
                      );
                    }
                  }}
                >
                  <div className='mb-2 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <span className='inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700'>
                        {formatDistance(hospital.distance)}
                      </span>
                      {hospital.openNow && (
                        <span className='inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700'>
                          {t('medical.open_now')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='text-lg font-semibold text-gray-900 group-hover:text-red-600'>
                    {hospital.name}
                  </div>
                  <div className='text-sm text-gray-600'>{hospital.address}</div>
                  {hospital.phoneNumber && (
                    <div className='mt-2 text-sm font-medium text-red-600'>
                      📞 {hospital.phoneNumber}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {topPharmacies.length > 0 && (
          <div>
            <h3 className='mb-4 flex items-center gap-2 text-xl font-bold text-gray-900'>
              <span className='text-2xl'>💊</span>
              {t('firstaid.pharmacies', { count: topPharmacies.length })}
            </h3>
            <ul className='space-y-3'>
              {topPharmacies.map((pharmacy, idx) => (
                <li
                  key={`p-${idx}`}
                  className='group cursor-pointer rounded-xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:scale-105 hover:border-red-300 hover:shadow-md active:scale-95'
                  onClick={() => {
                    if (pharmacy.websiteUrl) {
                      window.open(pharmacy.websiteUrl, '_blank');
                    } else {
                      const query = encodeURIComponent(`${pharmacy.name} ${pharmacy.address}`);
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${query}`,
                        '_blank',
                      );
                    }
                  }}
                >
                  <div className='mb-2 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <span className='inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700'>
                        {formatDistance(pharmacy.distance)}
                      </span>
                      {pharmacy.openNow && (
                        <span className='inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700'>
                          {t('medical.open_now')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='text-lg font-semibold text-gray-900 group-hover:text-red-600'>
                    {pharmacy.name}
                  </div>
                  <div className='text-sm text-gray-600'>{pharmacy.address}</div>
                  {pharmacy.phoneNumber && (
                    <div className='mt-2 text-sm font-medium text-red-600'>
                      📞 {pharmacy.phoneNumber}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const SymptomSummary = ({
  symptomType,
  symptomDetail,
}: {
  symptomType: string;
  symptomDetail: string;
}) => {
  const { t } = useTranslation('common');
  return (
    <div className='rounded-2xl border border-white/50 bg-white/90 p-8 shadow-xl backdrop-blur-sm'>
      <div className='mb-6 flex items-start justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <div className='rounded-2xl border border-red-100 bg-gradient-to-br from-red-50 to-pink-50 p-4 transition-transform duration-200 hover:scale-105'>
            <MdMedicalServices className='text-2xl text-red-600' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-gray-900'>{symptomType}</h2>
          </div>
        </div>
      </div>

      {symptomDetail && (
        <div className='rounded-xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-red-50 p-6'>
          <div className='mb-2 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700'>
            {t('firstaid.reported_symptoms')}
          </div>
          <p className='text-lg leading-relaxed font-semibold whitespace-pre-line text-gray-900'>
            {symptomDetail}
          </p>
        </div>
      )}
    </div>
  );
};

const FirstAidSteps = ({ firstAidSteps }: { firstAidSteps: string }) => {
  const { t } = useTranslation('common');
  return (
    <div className='overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-xl backdrop-blur-sm'>
      <div className='bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 text-white'>
        <div className='flex items-center gap-3'>
          <BsCheckCircle className='text-2xl' />
          <h2 className='text-2xl font-bold'>{t('firstaid.protocol_title')}</h2>
        </div>
        <p className='mt-2 text-red-100'>{t('firstaid.protocol_subtitle')}</p>
      </div>

      <div className='p-8'>
        <div className='space-y-6'>
          {firstAidSteps
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
            .map((line, idx) => (
              <div key={idx} className='group flex gap-6'>
                <div className='flex-shrink-0'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg transition-all duration-300 group-hover:shadow-xl hover:scale-110'>
                    <span className='text-lg font-bold text-white'>{idx + 1}</span>
                  </div>
                </div>
                <div className='flex-1 pt-2'>
                  <p className='text-lg leading-relaxed font-medium whitespace-pre-line text-gray-800'>
                    {line}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const AdditionalResources = ({ blogLinks }: { blogLinks: string[] }) => {
  const { t } = useTranslation('common');
  return (
    <div className='overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-xl backdrop-blur-sm'>
      <div className='bg-gradient-to-r from-red-500 to-red-600 px-8 py-6 text-white'>
        <div className='flex items-center gap-3'>
          <HiOutlineDocumentText className='text-2xl' />
          <h2 className='text-2xl font-bold'>{t('firstaid.resources_title')}</h2>
        </div>
        <p className='mt-2 text-red-100'>{t('firstaid.resources_subtitle')}</p>
      </div>

      <div className='p-8'>
        <div className='grid gap-4'>
          {blogLinks.map((link, index) => (
            <a
              key={index}
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center justify-between rounded-xl border-2 border-gray-100 p-6 transition-all duration-300 hover:scale-105 hover:border-red-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50 active:scale-95'
            >
              <div className='flex items-center gap-4'>
                <div className='rounded-lg bg-red-100 p-2 transition-colors duration-200 group-hover:bg-red-200'>
                  <FiExternalLink className='text-lg text-red-600' />
                </div>
                <div>
                  <span className='block text-lg font-semibold text-gray-900'>
                    {
                      decodeURIComponent(link)
                        .replace(/^https?:\/\//, '')
                        .split('/')[0]
                    }
                  </span>
                  <span className='text-sm text-gray-500'>{t('firstaid.resource_label')}</span>
                </div>
              </div>
              <MdArrowForward className='text-xl text-gray-400 transition-colors duration-200 group-hover:text-red-500' />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const SymptomSummaryResult = ({ summary }: { summary: string }) => {
  const { t } = useTranslation('common');
  return (
    <div className='rounded-2xl border border-white/50 bg-white/90 p-8 shadow-xl backdrop-blur-sm'>
      <div className='mb-4 flex items-center gap-3'>
        <div className='rounded-xl bg-gradient-to-br from-red-500 to-red-600 p-3'>
          <FiActivity className='text-xl text-white' />
        </div>
        <h2 className='text-2xl font-bold text-gray-900'>{t('firstaid.emergency_summary')}</h2>
      </div>

      <div className='rounded-xl border border-red-100 bg-gradient-to-r from-red-50 to-red-50 p-6'>
        <p className='text-lg leading-relaxed text-gray-800'>{summary}</p>
      </div>
    </div>
  );
};

const AlertDisclaimer = ({ disclaimer }: { disclaimer: string }) => {
  const { t } = useTranslation('common');
  return (
    <div className='rounded-2xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-8 shadow-lg'>
      <div className='flex gap-4'>
        <div>
          <FiInfo className='mt-1 flex-shrink-0 text-3xl text-amber-600' />
        </div>
        <div>
          <h3 className='mb-4 text-xl font-bold text-amber-800'>
            {t('firstaid.disclaimer_title')}
          </h3>
          <div className='leading-relaxed text-amber-700'>
            <p className='text-lg font-medium'>{disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
