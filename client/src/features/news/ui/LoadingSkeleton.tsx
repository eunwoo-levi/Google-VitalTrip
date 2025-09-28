export function LoadingSkeleton() {
  return (
    <div className='animate-pulse overflow-hidden rounded-lg bg-white shadow-md'>
      <div className='h-48 w-full bg-gray-300'></div>
      <div className='p-6'>
        <div className='mb-2 flex justify-between'>
          <div className='h-4 w-20 rounded bg-gray-300'></div>
          <div className='h-3 w-16 rounded bg-gray-300'></div>
        </div>
        <div className='mb-3 h-5 w-3/4 rounded bg-gray-300'></div>
        <div className='mb-2 h-4 w-full rounded bg-gray-300'></div>
        <div className='mb-4 h-4 w-2/3 rounded bg-gray-300'></div>
        <div className='h-4 w-24 rounded bg-gray-300'></div>
      </div>
    </div>
  );
}
