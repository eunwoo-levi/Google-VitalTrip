export interface Medical {
  name: string;
  address: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
  distance: number;
  openNow: boolean;
  opendingHours: string[];
  websiteUrl: string;
  imageUrl: string;
}

export type MedicalType = 'hospital' | 'pharmacy' | 'emergency';
