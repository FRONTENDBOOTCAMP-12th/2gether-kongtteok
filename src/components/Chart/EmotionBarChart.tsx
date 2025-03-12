import { BarChart, Bar, XAxis, ResponsiveContainer, LabelList, Cell, YAxis } from 'recharts';
import EmotionImage from '@/components/EmotionImage';
import { Emotion, EmotionData, emotionConfig } from './index';

interface EmotionBarChartProps {
  data: EmotionData[];
}

interface CustomXAxisTickProps {
  x: number;
  y: number;
  payload: {
    value: Emotion;
  };
}

const CustomXAxisTick = ({ x, y, payload }: CustomXAxisTickProps) => {
  const emotion = payload.value;

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject width={30} height={30} x={-15} y={0}>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
          <EmotionImage emotion={emotion} />
        </div>
      </foreignObject>
    </g>
  );
};

const EmotionBarChart = ({ data }: EmotionBarChartProps) => {
  const maxCount = Math.max(...data.map((item) => item.count));
  const chartMaxDomain = Math.ceil(maxCount * 1.1);

  return (
    <div>
      <span className="text-primary text-xl">감정 분포</span>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={35}>
          <XAxis
            dataKey="emotion"
            tick={(props) => <CustomXAxisTick {...props} />}
            height={60}
            interval={0}
            stroke="var(--color-primary)"
          />
          <YAxis domain={[0, chartMaxDomain]} hide />
          <Bar dataKey="count" radius={[20, 20, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={emotionConfig.colors[entry.emotion]} />
            ))}
            <LabelList dataKey="count" position="top" fill="var(--color-primary)" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionBarChart;
