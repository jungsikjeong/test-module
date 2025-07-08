/** @format */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// API 성공 응답 타입 정의
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
}

// API 에러 응답 타입 정의
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  devMessage?: string;
}

// API 응답 타입 통합
export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // CORS 쿠키 전송을 위해 필요
});

// 응답 인터셉터
client.interceptors.response.use(
  response => {
    // 성공 응답을 ApiSuccessResponse 형식으로 변환
    const apiResponse: ApiSuccessResponse = {
      success: true,
      data: response.data,
    };
    response.data = apiResponse;
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as CustomRequestConfig;

    // 401 에러 && 재시도하지 않은 경우
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await client.post('/auth/refresh');
        if (originalRequest) {
          return client(originalRequest);
        }
      } catch (refreshError) {
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    // 서버에서 오는 에러 응답을 그대로 사용
    if (error.response?.data) {
      return Promise.reject(error);
    }

    // 서버 응답이 없는 경우 기본 에러 응답 생성
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: 'UNKNOWN_ERROR',
      message: '알 수 없는 에러가 발생했습니다.',
    };

    if (error.response) {
      error.response.data = errorResponse;
    }

    return Promise.reject(error);
  },
);

export default client;
