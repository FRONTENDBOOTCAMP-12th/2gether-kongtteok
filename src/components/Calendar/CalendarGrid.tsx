import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import CalendarDay from './CalendarDay';
import { format } from 'date-fns';
import { EmotionType } from '@/components/EmotionImage';

interface DiaryEntry {
  id: number;
  date: string;
  emotion: EmotionType;
}

interface CalendarGridProps {
  selectedMonth: string;
  diaryEntries: DiaryEntry[];
  isLoading: boolean;
  error: string | null;
}

function CalendarGrid({ selectedMonth, diaryEntries, isLoading, error }: CalendarGridProps) {
  const navigate = useNavigate();
  const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDayClick = (date: Date, diaryId: number | null) => {
    if (diaryId) {
      navigate(`/diary/view/${diaryId}`);
    } else {
      const formattedDate = format(date, 'yyyy-MM-dd');
      navigate(`/diary/write?date=${formattedDate}`);
    }
  };

  const calendarData = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map((num) => parseInt(num, 10));
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    const calendarDays = [];
    let dayCounter = 1;

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    while (dayCounter <= daysInMonth) {
      calendarDays.push(dayCounter++);
    }

    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }

    return {
      year,
      month,
      weeks,
    };
  }, [selectedMonth]);

  const { year, month, weeks } = calendarData;

  if (isLoading) {
    return <div className="w-full py-8 text-center text-gray-500">로딩 중...</div>;
  }

  if (error) {
    return <div className="w-full py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full">
      <h2 className="sr-only">일기 달력</h2>

      <div className="mt-10 mb-2 grid grid-cols-7 gap-2">
        {WEEKS.map((day, idx) => (
          <div key={idx} className="text-primary flex items-center justify-center text-center font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weeks.flat().map((day, idx) => (
          <div key={`day-${idx}`} className="flex aspect-square items-center justify-center">
            {day !== null && (
              <CalendarDay
                day={day}
                month={month}
                year={year}
                diaryEntries={diaryEntries}
                onDayClick={handleDayClick}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarGrid;
