/** @format */

'use client';

import { SquareButton } from '@/components/Buttons';
import Checkbox from '@/components/Buttons/CheckBox';
import Input from '@/components/Forms/Input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

import {
  useForgetUserId,
  useForgetPassword,
} from '@/queries/auth/mutation-options';
import React, { useState } from 'react';
import AuthDialog from './AuthDialog';

export default function SigninForm() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [passwordEmail, setPasswordEmail] = useState('');

  const { mutate: forgetUserid, isPending: isUserIdPending } =
    useForgetUserId();
  const { mutate: forgetPassword, isPending: isPasswordPending } =
    useForgetPassword();

  const form = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleFindIdClick = () => setShowModal(true);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식이 아닙니다');
      return false;
    }
    return true;
  };

  const handleForgetUserIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && validateEmail(email)) {
      forgetUserid(
        { email },
        {
          onSuccess: () => {
            alert('아이디가 이메일로 전송되었습니다!');
            setShowModal(false);
            setEmail('');
          },
          onError: (error: any) => {
            if (error.response?.data) {
              const errorData = error.response.data.message;
              alert(errorData);
            } else {
              alert('에러가 발생했습니다.');
            }
          },
        },
      );
    }
  };

  const handleForgetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordEmail && validateEmail(passwordEmail)) {
      forgetPassword(
        { email: passwordEmail },
        {
          onSuccess: () => {
            alert('임시 비밀번호가 이메일로 전송되었습니다!');
            setPasswordEmail('');
          },
          onError: (error: any) => {
            if (error.response?.data) {
              const errorData = error.response.data.message;
              alert(errorData);
            } else {
              alert('에러가 발생했습니다.');
            }
          },
        },
      );
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-[13px] mt-12 px-4 "
        >
          <Input placeholder="아이디" state="default" className="w-full" />

          <Input placeholder="패스워드" state="default" />

          <div className="flex items-center gap-4 mt-2 mb-4">
            <Checkbox
              label="자동로그인"
              id="remember"
              name="remember"
              value="remember"
              className="cursor-pointer"
            />
            <Checkbox
              label="아이디저장"
              id="rememberId"
              name="rememberId"
              value="rememberId"
              className="cursor-pointer"
            />
          </div>

          <SquareButton
            color="primary"
            variant="solid"
            fullWidth
            className="bg-gray-70 hover:bg-gray-80 mb-5"
            type="submit"
          >
            로그인
          </SquareButton>

          <SquareButton
            fullWidth
            className="bg-yellow-300 text-black hover:bg-yellow-300 border-none mb-2.5"
            iconLeft={
              <img
                src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png"
                alt="카카오 로고"
              />
            }
            type="button"
          >
            카카오 로그인
          </SquareButton>

          <SquareButton
            fullWidth
            className="bg-green-500 text-white hover:bg-green-500 border-none mb-5"
            type="button"
          >
            네이버 로그인
          </SquareButton>

          <div className="flex items-center justify-around gap-2 text-sm text-gray-500">
            <AuthDialog
              onSubmit={handleForgetUserIdSubmit}
              email={email}
              setEmail={setEmail}
              isPending={isUserIdPending}
              label="아이디 찾기"
              description="입력하신 이메일로 아이디가 발송됩니다."
              submitButtonText="아이디 찾기"
              loadingText="전송중..."
            />
            <div className="w-px h-3 bg-gray-300" />
            <AuthDialog
              onSubmit={handleForgetPasswordSubmit}
              email={passwordEmail}
              setEmail={setPasswordEmail}
              isPending={isPasswordPending}
              label="비밀번호 찾기"
              description="입력하신 이메일로 임시 비밀번호가 발송됩니다."
              submitButtonText="임시 비밀번호 발송"
              loadingText="전송중..."
            />
            <div className="w-px h-3 bg-gray-300" />
            <button type="button" className="hover:text-gray-700">
              회원가입
            </button>
          </div>
        </form>
      </Form>
    </>
  );
}
