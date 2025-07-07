import clsx from "clsx";
import React from "react";

export type RadioButtonProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
};

function Radio({
  id,
  name,
  label,
  value,
  checked,
  defaultChecked,
  disabled,

  className,
}: RadioButtonProps) {
  return (
    <div className="mb-4 flex items-center">
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        disabled={disabled}
        checked={checked}
        {...(defaultChecked !== undefined ? { defaultChecked } : {})}
        className={clsx(
          "h-4 w-4 appearance-none rounded-full border border-gray-400 bg-white",
          "checked:bg-primary checked:border-primary",
          "relative after:absolute after:top-1/2 after:left-1/2 after:content-['']",
          "after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2",
          "after:rounded-full after:bg-white after:opacity-0",
          "checked:after:opacity-100",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      />
      <label
        htmlFor={id}
        className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-500"
      >
        {label}
      </label>
    </div>
  );
}

interface RadioGroupProps {
  id?: string;
  legend?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function RadioGroup({ id, legend, children, className }: RadioGroupProps) {
  return (
    <fieldset
      id={id}
      className={className}
      style={{ border: 0, padding: 0, margin: 0, minInlineSize: 0 }}
    >
      {legend && (
        <legend className="mb-2 text-sm font-semibold text-gray-700">
          {legend}
        </legend>
      )}
      {children}
    </fieldset>
  );
}

interface RadioGroupCompound extends React.FC<RadioGroupProps> {
  Radio: React.FC<RadioButtonProps>;
}

const RadioGroupExport = RadioGroup as RadioGroupCompound;
RadioGroupExport.Radio = Radio;

export default RadioGroupExport;

export { RadioGroup, Radio };
