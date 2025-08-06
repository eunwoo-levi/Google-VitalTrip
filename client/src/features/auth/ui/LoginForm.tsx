'use client';

import { useLogin } from '../hooks/useLogin';

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    loginForm,
    updateLoginForm,
    handleLoginSubmit,
    isPending,
    isValid,
    invalidErrors,
    isError,
    error,
  } = useLogin();

  return (
    <form onSubmit={handleLoginSubmit} className='flex flex-col'>
      <div className='mb-4 flex flex-col'>
        <label htmlFor='email' className='text-md mb-2 font-semibold text-gray-600'>
          Email
        </label>
        <input
          id='email'
          name='email'
          type='email'
          value={loginForm.email}
          onChange={(e) => updateLoginForm('email', e.target.value)}
          placeholder='example@example.com'
          className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100'
          disabled={isPending}
          required
        />
        {invalidErrors.email && <p className='text-sm text-red-600'>{invalidErrors.email}</p>}
      </div>

      <div className='mb-6 flex flex-col'>
        <label htmlFor='password' className='text-md mb-2 font-semibold text-gray-600'>
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          value={loginForm.password}
          onChange={(e) => updateLoginForm('password', e.target.value)}
          placeholder='Enter your password'
          className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100'
          disabled={isPending}
          required
        />
        {invalidErrors.password && <p className='text-sm text-red-600'>{invalidErrors.password}</p>}
      </div>

      {isError && <p className='text-sm text-red-600'>{error?.message}</p>}

      <button
        type='submit'
        className='w-full rounded-md bg-blue-500 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300'
        disabled={isPending || !isValid}
      >
        {isPending ? (
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
