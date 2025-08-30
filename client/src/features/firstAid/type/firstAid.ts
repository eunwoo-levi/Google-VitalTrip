import { Medical } from '../../medical/types/medical';

export interface FirstAid {
  content: string;
  summary: string;
  recommendedAction: string;
  identificationResponse: {
    countryCode: string;
    countryName: string;
    latitude: number;
    longitude: number;
    emergencyContact: {
      fire: string | null;
      police: string | null;
      medical: string | null;
      general: string | null;
    };
  };
  disclaimer: string;
  confidence: number;
  blogLinks: string[];
}

export interface Symtoms {
  symptomType: string;
  symptomDetail: string;
  latitude: number;
  longitude: number;
}

export interface FirstAidCombinedResponse {
  firstAid: FirstAid;
  hospitals: Medical[];
  pharmacies: Medical[];
}
