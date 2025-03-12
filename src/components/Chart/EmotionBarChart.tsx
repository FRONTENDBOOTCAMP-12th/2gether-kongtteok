import { BarChart, Bar, XAxis, ResponsiveContainer, LabelList, Cell } from 'recharts';
import EmotionImage from '@/components/EmotionImage';

type Emotion = 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed';

interface EmotionData {
  emotion: Emotion;
  count: number;
}

const dummyData: EmotionData[] = [
  { emotion: 'exciting', count: 2 },
  { emotion: 'happy', count: 3 },
  { emotion: 'proud', count: 3 },
  { emotion: 'fine', count: 2 },
  { emotion: 'angry', count: 3 },
  { emotion: 'tired', count: 6 },
  { emotion: 'sad', count: 4 },
  { emotion: 'depressed', count: 2 },
];

const getEmotionColor = (emotion: Emotion): string => {
  const colorMap: Record<Emotion, string> = {
    exciting: 'var(--color-exciting)',
    happy: 'var(--color-happy)',
    proud: 'var(--color-proud)',
    fine: 'var(--color-fine)',
    angry: 'var(--color-angry)',
    tired: 'var(--color-tired)',
    sad: 'var(--color-sad)',
    depressed: 'var(--color-depressed)',
  };

  return colorMap[emotion];
};

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

const EmotionBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={dummyData} barSize={35}>
        <XAxis
          dataKey="emotion"
          tick={(props) => <CustomXAxisTick {...props} />}
          height={60}
          interval={0}
          stroke="var(--color-primary)"
        />
        <Bar dataKey="count" radius={[20, 20, 0, 0]}>
          {dummyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getEmotionColor(entry.emotion)} />
          ))}
          <LabelList dataKey="count" position="top" fill="var(--color-primary)" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EmotionBarChart;
