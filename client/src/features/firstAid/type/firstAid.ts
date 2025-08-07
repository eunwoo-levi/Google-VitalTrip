export interface FirstAid {
  content: string;
  summary: string;
  recommendedAction: string;
  confidence: number;
  blogLinks: string[];
}

export interface Symtoms {
  symptomType: string;
  symptomDetail: string;
}
