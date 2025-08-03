import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SymptomState {
  symptomType: string;
  symptomDetail: string;
  setSymptomData: (type: string, detail: string) => void;
  resetSymptom: () => void;
}

export const useSymptomStore = create<SymptomState>()(
  persist(
    (set) => ({
      symptomType: '',
      symptomDetail: '',
      setSymptomData: (symptomType, symptomDetail) => set({ symptomType, symptomDetail }),
      resetSymptom: () => set({ symptomType: '', symptomDetail: '' }),
    }),
    {
      name: 'symptom-storage',
    },
  ),
);
