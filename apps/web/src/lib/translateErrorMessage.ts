import {
  DEFAULT_ERROR_MESSAGE,
  EMAIL_IS_NOT_VALID,
  EMAIL_NOT_CONFIRMED,
  INVALID_LOGIN_CREDENTIALS,
  NETWORK_ERROR,
  PASSWORD_SHOULD_BE_AT_LEAST_6_CHARACTERS,
  USER_ALREADY_REGISTERED,
  USER_NOT_FOUND,
} from '../common/errorMessage';

export function translateErrorMessage(errorMessage: string): string {
  const map: { [key: string]: string } = {
    'Invalid login credentials': INVALID_LOGIN_CREDENTIALS,
    'User already registered': USER_ALREADY_REGISTERED,
    'Email not confirmed': EMAIL_NOT_CONFIRMED,
    'Password should be at least 6 characters':
      PASSWORD_SHOULD_BE_AT_LEAST_6_CHARACTERS,
    'User not found': USER_NOT_FOUND,
    'Email is not valid': EMAIL_IS_NOT_VALID,
    'Network error': NETWORK_ERROR,
  };

  if (map[errorMessage]) {
    return map[errorMessage];
  }

  if (errorMessage.includes('Invalid login credentials')) {
    return INVALID_LOGIN_CREDENTIALS;
  }
  if (errorMessage.includes('User already registered')) {
    return EMAIL_NOT_CONFIRMED;
  }

  // 未対応の場合はデフォルト
  return DEFAULT_ERROR_MESSAGE;
}
