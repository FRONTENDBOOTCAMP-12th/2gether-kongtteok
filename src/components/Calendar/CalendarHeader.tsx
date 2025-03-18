import { Link } from 'react-router';
import { ListSolid } from '@mynaui/icons-react';
import YearMonthSelector from './YearMonthSelector';
import { ReactNode } from 'react';

interface CalendarHeaderProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  onViewClick?: () => void;
  viewIcon?: ReactNode;
  viewText?: string;
  linkTo?: string;
}

function CalendarHeader({
  selectedMonth,
  onMonthChange,
  onViewClick,
  viewIcon = <ListSolid className="fill-primary h-4 w-4" />,
  viewText = '리스트보기',
  linkTo = '/diarylist',
}: CalendarHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="w-[94px]" />

      <YearMonthSelector selectedMonth={selectedMonth} onMonthChange={onMonthChange} />

      <Link
        to={linkTo}
        className="flex w-[94px] items-center gap-1.5 rounded-md border-none border-gray-200 pl-2 transition-colors"
        onClick={onViewClick}>
        {viewIcon}
        <span className="text-primary">{viewText}</span>
      </Link>
    </div>
  );
}

export default CalendarHeader;
