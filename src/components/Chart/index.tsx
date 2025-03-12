import EmotionBarChart from './EmotionBarChart';
import EmotionPieChart from './EmotionPieChart';

export type Emotion = 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed';

export interface EmotionData {
  emotion: Emotion;
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
  koreanNames: {
    exciting: '신남',
    happy: '행복',
    proud: '뿌듯',
    fine: '괜찮음',
    angry: '화남',
    tired: '피곤',
    sad: '슬픔',
    depressed: '우울',
  },
};

const thisMonthData: EmotionData[] = [
  { emotion: 'exciting', count: 2 },
  { emotion: 'happy', count: 3 },
  { emotion: 'proud', count: 3 },
  { emotion: 'fine', count: 2 },
  { emotion: 'angry', count: 3 },
  { emotion: 'tired', count: 12 },
  { emotion: 'sad', count: 4 },
  { emotion: 'depressed', count: 2 },
];

const lastMonthData: EmotionData[] = [
  { emotion: 'exciting', count: 4 },
  { emotion: 'happy', count: 5 },
  { emotion: 'proud', count: 2 },
  { emotion: 'fine', count: 3 },
  { emotion: 'angry', count: 2 },
  { emotion: 'tired', count: 3 },
  { emotion: 'sad', count: 2 },
  { emotion: 'depressed', count: 1 },
];

const monthlyData = {
  lastMonth: lastMonthData,
  thisMonth: thisMonthData,
};

const EmotionDashboardPage = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <EmotionBarChart data={thisMonthData} />

      <EmotionPieChart monthlyData={monthlyData} />
    </div>
  );
};

export default EmotionDashboardPage;
