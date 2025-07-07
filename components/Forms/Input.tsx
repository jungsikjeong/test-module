
import {
  forwardRef,
  type InputHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "underline" | "filled";
  state?: "default" | "focus" | "error" | "disabled";
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  type = "text",
  label,
  variant = "underline",
  state = "default",
  disabled,
  ...props
}, ref) => {
  const currentState = disabled ? "disabled" : state;

  return (
    <div className="flex flex-col max-w-[500px]">
      {label && <label className="text-sm mb-1 text-gray-700">{label}</label>}
      <div className="relative">
        <input
          type={type}
          className={cn(
            "w-full py-2 px-3 bg-transparent outline-none bg-gray-10",
            variant === "underline" && "border-0 border-b",
            variant === "underline" && currentState === "default" && "border-gray-40",
            variant === "underline" && currentState === "focus" && "border-primary border",
            variant === "underline" && currentState === "error" && "border-red-light-30",
            variant === "underline" && currentState === "disabled" && "border-gray-200 bg-gray-100 text-gray-400",
            variant === "filled" && "bg-gray-100 border-0",
            variant === "filled" && currentState === "focus" && "bg-gray-50",
            variant === "filled" && currentState === "error" && "bg-red-50",
            variant === "filled" && currentState === "disabled" && "bg-gray-100 text-gray-400",
            className,
          )}
          disabled={disabled || currentState === "disabled"}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
