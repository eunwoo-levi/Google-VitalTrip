import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { symptomType, symptomDetail } = body;

    if (!symptomType || !symptomDetail) {
      return NextResponse.json(
        { error: 'symptomType 혹은 symptomDetail을 입력해야 합니다.' },
        { status: 400 },
      );
    }

    const response = await fetch(`${process.env.API_BASE_URL}/first-aid/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emergencyType: symptomType, userMessage: symptomDetail }),
    });

    const responseData = await response.json();

    if (!response.ok || responseData.result !== 'SUCCESS') {
      return NextResponse.json(
        { error: responseData.message || 'POST 요청에 실패했습니다.' },
        { status: response.status },
      );
    }

    return NextResponse.json({ result: responseData.data }, { status: 200 });
  } catch (error) {
    // 보안상 상세한 에러 정보는 로깅하지 않음
    console.error('First aid API 요청 실패');
    return new Response('Internal Server Error', { status: 500 });
  }
}
