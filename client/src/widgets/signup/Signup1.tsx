'use client';

import { useCheckEmail } from '@/src/features/auth/hooks/useCheckEmail';
import type { SignupErrors } from '@/src/features/auth/types/signup';
import { CheckEmailButton } from '@/src/features/auth/ui/CheckEmailButton';

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birthDate: string;
  countryCode: string;
  phoneNumber: string;
}

interface Signup1Props {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  invalidErrors: SignupErrors;
  isFirstStepValid: boolean;
}

export default function Signup1({
  formData,
  onFormChange,
  onNext,
  invalidErrors,
  isFirstStepValid,
}: Signup1Props) {
  const { message, isAvailable, checkEmail, isLoading } = useCheckEmail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      alert('Passwords do not match.');
      return;
    }

    if (formData.email && formData.password && formData.passwordConfirm) {
      onNext();
    }
  };

  return (
    <div>
      <h3 className='mb-6 text-xl font-semibold text-gray-700'>Account Information</h3>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='email' className='mb-2 block font-medium text-gray-600'>
            Email
          </label>
          <div className='flex items-center gap-2'>
            <input
              id='email'
              type='email'
              value={formData.email}
              onChange={(e) => onFormChange('email', e.target.value)}
              placeholder='example@example.com'
              className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
              required
            />
            <CheckEmailButton onCheck={() => checkEmail(formData.email)} isLoading={isLoading} />
          </div>
          {invalidErrors.email && <p className='text-sm text-red-600'>{invalidErrors.email}</p>}
          {message && (
            <p className={`text-sm ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor='password' className='mb-2 block font-medium text-gray-600'>
            Password
          </label>
          <input
            id='password'
            type='password'
            value={formData.password}
            onChange={(e) => onFormChange('password', e.target.value)}
            placeholder='Enter your password'
            className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
            required
          />
          {invalidErrors.password && (
            <p className='text-sm text-red-600'>{invalidErrors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor='passwordConfirm' className='mb-2 block font-medium text-gray-600'>
            Confirm Password
          </label>
          <input
            id='passwordConfirm'
            type='password'
            value={formData.passwordConfirm}
            onChange={(e) => onFormChange('passwordConfirm', e.target.value)}
            placeholder='Re-enter your password'
            className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
            required
          />
          {invalidErrors.passwordConfirm && (
            <p className='text-sm text-red-600'>{invalidErrors.passwordConfirm}</p>
          )}
        </div>

        <button
          type='submit'
          className='w-full rounded-md bg-blue-500 py-3 font-semibold text-white transition duration-200 hover:bg-blue-600 disabled:bg-gray-400'
          disabled={!isFirstStepValid}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
