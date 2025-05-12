import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2/languages?key=${process.env.GOOGLE_TRANSLATE_API_KEY}&target=en`,
    );
    const data = await res.json();

    if (!res.ok || !data?.data?.languages) {
      return NextResponse.json(
        { error: data.error?.message || '언어 목록 불러오기 실패' },
        { status: res.status || 500 },
      );
    }

    return NextResponse.json(data.data.languages);
  } catch (e: any) {
    return NextResponse.json({ error: '서버 에러 발생', detail: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { text, target } = await req.json();

  if (!text || !target) {
    return NextResponse.json({ error: 'text와 target은 필수입니다.' }, { status: 400 });
  }

  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        target,
        format: 'text',
        model: 'nmt',
      }),
    },
  );

  const data = await res.json();

  if (!res.ok || !data.data?.translations?.[0]) {
    return NextResponse.json(
      { error: data.error?.message || '번역 실패' },
      { status: res.status || 500 },
    );
  }

  const translatedText = data.data.translations[0].translatedText;
  const detectedSourceLanguage = data.data.translations[0].detectedSourceLanguage;

  return NextResponse.json({ translatedText, detectedSourceLanguage });
}
