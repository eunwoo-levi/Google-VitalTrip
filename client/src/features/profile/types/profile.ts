export interface Profile {
  id: string;
  email: string;
  name: string;
  birthDate: string;
  countryCode: string;
  phoneNumber: string;
  profileImageUrl: string | null;
}

export interface ProfileResponse {
  isAuthenticated: boolean;
  data: {
    data: Profile;
  };
}
