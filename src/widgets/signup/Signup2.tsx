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

interface Signup2Props {
  formData: FormData;
  onFormChange: (field: keyof FormData, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Signup2({ formData, onFormChange, onNext, onPrev }: Signup2Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name && formData.birthDate && formData.countryCode && formData.phoneNumber) {
      onNext();
    }
  };

  const countries = [
    { code: 'KR', name: 'South Korea', dialCode: '+82' },
    { code: 'US', name: 'United States', dialCode: '+1' },
    { code: 'JP', name: 'Japan', dialCode: '+81' },
    { code: 'CN', name: 'China', dialCode: '+86' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
    { code: 'FR', name: 'France', dialCode: '+33' },
    { code: 'DE', name: 'Germany', dialCode: '+49' },
    { code: 'IT', name: 'Italy', dialCode: '+39' },
    { code: 'ES', name: 'Spain', dialCode: '+34' },
    { code: 'CA', name: 'Canada', dialCode: '+1' },
    { code: 'AU', name: 'Australia', dialCode: '+61' },
    { code: 'BR', name: 'Brazil', dialCode: '+55' },
    { code: 'IN', name: 'India', dialCode: '+91' },
  ];

  return (
    <div>
      <h3 className='mb-6 text-xl font-semibold text-gray-700'>Personal Information</h3>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name' className='mb-2 block text-sm font-medium text-gray-600'>
            Name
          </label>
          <input
            id='name'
            type='text'
            value={formData.name}
            onChange={(e) => onFormChange('name', e.target.value)}
            placeholder='Enter your name'
            className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
            required
          />
        </div>

        <div>
          <label htmlFor='birthDate' className='mb-2 block text-sm font-medium text-gray-600'>
            Date of Birth
          </label>
          <input
            id='birthDate'
            type='date'
            value={formData.birthDate}
            onChange={(e) => onFormChange('birthDate', e.target.value)}
            className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
            required
          />
        </div>

        <div>
          <label htmlFor='countryCode' className='mb-2 block text-sm font-medium text-gray-600'>
            Country
          </label>
          <select
            id='countryCode'
            value={formData.countryCode}
            onChange={(e) => onFormChange('countryCode', e.target.value)}
            className='w-full rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
            required
          >
            <option value=''>Select your country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.dialCode})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='phoneNumber' className='mb-2 block text-sm font-medium text-gray-600'>
            Phone Number
          </label>
          <div className='flex space-x-2'>
            <div className='w-24 rounded-md border border-gray-300 p-3 text-sm text-gray-600'>
              {formData.countryCode
                ? countries.find((c) => c.code === formData.countryCode)?.dialCode || ''
                : ''}
            </div>
            <input
              id='phoneNumber'
              type='tel'
              value={formData.phoneNumber}
              onChange={(e) => onFormChange('phoneNumber', e.target.value)}
              placeholder='Enter your phone number'
              className='flex-1 rounded-md border border-gray-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
              required
            />
          </div>
        </div>

        <div className='flex space-x-4'>
          <button
            type='button'
            onClick={onPrev}
            className='w-full rounded-md border border-gray-300 py-3 font-semibold text-gray-700 transition duration-200 hover:bg-gray-50'
          >
            Back
          </button>
          <button
            type='submit'
            className='w-full rounded-md bg-blue-500 py-3 font-semibold text-white transition duration-200 hover:bg-blue-600 disabled:bg-gray-400'
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
