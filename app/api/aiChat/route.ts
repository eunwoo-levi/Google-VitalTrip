import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('POST request received');
    const body = await req.json();
    const { emergencyType, userMessage } = body;

    console.log('emergencyType', emergencyType);
    console.log('userMessage', userMessage);

    if (!emergencyType || !userMessage) {
      return NextResponse.json(
        { error: 'emergencyType 혹은 userMessage을 입력해야 합니다.' },
        { status: 400 },
      );
    }

    const response = await fetch('http://34.9.101.87:8080/first-aid/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emergencyType, userMessage }),
    });

    const responseData = await response.json();

    if (!response.ok || responseData.result !== 'SUCCESS') {
      return NextResponse.json(
        { error: responseData.message || 'POST 요청에 실패했습니다.' },
        { status: response.status },
      );
    }

    return NextResponse.json(
      {
        message: responseData.message,
        content: responseData.data?.content,
        recommendedAction: responseData.data?.recommendedAction,
        confidence: responseData.data?.confidence,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error in POST request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
