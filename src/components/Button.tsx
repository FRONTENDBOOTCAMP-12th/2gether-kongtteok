import { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { tm } from '@/utils/ts-merge';

const buttonVariants = cva('cursor-pointer', {
  variants: {
    intent: {
      primary: 'border border-primary bg-primary text-white',
      secondary: 'border border-secondary bg-secondary text-primary',
      outline: 'border border-current text-primary',
      outlinePink: 'border border-peach-200 text-peach-800',
    },
    size: {
      medium: 'px-3 py-[9px] text-sm leading-[18px] rounded-[10px]',
      small: 'py-[5px] px-3 text-[13px] leading-[17px] rounded-lg',
    },
    inlineSize: {
      full: 'w-full',
      fit: null,
    },
    disabled: {
      true: 'cursor-not-allowed!',
      false: null,
    },
  },
  compoundVariants: [
    {
      intent: 'primary',
      disabled: true,
      className: 'border-brown-200! bg-brown-200!',
    },
    {
      intent: 'secondary',
      disabled: false,
    },
    {
      intent: 'primary',
      size: 'small',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'medium',
    inlineSize: 'full',
    disabled: false,
  },
});

export type ButtonProps = Omit<React.ComponentProps<'button'>, 'disabled'> &
  VariantProps<typeof buttonVariants> & {
    buttonType?: 'button' | 'submit' | 'reset';
  };

function Button({
  buttonType = 'button',
  children,
  intent,
  size,
  inlineSize,
  disabled,
  className,
  ...restProps
}: ButtonProps) {
  return (
    <div className="flex">
      <button
        type={buttonType}
        className={tm(buttonVariants({ intent, size, inlineSize, disabled, className }))}
        {...restProps}>
        {children}
      </button>
    </div>
  );
}

export default Button;
