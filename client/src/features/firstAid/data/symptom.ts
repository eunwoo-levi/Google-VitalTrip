export const SYMPTOMS = [
  { code: 'BLEEDING' },
  { code: 'BURNS' },
  { code: 'FRACTURE' },
  { code: 'ALLERGIC_REACTION' },
  { code: 'SEIZURE' },
  { code: 'HEATSTROKE' },
  { code: 'HYPOTHERMIA' },
  { code: 'POISONING' },
  { code: 'BREATHING_DIFFICULTY' },
  { code: 'ANIMAL_BITE' },
  { code: 'FALL_INJURY' },
] as const;

export type SymptomCode = (typeof SYMPTOMS)[number]['code'];
