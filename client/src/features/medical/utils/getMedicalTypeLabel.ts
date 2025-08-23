import { MedicalType } from '../types/medical';

export const getMedicalTypeLabel = (type: MedicalType) => {
  switch (type) {
    case 'hospital':
      return 'Hospital';
    case 'pharmacy':
      return 'Pharmacy';
    case 'emergency':
      return 'Emergency';
    default:
      return type;
  }
};
