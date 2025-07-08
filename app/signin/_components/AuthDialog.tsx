/** @format */

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

interface AuthDialogProps {
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (e: string) => void;
  isPending: boolean;
  label: string;
  description?: string;
  submitButtonText: string;
  loadingText: string;
}

export default function AuthDialog({
  onSubmit,
  email,
  setEmail,
  isPending,
  label,
  description,
  submitButtonText,
  loadingText,
}: AuthDialogProps) {
  return (
    <Dialog onOpenChange={open => !open && setEmail('')}>
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
          <div className="space-y-2">
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              placeholder="가입하신 이메일을 입력해주세요"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            {description && (
              <p className="text-sm text-gray-500">* {description}</p>
            )}
          </div>

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
              {isPending ? loadingText : submitButtonText}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
