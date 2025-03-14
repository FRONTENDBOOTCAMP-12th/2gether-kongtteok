import { ComponentProps } from 'react';

export type WeatherType = 'sunny' | 'cloudy' | 'windy' | 'rainy' | 'snowy';
enum WEATHER {
  sunny = '맑음',
  cloudy = '구름',
  windy = '바람',
  rainy = '비',
  snowy = '눈',
}

type WeatherProps = ComponentProps<'img'> & {
  weather?: WeatherType;
};

function WeatherImage({ weather = 'sunny', className, ...restProps }: WeatherProps) {
  const weatherText = WEATHER[weather];

  return (
    <img
      src={`/images/weather/${weather}.png`}
      alt={weatherText}
      title={weatherText}
      data-weather={weather}
      className={className}
      {...restProps}
    />
  );
}

export default WeatherImage;
