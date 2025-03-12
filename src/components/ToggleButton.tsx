import { useId, type ComponentProps } from 'react';
import { tm } from '@/utils/ts-merge';

type ToggleButtonProps = ComponentProps<'input'> & {
  label: string;
  className?: string;
  isActive?: boolean;
};

function ToggleButton({ type = 'checkbox', label, isActive, className, onClick, ...restProps }: ToggleButtonProps) {
  const id = useId();

  const labelClasses = tm(
    'relative z-10 inline-block rounded-lg border px-3 py-[7px] text-sm leading-[18px]',
    'border-primary text-primary flex items-center justify-center text-center',
    isActive ? 'bg-primary text-background border-transparent' : '',
    className
  );

  const inputClasses = 'absolute inset-0 z-0 cursor-pointer appearance-none border-transparent';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
  };

  return (
    <label className={labelClasses} htmlFor={id}>
      {label}
      <input
        type={type}
        id={id}
        checked={isActive}
        onChange={handleChange}
        onClick={onClick}
        {...restProps}
        className={inputClasses}
      />
    </label>
  );
}

export default ToggleButton;
