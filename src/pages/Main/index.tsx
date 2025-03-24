import { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { format } from 'date-fns/format';
import { subMonths } from 'date-fns/subMonths';
import CommonLayout from '@/components/layout/CommonLayout';
import supabase, { DATABASE_NAME } from '@/lib/supabase-client';
import { GetUser } from '@/api/get-user';
import { EmotionType } from '@/components/EmotionImage';
import emotionList from '@/utils/emotion';
import { EmotionData } from '@/components/Chart';

const Calendar = lazy(() => import('@/components/Calendar'));
const EmotionChart = lazy(() => import('@/components/Chart'));

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

const useDiaryData = (userId: string | undefined) => {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { thisMonth, lastMonth } = useMemo(() => {
    const now = new Date();
    return {
      thisMonth: format(now, 'yyyy-MM'),
      lastMonth: format(subMonths(now, 1), 'yyyy-MM'),
    };
  }, []);

  const fetchMonthData = useCallback(
    async (yearMonth: string): Promise<DiaryEntry[]> => {
      if (!userId) {
        return [];
      }

      const [year, month] = yearMonth.split('-');
      const startDate = `${year}-${month}-01`;
      const endDate =
        month === '12' ? `${parseInt(year) + 1}-01-01` : `${year}-${String(parseInt(month) + 1).padStart(2, '0')}-01`;

      const { data, error: fetchError } = await supabase
        .from(DATABASE_NAME)
        .select('id, date, emotion, user_id')
        .eq('user_id', userId)
        .gte('date', startDate)
        .lt('date', endDate)
        .order('date', { ascending: true });

      if (fetchError) throw fetchError;

      if (data) {
        return data.map((diary: DiaryItem) => ({
          id: diary.id,
          date: diary.date,
          emotion: diary.emotion,
        }));
      }

      return [];
    },
    [userId]
  );

  useEffect(() => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    fetchMonthData(selectedMonth)
      .then((diaryData) => {
        setDiaries(diaryData);
      })
      .catch((err) => {
        console.error('Failed to fetch diaries:', err);
        setError(err instanceof Error ? err.message : '일기를 불러오는 데 실패했습니다');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchMonthData, selectedMonth, userId]);

  return {
    diaries,
    isLoading,
    error,
    selectedMonth,
    setSelectedMonth,
    fetchMonthData,
    thisMonth,
    lastMonth,
  };
};

const useEmotionData = (
  userId: string | undefined,
  fetchMonthData: (month: string) => Promise<DiaryEntry[]>,
  thisMonth: string,
  lastMonth: string
) => {
  const [thisMonthData, setThisMonthData] = useState<EmotionData[]>([]);
  const [lastMonthData, setLastMonthData] = useState<EmotionData[]>([]);
  const [chartIsLoading, setChartIsLoading] = useState(true);
  const [chartError, setChartError] = useState<string | null>(null);

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
    if (!userId) return;

    setChartIsLoading(true);
    setChartError(null);

    Promise.all([fetchMonthData(thisMonth), fetchMonthData(lastMonth)])
      .then(([thisMonthDiaries, lastMonthDiaries]) => {
        setThisMonthData(processEmotionData(thisMonthDiaries));
        setLastMonthData(processEmotionData(lastMonthDiaries));
      })
      .catch((err) => {
        console.error('감정 데이터 로딩 오류:', err);
        setChartError(err instanceof Error ? err.message : '감정 데이터를 불러오는 데 실패했습니다');
      })
      .finally(() => {
        setChartIsLoading(false);
      });
  }, [userId, thisMonth, lastMonth, fetchMonthData, processEmotionData]);

  return {
    thisMonthData,
    lastMonthData,
    chartIsLoading,
    chartError,
  };
};

function isEmotionType(emotion: unknown): emotion is EmotionType {
  return typeof emotion === 'string' && emotionList.includes(emotion as EmotionType);
}

function MainPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const userData = (await GetUser()) as User | null;
        if (isMounted && userData) {
          setUser(userData);
        }
      } catch (err) {
        if (isMounted) {
          console.error('사용자 정보 로딩 오류:', err);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const { diaries, isLoading, error, selectedMonth, setSelectedMonth, fetchMonthData, thisMonth, lastMonth } =
    useDiaryData(user?.id);

  const { thisMonthData, lastMonthData, chartIsLoading, chartError } = useEmotionData(
    user?.id,
    fetchMonthData,
    thisMonth,
    lastMonth
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (user?.id) {
          fetchMonthData(selectedMonth);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user?.id, selectedMonth, fetchMonthData]);

  const handleMonthChange = useCallback(
    (newMonth: string) => {
      setSelectedMonth(newMonth);
    },
    [setSelectedMonth]
  );

  const fallback = <div className="p-4 text-center">로딩 중...</div>;

  return (
    <CommonLayout
      headerProps={{
        title: '메인페이지',
        isRightIcon: true,
      }}
      showFooter={true}>
      <div className="mt-6 flex flex-col gap-10">
        <div className="min-h-[300px]">
          <Suspense fallback={fallback}>
            <Calendar
              initialSelectedMonth={selectedMonth}
              onMonthChange={handleMonthChange}
              diaryEntries={diaries}
              isLoading={isLoading}
              error={error}
            />
          </Suspense>
        </div>

        <div className="min-h-[250px]">
          <Suspense fallback={fallback}>
            <EmotionChart
              thisMonthData={thisMonthData}
              lastMonthData={lastMonthData}
              isLoading={chartIsLoading}
              error={chartError}
            />
          </Suspense>
        </div>
      </div>
    </CommonLayout>
  );
}

export default MainPage;
