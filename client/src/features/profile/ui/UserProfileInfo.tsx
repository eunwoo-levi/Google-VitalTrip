import { motion } from 'motion/react';
import Image from 'next/image';
import {
  MdCalendarToday,
  MdEdit,
  MdEmail,
  MdError,
  MdFlag,
  MdPerson,
  MdPhone,
} from 'react-icons/md';
import { useProfileQuery } from '../../auth/api/useProfileQuery';
import { Profile } from '../../auth/types/auth';
import { AuthButton } from '../../auth/ui/AuthButton';

export const UserProfileInfo = () => {
  const { data, isLoading, isError, error } = useProfileQuery();
  const profile = data?.data?.data;

  if (isLoading) {
    return <ProfileLoading />;
  }
  if (isError) {
    console.error('Error fetching profile:', error.message);
    return <ProfileError />;
  }

  if (!profile) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <div className='text-center'>
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100'>
            <MdPerson className='h-6 w-6 text-gray-500' />
          </div>
          <p className='text-gray-600'>프로필 정보가 없습니다</p>
        </div>
        <div className='mt-4 text-sm text-gray-500'>로그인 후 프로필을 설정해주세요.</div>
        <AuthButton />
      </div>
    );
  }

  return (
    <motion.div
      className='mx-auto w-[320px] max-w-2xl px-3 py-8 md:w-[600px]'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className='mb-8 text-center'>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>프로필</h1>
      </div>

      <div className='overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg'>
        <div className='bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-white'>
          <ProfileHeader profile={profile} />
        </div>

        <div className='grid gap-4 space-y-6 p-6 md:grid-cols-2'>
          <ProfileEmail email={profile.email} />
          <ProfileBirthDate birthDate={profile.birthDate} />
          <ProfileCountry countryCode={profile.countryCode} />
          <ProfilePhoneNumber phoneNumber={profile.phoneNumber} countryCode={profile.countryCode} />
          <div className='flex flex-col justify-center gap-3 border-t border-gray-200 pt-4'>
            <ProfileEditButton />
            <AuthButton data={data} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProfileHeader = ({ profile }: { profile: Profile }) => {
  return (
    <div className='flex flex-col items-center text-center'>
      <div className='mb-4'>
        {profile.profileImageUrl ? (
          <Image
            src={profile.profileImageUrl}
            alt='프로필 이미지'
            className='h-20 w-20 rounded-full border-4 border-white object-cover'
          />
        ) : (
          <div className='flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white/20'>
            <MdPerson className='h-10 w-10 text-white' />
          </div>
        )}
      </div>

      <h2 className='mb-1 text-2xl font-bold'>{profile.name}</h2>
      <p className='text-sm text-blue-100'>{profile.email}</p>
    </div>
  );
};

const ProfileEmail = ({ email }: { email: string }) => {
  return (
    <div className='space-y-2'>
      <label className='flex items-center text-sm font-medium text-gray-700'>
        <MdEmail className='mr-2 h-4 w-4 text-gray-500' />
        이메일
      </label>
      <div className='rounded-lg bg-gray-50 p-3'>
        <p className='font-medium text-gray-900'>{email}</p>
      </div>
    </div>
  );
};

const ProfileBirthDate = ({ birthDate }: { birthDate: string }) => {
  return (
    <div className='space-y-2'>
      <label className='flex items-center text-sm font-medium text-gray-700'>
        <MdCalendarToday className='mr-2 h-4 w-4 text-gray-500' />
        생년월일
      </label>
      <div className='rounded-lg bg-gray-50 p-3'>
        <p className='font-medium text-gray-900'>
          {new Date(birthDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};

const ProfileCountry = ({ countryCode }: { countryCode: string }) => {
  return (
    <div className='space-y-2'>
      <label className='flex items-center text-sm font-medium text-gray-700'>
        <MdFlag className='mr-2 h-4 w-4 text-gray-500' />
        국가
      </label>
      <div className='rounded-lg bg-gray-50 p-3'>
        <p className='font-medium text-gray-900'>{countryCode}</p>
      </div>
    </div>
  );
};

const ProfilePhoneNumber = ({
  phoneNumber,
  countryCode,
}: {
  phoneNumber: string;
  countryCode: string;
}) => {
  return (
    <div className='space-y-2'>
      <label className='flex items-center text-sm font-medium text-gray-700'>
        <MdPhone className='mr-2 h-4 w-4 text-gray-500' />
        전화번호
      </label>
      <div className='rounded-lg bg-gray-50 p-3'>
        <p className='font-medium text-gray-900'>
          {countryCode} + {phoneNumber}
        </p>
      </div>
    </div>
  );
};

const ProfileEditButton = () => {
  return (
    <button className='inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 font-medium text-white transition-colors hover:bg-blue-700'>
      <MdEdit className='mr-2 h-4 w-4' />
      프로필 수정
    </button>
  );
};

const ProfileLoading = () => {
  return (
    <div className='flex min-h-[400px] items-center justify-center'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent'></div>
        <p className='text-gray-600'>프로필을 불러오는 중...</p>
      </div>
    </div>
  );
};

const ProfileError = () => {
  return (
    <div className='flex min-h-[400px] items-center justify-center'>
      <div className='rounded-lg bg-red-50 p-6 text-center'>
        <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100'>
          <MdError className='h-6 w-6 text-red-600' />
        </div>
        <div className='mb-2 text-lg font-medium text-red-800'>프로필을 불러올 수 없습니다</div>
        <span className='mt-2 text-sm text-gray-500'>
          문제가 지속되면 고객 지원에 문의해주세요.
        </span>
      </div>
    </div>
  );
};
