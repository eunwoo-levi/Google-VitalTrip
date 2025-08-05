import { useState } from 'react';
import { EditProfile } from '../types/editProfile';

export const useEditProfile = () => {
  const [profileForm, setProfileForm] = useState<EditProfile>({
    name: '',
    birthDate: '',
    countryCode: '',
    phoneNumber: '',
  });

  const handleFormChange = (field: keyof EditProfile, value: string) => {
    setProfileForm((prev: EditProfile) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormSubmit = () => {
    console.log('Profile updated:', profileForm);
  };

  const isFormValid = profileForm.name !== '' && profileForm.phoneNumber !== '';

  return {
    profileForm,
    setProfileForm,
    handleFormChange,
    handleFormSubmit,
    isFormValid,
  };
};
