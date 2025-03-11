import React, { useState } from 'react';
import { format } from 'date-fns';
import { ListSolid } from '@mynaui/icons-react'; // ListSolid 아이콘 추가
import YearMonthSelector from './YearMonthSelector';
import { Link } from 'react-router';

interface CalendarProps {
  initialSelectedMonth?: string;
  onMonthChange?: (month: string) => void;
  onListViewClick?: () => void; // 리스트 보기 클릭 핸들러 추가
}

function CalendarDay({ day }: { day: number }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-secondary h-9 w-9 rounded-full"></div>
      <span className="text-primary pt-1.5 font-medium">{day}</span>
    </div>
  );
}

function Calendar({
  initialSelectedMonth = format(new Date(), 'yyyy-MM'),
  onMonthChange,
  onListViewClick,
}: CalendarProps) {
  const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth);
  const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

  const handleMonthChange = (newMonth: string) => {
    setSelectedMonth(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  };

  const handleListViewClick = () => {
    if (onListViewClick) {
      onListViewClick();
    }
  };

  const [year, month] = selectedMonth.split('-').map((num) => parseInt(num, 10));
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  const calendarRows: React.ReactNode[] = [];
  let dayCounter = 1;
  let weekCounter = 0;

  while (dayCounter <= daysInMonth) {
    const days: React.ReactNode[] = [];

    for (let i = 0; i < 7; i++) {
      if (weekCounter === 0 && i < firstDayOfMonth) {
        days.push(<td key={`empty-${i}`}></td>);
        continue;
      }

      if (dayCounter <= daysInMonth) {
        days.push(
          <td key={`day-${dayCounter}`}>
            <CalendarDay day={dayCounter} />
          </td>
        );
        dayCounter++;
      } else {
        days.push(<td key={`empty-end-${i}`}></td>);
      }
    }

    calendarRows.push(<tr key={`week-${weekCounter}`}>{days}</tr>);
    weekCounter++;
  }

  return (
    <div className="calendar-container">
      <div className="mb-6 flex items-center justify-between">
        <div className="w-[94px]" />
        <div className="flex-1">
          <YearMonthSelector selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
        </div>

        <Link
          to={`/diaryList`}
          className="flex w-[94px] items-center gap-1.5 rounded-md border-none border-gray-200 p-2 transition-colors"
          onClick={handleListViewClick}>
          <ListSolid className="fill-primary h-4 w-4" />
          <span className="text-primary">리스트보기</span>
        </Link>
      </div>

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
        <tbody>{calendarRows}</tbody>
      </table>
    </div>
  );
}

export default Calendar;
