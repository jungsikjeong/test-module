/** @format */

export interface SignInRequestDto {
  email: string;
  password: string;
}

export interface SignInResponseDto {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// 아이디 찾기 요청 DTO
export interface ForgetUserIdRequestDto {
  email: string;
}

export interface ForgetPasswordRequestDto {
  email: string;
}
