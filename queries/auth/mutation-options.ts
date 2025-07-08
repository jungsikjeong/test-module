/** @format */

import { useMutation } from '@tanstack/react-query';
import client, { ApiResponse, ApiSuccessResponse } from '../common/client';
import type { ForgetUserIdRequestDto, ForgetPasswordRequestDto } from './dto';
import { authQueries } from './query-options';

export const useSignIn = () => {
  return useMutation({
    ...authQueries.signIn,
  });
};

export const useForgetUserId = () => {
  return useMutation({
    mutationFn: async (
      data: ForgetUserIdRequestDto,
    ): Promise<ApiSuccessResponse> => {
      const { data: responseData } = await client.post<ApiSuccessResponse>(
        '/auth/forget-userid',
        data,
      );
      console.log('responseData:', responseData);
      return responseData;
    },
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: async (
      data: ForgetPasswordRequestDto,
    ): Promise<ApiSuccessResponse> => {
      const { data: responseData } = await client.post<ApiSuccessResponse>(
        '/auth/forget-password',
        data,
      );
      return responseData;
    },
  });
};
