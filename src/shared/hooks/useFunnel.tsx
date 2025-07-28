import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';

export function useFunnel<T extends readonly string[]>(steps: T) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const stepQuery = searchParams.get('step');
  const step =
    stepQuery && steps.includes(stepQuery as T[number]) ? (stepQuery as T[number]) : steps[0];

  const searchParamsString = searchParams.toString();
  const setStep = useCallback(
    (nextStep: T[number]) => {
      const params = new URLSearchParams(searchParamsString);
      params.set('step', nextStep);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParamsString],
  );

  const Funnel = useCallback(({ children }: { children: React.ReactNode }) => <>{children}</>, []);

  const Step = useCallback(
    ({ name, children }: { name: T[number]; children: React.ReactNode }) => {
      return name === step ? <>{children}</> : null;
    },
    [step],
  );

  return useMemo(
    () => ({
      Funnel,
      Step,
      useStep: () => ({ step, setStep }),
    }),
    [step, setStep, Funnel, Step],
  );
}
