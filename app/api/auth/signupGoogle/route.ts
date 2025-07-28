import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const tempToken = cookieStore.get('tempToken')?.value;

    const response = await fetch(`${BASE_URL}/oauth2/complete-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tempToken}`,
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
  } catch {
    return NextResponse.json(
      {
        errorCode: 'SIGNUP_FAILED',
        errorMessage: 'Signup failed. Please check your input information.',
      },
      { status: 500 },
    );
  }
}
