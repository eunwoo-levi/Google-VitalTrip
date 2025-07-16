'use client';

import { useRouter } from 'next/navigation';
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

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(formData);
      if (response.accessToken) {
        sessionStorage.setItem('accessToken', response.accessToken);
        const userInfo = await loginUser(formData);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        router.push('/');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다. 다시 시도해주세요.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col'>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='mb-4 flex flex-col'>
          <label htmlFor='email' className='mb-2 text-sm font-medium text-gray-600'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='example@example.com'
            className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
            required
          />
        </div>

        <div className='mb-6 flex flex-col'>
          <label htmlFor='password' className='mb-2 text-sm font-medium text-gray-600'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password'
            className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
            required
          />
        </div>

        {error && <p className='mb-4 text-sm text-red-500'>{error}</p>}

        <button
          type='submit'
          className='w-full rounded-md bg-blue-500 py-3 font-semibold text-white transition duration-200 hover:bg-blue-600 disabled:bg-gray-400'
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
