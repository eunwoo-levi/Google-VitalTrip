import { RiRobot3Line } from 'react-icons/ri';
import { useChatbot } from '../hooks/useChatbot';

export default function Chatbot() {
  const { isOpen, userText, messages, setIsOpen, setUserText, sendMessage } = useChatbot();

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='fixed right-1 bottom-25 z-30 cursor-pointer rounded-full bg-red-600 p-3 text-white shadow-xl transition-all duration-200 hover:scale-110 hover:bg-red-700 active:scale-95'
        aria-label='Open Chatbot'
      >
        <RiRobot3Line size={24} />
      </button>

      {isOpen && (
        <div className='animate-slideFadeUp fixed right-15 bottom-24 z-30 flex h-96 w-75 flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl md:w-80'>
          <div className='flex items-center justify-between rounded-t-2xl border-b bg-red-50 px-4 py-2'>
            <h2 className='text-sm font-semibold text-red-700'>AI ChatBot</h2>
            <button
              className='text-xs text-gray-400 hover:text-gray-600'
              onClick={() => setIsOpen(false)}
            >
              Close
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
                    msg.type === 'user' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className='flex w-full gap-2 border-t px-3 py-2'>
            <input
              className='min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 focus:outline-none'
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder='Type here...'
            />
            <button
              onClick={sendMessage}
              className='min-w-fit rounded-lg bg-red-500 px-4 py-2 text-sm text-white transition-all hover:bg-red-600 active:bg-red-700'
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
