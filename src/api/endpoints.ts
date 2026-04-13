import { apiClient } from './client';
import { API_CONFIG } from './config';
import { buildLoginPayload } from '../auth/login-adapter';
import type { AuthTokens, LoginCredentials, User, InstalledGame } from '../types';

function extractAuthTokens(data: Record<string, unknown>): AuthTokens {
  const envelope = data?.data && typeof data.data === 'object' ? data.data as Record<string, unknown> : data;
  return {
    access_token: (envelope.access_token as string) || '',
    refresh_token: (envelope.refresh_token as string) || '',
    user_data: envelope.user_data,
  };
}

export async function login(credentials: LoginCredentials): Promise<AuthTokens> {
  const payload = buildLoginPayload(credentials);
  const { data } = await apiClient.post(API_CONFIG.endpoints.login, payload);
  return extractAuthTokens(data);
}

export async function refreshToken(token: string): Promise<AuthTokens> {
  const { data } = await apiClient.post(API_CONFIG.endpoints.refreshToken, {
    refresh_token: token,
  });
  return extractAuthTokens(data);
}

export async function logout(): Promise<void> {
  await apiClient.post(API_CONFIG.endpoints.logout);
}

function extractUser(data: Record<string, unknown>): User {
  if (data?.data && typeof data.data === 'object') return data.data as User;
  return data as unknown as User;
}

export async function getCurrentUser(): Promise<User> {
  const { data } = await apiClient.get(API_CONFIG.endpoints.user);
  return extractUser(data);
}

export async function getInstalledGames(): Promise<InstalledGame[]> {
  const { data } = await apiClient.get(API_CONFIG.endpoints.installedGames);
  if (Array.isArray(data)) return data;
  if (data?.data && Array.isArray(data.data)) return data.data;
  if (data?.applications && Array.isArray(data.applications)) return data.applications;
  return [];
}
