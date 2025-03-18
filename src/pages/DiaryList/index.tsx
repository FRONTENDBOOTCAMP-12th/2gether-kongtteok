import CalendarHeader from '@/components/Calendar/CalendarHeader';
import DiaryPreview, { type DiaryPreviewProps } from '@/components/DiaryPreview';
import CommonLayout from '@/components/layout/CommonLayout';
import { CalendarSolid } from '@mynaui/icons-react';
import { format } from 'date-fns';
import { useCallback, useState, useMemo } from 'react';

const diaryData: DiaryPreviewProps[] = [
  {
    emotion: 'happy',
    date: '2025-02-07',
    isPrivate: false,
    content: '프로젝트 조원들이랑 동기들을 만나서 행복했어!',
    likes: 12,
  },
  {
    emotion: 'sad',
    date: '2025-03-06',
    isPrivate: true,
    diaryImage: '/images/emotion/sad.png',
    content:
      '친구가 타로를 봐줬는데 결과가 좋지 않아서 조금 슬펐어.. 프로젝트가 어떻게 될지 궁금해서 월간 운세를 봤는데 걱정이 된다ㅜㅜ 그래도 열심히 하고 있으니까 잘 해낼 수 있겠지? 조원분들도 힘내주시고 계시니까.. 타로 그거 뭐 다 미신이지!',
    likes: 3,
  },
  {
    emotion: 'happy',
    date: '2025-03-07',
    isPrivate: false,
    content: '프로젝트 조원들이랑 동기들을 만나서 행복했어!',
    likes: 12,
  },
];

interface DiaryListProps {
  initialSelectedMonth?: string;
  onMonthChange?: (month: string) => void;
  handleCalendarViewClick?: () => void;
}

function DiaryList({
  initialSelectedMonth = format(new Date(), 'yyyy-MM'),
  onMonthChange,
  handleCalendarViewClick,
}: DiaryListProps) {
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

  const filteredDiaries = useMemo(() => {
    return diaryData.filter((diary) => {
      const diaryMonth = diary.date.substring(0, 7);
      return diaryMonth === selectedMonth;
    });
  }, [selectedMonth]);

  return (
    <CommonLayout
      headerProps={{
        title: '일기 리스트',
        isLeftIcon: true,
        isRightIcon: true,
      }}
      showFooter={true}>
      <div>
        <CalendarHeader
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
          viewIcon={<CalendarSolid className="fill-primary h-4 w-4" />}
          viewText="캘린더보기"
          linkTo="/"
          onViewClick={handleCalendarViewClick}
        />

        <section className="flex flex-col gap-4">
          {filteredDiaries.length > 0 ? (
            filteredDiaries.map((diary, index) => <DiaryPreview key={index} {...diary} />)
          ) : (
            <div className="py-8 text-center text-gray-500">작성된 일기가 없습니다.</div>
          )}
        </section>
      </div>
    </CommonLayout>
  );
}

export default DiaryList;
