'use client';

import { useState } from 'react';
import { MdContactSupport } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const email = 'eunwoo1341@gmail.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className='flex items-center gap-2 rounded-full bg-blue-50 px-6 py-2 text-lg font-bold text-blue-700 shadow transition hover:bg-blue-100'
    >
      {copied ? (
        <FaCheck className='text-2xl text-green-600' />
      ) : (
        <MdContactSupport className='text-2xl' />
      )}
      {copied ? 'Copied!' : email}
    </button>
  );
}
