import { ComponentProps, useId } from 'react';
import { tm } from '@/utils/ts-merge';

export type InputTextProps = ComponentProps<'input'> & {
  inputType?: React.HTMLInputTypeAttribute;
  labelText: string;
  labelHidden?: boolean;
  defaultValue?: string;
};

function InputText({
  inputType = 'text',
  labelText,
  labelHidden = false,
  placeholder,
  className,
  ...restProps
}: InputTextProps) {
  const inputId = useId();

  return (
    <div className={tm("text-primary flex flex-col gap-y-[6px]", className)}>
      <label htmlFor={inputId} className={tm({ 'sr-only': labelHidden }, 'text-xs leading-[16px]')}>
        {labelText}
      </label>
      <input
        type={inputType}
        id={inputId}
        placeholder={placeholder}
        className={tm('w-full px-2 py-[10px]', 'border-primary border', 'rounded-[10px] text-xs leading-none')}
        {...restProps}
      />
    </div>
  );
}
export default InputText;
