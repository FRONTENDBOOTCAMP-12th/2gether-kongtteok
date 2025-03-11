import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import CalendarDay from './CalendarDay';
import { DiaryEntry } from './index';

interface CalendarGridProps {
  selectedMonth: string;
  diaryEntries: DiaryEntry[];
}

function CalendarGrid({ selectedMonth, diaryEntries }: CalendarGridProps) {
  const navigate = useNavigate();
  const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

  const handleDayClick = (date: Date, hasDiary: boolean) => {
    if (hasDiary) {
      navigate(`/diaryDetail`);
    } else {
      navigate(`/diaryWrite`);
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

  return (
    <table className="w-full border-separate border-spacing-y-5">
      <caption className="sr-only">일기 달력</caption>
      <thead>
        <tr>
          {WEEKS.map((day, idx) => (
            <th key={idx} className="text-primary font-medium">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, weekIdx) => (
          <tr key={`week-${weekIdx}`}>
            {week.map((day, dayIdx) => (
              <td key={`day-${weekIdx}-${dayIdx}`}>
                {day !== null && (
                  <CalendarDay
                    day={day}
                    month={month}
                    year={year}
                    diaryEntries={diaryEntries}
                    onDayClick={handleDayClick}
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CalendarGrid;
