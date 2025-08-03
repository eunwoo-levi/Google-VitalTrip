import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' +
      process.env.GOOGLE_GEMINI_API_KEY,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: messages.map((msg: string) => ({ text: msg })) }],
      }),
    },
  );

  const data = await response.json();

  const result = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from GEMINI AI';
  return NextResponse.json({ text: result });
}
