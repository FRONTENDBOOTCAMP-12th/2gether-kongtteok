import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/Button';
import Switch from '@/components/Switch';
import DiaryHeader from '@/components/DiaryHeader';
import Textarea from '@/components/Textarea';
import { Swiper, SwiperSlide } from 'swiper/react';
import { type EmotionProps } from '@/components/EmotionImage';
import { Heart } from '@mynaui/icons-react';
import 'swiper/css';

interface DiaryViewProps extends Pick<EmotionProps, 'emotion'> {
  date?: string;
  title?: string;
  content?: string;
  weather?: 'sunny' | 'cloudy' | 'windy' | 'rainy' | 'snowy';
  isPrivate?: boolean;
  likes?: number;
  images?: string[];
}

function DiaryView({ diary }: { diary?: DiaryViewProps }) {
  const {
    date = '2025.03.11',
    title = '제목',
    content = '내용내용내용내용내용내용',
    weather = 'sunny',
    emotion = 'fine',
    isPrivate = false,
    likes = 0,
    images = ['/images/emotion/angry.png', '/images/emotion/tired.png'],
  } = diary || {};

  return (
    <div id="wrap" className="max-w-kong m-auto pb-15">
      <Header title="내 일기 보기" isLeftIcon isRightIcon />

      <main className="flex flex-col items-center gap-y-3 px-4">
        {/* 상단 옵션 영역 (혼자보기, 수정, 삭제) */}
        <div className="mt-2 flex w-full flex-row items-center justify-between">
          <Switch
            label="혼자보기"
            checked={isPrivate}
            onChange={(e) => console.log('혼자보기 스위치 변경:', e.target.checked)}
          />
          <div className="flex gap-[8px] text-[12px] text-[#3E3232]">
            <button onClick={() => console.log('일기쓰기 페이지로 이동 예정')} className="cursor-pointer">
              수정
            </button>
            <button onClick={() => console.log('삭제 확인 창 띄울 예정')} className="cursor-pointer">
              삭제
            </button>
          </div>
        </div>

        <DiaryHeader date={date} weather={weather} emotion={emotion} title={title} />

        {/* 이미지 영역 (이미지가 있을 때만 렌더링) */}
        {images.length > 0 && (
          <div className="relative flex h-[200px] w-[408px] items-center justify-center overflow-hidden bg-[#D0B8A8]">
            <Swiper spaceBetween={10} slidesPerView={1} className="h-full w-full">
              {images.map((img, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <img
                    src={img}
                    alt={`일기 이미지 ${index + 1}`}
                    className="absolute inset-0 m-auto max-h-full max-w-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className="flex w-full flex-col gap-y-3">
          <div className="relative">
            <Textarea label="일기 내용" value={content} labelHidden disabled />
            <div className="absolute right-3 bottom-3 flex items-center gap-1 text-sm text-[#F3A79E]">
              <Heart className="h-4 w-4 fill-[#F3A79E]" />
              <span>{likes}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-2">
            <Button intent="primary" size="small" className="flex w-full items-center justify-center gap-2">
              <img src="/images/mallang/mallangFace.png" alt="말랑이" width={31} height={31} className="inline-block" />
              말랑이의 응원 받기
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DiaryView;
