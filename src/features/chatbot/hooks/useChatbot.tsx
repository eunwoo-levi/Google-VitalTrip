import { useState } from 'react';

export const useChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userText, setUserText] = useState('');
    const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);

    const sendMessage = async () => {
        if (!userText.trim()) return;

        const messageText = userText.trim();
        setError(null);
        setIsLoading(true);

        setMessages((prev) => [...prev, { type: 'user', text: messageText }]);
        setUserText('');

        try {
            const res = await fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [messageText] }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            if (!data.text) {
                throw new Error('Invalid response format');
            }

            setMessages((prev) => [...prev, { type: 'bot', text: data.text }]);

        } catch (error) {
            setError(error instanceof Error ? error.message : 'chatbot 요청 실패');
            setUserText(messageText);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isOpen,
        userText,
        messages,
        isLoading,
        error,
        setIsOpen,
        setUserText,
        setMessages,
        sendMessage
    };
};