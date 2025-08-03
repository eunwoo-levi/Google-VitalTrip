'use client';

import { FaCheck } from 'react-icons/fa';

interface SignupNavigateBarProps {
  currentStep: 'step1' | 'step2' | 'step3';
}

export const SignupNavigateBar = ({ currentStep }: SignupNavigateBarProps) => {
  const steps = [
    { id: 'step1', label: 'Account Info' },
    { id: 'step2', label: 'Personal Info' },
    { id: 'step3', label: 'Confirm' },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className='mb-4 flex w-full items-center justify-center'>
      <div className='flex items-center'>
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentStepIndex;

          return (
            <div key={step.id} className='flex items-center'>
              <div className='flex w-22 flex-col items-center md:w-24'>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : isCompleted
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {isCompleted ? <FaCheck className='h-4 w-4' /> : index + 1}
                </div>
                <div className='mt-2 text-center'>
                  <div
                    className={`md:text-md text-sm ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className='mx-1 h-0.5 w-5 bg-gray-300 md:mx-4'>
                  <div
                    className={`h-full transition-all duration-200 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
