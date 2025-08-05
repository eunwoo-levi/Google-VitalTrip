import { useState } from 'react';
import { useEditProfileMutation } from '../api/useEditProfileMutation';
import { EditProfile } from '../types/editProfile';

export const useEditProfile = () => {
  const [profileForm, setProfileForm] = useState<EditProfile>({
    name: '',
    birthDate: '',
    countryCode: '',
    phoneNumber: '',
  });

  const { mutate: editProfile, isPending, isError, error } = useEditProfileMutation();

  if (isError) {
    console.error('Error editing profile:', error.message);
  }

  const handleFormChange = (field: keyof EditProfile, value: string) => {
    setProfileForm((prev: EditProfile) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormSubmit = (profileForm: EditProfile) => {
    try {
      editProfile(profileForm);
    } catch (error) {
      console.error('Error submitting profile form:', error);
    }
  };

  const isFormValid = profileForm.name !== '' && profileForm.phoneNumber !== '';

  return {
    profileForm,
    setProfileForm,
    handleFormChange,
    handleFormSubmit,
    isFormValid,
    isLoading: isPending,
    isError,
    error,
  };
};
