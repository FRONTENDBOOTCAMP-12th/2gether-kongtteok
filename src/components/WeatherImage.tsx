import { ComponentProps } from 'react';

export type WeatherProps = ComponentProps<'img'> & {
  weather?: 'sunny' | 'cloudy' | 'windy' | 'rainy' | 'snowy';
};

function WeatherImage({ weather = 'sunny', ...restProps }: WeatherProps) {
  return <img src={`/images/weather/${weather}.png`} alt={weather} {...restProps} />;
}

export default WeatherImage;
