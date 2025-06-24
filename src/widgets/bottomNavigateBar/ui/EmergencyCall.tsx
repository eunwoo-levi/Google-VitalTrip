'use client';

import React, { useEffect, useState } from 'react';
import { EMERGENCY_CALL_DB } from '../data/emergencyCallData';

interface EmergencyNumbers {
  country: string;
  police: string;
  ambulance: string;
  fire: string;
}

export default function EmergencyCall() {
  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyNumbers | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let called = false;

    const detectCountry = async () => {
      if (called) return;
      called = true;

      try {
        const res = await fetch('/api/location');
        if (!res.ok) throw new Error('Failed to fetch location data');
        const data = await res.json();
        const code = data.country_code?.toUpperCase();

        const info = EMERGENCY_CALL_DB[code];
        if (info) {
          setEmergencyInfo(info);
        } else {
          setError('Emergency contact info not available for your country.');
        }
      } catch (e) {
        setError('Failed to detect your location. Please check your internet connection.');
      }
    };

    detectCountry();
  }, []);

  if (error) {
    return <div className='p-6 text-red-600'>⚠️ {error}</div>;
  }

  if (!emergencyInfo) {
    return <div className='p-6 text-gray-600'>🔍 Detecting your emergency contact info...</div>;
  }

  return (
    <div className='mx-auto max-w-md space-y-4 p-6 text-gray-800 md:max-w-lg'>
      <h2 className='text-2xl font-bold text-red-600'>
        🚨 Emergency Numbers in {emergencyInfo.country}
      </h2>
      <ul className='list-inside list-disc space-y-1'>
        <li>
          <strong>Police:</strong> {emergencyInfo.police}
        </li>
        <li>
          <strong>Ambulance:</strong> {emergencyInfo.ambulance}
        </li>
        <li>
          <strong>Fire Department:</strong> {emergencyInfo.fire}
        </li>
      </ul>
      <p className='text-sm text-gray-500'>
        Tip: In many countries, dialing <strong>112</strong> connects you to all emergency services.
      </p>
    </div>
  );
}
