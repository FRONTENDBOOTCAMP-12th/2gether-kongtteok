import { ComponentProps } from 'react';

export type EmotionProps = ComponentProps<'img'> & {
  emotion?: 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed';
};

function EmotionImage({ emotion = 'exciting', ...restProps }: EmotionProps) {
  return <img src={`/images/emotion/${emotion}.png`} alt={emotion} {...restProps} />;
}

export default EmotionImage;
