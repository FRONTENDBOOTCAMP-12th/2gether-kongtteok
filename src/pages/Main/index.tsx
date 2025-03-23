import { useState, useEffect, useCallback, useMemo } from 'react';
import { format, subMonths } from 'date-fns';
import Calendar from '@/components/Calendar';
import EmotionChart, { EmotionData } from '@/components/Chart';
import CommonLayout from '@/components/layout/CommonLayout';
import supabase, { DATABASE_NAME } from '@/lib/supabase-client';
import { GetUser } from '@/api/get-user';
import { EmotionType } from '@/components/EmotionImage';
import emotionList from '@/utils/emotion';

interface User {
  id: string;
}

interface DiaryItem {
  id: number;
  date: string;
  emotion: EmotionType;
  user_id: string;
}

interface DiaryEntry {
  id: number;
  date: string;
  emotion: EmotionType;
}

function isEmotionType(emotion: unknown): emotion is EmotionType {
  return typeof emotion === 'string' && emotionList.includes(emotion as EmotionType);
}

function MainPage() {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [thisMonthData, setThisMonthData] = useState<EmotionData[]>([]);
  const [lastMonthData, setLastMonthData] = useState<EmotionData[]>([]);
  const [chartIsLoading, setChartIsLoading] = useState(true);
  const [chartError, setChartError] = useState<string | null>(null);

  const { thisMonth, lastMonth } = useMemo(() => {
    const now = new Date();
    return {
      thisMonth: format(now, 'yyyy-MM'),
      lastMonth: format(subMonths(now, 1), 'yyyy-MM'),
    };
  }, []);

  const processEmotionData = useCallback((diaries: DiaryEntry[]): EmotionData[] => {
    const emotionCounts = emotionList.reduce<Record<EmotionType, number>>(
      (acc, emotion) => {
        acc[emotion] = 0;
        return acc;
      },
      {} as Record<EmotionType, number>
    );

    diaries.forEach((diary) => {
      if (isEmotionType(diary.emotion)) {
        emotionCounts[diary.emotion]++;
      }
    });

    return emotionList.map((emotion) => ({
      emotion,
      count: emotionCounts[emotion],
    }));
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = (await GetUser()) as User | null;
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '사용자 정보를 불러오는 데 실패했습니다');
        setChartError(err instanceof Error ? err.message : '사용자 정보를 불러오는 데 실패했습니다');
      }
    };

    fetchUser();
  }, []);

  const fetchMonthData = useCallback(
    async (yearMonth: string): Promise<DiaryEntry[]> => {
      if (!user?.id) {
        throw new Error('로그인이 필요합니다');
      }

      const [year, month] = yearMonth.split('-');
      const startDate = `${year}-${month}-01`;
      const endDate =
        month === '12' ? `${parseInt(year) + 1}-01-01` : `${year}-${String(parseInt(month) + 1).padStart(2, '0')}-01`;

      const { data, error: fetchError } = await supabase
        .from(DATABASE_NAME)
        .select('id, date, emotion, user_id')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lt('date', endDate)
        .order('date', { ascending: true });

      if (fetchError) throw fetchError;

      if (data) {
        const formattedDiaries = data.map((diary: DiaryItem) => {
          return {
            id: diary.id,
            date: diary.date,
            emotion: diary.emotion,
          };
        });

        return formattedDiaries;
      }

      return [];
    },
    [user]
  );

  useEffect(() => {
    const fetchDiaries = async () => {
      if (!user) return;

      setIsLoading(true);
      setError(null);

      try {
        const diaryData = await fetchMonthData(selectedMonth);
        setDiaries(diaryData);
      } catch (err) {
        console.error('Failed to fetch diaries:', err);
        setError(err instanceof Error ? err.message : '일기를 불러오는 데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiaries();
  }, [fetchMonthData, selectedMonth, user]);

  useEffect(() => {
    const fetchEmotionData = async () => {
      if (!user) return;

      setChartIsLoading(true);
      setChartError(null);

      try {
        const [thisMonthDiaries, lastMonthDiaries] = await Promise.all([
          fetchMonthData(thisMonth),
          fetchMonthData(lastMonth),
        ]);

        setThisMonthData(processEmotionData(thisMonthDiaries));
        setLastMonthData(processEmotionData(lastMonthDiaries));
      } catch (err) {
        console.error('감정 데이터 로딩 오류:', err);
        setChartError(err instanceof Error ? err.message : '감정 데이터를 불러오는 데 실패했습니다');
      } finally {
        setChartIsLoading(false);
      }
    };

    fetchEmotionData();
  }, [user, thisMonth, lastMonth, fetchMonthData, processEmotionData]);

  const handleMonthChange = (newMonth: string) => {
    setSelectedMonth(newMonth);
  };

  return (
    <CommonLayout
      headerProps={{
        title: '메인페이지',
        isRightIcon: true,
      }}
      showFooter={true}>
      <div className="mt-6 flex flex-col gap-10">
        <Calendar
          initialSelectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
          diaryEntries={diaries}
          isLoading={isLoading}
          error={error}
        />
        <EmotionChart
          thisMonthData={thisMonthData}
          lastMonthData={lastMonthData}
          isLoading={chartIsLoading}
          error={chartError}
        />
      </div>
    </CommonLayout>
  );
}

export default MainPage;
