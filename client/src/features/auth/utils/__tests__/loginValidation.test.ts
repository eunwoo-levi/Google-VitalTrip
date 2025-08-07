import type { LoginForm } from '../../types/signup';
import {
  isDataEmpty,
  isLoginFormValid,
  validateEmail,
  validateLoginForm,
  validatePassword,
} from '../validateAuth';

describe('Login Validation', () => {
  describe('validateEmail', () => {
    it('should return error for empty email', () => {
      expect(validateEmail('')).toBe('Please enter your email.');
    });

    it('should return error for invalid email format', () => {
      expect(validateEmail('invalid')).toBe('Please enter a valid email format.');
      expect(validateEmail('test@')).toBe('Please enter a valid email format.');
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

  describe('validateLoginForm', () => {
    it('should validate login form with errors', () => {
      const loginData: LoginForm = {
        email: '',
        password: '',
      };
      const errors = validateLoginForm(loginData);
      expect(errors.email).toBe('Please enter your email.');
      expect(errors.password).toBe('Please enter your password.');
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
  });

  describe('isDataEmpty', () => {
    it('should return true for empty form', () => {
      const loginData: LoginForm = {
        email: '',
        password: '',
      };
      expect(isDataEmpty(loginData)).toBe(true);
    });

    it('should return false for non-empty form', () => {
      const loginData: LoginForm = {
        email: 'test@test.com',
        password: 'password123!',
      };
      expect(isDataEmpty(loginData)).toBe(false);
    });
  });
});
