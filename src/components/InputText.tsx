import { tm } from '@/utils/ts-merge';
import { ComponentProps, useId } from 'react';

type InputTextProps = ComponentProps<'input'> & {
  labelText: string;
  labelHidden?: boolean;
  defaultValue?: string;
};

function InputText({ type = 'text', labelText, labelHidden = false, ...restProps }: InputTextProps) {
  const inputId = useId();

  return (
    <div className="text-primary flex flex-col gap-y-[6px]">
      <label htmlFor={inputId} className={tm({ 'sr-only': labelHidden }, 'text-xs leading-[16px]')}>
        {labelText}
      </label>
      <input
        type={type}
        id={inputId}
        {...restProps}
        className={tm('w-full px-2 py-[10px]', 'border-primary border', 'rounded-[10px] text-xs leading-none')}
      />
    </div>
  );
}
export default InputText;
