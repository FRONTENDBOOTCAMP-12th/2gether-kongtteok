import { tm } from '@/utils/ts-merge';
import { ComponentProps, useId } from 'react';

type TextareaProps = ComponentProps<'textarea'> & {
  label: string;
  labelHidden?: boolean;
  className?: string;
};

function Textarea({ label, labelHidden = false, value, className, ...restProps }: TextareaProps) {
  const id = useId();

  return (
    <div
      className={tm('border-primary relative rounded-[10px] border bg-white p-3 pr-2', {
        'mt-[1.375rem]': !labelHidden,
      })}>
      <label
        className={tm('absolute bottom-full left-0 pb-1.5 text-sm leading-4', { 'sr-only': labelHidden })}
        htmlFor={id}>
        {label}
      </label>
      <textarea
        className={tm(
          'block h-[6.25rem] w-full resize-none',
          'text-primary focus-visible:none text-xs leading-[165%]',
          '[&::-webkit-scrollbar]:w-1',
          '[&::-webkit-scrollbar-thumb]:bg-brown-200',
          className
        )}
        id={id}
        {...restProps}>
        {value}
      </textarea>
    </div>
  );
}

export default Textarea;
