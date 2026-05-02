export function MapLoadingOverlay() {
  return (
    <div className='absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-gray-100'>
      <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500' />
      <p className='text-sm text-gray-500'>지도를 불러오는 중...</p>
    </div>
  );
}
