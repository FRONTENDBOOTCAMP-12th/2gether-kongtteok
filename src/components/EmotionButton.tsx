import { ComponentProps } from 'react';
import EmotionImage, { type EmotionProps } from './EmotionImage';
import { tm } from '@/utils/ts-merge';

type EmotionButtonProps = ComponentProps<'button'> & Pick<EmotionProps, 'emotion'>;

function EmotionButton({ emotion = 'exciting', className, ...restProps }: EmotionButtonProps) {
  return (
    <button type="button" className={tm('cursor-pointer', className)} {...restProps}>
      <span className="sr-only">감정 선택</span>
      <EmotionImage emotion={emotion} title={emotion} />
    </button>
  );
}

export default EmotionButton;
