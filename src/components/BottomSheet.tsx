import { motion } from 'motion/react';
import { tm } from '@/utils/ts-merge';
import { X } from '@mynaui/icons-react';

interface BottomSheetProps {
  title: string;
  isOpen?: boolean;
  children: React.ReactNode;
  handleClose?: () => void;
}

function BottomSheet({ isOpen = false, title, children, handleClose }: BottomSheetProps) {
  const closeBottomSheet = () => {
    handleClose?.();
  };

  return (
    <div hidden={!isOpen} className="fixed inset-0 z-60">
      <motion.div
        animate={{ y: isOpen ? '0' : '100%' }}
        transition={{ duration: 0.3, ease: 'anticipate' }}
        className={tm(
          'max-w-kong fixed bottom-0 left-[50%] z-10 m-auto w-full px-4 pt-5 pb-3',
          '-translate-x-[50%] rounded-t-[1.25rem] bg-white'
        )}>
        <strong className="text-primary mb-3 block font-normal">{title}</strong>
        {children}
        <button type="button" onClick={closeBottomSheet} className="absolute top-4 right-2.5 cursor-pointer p-1">
          <X aria-label="닫기" />
        </button>
      </motion.div>
      <span className="absolute inset-0 bg-black/60" aria-hidden="true" onClick={closeBottomSheet}></span>
    </div>
  );
}

export default BottomSheet;
