import { useId, type ComponentProps } from 'react';
import { tm } from '@/utils/ts-merge';

type ToggleButtonProps = ComponentProps<'input'> & {
  label: string;
  className?: string;
};

function ToggleButton({ type = 'checkbox', label, defaultChecked, className, ...restProps }: ToggleButtonProps) {
  const id = useId();

  return (
    <label
      className={tm(
        'has-checked:text-background has-checked:bg-primary border-primary text-primary relative z-10 inline-block rounded-lg border px-3 py-[7px] text-sm leading-[18px] has-checked:border-transparent',
        className
      )}
      htmlFor={id}>
      {label}
      <input
        type={type}
        id={id}
        defaultChecked={defaultChecked}
        {...restProps}
        className="absolute inset-0 z-0 cursor-pointer appearance-none border-transparent"
      />
    </label>
  );
}

export default ToggleButton;
