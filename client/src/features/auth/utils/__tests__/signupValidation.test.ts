import type { SignupForm } from '../../types/signup';
import {
  isDataEmpty,
  isSignupFormValid,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirm,
  validateSignupForm,
} from '../validateAuth';

describe('Signup Validation', () => {
  describe('validateEmail', () => {
    it('should return error for empty email', () => {
      expect(validateEmail('')).toBe('Please enter your email.');
    });

    it('should return error for invalid email format', () => {
      expect(validateEmail('invalid')).toBe('Please enter a valid email format.');
    });

    it('should return empty string for valid email', () => {
      expect(validateEmail('test@test.com')).toBe('');
    });
  });

  describe('validatePassword', () => {
    it('should return error for empty password', () => {
      expect(validatePassword('')).toBe('Please enter your password.');
    });

    it('should return error for weak password', () => {
      expect(validatePassword('weak')).toBe(
        'Password must be 8-16 characters and include lowercase letters, numbers, and special characters (!@#$%^&*()).',
      );
    });

    it('should return empty string for valid password', () => {
      expect(validatePassword('password123!')).toBe('');
    });
  });

  describe('validatePasswordConfirm', () => {
    it('should return error for empty password confirmation', () => {
      expect(validatePasswordConfirm('password123!', '')).toBe('Please enter your password.');
    });

    it('should return error when passwords do not match', () => {
      expect(validatePasswordConfirm('password123!', 'password123@')).toBe(
        'Passwords do not match.',
      );
    });

    it('should return empty string when passwords match', () => {
      expect(validatePasswordConfirm('password123!', 'password123!')).toBe('');
    });
  });

  describe('validateName', () => {
    it('should return error for empty nickname', () => {
      expect(validateName('')).toBe('Please enter your nickname.');
    });

    it('should return error for nickname that is too short', () => {
      expect(validateName('a')).toBe('Nickname must be at least 2 characters long.');
    });

    it('should return error for nickname with special characters', () => {
      expect(validateName('test@')).toBe('Nickname cannot contain special characters.');
    });

    it('should return empty string for valid nickname', () => {
      expect(validateName('testuser')).toBe('Nickname must be 6 characters or less.');
    });
  });

  describe('validateSignupForm', () => {
    it('should validate signup form with errors', () => {
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

  describe('isSignupFormValid', () => {
    it('should return false when there are errors', () => {
      const errors = {
        email: 'Please enter your email.',
        password: 'Please enter your password.',
        passwordConfirm: 'Please enter your password.',
        name: 'Please enter your nickname.',
        birthDate: '',
        countryCode: '',
        phoneNumber: '',
      };
      expect(isSignupFormValid(errors)).toBe(false);
    });

    it('should return true when there are no errors', () => {
      const errors = {
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
        birthDate: '',
        countryCode: '',
        phoneNumber: '',
      };
      expect(isSignupFormValid(errors)).toBe(true);
    });
  });

  describe('isDataEmpty', () => {
    it('should return true for empty form', () => {
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

    it('should return false for non-empty form', () => {
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
  });
});
