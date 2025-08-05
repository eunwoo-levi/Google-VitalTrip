import { useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { useEditProfile } from '../hooks/useEditProfile';
import { Profile } from '../types/profile';

export const EditProfileForm = ({ profile }: { profile: Profile }) => {
  const {
    profileForm,
    setProfileForm,
    handleFormChange,
    isFormValid,
    handleFormSubmit,
    isLoading,
    isError,
    error,
  } = useEditProfile();

  useEffect(() => {
    if (profile) {
      setProfileForm({
        name: profile.name,
        birthDate: profile.birthDate,
        countryCode: profile.countryCode,
        phoneNumber: profile.phoneNumber,
      });
    }
  }, [profile, setProfileForm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      handleFormSubmit(profileForm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>Name</label>
        <input
          type='text'
          value={profileForm.name}
          onChange={(e) => handleFormChange('name', e.target.value)}
          className='w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>Birth Date</label>
        <input
          type='date'
          value={profile.birthDate}
          disabled
          className='w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-500'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>Country Code</label>
        <input
          type='text'
          value={profile.countryCode}
          disabled
          className='w-full cursor-not-allowed rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-500'
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>Phone Number</label>
        <input
          type='tel'
          value={profileForm.phoneNumber}
          onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
          className='w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
        />
      </div>
      <ProfileEditButton isLoading={isLoading} isFormValid={isFormValid} />
      {isError && (
        <div className='text-red-500'>
          Error: {error?.message || 'An error occurred while editing the profile.'}
        </div>
      )}
    </form>
  );
};

const ProfileEditButton = ({
  isLoading,
  isFormValid,
}: {
  isLoading: boolean;
  isFormValid: boolean;
}) => {
  return (
    <button
      type='submit'
      disabled={!isFormValid || isLoading}
      className={`inline-flex items-center justify-center rounded-lg px-3 py-2 font-semibold text-white transition-colors ${
        isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'cursor-not-allowed bg-gray-400'
      }`}
    >
      <MdEdit className='mr-2 h-4 w-4' />
      {isLoading ? 'Editing...' : 'Edit Profile'}
    </button>
  );
};
