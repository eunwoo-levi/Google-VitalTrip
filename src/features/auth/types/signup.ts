export interface SignupRequest {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  birthDate: string;
  countryCode: string;
  phoneNumber: string;
}

export interface SignupResponse {
  message: string;
  data: SignupFormData;
}

export interface SignupFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birthDate: string;
  countryCode: string;
  phoneNumber: string;
}
