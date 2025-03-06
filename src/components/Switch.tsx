import { tm } from '@/utils/ts-merge';
import { ComponentProps, useId } from 'react';

type SwitchProps = ComponentProps<'input'> & {
  label: string;
};

function Switch({ label, ...restProps }: SwitchProps) {
  const id = useId();

  return (
    <div className="relative inline-flex h-[15px] items-center justify-center">
      <input type="checkbox" id={id} className="peer absolute inset-0 cursor-pointer appearance-none" {...restProps} />
      <label
        htmlFor={id}
        className={tm(
          'bg-brown-100 h-[7px] w-7 rounded-sm transition-[background]',
          'before:absolute before:top-[50%] before:left-0 before:inline-block',
          'before:h-[15px] before:w-[15px] before:-translate-y-[50%]',
          'before:bg-brown-200 pointer-events-none before:rounded-lg',
          'before:transition-[left]',
          'peer-checked:bg-beige-400',
          'peer-checked:before:bg-peach-800',
          'peer-checked:before:left-[.8125rem]'
        )}>
        <span className="sr-only">{label}</span>
      </label>
    </div>
  );
}

export default Switch;
