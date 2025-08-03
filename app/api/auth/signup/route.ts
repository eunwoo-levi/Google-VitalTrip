import { APIError } from '@/src/shared/utils/apiError';
import { httpServer } from '@/src/shared/utils/httpServer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await httpServer.post('/auth/signup', body);
    return NextResponse.json({ message: 'Signup success' }, { status: 201 });
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === 400) {
        return NextResponse.json(
          { message: 'Please enter a valid email address' },
          { status: 400 },
        );
      } else if (error.status === 409) {
        return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
      }
    }
    return NextResponse.json({ message: 'Signup failed' }, { status: 500 });
  }
}
