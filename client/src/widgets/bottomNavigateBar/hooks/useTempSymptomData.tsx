import { ChangeEvent, useState } from 'react';

export const useTempSymptomData = () => {
  const [symptomData, setSymptomData] = useState<{ type: string; detail: string }>({
    type: '',
    detail: '',
  });

  const updateSymptomData = (e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setSymptomData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return {
    symptomData,
    updateSymptomData,
  };
};
