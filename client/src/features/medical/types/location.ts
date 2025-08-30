export interface IdentifyCountryRequest {
  latitude: number;
  longitude: number;
}

export interface EmergencyContact {
  fire: string | null;
  police: string | null;
  medical: string | null;
  general: string | null;
}

export interface IdentifyCountryData {
  countryCode: string;
  countryName: string;
  latitude: number;
  longitude: number;
  emergencyContact: EmergencyContact | null;
}

export interface IdentifyCountryResponse {
  message: string;
  data: IdentifyCountryData;
}
