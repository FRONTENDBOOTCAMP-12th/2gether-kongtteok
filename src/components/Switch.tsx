import { tm } from '@/utils/ts-merge';
import { ComponentProps, useId } from 'react';

type SwitchProps = ComponentProps<'input'> & {
  label: string;
  stateTextHidden?: boolean;
  checked?: boolean;
  stateOnText?: string;
  stateOffText?: string;
  onChangeValue?: () => void;
};

function Switch({ label, checked, stateOnText, stateOffText, className, onChangeValue, ...restProps }: SwitchProps) {
  const id = useId();

  const handleChange = () => {
    onChangeValue?.();
  };

  return (
    <label htmlFor={id} className="relative inline-flex items-center gap-x-2">
      <span className="sr-only">{label}</span>
      <input
        type="checkbox"
        id={id}
        className="peer peer absolute inset-0 cursor-pointer appearance-none"
        checked={checked}
        onChange={handleChange}
        {...restProps}
      />
      {stateOnText && (
        <>
          <span
            className={tm(
              'text-brown-700 dark:text-background hidden text-right text-xs peer-checked:block',
              className
            )}>
            {stateOnText}
          </span>
          <span className={tm('text-brown-700 dark:text-background text-right text-xs peer-checked:hidden', className)}>
            {stateOffText}
          </span>
        </>
      )}
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
