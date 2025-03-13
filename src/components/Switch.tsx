import { tm } from '@/utils/ts-merge';
import { ComponentProps, useId } from 'react';

type SwitchProps = ComponentProps<'input'> & {
  label: string;
  stateTextHidden?: boolean;
  checked?: boolean;
  stateOnText?: string;
  stateOffText?: string;
};

function Switch({
  label,
  checked,
  stateOnText,
  stateOffText,
  className,
  ...restProps
}: SwitchProps) {
  const id = useId();

  return (
    <label htmlFor={id} className="relative inline-flex items-center gap-x-2">
      <span className="sr-only">{label}</span>
      <span className={tm('text-brown-700 text-right text-xs', { 'sr-only': !stateOnText }, className)}>
        {checked ? stateOnText : stateOffText}
      </span>
      <input
        type="checkbox"
        id={id}
        className="peer absolute inset-0 cursor-pointer appearance-none"
        checked={checked}
        {...restProps}
      />
      <span
        className={tm(
          'bg-brown-100 h-[7px] w-7 rounded-sm transition-[background] dark:bg-gray-600',
          'before:absolute before:top-[50%] before:inline-block',
          'before:h-[15px] before:w-[15px] before:-translate-y-[50%]',
          'before:bg-brown-200 pointer-events-none before:rounded-lg dark:before:bg-gray-400',
          'before:transition-[translate]',
          'peer-checked:bg-beige-400 dark:peer-checked:bg-gray-300',
          'peer-checked:before:bg-peach-800 dark:peer-checked:before:bg-gray-100',
          'peer-checked:before:translate-x-[.8125rem]'
        )}></span>
    </label>
  );
}

export default Switch;
