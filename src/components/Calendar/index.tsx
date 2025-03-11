import { useState, useCallback } from 'react';
import { format } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

export interface DiaryEntry {
  date: string;
  emotion: 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed';
}

const dummyDiaries: DiaryEntry[] = [
  { date: '2025-03-02', emotion: 'sad' },
  { date: '2025-03-03', emotion: 'happy' },
  { date: '2025-03-05', emotion: 'fine' },
  { date: '2025-03-07', emotion: 'angry' },
  { date: '2025-03-08', emotion: 'tired' },
  { date: '2025-03-10', emotion: 'exciting' },
];

interface CalendarProps {
  initialSelectedMonth?: string;
  onMonthChange?: (month: string) => void;
  onListViewClick?: () => void;
}

function Calendar({
  initialSelectedMonth = format(new Date(), 'yyyy-MM'),
  onMonthChange,
  onListViewClick,
}: CalendarProps) {
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
        onListViewClick={onListViewClick}
      />

      <CalendarGrid selectedMonth={selectedMonth} diaryEntries={dummyDiaries} />
    </div>
  );
}

export default Calendar;
