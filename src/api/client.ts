import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { API_CONFIG } from './config';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '../auth/storage';

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
}

function resolveUrl(path: string): string {
  return API_CONFIG.baseUrl ? `${API_CONFIG.baseUrl}${path}` : path;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== API_CONFIG.endpoints.login &&
      originalRequest.url !== API_CONFIG.endpoints.refreshToken
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = token;
              resolve(apiClient(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          resolveUrl(API_CONFIG.endpoints.refreshToken),
          { refresh_token: refreshToken },
          { headers: { 'Content-Type': 'application/json' } },
        );
        const newAccessToken = data.access_token ?? data?.data?.access_token;
        const newRefreshToken =
          data.refresh_token ?? data?.data?.refresh_token ?? refreshToken;
        const userData = data.user_data ?? data?.data?.user_data;
        setTokens(newAccessToken, newRefreshToken, userData);
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = newAccessToken;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
