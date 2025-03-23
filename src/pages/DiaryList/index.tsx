import { useCallback, useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarSolid } from '@mynaui/icons-react';
import CalendarHeader from '@/components/Calendar/CalendarHeader';
import DiaryPreview, { type DiaryPreviewProps } from '@/components/DiaryPreview';
import { EMOTION, EmotionType } from '@/components/EmotionImage';
import CommonLayout from '@/components/layout/CommonLayout';
import ToggleButton from '@/components/ToggleButton';
import emotionList from '@/utils/emotion';
import supabase, { DATABASE_NAME, DiaryItem } from '@/lib/supabase-client';
import { GetUser } from '@/api/get-user';
import { Link } from 'react-router';

interface User {
  id: string;
}

interface DiaryListProps {
  initialSelectedMonth?: string;
  onMonthChange?: (month: string) => void;
  handleCalendarViewClick?: () => void;
}

interface DiaryItemWithId extends DiaryItem {
  id: number;
}

interface EnhancedDiaryPreviewProps extends DiaryPreviewProps {
  id: number;
  emotion: EmotionType;
}

interface Like {
  post_id: number;
}

function DiaryList({
  initialSelectedMonth = format(new Date(), 'yyyy-MM'),
  onMonthChange,
  handleCalendarViewClick,
}: DiaryListProps) {
  const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [diaries, setDiaries] = useState<EnhancedDiaryPreviewProps[]>([]);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleEmotionToggle = useCallback((emotion: EmotionType | null) => {
    setSelectedEmotion((prevEmotion) => (prevEmotion === emotion ? null : emotion));
  }, []);

  const handleMonthChange = useCallback(
    (newMonth: string) => {
      setSelectedMonth(newMonth);
      onMonthChange?.(newMonth);
    },
    [onMonthChange]
  );

  const fetchLikes = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('likes').select('post_id');
      if (error) throw error;

      if (data && Array.isArray(data)) {
        const likesMap = (data as Like[]).reduce<Record<number, number>>((acc, like) => {
          acc[like.post_id] = (acc[like.post_id] || 0) + 1;
          return acc;
        }, {});

        setLikes(likesMap);
      }
    } catch (error) {
      console.error('좋아요 데이터를 가져오지 못했습니다.', error);
    }
  }, []);

  const processedDiaryData = useCallback((data: DiaryItemWithId[]) => {
    return data.map((diary: DiaryItemWithId) => {
      const validEmotions = ['exciting', 'happy', 'proud', 'fine', 'angry', 'tired', 'sad', 'depressed'];
      const emotion = validEmotions.includes(diary.emotion) ? diary.emotion : 'fine';

      let diaryImage: string | string[] | null = null;
      if (Array.isArray(diary.diaryImage)) {
        diaryImage = diary.diaryImage.map((item) => (typeof item === 'string' ? item : JSON.stringify(item)));
      } else if (typeof diary.diaryImage === 'string') {
        diaryImage = diary.diaryImage;
      }

      return {
        id: diary.id,
        emotion: emotion as EmotionType,
        date: diary.date,
        isPrivate: diary.isPrivate || false,
        content: diary.content || '',
        diaryImage,
        likes: 0,
        title: diary.title || '',
      } as EnhancedDiaryPreviewProps;
    });
  }, []);

  const fetchDiaries = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userData = (await GetUser()) as User | null;

      if (!userData) {
        setError('로그인이 필요합니다');
        setIsLoading(false);
        return;
      }

      const [year, month] = selectedMonth.split('-');
      const nextMonth = month === '12' ? '01' : String(parseInt(month) + 1).padStart(2, '0');
      const nextYear = month === '12' ? String(parseInt(year) + 1) : year;
      const startDate = `${year}-${month}-01`;
      const endDate = `${nextYear}-${nextMonth}-01`;

      const { data, error: fetchError } = await supabase
        .from(DATABASE_NAME)
        .select('*')
        .eq('user_id', userData.id)
        .gte('date', startDate)
        .lt('date', endDate)
        .order('date', { ascending: false });

      if (fetchError) throw fetchError;

      if (data) {
        const processedDiaries = processedDiaryData(data as DiaryItemWithId[]);
        setDiaries(processedDiaries);
      }
    } catch (err) {
      console.error('Failed to fetch diaries:', err);
      setError('일기를 불러오는 데 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth, processedDiaryData]);

  useEffect(() => {
    fetchDiaries();
  }, [fetchDiaries]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const filteredDiaries = useMemo(() => {
    if (!selectedEmotion) return diaries;
    return diaries.filter((diary) => diary.emotion === selectedEmotion);
  }, [diaries, selectedEmotion]);

  const DiaryListContent = useMemo(() => {
    if (isLoading) return <div className="py-8 text-center text-gray-500">로딩 중...</div>;
    if (error) return <div className="py-8 text-center text-red-500">{error}</div>;
    if (filteredDiaries.length === 0)
      return <div className="py-8 text-center text-gray-500">작성된 일기가 없습니다.</div>;

    return (
      <>
        {filteredDiaries.map((diary) => (
          <Link key={diary.id} to={`/diary/view/${diary.id}`}>
            <DiaryPreview
              emotion={diary.emotion}
              date={diary.date}
              isPrivate={diary.isPrivate}
              content={diary.content}
              diaryImage={diary.diaryImage}
              title={diary.title}
              likes={likes[diary.id] ?? 0}
            />
          </Link>
        ))}
      </>
    );
  }, [filteredDiaries, isLoading, error, likes]);

  const EmotionFilterButtons = useMemo(
    () => (
      <div className="flex flex-nowrap gap-2 overflow-x-auto">
        <ToggleButton
          type="checkbox"
          label="전체"
          isActive={selectedEmotion === null}
          onClick={() => handleEmotionToggle(null)}
          className="min-w-fit whitespace-nowrap"
        />

        {emotionList.map((emotion) => (
          <ToggleButton
            key={emotion}
            type="checkbox"
            label={EMOTION[emotion]}
            isActive={selectedEmotion === emotion}
            onClick={() => handleEmotionToggle(emotion)}
            className="min-w-fit whitespace-nowrap"
          />
        ))}
      </div>
    ),
    [selectedEmotion, handleEmotionToggle]
  );

  return (
    <CommonLayout
      headerProps={{
        title: '일기 리스트',
        isLeftIcon: true,
        isRightIcon: true,
      }}
      showFooter={true}>
      <div className="flex flex-col gap-3">
        <CalendarHeader
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
          viewIcon={<CalendarSolid className="fill-primary h-4 w-4" />}
          viewText="캘린더보기"
          linkTo="/"
          onViewClick={handleCalendarViewClick}
        />

        {EmotionFilterButtons}

        <section className="flex flex-col gap-4">{DiaryListContent}</section>
      </div>
    </CommonLayout>
  );
}

export default DiaryList;
