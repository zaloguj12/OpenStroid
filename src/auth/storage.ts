const STORAGE_KEYS = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  boosteroidAuth: 'boosteroid_auth',
} as const;

export function getAccessToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.accessToken);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.refreshToken);
}

export function getBoosteroidAuth(): unknown | null {
  const raw = localStorage.getItem(STORAGE_KEYS.boosteroidAuth);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export function setTokens(
  accessToken: string,
  refreshToken: string,
  userData?: unknown,
): void {
  localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
  localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
  if (userData !== undefined && userData !== null) {
    localStorage.setItem(
      STORAGE_KEYS.boosteroidAuth,
      typeof userData === 'string' ? userData : JSON.stringify(userData),
    );
  }
}

export function clearTokens(): void {
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS.boosteroidAuth);
}

export function hasStoredSession(): boolean {
  return !!getAccessToken() && !!getRefreshToken();
}
