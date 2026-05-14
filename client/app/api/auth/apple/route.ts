import { APIError } from '@/src/shared/utils/apiError';
import { httpServer } from '@/src/shared/utils/httpServer';
import * as Sentry from '@sentry/nextjs';
import { createPublicKey, verify as cryptoVerify } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

interface AppleJWK {
  kty: string;
  kid: string;
  use: string;
  alg: string;
  n: string;
  e: string;
}

interface AppleTokenClaims {
  sub: string;
  email?: string;
  email_verified?: boolean;
  iss: string;
  exp: number;
  iat: number;
}

interface AppleLoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

const APPLE_KEYS_URL = 'https://appleid.apple.com/auth/keys';
const APPLE_ISSUER = 'https://appleid.apple.com';

function base64UrlDecode(str: string): Buffer {
  return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

async function fetchApplePublicKeys(): Promise<AppleJWK[]> {
  const res = await fetch(APPLE_KEYS_URL, { next: { revalidate: 3600 } });
  const { keys } = await res.json();
  return keys;
}

async function verifyAppleIdentityToken(
  identityToken: string,
): Promise<AppleTokenClaims | null> {
  try {
    const parts = identityToken.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    const header = JSON.parse(base64UrlDecode(headerB64).toString('utf8'));
    const keys = await fetchApplePublicKeys();
    const matchedKey = keys.find((k) => k.kid === header.kid);
    if (!matchedKey) return null;

    const publicKey = createPublicKey({ format: 'jwk', key: matchedKey as Parameters<typeof createPublicKey>[0] & object });
    const signingInput = Buffer.from(`${headerB64}.${payloadB64}`);
    const signature = base64UrlDecode(signatureB64);

    const isValid = cryptoVerify('RSA-SHA256', signingInput, publicKey, signature);
    if (!isValid) return null;

    const claims: AppleTokenClaims = JSON.parse(base64UrlDecode(payloadB64).toString('utf8'));

    if (claims.iss !== APPLE_ISSUER) return null;
    if (claims.exp < Math.floor(Date.now() / 1000)) return null;

    return claims;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identityToken, fullName, email: appleEmail } = body;

    if (!identityToken) {
      return NextResponse.json({ message: 'identityToken is required' }, { status: 400 });
    }

    const claims = await verifyAppleIdentityToken(identityToken);
    if (!claims) {
      return NextResponse.json({ message: 'Invalid Apple identity token' }, { status: 401 });
    }

    const email = claims.email ?? appleEmail;
    const name =
      fullName?.givenName && fullName?.familyName
        ? `${fullName.givenName} ${fullName.familyName}`.trim()
        : (fullName?.givenName ?? email?.split('@')[0] ?? 'VitalTrip User');

    // Spring Boot backend needs to implement POST /auth/apple-login
    // It receives the verified Apple sub (unique user ID) + email + name
    // and returns accessToken / refreshToken
    const response: AppleLoginResponse = await httpServer.post('/auth/apple-login', {
      appleId: claims.sub,
      email,
      name,
    });

    const { accessToken, refreshToken } = response.data;

    const res = NextResponse.json({ success: true, message: 'Apple login successful' }, { status: 200 });

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60,
    });
    res.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    Sentry.captureException(error);
    if (error instanceof APIError) {
      if (error.status === 404) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
    }
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Apple login failed' },
      { status: error instanceof APIError ? error.status : 500 },
    );
  }
}
