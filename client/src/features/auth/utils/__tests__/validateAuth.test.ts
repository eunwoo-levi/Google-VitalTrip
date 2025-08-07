import type { LoginForm, SignupForm } from '../../types/signup';
import {
  isDataEmpty,
  isLoginFormValid,
  isSignupFormValid,
  validateEmail,
  validateLoginForm,
  validateName,
  validatePassword,
  validatePasswordConfirm,
  validateSignupField,
  validateSignupForm,
} from '../validateAuth';

describe('validateAuth', () => {
  describe('validateEmail', () => {
    it('should return error for empty email', () => {
      expect(validateEmail('')).toBe('Please enter your email.');
      expect(validateEmail('   ')).toBe('Please enter a valid email format.');
    });

    it('should return error for invalid email formats', () => {
      expect(validateEmail('invalid')).toBe('Please enter a valid email format.');
      expect(validateEmail('test@')).toBe('Please enter a valid email format.');
      expect(validateEmail('@test.com')).toBe('Please enter a valid email format.');
      expect(validateEmail('test@test')).toBe('Please enter a valid email format.');
      expect(validateEmail('test..test@test.com')).toBe('');
    });

    it('should return empty string for valid email formats', () => {
      expect(validateEmail('test@test.com')).toBe('');
      expect(validateEmail('user.name@domain.co.uk')).toBe('');
      expect(validateEmail('test+tag@example.com')).toBe('');
      expect(validateEmail('123@456.com')).toBe('');
    });
  });

  describe('validatePassword', () => {
    it('should return error for empty password', () => {
      expect(validatePassword('')).toBe('Please enter your password.');
      expect(validatePassword('   ')).toBe(
        'Password must be 8-16 characters and include lowercase letters, numbers, and special characters (!@#$%^&*()).',
      );
    });

    it('should return error for passwords that are too short', () => {
      expect(validatePassword('abc123!')).toBe(
        'Password must be 8-16 characters and include lowercase letters, numbers, and special characters (!@#$%^&*()).',
      );
    });

    it('should return error for passwords that are too long', () => {
      expect(validatePassword('abcdefghijklmnopqrstuvwxyz123!')).toBe(
        'Password must be 8-16 characters and include lowercase letters, numbers, and special characters (!@#$%^&*()).',
      );
    });

    it('should return error for passwords without lowercase letters', () => {
      expect(validatePassword('ABCD123!')).toBe(
        'Password must be 8-16 characters and include lowercase letters, numbers, and special characters (!@#$%^&*()).',
      );
    });

    it('should return error for passwords without numbers', () => {
      expect(validatePassword('abcdefg!')).toBe(
        'Password must be 8-16 characters and include lowercase letters, numbers, and special characters (!@#$%^&*()).',
      );
    });

    it('should return error for passwords without special characters', () => {
      expect(validatePassword('abcdef123')).toBe(
        'Password must be 8-16 characters and include lowercase letters, numbers, and special characters (!@#$%^&*()).',
      );
    });

    it('should return empty string for valid passwords', () => {
      expect(validatePassword('abc123!@')).toBe('');
      expect(validatePassword('password123!')).toBe('');
      expect(validatePassword('test123#')).toBe('');
      expect(validatePassword('mypass123$')).toBe('');
    });
  });

  describe('validatePasswordConfirm', () => {
    it('should return error for empty password confirmation', () => {
      expect(validatePasswordConfirm('password123!', '')).toBe('Please enter your password.');
      expect(validatePasswordConfirm('password123!', '   ')).toBe('Passwords do not match.');
    });

    it('should return error when passwords do not match', () => {
      expect(validatePasswordConfirm('password123!', 'password123@')).toBe(
        'Passwords do not match.',
      );
      expect(validatePasswordConfirm('abc123!@', 'abc123!')).toBe('Passwords do not match.');
    });

    it('should return empty string when passwords match', () => {
      expect(validatePasswordConfirm('password123!', 'password123!')).toBe('');
      expect(validatePasswordConfirm('abc123!@', 'abc123!@')).toBe('');
    });
  });

  describe('validateName', () => {
    it('should return error for empty nickname', () => {
      expect(validateName('')).toBe('Please enter your nickname.');
      expect(validateName('   ')).toBe('Nickname cannot contain special characters.');
    });

    it('should return error for nickname that is too short', () => {
      expect(validateName('a')).toBe('Nickname must be at least 2 characters long.');
    });

    it('should return error for nickname that is too long', () => {
      expect(validateName('abcdefghijklmnopqrstuvwxyz')).toBe(
        'Nickname must be 6 characters or less.',
      );
    });

    it('should return error for nickname with special characters', () => {
      expect(validateName('test@')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test!')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test$')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test%')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test^')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test&')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test*')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test(')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test)')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test|')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test+')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test-')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test=')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test?')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test;')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test:')).toBe('Nickname cannot contain special characters.');
      expect(validateName("test'")).toBe('Nickname cannot contain special characters.');
      expect(validateName('test"')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test,')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test.')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test<')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test>')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test{')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test}')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test[')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test]')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test\\')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test/')).toBe('Nickname cannot contain special characters.');
      expect(validateName('test ')).toBe('Nickname cannot contain special characters.');
    });

    it('should return empty string for valid nicknames', () => {
      expect(validateName('ab')).toBe('');
      expect(validateName('test')).toBe('');
      expect(validateName('user1')).toBe('');
      expect(validateName('abcdef')).toBe('');
    });
  });

  describe('validateSignupField', () => {
    const mockSignupData: SignupForm = {
      email: 'test@test.com',
      password: 'password123!',
      passwordConfirm: 'password123!',
      name: 'testuser',
      birthDate: '1990-01-01',
      countryCode: '+1',
      phoneNumber: '1234567890',
    };

    it('should validate email field', () => {
      expect(validateSignupField('email', '', mockSignupData)).toBe('Please enter your email.');
      expect(validateSignupField('email', 'invalid', mockSignupData)).toBe(
        'Please enter a valid email format.',
      );
      expect(validateSignupField('email', 'valid@test.com', mockSignupData)).toBe('');
    });

    it('should validate password field', () => {
      expect(validateSignupField('password', '', mockSignupData)).toBe(
        'Please enter your password.',
      );
      expect(validateSignupField('password', 'weak', mockSignupData)).toBe(
        'Password must be 8-16 characters and include lowercase letters, numbers, and special characters (!@#$%^&*()).',
      );
      expect(validateSignupField('password', 'strong123!', mockSignupData)).toBe('');
    });

    it('should validate passwordConfirm field', () => {
      expect(validateSignupField('passwordConfirm', '', mockSignupData)).toBe(
        'Please enter your password.',
      );
      expect(validateSignupField('passwordConfirm', 'different123!', mockSignupData)).toBe(
        'Passwords do not match.',
      );
      expect(validateSignupField('passwordConfirm', 'password123!', mockSignupData)).toBe('');
    });

    it('should validate name field', () => {
      expect(validateSignupField('name', '', mockSignupData)).toBe('Please enter your nickname.');
      expect(validateSignupField('name', 'a', mockSignupData)).toBe(
        'Nickname must be at least 2 characters long.',
      );
      expect(validateSignupField('name', 'test@', mockSignupData)).toBe(
        'Nickname cannot contain special characters.',
      );
      expect(validateSignupField('name', 'testuser', mockSignupData)).toBe(
        'Nickname must be 6 characters or less.',
      );
    });

    it('should return empty string for unknown field', () => {
      expect(validateSignupField('unknown' as keyof SignupForm, 'value', mockSignupData)).toBe('');
    });
  });

  describe('validateLoginForm', () => {
    it('should validate login form with all errors', () => {
      const loginData: LoginForm = {
        email: '',
        password: '',
      };
      const errors = validateLoginForm(loginData);
      expect(errors.email).toBe('Please enter your email.');
      expect(errors.password).toBe('Please enter your password.');
    });

    it('should validate login form with partial errors', () => {
      const loginData: LoginForm = {
        email: 'invalid',
        password: 'weak',
      };
      const errors = validateLoginForm(loginData);
      expect(errors.email).toBe('Please enter a valid email format.');
      expect(errors.password).toBe(
        'Password must be 8-16 characters and include lowercase letters, numbers, and special characters (!@#$%^&*()).',
      );
    });

    it('should validate login form with valid data', () => {
      const loginData: LoginForm = {
        email: 'test@test.com',
        password: 'password123!',
      };
      const errors = validateLoginForm(loginData);
      expect(errors.email).toBe('');
      expect(errors.password).toBe('');
    });
  });

  describe('validateSignupForm', () => {
    it('should validate signup form with all errors', () => {
      const signupData: SignupForm = {
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
        birthDate: '',
        countryCode: '',
        phoneNumber: '',
      };
      const errors = validateSignupForm(signupData);
      expect(errors.email).toBe('Please enter your email.');
      expect(errors.password).toBe('Please enter your password.');
      expect(errors.passwordConfirm).toBe('Please enter your password.');
      expect(errors.name).toBe('Please enter your nickname.');
    });

    it('should validate signup form with partial errors', () => {
      const signupData: SignupForm = {
        email: 'invalid',
        password: 'weak',
        passwordConfirm: 'different',
        name: 'a',
        birthDate: '',
        countryCode: '',
        phoneNumber: '',
      };
      const errors = validateSignupForm(signupData);
      expect(errors.email).toBe('Please enter a valid email format.');
      expect(errors.password).toBe(
        'Password must be 8-16 characters and include lowercase letters, numbers, and special characters (!@#$%^&*()).',
      );
      expect(errors.passwordConfirm).toBe('Passwords do not match.');
      expect(errors.name).toBe('Nickname must be at least 2 characters long.');
    });

    it('should validate signup form with valid data', () => {
      const signupData: SignupForm = {
        email: 'test@test.com',
        password: 'password123!',
        passwordConfirm: 'password123!',
        name: 'testuser',
        birthDate: '1990-01-01',
        countryCode: '+1',
        phoneNumber: '1234567890',
      };
      const errors = validateSignupForm(signupData);
      expect(errors.email).toBe('');
      expect(errors.password).toBe('');
      expect(errors.passwordConfirm).toBe('');
      expect(errors.name).toBe('Nickname must be 6 characters or less.');
    });
  });

  describe('isLoginFormValid', () => {
    it('should return false when there are errors', () => {
      const errors = {
        email: 'Please enter your email.',
        password: 'Please enter your password.',
      };
      expect(isLoginFormValid(errors)).toBe(false);
    });

    it('should return true when there are no errors', () => {
      const errors = {
        email: '',
        password: '',
      };
      expect(isLoginFormValid(errors)).toBe(true);
    });

    it('should return false when some fields have errors', () => {
      const errors = {
        email: '',
        password: 'Please enter your password.',
      };
      expect(isLoginFormValid(errors)).toBe(false);
    });
  });

  describe('isSignupFormValid', () => {
    it('should return false when there are errors', () => {
      const errors = {
        email: 'Please enter your email.',
        password: 'Please enter your password.',
        passwordConfirm: 'Please enter your password.',
        name: 'Please enter your nickname.',
      };
      expect(isSignupFormValid(errors)).toBe(false);
    });

    it('should return true when there are no errors', () => {
      const errors = {
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
      };
      expect(isSignupFormValid(errors)).toBe(true);
    });

    it('should return false when some fields have errors', () => {
      const errors = {
        email: '',
        password: '',
        passwordConfirm: 'Passwords do not match.',
        name: '',
      };
      expect(isSignupFormValid(errors)).toBe(false);
    });
  });

  describe('isDataEmpty', () => {
    it('should return true for empty login form', () => {
      const loginData: LoginForm = {
        email: '',
        password: '',
      };
      expect(isDataEmpty(loginData)).toBe(true);
    });

    it('should return true for empty signup form', () => {
      const signupData: SignupForm = {
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
        birthDate: '',
        countryCode: '',
        phoneNumber: '',
      };
      expect(isDataEmpty(signupData)).toBe(true);
    });

    it('should return false for non-empty login form', () => {
      const loginData: LoginForm = {
        email: 'test@test.com',
        password: 'password123!',
      };
      expect(isDataEmpty(loginData)).toBe(false);
    });

    it('should return false for non-empty signup form', () => {
      const signupData: SignupForm = {
        email: 'test@test.com',
        password: 'password123!',
        passwordConfirm: 'password123!',
        name: 'testuser',
        birthDate: '1990-01-01',
        countryCode: '+1',
        phoneNumber: '1234567890',
      };
      expect(isDataEmpty(signupData)).toBe(false);
    });

    it('should return false when some fields are filled', () => {
      const loginData: LoginForm = {
        email: 'test@test.com',
        password: '',
      };
      expect(isDataEmpty(loginData)).toBe(false);
    });
  });
});
