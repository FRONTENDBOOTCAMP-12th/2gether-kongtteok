import { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { tm } from '@/utils/ts-merge';

const buttonVariants = cva('cursor-pointer', {
  variants: {
    intent: {
      primary: 'border border-primary bg-primary text-white',
      secondary: 'border border-secondary bg-secondary text-primary',
      outline: 'border border-current text-primary',
      outlinePink: 'border border-peach-600 text-peach-800',
    },
    size: {
      medium: 'px-3 py-1.5 text-sm leading-6 rounded-[10px]',
      small: 'py-[5px] px-3 text-[13px] leading-[17px] rounded-lg',
    },
    inlineSize: {
      full: 'w-full',
      fit: null,
    },
    ariaDisabled: {
      true: 'aria-disabled:cursor-not-allowed',
      false: null,
    },
  },
  compoundVariants: [
    {
      intent: 'primary',
      ariaDisabled: true,
      className: 'aria-disabled:border-brown-200 aria-disabled:bg-brown-200',
    },
    {
      intent: 'secondary',
      ariaDisabled: false,
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
    ariaDisabled: false,
  },
});

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    buttonType?: 'button' | 'submit' | 'reset';
    ariaDisabled?: boolean;
    intent?: 'primary' | 'secondary' | 'outline' | 'outlinePink';
    size?: 'medium' | 'small';
    inlineSize?: 'full' | 'fit';
  };

function Button({
  buttonType = 'button',
  children,
  intent,
  size,
  inlineSize,
  ariaDisabled = false,
  className,
  ...restProps
}: ButtonProps) {
  return (
    <button
      type={buttonType}
      className={tm(buttonVariants({ intent, size, inlineSize, ariaDisabled, className }))}
      {...restProps}
      aria-disabled={ariaDisabled}>
      {children}
    </button>
  );
}

export default Button;
