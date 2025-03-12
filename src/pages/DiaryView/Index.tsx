import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { supabase } from '@/lib/supabase-client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/Button';
import Switch from '@/components/Switch';
import DiaryHeader from '@/components/DiaryHeader';
import Textarea from '@/components/Textarea';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Heart } from '@mynaui/icons-react';
import { getGPTResponse } from '@/utils/openai';
import 'swiper/css';

interface DiaryViewProps {
  id: number;
  date: string;
  title: string;
  content: string;
  weather: 'sunny' | 'cloudy' | 'windy' | 'rainy' | 'snowy';
  emotion: 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed';
  isPrivate: boolean;
  likes: number;
  images: string[];
}

function DiaryView() {
  const { id } = useParams();
  const diaryId = id ? parseInt(id, 10) : null;
  const [diary, setDiary] = useState<DiaryViewProps | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMallang, setShowMallang] = useState(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiary = async () => {
      if (!diaryId) return;

      const { data, error } = await supabase.from('diary').select('*').eq('id', diaryId).single();

      if (error) {
        console.error('Supabase 데이터 불러오기 실패:', error);
      } else {
        const diaryData: DiaryViewProps = {
          id: data.id,
          date: data.date,
          title: data.title,
          content: data.content,
          weather: data.weather as 'sunny' | 'cloudy' | 'windy' | 'rainy' | 'snowy',
          emotion: data.emotion as 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed',
          isPrivate: data.isPrivate,
          likes: data.likes,
          images:
            typeof data.diaryImage === 'string'
              ? JSON.parse(data.diaryImage)
              : Array.isArray(data.diaryImage)
                ? data.diaryImage
                : [],
        };

        setDiary(diaryData);
        setIsPrivate(diaryData.isPrivate);
      }
    };

    fetchDiary();
  }, [diaryId]);

  const handleTogglePrivate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!diary?.id) {
      console.error('id 값이 없습니다.');
      return;
    }

    const newValue = e.target.checked;
    setIsPrivate(newValue);

    const { error } = await supabase.from('diary').update({ isPrivate: newValue }).eq('id', diary.id);

    if (error) {
      console.error('혼자보기 상태 변경 실패:', error);
      setIsPrivate(!newValue);
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
    } catch (error) {
      setReply('말랑이가 지금 말을 못 하고 있어요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wrap" className="max-w-kong m-auto h-screen overflow-y-auto pb-15">
      <Header title="내 일기 보기" isLeftIcon isRightIcon />

      <main className="flex flex-col items-center gap-y-3 px-4">
        <section className="mt-2 flex w-full flex-row items-center justify-between">
          <Switch label="혼자보기" checked={isPrivate} onChange={handleTogglePrivate} />
          <span className="text-brown-700 text-xs">{isPrivate ? 'ON' : 'OFF'}</span>
          <div className="text-brown-900 flex gap-2 text-xs">
            <button onClick={() => navigate('/diary-list')} className="cursor-pointer">
              목록으로
            </button>
            <button onClick={() => console.log('삭제 확인 창 띄울 예정')} className="cursor-pointer">
              삭제
            </button>
          </div>
        </section>

        {diary ? (
          <>
            <DiaryHeader date={diary.date} weather={diary.weather} emotion={diary.emotion} title={diary.title} />

            {diary.images.length > 0 && (
              <section className="relative flex h-[200px] w-[408px] items-center justify-center overflow-hidden bg-[#D0B8A8]">
                <Swiper spaceBetween={10} slidesPerView={1} className="h-full w-full">
                  {diary.images.map((img, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center">
                      <img
                        src={img}
                        alt={`일기 이미지 ${index + 1}`}
                        className="absolute inset-0 m-auto max-h-full max-w-full object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </section>
            )}

            <section className="flex w-full flex-col gap-y-3">
              <div className="relative">
                <Textarea label="일기 내용" value={diary.content} labelHidden disabled />
                <div className="absolute right-3 bottom-3 flex items-center gap-1 text-sm text-[#F3A79E]">
                  <Heart className="h-4 w-4 fill-[#F3A79E]" />
                  <span>{diary.likes}</span>
                </div>
              </div>

              {!showMallang ? (
                <div className="flex items-center justify-end gap-x-2">
                  <Button intent="primary" size="small" onClick={handleGetEncouragement} disabled={loading}>
                    <img
                      src="/images/mallang/mallangFace.png"
                      alt="말랑이"
                      width={31}
                      height={31}
                      className="inline-block"
                    />
                    말랑이의 응원 받기
                  </Button>
                </div>
              ) : (
                <section className="flex flex-col items-center">
                  <img src="/images/mallang/mallang.png" alt="말랑이" width={140} height={140} />
                  <div className="mt-2 min-h-[140px] w-full rounded-[10px] bg-[#ECE3DC] p-4 text-center">
                    {loading ? (
                      <p className="text-lg text-[#3E3232]">말랑이가 생각 중...</p>
                    ) : (
                      <p className="whitespace-pre-line text-[#3E3232]">{reply}</p>
                    )}
                  </div>
                </section>
              )}
            </section>
          </>
        ) : (
          <p>일기를 불러오는 중...</p>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default DiaryView;
