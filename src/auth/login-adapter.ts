import type { LoginCredentials } from '../types';

export function buildLoginPayload(
  credentials: LoginCredentials,
): Record<string, string | boolean> {
  const payload: Record<string, string | boolean> = {
    email: credentials.email.toLowerCase(),
    password: credentials.password,
    remember_me: credentials.remember_me ?? false,
  };
  if (credentials['cf-turnstile-response']) {
    payload['cf-turnstile-response'] = credentials['cf-turnstile-response'];
  }
  return payload;
}
