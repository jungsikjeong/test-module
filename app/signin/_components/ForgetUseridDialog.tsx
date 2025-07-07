import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function ForgetUseridDialog({
  handleSubmit,
  email,
  setEmail,
  isPending,
  label,
}: {
  handleSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (e: string) => void;
  isPending: boolean;
  label: string;
}) {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="hover:text-gray-700">
          {label}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="가입하신 이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <DialogFooter>
            <DialogClose asChild>
              <button type="button" className="px-4 py-2 rounded bg-gray-200">
                취소
              </button>
            </DialogClose>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary text-white"
              disabled={isPending}
            >
              {isPending ? "전송중..." : "아이디 찾기"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
