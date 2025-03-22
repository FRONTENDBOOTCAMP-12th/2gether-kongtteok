import WeatherImage, { type WeatherType } from '@/components/WeatherImage';
import EmotionImage, { type EmotionType } from '@/components/EmotionImage';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi2';

export interface DiaryHeaderProps {
  date: string;
  weather: WeatherType;
  emotion: EmotionType;
  title: string;
  isPrivate: boolean;
}

const DiaryHeader = ({ date, weather, emotion, title, isPrivate }: DiaryHeaderProps) => {
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

          {isPrivate ? (
            <HiLockClosed className="text-primary size-4" aria-label="비공개 일기" />
          ) : (
            <HiLockOpen className="text-primary size-4" aria-label="공개 일기" />
          )}
        </div>

        <h2 id="diary-header-title" className="text-primary text-lg font-medium">
          {title}
        </h2>
      </div>

      <EmotionImage emotion={emotion} className="h-10 w-10" alt={`콩떡이: ${emotion}`} />
    </section>
  );
};

export default DiaryHeader;
