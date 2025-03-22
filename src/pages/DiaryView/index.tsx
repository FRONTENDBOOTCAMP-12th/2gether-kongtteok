import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import supabase from '@/lib/supabase-client';
import CommonLayout from '@/components/layout/CommonLayout';
import Button from '@/components/Button';
import DiaryHeader from '@/components/DiaryHeader';
import Textarea from '@/components/Textarea';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Heart } from '@mynaui/icons-react';
import { getGPTResponse } from '@/utils/openai';
import { type EmotionType } from '@/components/EmotionImage';
import { type WeatherType } from '@/components/WeatherImage';
import 'swiper/css';

interface DiaryViewProps {
  id: number;
  date: string;
  title: string;
  content?: string;
  emotion: EmotionType;
  weather: WeatherType;
  isPrivate: boolean;
  likes: number;
  images: string[];
  feedbackMessage?: string;
}

interface DiaryData {
  id: number;
  date: string;
  title: string;
  content?: string;
  emotion: EmotionType;
  weather: WeatherType;
  isPrivate: boolean;
  likes?: number;
  diaryImage: string | string[];
  user_id: string;
  created_at: string;
  feedback_message?: string;
}

function DiaryView() {
  const { diaryId } = useParams<{ diaryId: string }>();
  const diaryIdNum = diaryId ? parseInt(diaryId, 10) : 0;

  const [diary, setDiary] = useState<DiaryViewProps | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMallang, setShowMallang] = useState(false);

  useEffect(() => {
    if (!diaryIdNum) return;

    const fetchDiary = async () => {
      try {
        const { data, error } = await supabase.from('diary').select('*').eq('id', diaryIdNum).single();

        if (error) throw error;

        if (data) {
          const diaryData = data as DiaryData;
          const parsedImages = parseImages(diaryData.diaryImage);

          if (diaryData.feedback_message) {
            setShowMallang(true);
            setReply(diaryData.feedback_message);
          }

          setDiary({
            id: diaryData.id,
            date: diaryData.date,
            title: diaryData.title,
            content: diaryData.content,
            weather: diaryData.weather,
            emotion: diaryData.emotion,
            isPrivate: diaryData.isPrivate,
            likes: diaryData.likes ?? 0,
            images: parsedImages,
            feedbackMessage: diaryData.feedback_message,
          });
        }
      } catch (error) {
        console.error('Supabase 데이터 불러오기 실패:', error);
      }
    };

    fetchDiary();
  }, [diaryIdNum]);

  const parseImages = (diaryImage: string | string[]): string[] => {
    if (typeof diaryImage === 'string') {
      try {
        const parsed = JSON.parse(diaryImage) as unknown;
        return Array.isArray(parsed) ? (parsed as string[]) : [];
      } catch {
        return [];
      }
    }
    return Array.isArray(diaryImage) ? diaryImage : [];
  };

  const saveFeedback = async (content: string) => {
    if (!diaryIdNum || !content) return;

    try {
      const { error } = await supabase.from('diary').update({ feedback_message: content }).eq('id', diaryIdNum);

      if (error) throw error;
    } catch (error) {
      console.error('피드백 저장 실패:', error);
    }
  };

  const handleGetEncouragement = async () => {
    if (!diary?.content || !diary?.emotion) return;

    setLoading(true);
    setShowMallang(true);
    setReply(null);

    try {
      const message = await getGPTResponse(diary.content, diary.emotion);
      setReply(message);

      await saveFeedback(message);

      setDiary((prev) => (prev ? { ...prev, feedbackMessage: message } : null));
    } catch (error) {
      console.error('응원 메시지 가져오기 실패:', error);
      setReply('말랑이가 지금 너무 바빠요. 나중에 다시 물어봐 주세요!');
    } finally {
      setLoading(false);
    }
  };

  if (!diary) return <p>일기를 불러오는 중...</p>;

  return (
    <CommonLayout
      headerProps={{
        title: '내 일기 보기',
        isLeftIcon: true,
        isRightIcon: true,
      }}
      showFooter={true}>
      <ActionButtons />
      <DiaryHeader
        date={diary.date}
        weather={diary.weather}
        emotion={diary.emotion}
        title={diary.title}
        isPrivate={diary.isPrivate}
      />
      <DiaryImages images={diary.images} />
      <DiaryContent diary={diary} />
      <MallangSection
        showMallang={showMallang}
        loading={loading}
        reply={reply}
        handleGetEncouragement={handleGetEncouragement}
        hasFeedback={!!diary.feedbackMessage}
      />
    </CommonLayout>
  );
}

const ActionButtons = () => (
  <section className="mb-2 flex w-full flex-row items-center justify-end">
    <div className="text-brown-900 flex gap-2 text-sm">
      <button onClick={() => console.log('일기 쓰기 페이지로 이동 예정')} className="cursor-pointer">
        수정
      </button>
      <button onClick={() => console.log('삭제 확인 창 띄울 예정')} className="cursor-pointer">
        삭제
      </button>
    </div>
  </section>
);

const DiaryImages = ({ images }: { images: string[] }) => {
  if (images.length === 0) return null;

  return (
    <section className="bg-secondary relative flex h-50 w-full items-center justify-center overflow-hidden">
      <Swiper spaceBetween={10} slidesPerView={1} className="h-full w-full">
        {images.map((img, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <img src={img} alt={`일기 이미지 ${index + 1}`} className="h-auto max-h-[300px] w-full object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const DiaryContent = ({ diary }: { diary: DiaryViewProps }) => (
  <div className="relative pt-3">
    <Textarea label="일기 내용" value={diary.content} labelHidden disabled />
    <div className="text-likes absolute right-3 bottom-2 flex items-center gap-1 text-sm">
      <Heart className="fill-likes h-4 w-4" />
      <span>{diary.likes}</span>
    </div>
  </div>
);

const MallangSection = ({
  showMallang,
  loading,
  reply,
  handleGetEncouragement,
  hasFeedback,
}: {
  showMallang: boolean;
  loading: boolean;
  reply: string | null;
  handleGetEncouragement: () => Promise<void>;
  hasFeedback: boolean;
}) => (
  <div className="mt-3">
    {!showMallang ? (
      <div className="flex items-center justify-end gap-x-2">
        {!hasFeedback && (
          <Button intent="primary" size="small" onClick={handleGetEncouragement} disabled={loading}>
            <img src="/images/mallang/mallangFace.png" alt="말랑이" width={31} height={31} className="inline-block" />
            말랑이의 응원 받기
          </Button>
        )}
      </div>
    ) : (
      <div className="relative flex flex-col items-center">
        <div className="bg-beige-200 absolute top-23 z-20 flex w-full items-center justify-center rounded-[10px] p-4 text-center">
          {loading ? (
            <p className="text-primary text-lg">말랑이가 생각 중...</p>
          ) : (
            <p className="leading-8.5">{reply}</p>
          )}
        </div>
        <img src="/images/mallang/mallang.png" alt="말랑이" width={140} height={140} className="relative z-10" />
      </div>
    )}
  </div>
);

export default DiaryView;
