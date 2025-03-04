import Button, { ButtonProps } from './Button';
import InputText, { type InputTextProps } from './InputText';

function InputButtonSet({
  inputType = 'text',
  labelText,
  placeholder,
  intent,
  size,
  inlineSize,
  disabled,
  children,
}: InputTextProps & ButtonProps) {
  return (
    <div className="flex w-full items-end gap-x-[6px]">
      <InputText className="flex-1" type={inputType} labelText={labelText} placeholder={placeholder} />
      <Button intent={intent} size={size} inlineSize={inlineSize} disabled={disabled}>
        {children}
      </Button>
    </div>
  );
}

export default InputButtonSet;
