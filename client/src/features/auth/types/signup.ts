export interface SignupForm {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birthDate: string;
  countryCode: string;
  phoneNumber: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginErrors {
  email: string;
  password: string;
}

export interface SignupErrors {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}
