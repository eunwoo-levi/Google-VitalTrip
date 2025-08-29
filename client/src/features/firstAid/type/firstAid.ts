export interface FirstAid {
  content: string;
  summary: string;
  recommendedAction: string;
  emergencyContact: {
    fire: string | null;
    police: string | null;
    medical: string | null;
    general: string | null;
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
