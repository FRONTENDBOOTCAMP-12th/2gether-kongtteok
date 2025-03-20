import { useState, useCallback, useEffect } from 'react';
import { format } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import supabase, { DATABASE_NAME } from '@/lib/supabase-client';
import { GetUser } from '@/api/get-user';
import { EmotionType } from '@/components/EmotionImage';

interface User {
  id: string;
}

interface DiaryItem {
  id: number;
  date: string;
  emotion: EmotionType;
  isPrivate: boolean;
  content: string;
  diaryImage: string | null;
  user_id: string;
}

interface DiaryEntry {
  id: number;
  date: string;
  emotion: EmotionType;
  isPrivate: boolean;
  content: string;
  diaryImage: string;
  likes: number;
}

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
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleMonthChange = useCallback(
    (newMonth: string) => {
      setSelectedMonth(newMonth);
      if (onMonthChange) {
        onMonthChange(newMonth);
      }
    },
    [onMonthChange]
  );

  const fetchDiaries = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = (await GetUser()) as User | null;

      if (!userData) {
        setError('로그인이 필요합니다');
        return;
      }

      const [year, month] = selectedMonth.split('-');
      const startDate = `${year}-${month}-01`;
      const endDate =
        month === '12' ? `${parseInt(year) + 1}-01-01` : `${year}-${String(parseInt(month) + 1).padStart(2, '0')}-01`;

      const { data, error: fetchError } = await supabase
        .from(DATABASE_NAME)
        .select('*')
        .eq('user_id', userData.id)
        .gte('date', startDate)
        .lt('date', endDate)
        .order('date', { ascending: true });

      if (fetchError) throw fetchError;

      if (data) {
        const diaryPromises = data.map(async (diary: DiaryItem) => {
          const { count } = await supabase
            .from('likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', diary.id);

          let diaryImageStr = '/images/emotion/default.png';
          if (typeof diary.diaryImage === 'string') {
            diaryImageStr = diary.diaryImage;
          } else if (diary.emotion) {
            diaryImageStr = `/images/emotion/${diary.emotion}.png`;
          }

          return {
            id: diary.id,
            emotion: diary.emotion,
            date: diary.date,
            isPrivate: diary.isPrivate || false,
            content: diary.content || '',
            diaryImage: diaryImageStr,
            likes: count ?? 0,
          };
        });

        const diariesWithLikes = await Promise.all(diaryPromises);
        setDiaries(diariesWithLikes);
      }
    } catch (err) {
      console.error('Failed to fetch diaries:', err);
      setError('일기를 불러오는 데 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchDiaries();
  }, [fetchDiaries]);

  return (
    <div className="calendar-container">
      <CalendarHeader
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
        linkTo="/diarylist"
        onViewClick={onListViewClick}
      />

      <CalendarGrid selectedMonth={selectedMonth} diaryEntries={diaries} isLoading={isLoading} error={error} />
    </div>
  );
}

export default Calendar;
