'use client';

import { useState } from 'react';
import { RiRobot3Line } from 'react-icons/ri';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages([...messages, { type: 'user', text: userText }]);
    setInput('');

    const res = await fetch('/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({ messages: [userText] }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { type: 'bot', text: data.text }]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='fixed right-1 bottom-25 z-30 rounded-full bg-blue-600 p-3 text-white shadow-xl transition-all duration-200 hover:scale-110 hover:bg-blue-700 active:scale-95'
        aria-label='Open Chatbot'
      >
        <RiRobot3Line size={24} />
      </button>

      {isOpen && (
        <div className='fixed right-15 bottom-24 z-30 flex h-96 w-75 flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl md:w-80'>
          <div className='flex items-center justify-between rounded-t-2xl border-b bg-blue-50 px-4 py-2'>
            <h2 className='text-sm font-semibold text-blue-700'>AI 챗봇</h2>
            <button
              className='text-xs text-gray-400 hover:text-gray-600'
              onClick={() => setIsOpen(false)}
            >
              닫기
            </button>
          </div>

          <div className='scrollbar-thin scrollbar-thumb-gray-300 flex-1 space-y-2 overflow-y-auto px-4 py-3 text-sm'>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-3 py-2 ${
                    msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className='flex gap-2 border-t px-3 py-2'>
            <input
              className='flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder='메시지 입력...'
            />
            <button
              onClick={sendMessage}
              className='rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition-all hover:bg-blue-600 active:bg-blue-700'
            >
              전송
            </button>
          </div>
        </div>
      )}
    </>
  );
}
