import { HTMLAttributes } from 'react';
import Button from './Button';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  primaryBtnText?: string;
  cancelBtn?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

function Modal({ title, description, primaryBtnText, cancelBtn, onConfirm, onClose, ...restProps }: ModalProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" {...restProps}>
      <div className="bg-cream-100 border-primary min-w-55 rounded-lg border p-4 text-center">
        <strong className="text-md leading-4.5">{title}</strong>
        <p className="mt-2 text-[13px] leading-4">{description}</p>
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
