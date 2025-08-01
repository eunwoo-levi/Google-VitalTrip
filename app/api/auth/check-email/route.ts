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
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
