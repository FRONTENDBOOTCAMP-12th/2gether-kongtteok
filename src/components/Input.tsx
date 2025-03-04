import { tm } from "@/utils/ts-merge";
import { ComponentProps, useId } from "react";

type InputTextProps = ComponentProps<'input'> & {
  type?: string;
  labelText: string;
  labelHidden?: boolean;
  defaultValue?: string;
  placeholder?: string;
}

function InputText({ type = 'text', labelText, labelHidden = false, ...restProps }:InputTextProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-y-[6px] text-primary">
      <label htmlFor={inputId} className={
        tm(
          {"sr-only" : labelHidden},
          "text-xs leading-[16px]"
        )
      }>{labelText}</label>
      <input type={type} id={inputId} {...restProps} className={
        tm(
        "w-full py-[10px] px-2",
        "border border-primary",
        "text-xs leading-none rounded-[10px]"
      )} />
    </div>
  );
}
export default InputText;
