'use client';

import { useEffect, useState, useRef } from 'react';
import { useSymptomStore } from '@/src/features/firstAid/store/useSymptomStore';
import { postFirstAid } from '@/src/features/firstAid/api/firstAid';
import { useHydration } from '@/src/shared/hooks/useHydration';

interface FirstAidResult {
  content: string;
  recommendedAction: string;
  confidence: number;
  blogLinks: string[];
}

const useFirstAidResult = () => {
  const hydrated = useHydration();
  const { symptomType, symptomDetail } = useSymptomStore();
  const [result, setResult] = useState<FirstAidResult | string | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hydrated || !symptomType || !symptomDetail) return;

    const postData = async () => {
      setLoading(true);

      try {
        const res = await postFirstAid({ symptomType, symptomDetail });

        setResult(res.result || 'No result available');
      } catch {
        setResult('An error occurred while processing your request. Please try again later.');
        console.error('First aid 요청 처리 실패');
      } finally {
        setLoading(false);
      }
    };

    postData();
  }, [hydrated, symptomType, symptomDetail]);

  useEffect(() => {
    if (result && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  return {
    hydrated,
    symptomType,
    symptomDetail,
    result,
    loading,
    contentRef,
  };
};

export default useFirstAidResult;
