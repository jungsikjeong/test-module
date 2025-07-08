/** @format */

import client, { ApiResponse } from '../common/client';
import type {
  ForgetUserIdRequestDto,
  SignInRequestDto,
  SignInResponseDto,
} from './dto';

// Query Keys
export const authKeys = {
  all: ['auth'] as const,
  signIn: () => [...authKeys.all, 'signin'] as const,
} as const;

// Query Options
export const authQueries = {
  signIn: {
    mutationFn: async (data: SignInRequestDto) => {
      const { data: responseData } = await client.post<
        ApiResponse<SignInResponseDto>
      >('/auth/signin', data);

      return responseData;
    },
  },
};
