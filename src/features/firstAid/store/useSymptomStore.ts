import { create } from 'zustand';

interface SymptomState {
  selectedSymptom: string;
  detail: string;
  setSymptomData: (symptom: string, detail: string) => void;
  resetSymptom: () => void;
}

export const useSymptomStore = create<SymptomState>((set) => ({
  selectedSymptom: '',
  detail: '',
  setSymptomData: (selectedSymptom, detail) => set({ selectedSymptom, detail }),
  resetSymptom: () => set({ selectedSymptom: '', detail: '' }),
}));
