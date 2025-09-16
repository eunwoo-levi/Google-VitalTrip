import Image from 'next/image';
import Link from 'next/link';

export function TranslateHeader() {
  return (
    <div className='mb-6 flex items-center gap-3'>
      <Link href='/'>
        <Image
          src='/VitalTrip.svg'
          alt='VitalTrip Logo'
          width={48}
          height={48}
          className='mt-1 ml-1 h-12 w-auto'
        />
      </Link>
      <h1 className='text-2xl font-semibold text-gray-800'>AI Translator</h1>
    </div>
  );
}
