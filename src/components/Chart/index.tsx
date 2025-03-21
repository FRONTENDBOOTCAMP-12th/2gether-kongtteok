import { useEffect, useState, useCallback, useMemo } from 'react';
import EmotionBarChart from './EmotionBarChart';
import EmotionPieChart from './EmotionPieChart';
import { format, subMonths } from 'date-fns';
import emotionList from '@/utils/emotion';
import { type EmotionType } from '@/components/EmotionImage';
import supabase, { DATABASE_NAME } from '@/lib/supabase-client';
import { GetUser } from '@/api/get-user';

export interface EmotionData {
  emotion: EmotionType;
  count: number;
}

interface DiaryEntry {
  id: string;
  user_id: string;
  date: string;
  emotion: EmotionType;
}

interface User {
  id: string;
}

function isEmotionType(emotion: unknown): emotion is EmotionType {
  return typeof emotion === 'string' && emotionList.includes(emotion as EmotionType);
}

export const emotionConfig = {
  colors: {
    exciting: 'var(--color-exciting)',
    happy: 'var(--color-happy)',
    proud: 'var(--color-proud)',
    fine: 'var(--color-fine)',
    angry: 'var(--color-angry)',
    tired: 'var(--color-tired)',
    sad: 'var(--color-sad)',
    depressed: 'var(--color-depressed)',
  },
};

const EmotionChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [thisMonthData, setThisMonthData] = useState<EmotionData[]>([]);
  const [lastMonthData, setLastMonthData] = useState<EmotionData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

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
        .select('*')
        .eq('user_id', user.id)
        .gte('date', startDate)
        .lt('date', endDate);

      if (fetchError) throw fetchError;
      return (data || []) as DiaryEntry[];
    },
    [user]
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = (await GetUser()) as User | null;
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '사용자 정보를 불러오는 데 실패했습니다');
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchEmotionData = async () => {
      if (!user) return;

      setIsLoading(true);
      setError(null);

      try {
        const [thisMonthDiaries, lastMonthDiaries] = await Promise.all([
          fetchMonthData(thisMonth),
          fetchMonthData(lastMonth),
        ]);

        setThisMonthData(processEmotionData(thisMonthDiaries));
        setLastMonthData(processEmotionData(lastMonthDiaries));
      } catch (err) {
        console.error('감정 데이터 로딩 오류:', err);
        setError(err instanceof Error ? err.message : '감정 데이터를 불러오는 데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmotionData();
  }, [user, thisMonth, lastMonth, fetchMonthData, processEmotionData]);

  const monthlyData = useMemo(
    () => ({
      lastMonth: lastMonthData,
      thisMonth: thisMonthData,
    }),
    [lastMonthData, thisMonthData]
  );

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex h-64 items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <EmotionBarChart data={thisMonthData} />
      <EmotionPieChart monthlyData={monthlyData} />
    </div>
  );
};

export default EmotionChart;
