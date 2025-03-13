import { ComponentProps } from 'react';
import { tm } from '@/utils/ts-merge';
import EmotionImage, { type EmotionProps } from './EmotionImage';

type EmotionButtonProps = ComponentProps<'button'> & Pick<EmotionProps, 'emotion'>;

function EmotionButton({ emotion = 'exciting', className, ...restProps }: EmotionButtonProps) {
  return (
    <button type="button" className={tm('cursor-pointer', className)} {...restProps}>
      <span className="sr-only">감정 선택</span>
      <EmotionImage emotion={emotion} />
    </button>
  );
}

export default EmotionButton;
