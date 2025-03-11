import { Link } from 'react-router';
import { ListSolid } from '@mynaui/icons-react';
import YearMonthSelector from './YearMonthSelector';

interface CalendarHeaderProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  onListViewClick?: () => void;
}

function CalendarHeader({ selectedMonth, onMonthChange, onListViewClick }: CalendarHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="w-[94px]" />

      <YearMonthSelector selectedMonth={selectedMonth} onMonthChange={onMonthChange} />

      <Link
        to={`/diaryList`}
        className="flex w-[94px] items-center gap-1.5 rounded-md border-none border-gray-200 p-2 transition-colors"
        onClick={onListViewClick}>
        <ListSolid className="fill-primary h-4 w-4" />
        <span className="text-primary">리스트보기</span>
      </Link>
    </div>
  );
}

export default CalendarHeader;
