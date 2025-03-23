import { useMemo, memo } from 'react';
import EmotionBarChart from './EmotionBarChart';
import EmotionPieChart from './EmotionPieChart';
import { type EmotionType } from '@/components/EmotionImage';

export interface EmotionData {
  emotion: EmotionType;
  count: number;
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

interface EmotionChartProps {
  thisMonthData: EmotionData[];
  lastMonthData: EmotionData[];
  isLoading: boolean;
  error: string | null;
}

// React.memo를 사용하여 불필요한 리렌더링 방지
const EmotionChart = ({ thisMonthData, lastMonthData, isLoading, error }: EmotionChartProps) => {
  // 월별 데이터 메모이제이션
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

export default memo(EmotionChart);
