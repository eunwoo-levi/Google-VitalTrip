'use client';

import { useFunnel } from '@/src/shared/hooks/useFunnel';
import { Signup1, Signup2, Signup3, SignupNavigateBar } from '@/src/widgets/signup';
import { useSignup } from '../hooks/useSignup';

const SIGNUP_STEPS = ['step1', 'step2', 'step3'] as const;

export default function SignupForm() {
  const { Funnel, Step, useStep } = useFunnel(SIGNUP_STEPS);
  const { step, setStep } = useStep();
  const { formData, error, isLoading, handleFormChange, handleSubmit } = useSignup();

  const handleNext = (nextStep: (typeof SIGNUP_STEPS)[number]) => {
    setStep(nextStep);
  };

  const handlePrev = (prevStep: (typeof SIGNUP_STEPS)[number]) => {
    setStep(prevStep);
  };

  return (
    <div className='flex flex-col'>
      <SignupNavigateBar currentStep={step as 'step1' | 'step2' | 'step3'} />

      {error && (
        <div className='mb-4 rounded-md bg-red-50 p-4'>
          <p className='text-sm text-red-600'>{error}</p>
        </div>
      )}

      <Funnel>
        <Step name='step1'>
          <Signup1
            formData={formData}
            onFormChange={handleFormChange}
            onNext={() => handleNext('step2')}
          />
        </Step>

        <Step name='step2'>
          <Signup2
            formData={formData}
            onFormChange={handleFormChange}
            onNext={() => handleNext('step3')}
            onPrev={() => handlePrev('step1')}
          />
        </Step>

        <Step name='step3'>
          <Signup3
            formData={formData}
            onPrev={() => handlePrev('step2')}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Step>
      </Funnel>
    </div>
  );
}
