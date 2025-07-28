'use client';

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birthDate: string;
  countryCode: string;
  phoneNumber: string;
}

interface Signup3Props {
  formData: FormData;
  onPrev: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function Signup3({ formData, onPrev, onSubmit, isLoading }: Signup3Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div>
      <h3 className='mb-6 text-xl font-semibold text-gray-700'>Confirm Information</h3>

      <div className='mb-6 space-y-4 rounded-lg bg-gray-50 p-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <span className='text-sm font-medium text-gray-600'>Name:</span>
            <p className='text-gray-800'>{formData.name}</p>
          </div>
          <div>
            <span className='text-sm font-medium text-gray-600'>Email:</span>
            <p className='text-gray-800'>{formData.email}</p>
          </div>
          <div>
            <span className='text-sm font-medium text-gray-600'>Date of Birth:</span>
            <p className='text-gray-800'>{formData.birthDate}</p>
          </div>
          <div>
            <span className='text-sm font-medium text-gray-600'>Country:</span>
            <p className='text-gray-800'>{formData.countryCode}</p>
          </div>
          <div className='col-span-2'>
            <span className='text-sm font-medium text-gray-600'>Phone Number:</span>
            <p className='text-gray-800'>{formData.phoneNumber}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='flex space-x-4'>
          <button
            type='button'
            onClick={onPrev}
            className='w-full rounded-md border border-gray-300 py-3 font-semibold text-gray-700 transition duration-200 hover:bg-gray-50'
            disabled={isLoading}
          >
            Back
          </button>
          <button
            type='submit'
            className='w-full rounded-md bg-blue-500 py-3 font-semibold text-white transition duration-200 hover:bg-blue-600 disabled:bg-gray-400'
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </div>
      </form>
    </div>
  );
}
