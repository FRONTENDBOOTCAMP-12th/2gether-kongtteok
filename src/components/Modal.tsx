import { HTMLAttributes } from 'react';
import { tm } from '@/utils/ts-merge';
import Button from './Button';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  primaryBtnText?: string;
  cancelBtn?: string;
  onConfirmReturn?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
}

function Modal({
  title,
  description,
  primaryBtnText,
  cancelBtn,
  onConfirmReturn,
  onConfirm,
  onClose,
  ...restProps
}: ModalProps) {
  const handleConfirm = () => {
    onConfirm?.();

    if (!onConfirmReturn) {
      onClose?.();
    }
  };

  const handleCancel = () => {
    onClose?.();
  };

  return (
    <div className="bg-dimmed fixed inset-0 z-100 flex items-center justify-center backdrop-blur-xs" {...restProps}>
      <div className="bg-cream-100 border-primary dark:bg-cream-500 min-w-55 rounded-lg border p-4 text-center">
        <strong
          className={tm(
            'text-md relative leading-4.5 font-normal',
            'before:absolute before:-inset-x-3 before:top-[5px] before:block before:h-2',
            'before:bg-banana-300 before:-rotate-2'
          )}>
          <span className="relative">{title}</span>
        </strong>
        <p className="mt-2 text-[13px] leading-4 whitespace-pre-line">{description}</p>
        <div className="mt-4 flex flex-row gap-x-2">
          {cancelBtn && (
            <Button intent="outline" size="small" onClick={handleCancel}>
              {cancelBtn}
            </Button>
          )}
          <Button size="small" onClick={handleConfirm}>
            {primaryBtnText ?? `확인`}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
