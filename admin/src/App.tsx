import { useOverlay } from '@vitaltrip/shared';
import { useEffect } from 'react';

function App() {
  const { open, close, render, isOpen } = useOverlay({
    closeOnEscape: true,
    // 백드롭 클릭은 항상 닫힘으로 가정함
  });

  useEffect(() => {
    open(); // 일단 마운트 시 오픈해서 테스트
  }, [open]);

  return (
    <>
      <div>
        <div>오버레이 상태: {isOpen ? '열림' : '닫힘'}</div>
        <button onClick={open}>오버레이 열기</button>
        <button onClick={close}>오버레이 닫기</button>
      </div>

      {render(
        <div className='p-6 bg-white rounded shadow text-center w-[300px]'>
          <p className='mb-2'>이것은 오버레이 내용입니다!</p>
          <p className='text-sm text-gray-600'>ESC 키나 배경 클릭 시 닫힙니다.</p>
          <button onClick={close} className='mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'>
            닫기
          </button>
        </div>
      )}
    </>
  );
}

export default App;
