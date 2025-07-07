// components/IconButton.tsx
"use client";

import { forwardRef, type ElementType, type MouseEvent } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CircleHelp } from "lucide-react";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/**
 * Base props for the IconButton component
 */
interface BaseProps extends VariantProps<typeof iconButtonVariants> {
  /** Icon to be displayed in the button */
  icon?: React.ReactNode;
  /** Additional CSS classes to apply to the button */
  className?: string;
  /** Accessibility label for the button */
  "aria-label"?: string;
  /** Click event handler for the button */
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Props for the IconButton component when used as a link
 */
interface LinkProps extends BaseProps {
  /** URL to navigate to */
  to: string;
  /** Component to render as (e.g., Link from react-router) */
  component: ElementType;
}

/**
 * Props for the IconButton component
 */
type IconButtonProps = LinkProps | BaseProps;

/**
 * IconButton component that can be used as a button or a link
 * @example
 * ```tsx
 * <IconButton icon={<Settings />} onClick={() => console.log('clicked')} />
 * ```
 */
const IconButton = forwardRef<HTMLElement, IconButtonProps>((props, ref) => {
  const { icon, className, variant, size, onClick, ...rest } = props;

  const iconToRender = icon || <CircleHelp className="h-5 w-5" />;
  const ariaLabel = props["aria-label"] || "Icon Button";
  const classes = cn(iconButtonVariants({ variant, size }), className);

  // Case 1: Routing with `to` and `component`
  if ("to" in rest && "component" in rest) {
    const Component = rest.component;
    return (
      <Component
        to={rest.to}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
        ref={ref}
      >
        {iconToRender}
      </Component>
    );
  }

  // Case 2: Fallback to <button>
  return (
    <button
      type="button"
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {iconToRender}
    </button>
  );
});

IconButton.displayName = "IconButton";

export { IconButton };
