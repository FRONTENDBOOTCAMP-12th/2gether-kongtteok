import { ComponentProps } from 'react';

export type EmotionType = 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed';

export type EmotionProps = ComponentProps<'img'> & {
  emotion?: EmotionType;
};

function EmotionImage({ emotion = 'exciting', ...restProps }: EmotionProps) {
  return <img src={`/images/emotion/${emotion}.png`} alt={emotion} {...restProps} />;
}

export default EmotionImage;
