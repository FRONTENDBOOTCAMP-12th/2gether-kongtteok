import { ComponentProps } from 'react';
import { tm } from '@/utils/ts-merge';
import EmotionImage, { EMOTION, type EmotionProps } from './EmotionImage';

type EmotionButtonProps = ComponentProps<'button'> & Pick<EmotionProps, 'emotion'>;

function EmotionButton({ emotion = 'exciting', className, ...restProps }: EmotionButtonProps) {
  return (
    <button type="button" className={tm('cursor-pointer', className)} {...restProps}>
      <EmotionImage emotion={emotion} />
      <span className="text-primary text-xs">{EMOTION[emotion]}</span>
    </button>
  );
}

export default EmotionButton;
