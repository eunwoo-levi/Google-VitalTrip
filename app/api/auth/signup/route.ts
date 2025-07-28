import { NextRequest, NextResponse } from 'next/server';

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8080';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${apiBaseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text || 'No response body' };
    }

    if (response.ok) {
      return NextResponse.json(data, { status: 201 });
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json(
      {
        errorCode: 'SIGNUP_FAILED',
        errorMessage: 'Signup failed. Please check your input information.',
      },
      { status: 500 },
    );
  }
}
