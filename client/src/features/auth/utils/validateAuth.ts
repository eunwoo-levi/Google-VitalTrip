import type { LoginErrors, LoginForm, SignupErrors, SignupForm } from '../types/signup';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NICKNAME_REGEX = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,16}$/;

export const validateEmail = (email: string): string => {
  if (!email) {
    return 'Please enter your email.';
  } else if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email format.';
  }
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Please enter your password.';
  } else if (!PASSWORD_REGEX.test(password)) {
    return 'Password must be 8-16 characters and include lowercase letters, numbers, and special characters (!@#$%^&*()).';
  }
  return '';
};

export const validatePasswordConfirm = (password: string, passwordConfirm: string): string => {
  if (!passwordConfirm) {
    return 'Please enter your password.';
  } else if (passwordConfirm !== password) {
    return 'Passwords do not match.';
  }
  return '';
};

export const validateName = (nickname: string): string => {
  if (!nickname) {
    return 'Please enter your nickname.';
  } else if (nickname.length < 2) {
    return 'Nickname must be at least 2 characters long.';
  } else if (nickname.length > 6) {
    return 'Nickname must be 6 characters or less.';
  } else if (NICKNAME_REGEX.test(nickname)) {
    return 'Nickname cannot contain special characters.';
  }
  return '';
};

export const validateSignupField = (
  field: keyof SignupForm,
  value: string,
  signupData: SignupForm,
): string => {
  switch (field) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    case 'passwordConfirm':
      return validatePasswordConfirm(signupData.password, value);
    case 'name':
      return validateName(value);
    default:
      return '';
  }
};

export const validateLoginForm = (data: LoginForm): LoginErrors => {
  return {
    email: validateEmail(data.email),
    password: validatePassword(data.password),
  };
};

export const validateSignupForm = (data: SignupForm): SignupErrors => {
  return {
    email: validateEmail(data.email),
    password: validatePassword(data.password),
    passwordConfirm: validatePasswordConfirm(data.password, data.passwordConfirm),
    name: validateName(data.name),
  };
};

export const isLoginFormValid = (errors: LoginErrors): boolean => {
  return Object.values(errors).every((error) => error === '');
};

export const isSignupFormValid = (errors: SignupErrors): boolean => {
  return Object.values(errors).every((error) => error === '');
};

export const isDataEmpty = (data: LoginForm | SignupForm): boolean => {
  return Object.values(data).every((value) => value === '');
};
