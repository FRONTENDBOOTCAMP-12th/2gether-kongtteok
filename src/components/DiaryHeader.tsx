import React from 'react';
import WeatherImage from '@/components/WeatherImage';
import EmotionImage from '@/components/EmotionImage';

export type DiaryHeaderProps = {
  date: string;
  weather: 'sunny' | 'cloudy' | 'windy' | 'rainy' | 'snowy';
  emotion: 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed';
  title: string;
};

const DiaryHeader = ({ date, weather, emotion, title }: DiaryHeaderProps) => {
  return (
    <section
      className="flex h-auto w-full items-center justify-between rounded-[12px] border border-[#3E3232] bg-[#FFFFFF] px-4 py-3"
      aria-labelledby="diary-header-title">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <time className="text-[13px] text-[#7D6E65]" dateTime={date}>
            {date}
          </time>

          <WeatherImage weather={weather} className="h-[16px] w-[16px]" aria-label={`날씨: ${weather}`} />
        </div>

        <h2 id="diary-header-title" className="text-[20px] font-medium text-[#3E3232]">
          {title}
        </h2>
      </div>

      <EmotionImage emotion={emotion} className="h-[40px] w-[40px]" alt={`콩떡이이: ${emotion}`} />
    </section>
  );
};

export default DiaryHeader;
