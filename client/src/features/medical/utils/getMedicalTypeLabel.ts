import { TFunction } from 'i18next';
import { useTranslation } from '../../../shared/lib/i18n';
import { MedicalType } from '../types/medical';

export const getMedicalTypeLabel = (type: MedicalType, t?: TFunction) => {
  if (t) {
    return t(`medical.types.${type}`);
  }

  // Fallback for when translation function is not available
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

export const useMedicalTypeLabel = () => {
  const { t } = useTranslation();

  return (type: MedicalType) => getMedicalTypeLabel(type, t);
};
