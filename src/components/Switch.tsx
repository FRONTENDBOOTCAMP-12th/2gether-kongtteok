import { tm } from '@/utils/ts-merge';
import { ComponentProps, useId } from 'react';

type SwitchProps = ComponentProps<'input'> & {
  label: string;
  labelHidden?: boolean | undefined;
};

function Switch({ label, labelHidden, ...restProps }: SwitchProps) {
  const id = useId();

  return (
    <label htmlFor={id} className="relative inline-flex h-[15px] items-center justify-center gap-x-2">
      <span className={tm('text-primary text-xs leading-4', { 'sr-only': labelHidden })}>{label}</span>
      <input type="checkbox" id={id} className="peer absolute inset-0 cursor-pointer appearance-none" {...restProps} />
      <span
        className={tm(
          'bg-brown-100 h-[7px] w-7 rounded-sm transition-[background]',
          'before:absolute before:top-[50%] before:inline-block',
          'before:h-[15px] before:w-[15px] before:-translate-y-[50%]',
          'before:bg-brown-200 pointer-events-none before:rounded-lg',
          'before:transition-[translate]',
          'peer-checked:bg-beige-400',
          'peer-checked:before:bg-peach-800',
          'peer-checked:before:translate-x-[.8125rem]'
        )}></span>
    </label>
  );
}

export default Switch;
