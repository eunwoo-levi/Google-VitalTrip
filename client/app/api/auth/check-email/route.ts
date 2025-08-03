import { APIError } from '@/src/shared/utils/apiError';
import { httpServer } from '@/src/shared/utils/httpServer';
import { NextRequest, NextResponse } from 'next/server';

interface CheckEmailResponse {
  message: string;
  data: {
    available: boolean;
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    const response: CheckEmailResponse = await httpServer.get(`/auth/check-email?email=${email}`);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof APIError && error.status === 400) {
      return NextResponse.json({ message: 'Please enter a valid email address' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Failed to check email availability' }, { status: 500 });
  }
}
