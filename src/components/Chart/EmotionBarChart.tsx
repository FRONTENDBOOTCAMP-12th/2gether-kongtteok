import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, LabelList, Cell, YAxis } from 'recharts';
import EmotionImage, { type EmotionType } from '@/components/EmotionImage';
import { EmotionData, emotionConfig } from './index';

interface EmotionBarChartProps {
  data: EmotionData[];
}

interface CustomXAxisTickProps {
  x: number;
  y: number;
  payload: {
    value: EmotionType;
  };
}

const CustomXAxisTick = ({ x, y, payload }: CustomXAxisTickProps) => {
  const emotion = payload.value;

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject width={30} height={30} x={-15} y={0}>
        <div className="flex h-full w-full justify-center">
          <EmotionImage emotion={emotion} />
        </div>
      </foreignObject>
    </g>
  );
};

const EmotionBarChart = ({ data }: EmotionBarChartProps) => {
  const { hasEntries, chartMaxDomain } = useMemo(() => {
    const hasEntries = data.some((item) => item.count > 0);
    const maxCount = Math.max(...data.map((item) => item.count), 0);
    const chartMaxDomain = Math.ceil(maxCount * 1.1);

    return { hasEntries, chartMaxDomain };
  }, [data]);

  const barCells = useMemo(
    () => data.map((entry, index) => <Cell key={`cell-${index}`} fill={emotionConfig.colors[entry.emotion]} />),
    [data]
  );

  return (
    <div>
      <span className="text-primary text-xl">감정 분포</span>
      {hasEntries ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barSize={35}>
            <XAxis dataKey="emotion" tick={CustomXAxisTick} height={60} interval={0} stroke="var(--color-primary)" />
            <YAxis domain={[0, chartMaxDomain]} hide />
            <Bar dataKey="count" radius={[20, 20, 0, 0]}>
              {barCells}
              <LabelList dataKey="count" position="top" fill="var(--color-primary)" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-primary flex h-40 items-center justify-center text-lg">이번달에 일기가 없어요!😅</div>
      )}
    </div>
  );
};

export default EmotionBarChart;
