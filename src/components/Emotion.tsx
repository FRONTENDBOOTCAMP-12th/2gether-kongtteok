import { ComponentProps } from 'react';
import EmotionImage, { type EmotionProps } from './EmotionImage';

type EmotionButtonProps = ComponentProps<'button'> & Pick<EmotionProps, 'emotion'>;

function EmotionButton({ emotion = 'exciting', ...restProps }: EmotionButtonProps) {
  return (
    <button type="button" className="cursor-pointer" {...restProps}>
      <span className="sr-only">감정 선택</span>
      <EmotionImage emotion={emotion} />
    </button>
  );
}

export default EmotionButton;
