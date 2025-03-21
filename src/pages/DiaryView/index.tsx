import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import supabase from '@/lib/supabase-client';
import CommonLayout from '@/components/layout/CommonLayout';
import Button from '@/components/Button';
import DiaryHeader from '@/components/DiaryHeader';
import Textarea from '@/components/Textarea';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Heart, LockKeyhole, LockOpenKeyhole } from '@mynaui/icons-react';
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
}

function DiaryView() {
  const { diaryId } = useParams<{ diaryId: string }>();
  const diaryIdNum = diaryId ? Number(diaryId) : null;

  const [diary, setDiary] = useState<DiaryViewProps | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMallang, setShowMallang] = useState(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  useEffect(() => {
    if (!diaryIdNum) return;

    const fetchDiary = async () => {
      const { data, error } = await supabase.from('diary').select('*').eq('id', diaryIdNum).single();

      if (error) {
        console.error('Supabase 데이터 불러오기 실패:', error);
      } else {
        setDiary({
          id: data.id,
          date: data.date,
          title: data.title,
          content: data.content,
          weather: data.weather as WeatherType,
          emotion: data.emotion as EmotionType,
          isPrivate: data.isPrivate,
          likes: data.likes ?? 0,
          images:
            typeof data.diaryImage === 'string'
              ? JSON.parse(data.diaryImage)
              : Array.isArray(data.diaryImage)
                ? data.diaryImage
                : [],
        });
        setIsPrivate(data.isPrivate);
      }
    };

    fetchDiary();
  }, [diaryIdNum]);

  if (!diary) return <p>일기를 불러오는 중...</p>;

  const handleGetEncouragement = async () => {
    if (!diary.content || !diary.emotion) return;
    setLoading(true);
    setShowMallang(true);
    setReply(null);

    try {
      const message = await getGPTResponse(diary.content, diary.emotion);
      setReply(message);
    } catch {
      setReply('말랑이가 지금 말을 못 하고 있어요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonLayout
      headerProps={{
        title: '내 일기 보기',
        isLeftIcon: true,
        isRightIcon: true,
      }}
      showFooter={true}>
      <section className="mb-2 flex w-full flex-row items-center justify-between">
        <div>{isPrivate ? <LockKeyhole width="16" /> : <LockOpenKeyhole width="16" />}</div>
        <div className="text-brown-900 flex gap-2 text-sm">
          <button onClick={() => console.log('삭제 확인 창 띄울 예정')} className="cursor-pointer">
            삭제
          </button>
          <button onClick={() => console.log('일기 쓰기 페이지로 이동 예정')} className="cursor-pointer">
            수정
          </button>
        </div>
      </section>

      <DiaryHeader date={diary.date} weather={diary.weather} emotion={diary.emotion} title={diary.title} />
      <div className="h-2" />

      {diary.images.length > 0 && (
        <section className="bg-secondary relative flex h-50 w-full items-center justify-center overflow-hidden">
          <Swiper spaceBetween={10} slidesPerView={1} className="h-full w-full">
            {diary.images.map((img, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <img
                  src={img}
                  alt={`일기 이미지 ${index + 1}`}
                  className="h-auto max-h-[300px] w-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      <section className="relative flex w-full flex-col gap-y-3">
        <div className="relative">
          <Textarea label="일기 내용" value={diary.content} labelHidden disabled />
          <div className="absolute right-3 bottom-2 flex items-center gap-1 text-sm text-[#F3A79E]">
            <Heart className="h-4 w-4 fill-[#F3A79E]" />
            <span>{diary.likes}</span>
          </div>
        </div>

        {!showMallang ? (
          <div className="flex items-center justify-end gap-x-2">
            <Button intent="primary" size="small" onClick={handleGetEncouragement} disabled={loading}>
              <img src="/images/mallang/mallangFace.png" alt="말랑이" width={31} height={31} className="inline-block" />
              말랑이의 응원 받기
            </Button>
          </div>
        ) : (
          <div className="relative flex flex-col items-center">
            <div className="bg-beige-200 absolute top-24 z-20 flex min-h-35 w-full items-center justify-center rounded-[10px] p-4 text-center">
              {loading ? <p className="text-primary text-lg">말랑이가 생각 중...</p> : <p>{reply}</p>}
            </div>
            <img src="/images/mallang/mallang.png" alt="말랑이" width={140} height={140} className="relative z-10" />
          </div>
        )}
      </section>
    </CommonLayout>
  );
}

export default DiaryView;
