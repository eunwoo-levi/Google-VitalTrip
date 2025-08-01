import { httpServer } from '@/src/shared/utils/httpServer';
import { NextRequest, NextResponse } from 'next/server';

interface CheckEmailResponse {
  message: string;
  data: {
    isAvailable: boolean;
  };
}

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    const response = await httpServer.post('/auth/check-email', email);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
