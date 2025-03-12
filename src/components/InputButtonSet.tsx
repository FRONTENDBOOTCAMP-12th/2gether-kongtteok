import React from 'react';
import Button, { ButtonProps } from './Button';
import InputText, { InputTextProps } from './InputText';

type InputButtonSetProps = {
  inputType?: InputTextProps['type'];
  labelText: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
} & Pick<ButtonProps, 'intent' | 'size' | 'inlineSize' | 'disabled'> &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onClick'>;

function InputButtonSet({
  inputType = 'text',
  labelText,
  placeholder,
  name,
  value,
  onChange,
  intent,
  size,
  inlineSize = 'fit',
  disabled,
  onClick,
  children,
  ...restProps
}: InputButtonSetProps) {
  return (
    <div className="flex w-full items-end gap-x-[6px]" {...restProps}>
      <InputText
        className="flex-1"
        type={inputType}
        labelText={labelText}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <Button intent={intent} size={size} inlineSize={inlineSize} disabled={disabled} onClick={onClick}>
        {children}
      </Button>
    </div>
  );
}

export default InputButtonSet;
