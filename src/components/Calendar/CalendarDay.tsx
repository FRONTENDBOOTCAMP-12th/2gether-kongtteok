import { memo } from 'react';
import { format, isSameDay, isAfter } from 'date-fns';
import EmotionImage from '../EmotionImage';
import { DiaryEntry } from './index';

interface CalendarDayProps {
  day: number;
  month: number;
  year: number;
  diaryEntries: DiaryEntry[];
  onDayClick: (date: Date, hasDiary: boolean) => void;
}

const CalendarDay = memo(({ day, month, year, diaryEntries, onDayClick }: CalendarDayProps) => {
  const today = new Date();
  const currentDate = new Date(year, month - 1, day);

  const isToday = isSameDay(currentDate, today);
  const isFuture = isAfter(currentDate, today);

  const formattedDate = format(currentDate, 'yyyy-MM-dd');
  const diaryEntry = diaryEntries.find((entry) => entry.date === formattedDate);
  const hasDiary = !!diaryEntry;

  const handleClick = () => {
    if (!isFuture) {
      onDayClick(currentDate, hasDiary);
    }
  };

  return (
    <div className="flex cursor-pointer flex-col items-center justify-center" onClick={handleClick}>
      {hasDiary ? (
        <div className="flex h-11 w-11 items-center justify-center">
          <EmotionImage emotion={diaryEntry.emotion} className="h-full w-full object-contain" />
        </div>
      ) : (
        <div
          className={`${
            isToday ? 'border-highlight border-2' : ''
          } bg-beige-200 flex h-9 w-9 items-center justify-center rounded-full`}></div>
      )}
      <span className={`pt-1.5 font-medium ${isToday ? 'text-highlight font-bold' : 'text-primary'}`}>{day}</span>
    </div>
  );
});

export default CalendarDay;
