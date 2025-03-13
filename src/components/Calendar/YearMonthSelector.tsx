import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { ChevronDownSolid } from '@mynaui/icons-react';

interface YearMonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

const YearMonthSelector = memo(function YearMonthSelector({ selectedMonth, onMonthChange }: YearMonthSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [year, month] = selectedMonth.split('-');
  const formattedMonth = `${year}년 ${parseInt(month, 10)}월`;

  const { currentYear, currentMonth, years, months } = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);

    return { currentYear, currentMonth, years, months };
  }, []);

  const handleMonthClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleYearSelect = useCallback(
    (selectedYear: number) => {
      const newMonth = parseInt(month, 10);

      if (selectedYear === currentYear && newMonth > currentMonth) {
        onMonthChange(`${selectedYear}-${String(currentMonth).padStart(2, '0')}`);
      } else {
        onMonthChange(`${selectedYear}-${month}`);
      }
      setIsOpen(false);
    },
    [month, currentYear, currentMonth, onMonthChange]
  );

  const handleMonthSelect = useCallback(
    (selectedMonth: number) => {
      const newYear = parseInt(year, 10);
      if (newYear === currentYear && selectedMonth > currentMonth) {
        return;
      }
      onMonthChange(`${year}-${String(selectedMonth).padStart(2, '0')}`);
      setIsOpen(false);
    },
    [year, currentYear, currentMonth, onMonthChange]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-primary flex cursor-pointer justify-center text-lg font-medium transition-colors"
        onClick={handleMonthClick}>
        {formattedMonth}
        <ChevronDownSolid />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 z-10 mt-2 w-48 -translate-x-1/2 transform rounded-md border border-gray-200 bg-white p-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h3 className="mb-1 text-xs font-medium text-gray-500">년도</h3>
              <div className="max-h-32 overflow-y-auto pr-1">
                {years.map((y) => (
                  <button
                    key={y}
                    className={`hover:bg-beige-100 cursor-pointer rounded px-2 py-1 text-sm ${parseInt(year, 10) === y ? 'bg-beige-200 font-medium' : ''}`}
                    onClick={() => handleYearSelect(y)}>
                    {y}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-1 text-xs font-medium text-gray-500">월</h3>
              <div className="max-h-32 overflow-y-auto">
                {months.map((m) => {
                  const isDisabled = parseInt(year, 10) === currentYear && m > currentMonth;
                  return (
                    <button
                      key={m}
                      className={`cursor-pointer rounded px-2 py-1 text-sm ${
                        parseInt(month, 10) === m
                          ? 'bg-beige-200 font-medium'
                          : isDisabled
                            ? 'cursor-not-allowed text-gray-300'
                            : 'hover:bg-beige-100'
                      }`}
                      onClick={() => !isDisabled && handleMonthSelect(m)}>
                      {m}월
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default YearMonthSelector;
