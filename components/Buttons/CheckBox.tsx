import clsx from "clsx";

type CheckboxProps = {
  id: string;
  name: string;
  label?: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function Checkbox({
  id,
  name,
  label,
  value,
  checked,
  defaultChecked,
  disabled,
  onChange,
  className,
}: CheckboxProps) {
  return (
    <div className="mb-4 flex items-center">
      <input
        id={id}
        name={name}
        value={value}
        type="checkbox"
        onChange={onChange}
        disabled={disabled}
        {...(checked !== undefined ? { checked } : {})}
        {...(defaultChecked !== undefined ? { defaultChecked } : {})}
        className={clsx(
          "h-5 w-5 appearance-none rounded-sm border-2 transition-colors",
          // 기본 상태
          "border-black bg-white",
          // 체크 상태일 때 배경 주황색, 체크 마크 보이기
          "checked:border-yellow-500 checked:bg-yellow-500",
          // 체크 마크 표시
          "relative after:absolute after:top-1/2 after:left-1/2 after:content-['✔']",
          "after:-translate-x-1/2 after:-translate-y-1/2 after:text-xs after:text-white",
          "after:opacity-0 checked:after:opacity-100",
          // 기타
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      />
      {label && (
        <label
          htmlFor={id}
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      )}
    </div>
  );
}
