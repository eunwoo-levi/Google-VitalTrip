import { FirstAid } from '@/src/features/firstAid/type/firstAid';
import { Medical } from '@/src/features/medical/types/medical';
import { httpServer } from '@/src/shared/utils/httpServer';
import * as Sentry from '@sentry/nextjs';

interface ApiResponse<T> {
  data: T;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      symptomType,
      symptomDetail,
      latitude,
      longitude,
      radius = 5000,
      language = 'ko',
    } = body || {};

    if (
      !symptomType ||
      !symptomDetail ||
      typeof latitude !== 'number' ||
      typeof longitude !== 'number'
    ) {
      return new Response(
        JSON.stringify({
          message: 'Invalid request',
          error: 'Missing required fields: symptomType, symptomDetail, latitude, longitude',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const hospParams = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      type: 'hospital',
      radius: String(radius),
      language,
    });
    const pharmParams = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      type: 'pharmacy',
      radius: String(radius),
      language,
    });

    const [firstAidResult, hospitalsResult, pharmaciesResult] = await Promise.allSettled([
      httpServer.post('/first-aid/advice', { symptomType, symptomDetail, latitude, longitude }),
      httpServer.get(`/location/nearby?${hospParams.toString()}`),
      httpServer.get(`/location/nearby?${pharmParams.toString()}`),
    ]);

    if (firstAidResult.status === 'rejected') {
      return new Response(
        JSON.stringify({
          message: 'First aid analysis failed',
          error: firstAidResult.reason?.message || 'Unknown error',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const firstAidData = firstAidResult.value as ApiResponse<FirstAid>;
    const hospitalsData =
      hospitalsResult.status === 'fulfilled'
        ? (hospitalsResult.value as ApiResponse<Medical[]>)
        : { data: [] };
    const pharmaciesData =
      pharmaciesResult.status === 'fulfilled'
        ? (pharmaciesResult.value as ApiResponse<Medical[]>)
        : { data: [] };

    const hospitals = Array.isArray(hospitalsData?.data)
      ? hospitalsData.data.slice(0, 3)
      : Array.isArray(hospitalsData)
        ? hospitalsData.slice(0, 3)
        : [];
    const pharmacies = Array.isArray(pharmaciesData?.data)
      ? pharmaciesData.data.slice(0, 3)
      : Array.isArray(pharmaciesData)
        ? pharmaciesData.slice(0, 3)
        : [];

    return new Response(
      JSON.stringify({
        message: 'Success',
        data: {
          firstAid: firstAidData?.data || firstAidData,
          hospitals,
          pharmacies,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    Sentry.captureException(error);
    return new Response(
      JSON.stringify({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
