import { tm } from '@/utils/ts-merge';
import { ComponentProps, useId } from 'react';

type SwitchProps = ComponentProps<'input'> & {
  label: string;
  labelHidden?: boolean;
  checked?: boolean;
  onLabel?: string;
  offLabel?: string;
};

function Switch({
  label,
  labelHidden = true, // ✅ 기본값을 true로 설정해서 label을 숨김
  checked,
  onLabel = '혼자보기',
  offLabel = '자랑하기',
  ...restProps
}: SwitchProps) {
  const id = useId();

  return (
    <label htmlFor={id} className="relative inline-flex items-center gap-x-2">
      <span className={tm('text-brown-700 min-w-[60px] text-right text-xs', { 'sr-only': labelHidden })}>
        {checked ? onLabel : offLabel}
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
