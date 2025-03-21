import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import EmotionImage, { EMOTION } from '@/components/EmotionImage';
import { EmotionData, emotionConfig } from './index';
import { format } from 'date-fns';

interface MonthlyData {
  lastMonth: EmotionData[];
  thisMonth: EmotionData[];
}

interface EmotionPieChartProps {
  monthlyData: MonthlyData;
}

const getMostFrequentEmotions = (data: EmotionData[], limit = 3): EmotionData[] => {
  if (!data?.length) return [];

  const nonZeroData = data.filter((item) => item.count > 0);
  if (!nonZeroData.length) return [];

  const sortedData = nonZeroData.sort((a, b) => b.count - a.count);
  const highestCount = sortedData[0].count;

  return sortedData.filter((item) => item.count === highestCount).slice(0, limit);
};

const MonthPieChart = ({ data, title }: { data: EmotionData[]; title: string }) => {
  const filteredData = data.filter((item) => item.count > 0);
  const hasData = filteredData.length > 0;

  return (
    <div className="flex w-full flex-col items-center">
      <h3 className="text-primary text-center text-lg font-medium">{title}</h3>
      {hasData ? (
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Pie data={filteredData} innerRadius="40%" outerRadius="100%" dataKey="count" nameKey="emotion">
              {filteredData.map((entry) => (
                <Cell key={`cell-${entry.emotion}`} fill={emotionConfig.colors[entry.emotion]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <span className="text-primary flex h-full items-center justify-center">일기가 없어요😅</span>
      )}
    </div>
  );
};

const EmotionBadges = ({ emotions }: { emotions: EmotionData[] }) => {
  if (!emotions.length) {
    return <div className="text-center text-gray-500">이번 달에 일기를 안썼어요!</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <div className="flex flex-row gap-1.5">
        {emotions.map((item) => (
          <EmotionImage key={item.emotion} emotion={item.emotion} height={35} width={35} />
        ))}
      </div>
      <p className="text-primary text-base font-medium">
        👑 이달의 콩떡이는{' '}
        {emotions.map((item, index) => (
          <span key={item.emotion} className="text-primary text-lg font-medium">
            {EMOTION[item.emotion as keyof typeof EMOTION]}
            {index < emotions.length - 1 ? ', ' : ''}
          </span>
        ))}
      </p>
    </div>
  );
};

const EmotionPieChart = ({ monthlyData }: EmotionPieChartProps) => {
  const now = new Date();
  const thisMonthName = `${format(now, 'M')}월`;
  const lastMonthName = `${format(new Date(now.getFullYear(), now.getMonth() - 1), 'M')}월`;

  const mostFrequentThisMonth = getMostFrequentEmotions(monthlyData.thisMonth);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-primary text-xl">비교</span>
      <div className="flex w-full flex-row gap-4">
        <MonthPieChart data={monthlyData.lastMonth} title={lastMonthName} />
        <MonthPieChart data={monthlyData.thisMonth} title={thisMonthName} />
      </div>
      <EmotionBadges emotions={mostFrequentThisMonth} />
    </div>
  );
};

export default EmotionPieChart;
