import { tm } from '@/utils/ts-merge';
import { ComponentProps, useId } from 'react';

type SwitchProps = ComponentProps<'input'> & {
  label: string;
};

function Switch({ label, ...restProps }: SwitchProps) {
  const id = useId();

  return (
    <div className="relative inline-flex h-[15px] items-center justify-center">
      <label
        htmlFor={id}
        className={tm(
          'bg-brown-100 h-[7px] w-7 rounded-sm',
          'before:absolute before:top-[50%] before:inline-block before:h-[15px] before:w-[15px] before:-translate-y-[50%]',
          'before:bg-brown-200 before:rounded-lg',
          'peer-checked:bg-beige-400',
          'peer-checked:before:bg-peach-800'
        )}>
        <span className="sr-only">{label}</span>
      </label>
      <input type="checkbox" id={id} className="peer absolute inset-0 appearance-none" {...restProps} />
    </div>
  );
}

export default Switch;
