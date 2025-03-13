import { ComponentProps } from 'react';

export type EmotionType = 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed';
enum EMOTION {
  exciting = '설렘',
  happy = '행복',
  proud = '뿌듯',
  fine = '괜찮음',
  angry = '화남',
  tired = '피곤함',
  sad = '슬픔',
  depressed = '우울',
}

export type EmotionProps = ComponentProps<'img'> & {
  emotion?: EmotionType;
  emotionValue?: string;
};

function EmotionImage({ emotion = 'exciting', ...restProps }: EmotionProps) {
  const emotionText = EMOTION[emotion];

  return (
    <img
      src={`/images/emotion/${emotion}.png`}
      alt={emotionText}
      title={emotionText}
      data-emotion={emotion}
      {...restProps}
    />
  );
}

export default EmotionImage;
