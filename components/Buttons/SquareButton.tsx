import React from "react";

export type SquareButtonProps = {
  variant?: "solid" | "ghost" | "text";
  color?: "primary" | "secondary" | "gray" | "danger";
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
};

// ✅ 사이즈별 버튼 클래스
const sizeClasses: Record<string, string> = {
  sm: "h-[32px] py-[5px] px-[10px] text-sm min-w-[72px]",
  md: "h-[40px] py-[9px] px-[14px] text-base min-w-[90px] font-medium",
  lg: "h-[48px] py-[13px] px-[16px] text-base min-w-[106px] font-medium",
};

// ✅ 기본 버튼 클래스
const baseButtonClasses = `
  inline-flex items-center justify-center
  rounded-[5px] gap-[10px]
  text-button
  transition-all duration-150
  outline-none focus:outline-none
  select-none
`;

// ✅ variant별 공통 클래스
const variantBaseClasses: Record<string, string> = {
  solid: "border shadow-sm focus:ring-2",
  ghost: "bg-transparent border shadow-sm focus:ring-2",
  text: "bg-transparent p-0 hover:underline focus:ring-0",
};

// ✅ variant + color 조합에 따른 스타일
const colorClasses: Record<string, Record<string, string>> = {
  solid: {
    primary: `
      bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-[var(--color-primary)]
      hover:bg-[var(--color-yellow-light-40)] active:bg-[var(--color-yellow-light-50)]
      focus:ring-[var(--color-ring)]
      disabled:bg-[var(--color-gray-20)] disabled:text-[var(--color-gray-40)]
    `,
    secondary: `
      bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] border-[var(--color-secondary)]
      hover:bg-[var(--color-gray-90)] hover:text-white active:bg-[var(--color-gray-100)]
      focus:ring-[var(--color-ring)]
      disabled:bg-[var(--color-gray-20)] disabled:text-[var(--color-gray-40)]
    `,
    danger: `
    bg-[var(--color-danger)] text-[var(--color-danger-foreground)] border-[var(--color-danger)]
    hover:bg-[var(--color-red-light-40)] active:bg-[var(--color-red-light-50)]
    focus:ring-[var(--color-red-light-30)]
    disabled:bg-[var(--color-gray-20)] disabled:text-[var(--color-gray-40)]
    `,
  },
  ghost: {
    primary: `
      text-[var(--color-primary)] border-[var(--color-primary)]
      hover:bg-[var(--color-yellow-light-10)] active:bg-[var(--color-yellow-light-20)]
      focus:ring-[var(--color-ring)]
      disabled:text-[var(--color-gray-40)] disabled:border-[var(--color-gray-20)]
    `,
    gray: `
      text-[var(--color-gray-70)] border-[var(--color-gray-40)]
      hover:bg-[var(--color-gray-10)] active:bg-[var(--color-gray-20)]
      focus:ring-[var(--color-ring)]
      disabled:text-[var(--color-gray-40)] disabled:border-[var(--color-gray-20)]
    `,
  },
  text: {
    primary: `
      text-[var(--color-primary)]
      hover:bg-transparent active:bg-transparent
      disabled:text-[var(--color-gray-40)]
    `,
    gray: `
      text-[var(--color-gray-70)]
      hover:bg-transparent active:bg-transparent
      disabled:text-[var(--color-gray-40)]
    `,
  },
};

export const SquareButton: React.FC<SquareButtonProps> = ({
  variant = "solid",
  color,
  disabled = false,
  iconLeft,
  iconRight,
  children,
  className = "",
  type = "button",
  "aria-label": ariaLabel,
  onClick,
  fullWidth = false,
  size = "md",
}) => {
  // 기본값 처리: variant에 따라 color default 지정
  const resolvedColor = color ?? "primary";

  const classes = `
    ${baseButtonClasses}
    ${sizeClasses[size]}
    ${variantBaseClasses[variant]}
    ${colorClasses[variant]?.[resolvedColor] ?? ""}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `;

  return (
    <button
      type={type}
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
      tabIndex={0}
      onClick={disabled ? undefined : onClick}
      role="button"
    >
      {iconLeft && <span className="flex items-center">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="flex items-center">{iconRight}</span>}
    </button>
  );
};

export default SquareButton;
