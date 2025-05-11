import { create } from 'zustand';

interface SymptomState {
  symptomType: string;
  symptomDetail: string;
  setSymptomData: (symptomType: string, symptomDetail: string) => void;
  resetSymptom: () => void;
}

export const useSymptomStore = create<SymptomState>((set) => ({
  symptomType: '',
  symptomDetail: '',
  setSymptomData: (symptomType, symptomDetail) => set({ symptomType, symptomDetail }),
  resetSymptom: () => set({ symptomType: '', symptomDetail: '' }),
}));
