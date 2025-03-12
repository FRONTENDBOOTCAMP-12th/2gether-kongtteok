import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import EmotionImage from '@/components/EmotionImage';
import { Emotion, EmotionData, emotionConfig } from './index';

interface MonthlyData {
  lastMonth: EmotionData[];
  thisMonth: EmotionData[];
}

interface EmotionPieChartProps {
  monthlyData: MonthlyData;
}

const getEmotionKoreanName = (emotion: Emotion): string => emotionConfig.koreanNames[emotion];

const getMostFrequentEmotions = (data: EmotionData[], limit: number = 3): EmotionData[] => {
  const sortedData = [...data].sort((a, b) => b.count - a.count);
  const highestCount = sortedData[0]?.count || 0;
  const mostFrequent = sortedData.filter((item) => item.count === highestCount);
  return mostFrequent.slice(0, limit);
};

const MonthPieChart = ({ data, title }: { data: EmotionData[]; title: string }) => (
  <div className="w-full">
    <h3 className="text-primary text-center text-lg font-medium">{title}</h3>
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Pie data={data} innerRadius="40%" outerRadius="100%" dataKey="count" nameKey="emotion">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={emotionConfig.colors[entry.emotion]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const EmotionPieChart = ({ monthlyData }: EmotionPieChartProps) => {
  const mostFrequentThisMonth = getMostFrequentEmotions(monthlyData.thisMonth);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-primary text-xl">비교</span>
      <div className="flex w-full flex-row gap-4">
        <MonthPieChart data={monthlyData.lastMonth} title="2월" />
        <MonthPieChart data={monthlyData.thisMonth} title="3월" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <div className="flex flex-row gap-1.5">
          {mostFrequentThisMonth.map((item) => (
            <EmotionImage key={item.emotion} emotion={item.emotion} height={35} width={35} />
          ))}
        </div>
        <p className="font-mediu text-primary text-base">
          👑 이달의 콩떡이는{' '}
          {mostFrequentThisMonth.map((item, index) => (
            <span key={item.emotion} className="text-primary text-lg font-medium">
              {getEmotionKoreanName(item.emotion)}
              {index < mostFrequentThisMonth.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default EmotionPieChart;
