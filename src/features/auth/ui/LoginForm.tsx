'use client';

import { useState } from 'react';
import { loginUser } from '../api/loginUser';

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await loginUser(formData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div className='mb-4 flex flex-col'>
        <label htmlFor='email' className='text-md mb-2 font-semibold text-gray-600'>
          Email
        </label>
        <input
          id='email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='example@example.com'
          className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100'
          disabled={isLoading}
          required
        />
      </div>

      <div className='mb-6 flex flex-col'>
        <label htmlFor='password' className='text-md mb-2 font-semibold text-gray-600'>
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Enter your password'
          className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100'
          disabled={isLoading}
          required
        />
      </div>

      {error && (
        <div className='mb-4 rounded-md border border-red-200 bg-red-50 p-3'>
          <p className='text-sm text-red-600'>{error}</p>
        </div>
      )}

      <button
        type='submit'
        className='w-full rounded-md bg-blue-500 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300'
        disabled={isLoading || !isFormValid}
      >
        {isLoading ? (
          <div className='flex items-center justify-center'>
            <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white' />
            Logging in...
          </div>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
}
