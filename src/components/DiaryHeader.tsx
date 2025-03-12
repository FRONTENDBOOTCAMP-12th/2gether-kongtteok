import React from 'react';
import WeatherImage from '@/components/WeatherImage';
import EmotionImage from '@/components/EmotionImage';

export type DiaryHeaderProps = {
  date: string;
  weather: 'sunny' | 'cloudy' | 'windy' | 'rainy' | 'snowy';
  emotion?: 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed';
  title: string;
};

const DiaryHeader = ({ date, weather, emotion, title }: DiaryHeaderProps) => {
  return (
    <section
      className="border-primary flex h-auto w-full items-center justify-between rounded-[10px] border bg-[#FFFFFF] px-4 py-3"
      aria-labelledby="diary-header-title">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <time className="text-beige-700 text-sm" dateTime={date}>
            {date}
          </time>

          <WeatherImage weather={weather} className="h-4 w-4" aria-label={`날씨: ${weather}`} />
        </div>

        <h2 id="diary-header-title" className="text-primary text-xl font-medium">
          {title}
        </h2>
      </div>

      <EmotionImage emotion={emotion} className="h-10 w-10" alt={`콩떡이: ${emotion}`} />
    </section>
  );
};

export default DiaryHeader;
