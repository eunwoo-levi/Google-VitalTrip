export function NewsFooter() {
  return (
    <div className='mt-12 text-center'>
      <p className='text-sm text-gray-500'>
        Medical news by Vital Trip
        <span className='ml-1'>Last updated: {new Date().toLocaleString('en-US')}</span>
      </p>
    </div>
  );
}
