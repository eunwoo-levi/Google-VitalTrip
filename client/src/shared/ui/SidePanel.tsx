'use client';

interface SidePanelProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function SidePanel({ isOpen, onToggle, children }: SidePanelProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className={`fixed top-1/6 left-0 z-50 rounded-lg border-2 border-red-300 bg-white px-2 py-8 font-bold transition-all duration-300 hover:bg-gray-200 ${
          isOpen ? 'translate-x-80' : 'translate-x-0'
        }`}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {isOpen && (
        <div
          className='fixed inset-0 z-30 bg-black/40 transition-opacity duration-300'
          onClick={onToggle}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-80 transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {children}
      </div>
    </>
  );
}
