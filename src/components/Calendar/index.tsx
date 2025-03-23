import { useState, useCallback, memo } from 'react';
import { format } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { EmotionType } from '@/components/EmotionImage';

interface DiaryEntry {
  id: number;
  date: string;
  emotion: EmotionType;
}

interface CalendarProps {
  initialSelectedMonth?: string;
  onMonthChange?: (month: string) => void;
  onListViewClick?: () => void;
  diaryEntries: DiaryEntry[];
  isLoading: boolean;
  error: string | null;
}

const Calendar = ({
  initialSelectedMonth = format(new Date(), 'yyyy-MM'),
  onMonthChange,
  onListViewClick,
  diaryEntries,
  isLoading,
  error,
}: CalendarProps) => {
  const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth);

  const handleMonthChange = useCallback(
    (newMonth: string) => {
      setSelectedMonth(newMonth);
      if (onMonthChange) {
        onMonthChange(newMonth);
      }
    },
    [onMonthChange]
  );

  return (
    <div className="calendar-container">
      <CalendarHeader
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
        linkTo="/diarylist"
        onViewClick={onListViewClick}
      />

      <CalendarGrid selectedMonth={selectedMonth} diaryEntries={diaryEntries} isLoading={isLoading} error={error} />
    </div>
  );
};

export default memo(Calendar);
