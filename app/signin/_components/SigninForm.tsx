"use client";

import { SquareButton } from "@/components/Buttons";
import Checkbox from "@/components/Buttons/CheckBox";
import Input from "@/components/Forms/Input";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import useForgetUserid from "../_hooks/useForgetUserid";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import ForgetUseridDialog from "./ForgetUseridDialog";

export default function SigninForm() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const { mutate: forgetUserid, isPending } = useForgetUserid();

  const form = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleFindIdClick = () => setShowModal(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgetUserid(email, {
      onSuccess: () => {
        alert("아이디가 이메일로 전송되었습니다!");
        setShowModal(false);
        setEmail("");
      },
      onError: (err: any) => {
        alert(err.message || "에러가 발생했습니다.");
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-[13px] mt-12 px-4"
        >
          <Input placeholder="아이디" state="default" />

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
            <ForgetUseridDialog
              handleSubmit={(e: React.FormEvent) => {
                e.preventDefault();

                if (email) {
                  //TODO: 이메일정규화
                }
                // forgetUserid
              }}
              email={email}
              setEmail={setEmail}
              isPending={isPending}
              label="아이디 찾기"
            />
            <div className="w-px h-3 bg-gray-300" />
            <button type="button" className="hover:text-gray-700">
              비밀번호찾기
            </button>
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
