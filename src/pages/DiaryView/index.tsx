import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Heart } from '@mynaui/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDiaryStore } from '@/stores/diary';
import { getGPTResponse } from '@/utils/openai';
import EmotionImage, { type EmotionType } from '@/components/EmotionImage';
import { type WeatherType } from '@/components/WeatherImage';
import supabase, { DATABASE_NAME } from '@/lib/supabase-client';
import CommonLayout from '@/components/layout/CommonLayout';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import DiaryHeader from '@/components/DiaryHeader';
import 'swiper/css';
import { getDate } from '@/utils/get-date';
import Loading from '@/components/Loading';

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

interface ActionButtonsProps {
  handleDelete?: () => void;
  handleModify?: () => void;
}

function DiaryView() {
  const navigate = useNavigate();

  const { diaryId } = useParams<{ diaryId: string }>();
  const diaryIdNum = diaryId ? parseInt(diaryId, 10) : 0;
  const deleteTodayPost = useDiaryStore((s) => s.deleteTodayPost);

  const [diary, setDiary] = useState<DiaryViewProps | null>(null);
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMallang, setShowMallang] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, isDeleted: false });
  const [modifyModal, setModifyModal] = useState(false);

  useEffect(() => {
    if (!diaryIdNum) return;

    const fetchDiary = async () => {
      try {
        const { data, error } = await supabase.from(DATABASE_NAME).select('*').eq('id', diaryIdNum).single();

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

  const showDeleteModal = () => {
    setDeleteModal({ ...deleteModal, show: true });
  };

  const onDeletePost = async () => {
    const { error } = await supabase.from(DATABASE_NAME).delete().eq('id', diaryIdNum);

    if (error) {
      console.error(error);
      return;
    }

    setDeleteModal({ show: false, isDeleted: true });

    if (diary?.date === getDate()) {
      deleteTodayPost();
    }
  };

  const onCompleteDelete = () => {
    setDeleteModal({ ...deleteModal, isDeleted: false });
    navigate('/diarylist');
  };

  if (!diary)
    return (
      <Loading text="일기를 불러오는 중...">
        <EmotionImage className="w-9 animate-bounce" />
      </Loading>
    );

  return (
    <CommonLayout
      headerProps={{
        title: '내 일기 보기',
        isLeftIcon: true,
        isRightIcon: true,
      }}
      showFooter={true}>
      <ActionButtons
        handleDelete={showDeleteModal}
        handleModify={() => {
          setModifyModal(true);
        }}
      />
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
      {modifyModal && (
        <Modal
          title="일기 수정"
          description="조금만 기다려 주세요. 🥺"
          onClose={() => {
            setModifyModal(false);
          }}
        />
      )}
      {deleteModal.show && (
        <Modal
          title="삭제"
          description="일기를 삭제할까요?"
          cancelBtn="취소"
          onConfirm={onDeletePost}
          onClose={() => {
            setDeleteModal({ ...deleteModal, show: false });
          }}
        />
      )}
      {deleteModal.isDeleted && <Modal title="삭제 완료" description="일기를 지웠어요" onClose={onCompleteDelete} />}
    </CommonLayout>
  );
}

const ActionButtons = ({ handleDelete, handleModify }: ActionButtonsProps) => (
  <div className="text-primary mb-2 flex w-full flex-row items-center justify-end gap-2 text-sm">
    <button type="button" onClick={handleModify} className="cursor-pointer">
      수정
    </button>
    <button type="button" onClick={handleDelete} className="cursor-pointer">
      삭제
    </button>
  </div>
);

const DiaryImages = ({ images }: { images: string[] }) => {
  if (images.length === 0) return null;

  return (
    <section className="border-primary relative mt-3 flex h-52 w-full items-center justify-center overflow-hidden rounded-[10px] border bg-white py-2">
      <Swiper spaceBetween={10} slidesPerView={1} className="h-full w-full">
        {images.map((img, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <img src={img} alt={`일기 이미지 ${index + 1}`} className="m-auto max-h-full object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

const DiaryContent = ({ diary }: { diary: DiaryViewProps }) => (
  <div className="border-primary relative mt-3 rounded-[10px] border bg-white p-3 pt-3 pb-6 text-xs leading-[165%]">
    {diary.content}
    {/* <Textarea label="일기 내용" defaultValue={diary.content} className="cursor-auto!" labelHidden disabled /> */}
    <div className="absolute right-3 bottom-2 flex items-center gap-1 text-sm">
      <Heart className="fill-likes text-likes h-4 w-4" />
      <span className="sr-only">공감 수</span>
      <span className="text-primary">{diary.likes}</span>
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
  <>
    {!showMallang ? (
      <div className="mt-3 flex items-center justify-end gap-x-2">
        {!hasFeedback && (
          <Button intent="primary" size="small" onClick={handleGetEncouragement} disabled={loading}>
            <img src="/images/mallang/mallangFace.png" alt="말랑이" width={31} height={31} className="inline-block" />
            말랑이의 응원 받기
          </Button>
        )}
      </div>
    ) : (
      <div className="relative mt-3 flex flex-col-reverse items-center">
        <div className="bg-beige-200 z-20 -mt-11.5 flex w-full items-center justify-center rounded-[10px] p-4 text-center">
          {loading ? (
            <p className="text-primary text-lg">말랑이가 생각 중...</p>
          ) : (
            <p className="text-primary leading-8.5">{reply}</p>
          )}
        </div>
        <img
          src="/images/mallang/mallang.png"
          alt="말랑이"
          width={140}
          height={140}
          className="relative z-10"
          aria-hidden
        />
      </div>
    )}
  </>
);

export default DiaryView;
