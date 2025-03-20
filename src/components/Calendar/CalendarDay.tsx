import { memo } from 'react';
import { format, isSameDay, isAfter } from 'date-fns';
import EmotionImage from '@/components/EmotionImage';
import { EmotionType } from '@/components/EmotionImage';

interface DiaryEntry {
  id: number;
  date: string;
  emotion: EmotionType;
  isPrivate: boolean;
  content: string;
  diaryImage: string;
  likes: number;
}

interface CalendarDayProps {
  day: number;
  month: number;
  year: number;
  diaryEntries: DiaryEntry[];
  onDayClick: (date: Date, diaryId: number | null) => void;
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
      onDayClick(currentDate, diaryEntry?.id ?? null);
    }
  };

  return (
    <button className="flex cursor-pointer flex-col items-center justify-center" onClick={handleClick}>
      {hasDiary ? (
        <div className="flex h-9 w-9 items-center justify-center">
          <EmotionImage emotion={diaryEntry.emotion} className="h-full w-full object-contain" />
        </div>
      ) : (
        <div
          className={`${
            isToday ? 'border-highlight border-2' : ''
          } bg-beige-200 flex h-9 w-9 items-center justify-center rounded-full`}></div>
      )}
      <span className={`pt-1.5 font-medium ${isToday ? 'text-highlight font-bold' : 'text-primary'}`}>{day}</span>
    </button>
  );
});

CalendarDay.displayName = 'CalendarDay';

export default CalendarDay;
