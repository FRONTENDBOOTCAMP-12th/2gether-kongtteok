import { tm } from '@/utils/ts-merge';
import { ComponentProps, useId } from 'react';

type SwitchProps = ComponentProps<'input'> & {
  label: string;
  labelHidden?: boolean;
  checked?: boolean;
};

function Switch({ label, labelHidden, checked, ...restProps }: SwitchProps) {
  const id = useId();

  return (
    <label htmlFor={id} className="relative inline-flex items-center gap-x-2">
      <span className={tm('text-brown-700 min-w-[60px] text-right text-xs', { 'sr-only': labelHidden })}>
        {checked ? '혼자보기' : '자랑하기'}
      </span>
      <input
        type="checkbox"
        id={id}
        className="peer absolute inset-0 cursor-pointer appearance-none"
        checked={checked}
        readOnly
        {...restProps}
      />
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
