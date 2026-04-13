export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  user_data?: unknown;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  avatar?: string;
  [key: string]: unknown;
}

export interface InstalledGame {
  id: number;
  name: string;
  slug?: string;
  icon?: string;
  cover?: string;
  description?: string;
  [key: string]: unknown;
}

export interface ApiError {
  message?: string;
  error_code?: number;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}
