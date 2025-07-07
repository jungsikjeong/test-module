import React from "react";

interface CategoryButtonProps {
  imageSrc: string;
  title: string;
  onClick?: () => void;
  as?: "div" | "a";
  href?: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  imageSrc,
  title,
  onClick,
  as = "div",
  href,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  const content = (
    <>
      <div className="flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full bg-[rgba(118,118,128,0.12)]">
        <img
          src={imageSrc}
          alt={title}
          className="h-[45px] w-[45px] rounded-full object-cover"
          draggable={false}
        />
      </div>
      <div className="mt-[8px] flex w-full items-center justify-center">
        <span className="font-pretendard w-full text-center text-[11px] leading-[1.36] font-bold tracking-[-0.01em] text-black">
          {title}
        </span>
      </div>
    </>
  );

  if (as === "a" && href) {
    return (
      <a
        href={href}
        className="flex flex-col items-center"
        tabIndex={0}
        role="button"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label={title}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className="flex cursor-pointer flex-col items-center"
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={title}
    >
      {content}
    </div>
  );
};

export default CategoryButton;
