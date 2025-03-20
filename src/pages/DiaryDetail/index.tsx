import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import CommonLayout from '@/components/layout/CommonLayout';
import DiaryHeader from '@/components/DiaryHeader';
import Button from '@/components/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Heart } from '@mynaui/icons-react';
import supabase from '@/lib/supabase-client';
import { WeatherType } from '@/components/WeatherImage';
import { EmotionType } from '@/components/EmotionImage';

interface DiaryType {
  id: number;
  user_id: string;
  nickname: string;
  profileImage: string;
  date: string;
  weather: WeatherType;
  emotion: EmotionType;
  title: string;
  diaryImage: string[];
  content: string;
  isPrivate: boolean;
  created_at: string;
}

function DiaryDetail() {
  const { diaryId } = useParams<{ diaryId: string }>();
  const diaryIdNum = diaryId ? Number(diaryId) : null;
  const navigate = useNavigate();
  const [diary, setDiary] = useState<DiaryType | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!diaryIdNum) return;

    const fetchDiary = async () => {
      const { data: diaryData, error: diaryError } = await supabase
        .from('diary')
        .select('id, user_id, title, content, date, weather, emotion, isPrivate, created_at, diaryImage')
        .eq('id', diaryIdNum)
        .single();

      if (diaryError) {
        console.error('Error fetching diary:', diaryError);
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('nickname, profileImage')
        .eq('id', diaryData.user_id)
        .single();

      if (userError) {
        console.error('Error fetching user:', userError);
      }

      setDiary({
        ...diaryData,
        nickname: userData?.nickname ?? '익명',
        profileImage: userData?.profileImage ?? '/default-profile.png',
        diaryImage: Array.isArray(diaryData.diaryImage) ? diaryData.diaryImage.map(String) : [],
        weather: diaryData.weather as WeatherType,
        emotion: diaryData.emotion as EmotionType,
      });
    };

    const fetchLikes = async () => {
      const { count, error } = await supabase.from('likes').select('id', { count: 'exact' }).eq('post_id', diaryIdNum);
      if (error) console.error('Error fetching likes:', error);
      else setLikeCount(count ?? 0);
    };

    fetchDiary();
    fetchLikes();
  }, [diaryIdNum]);

  const handleLikeClick = async () => {
    if (!diary) return;

    if (liked) {
      await supabase.from('likes').delete().match({ post_id: diary.id, user_id: diary.user_id });
      setLikeCount((prev) => prev - 1);
    } else {
      await supabase.from('likes').insert([{ post_id: diary.id, user_id: diary.user_id }]);
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  if (!diary) return <p>Loading...</p>;

  return (
    <CommonLayout headerProps={{ title: '일기장', isLeftIcon: true, isRightIcon: true }} showFooter={true}>
      <section
        className="flex cursor-pointer items-center gap-3"
        onClick={() => navigate(`/user/${diary.user_id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            navigate(`/user/${diary.user_id}`);
          }
        }}>
        <img src={diary.profileImage} alt="프로필 이미지" className="h-10 w-10 rounded-full" />
        <span className="text-lg font-medium">{diary.nickname}</span>
      </section>

      <DiaryHeader date={diary.date} weather={diary.weather} emotion={diary.emotion} title={diary.title} />

      {diary.diaryImage.length > 0 ? (
        <section className="relative w-full overflow-hidden">
          <Swiper spaceBetween={10} slidesPerView={1} className="h-auto w-full">
            {diary.diaryImage.map((img, index) => (
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
      ) : (
        <div className="h-0" />
      )}

      <section className="mt-4 rounded-lg border p-3">
        <p className="text-sm text-gray-700">{diary.content}</p>
      </section>

      <div className="mt-4 flex gap-2">
        <button className="relative flex items-center gap-1 text-sm text-[#F3A79E]" onClick={handleLikeClick}>
          <Heart className={`h-5 w-5 transition-all ${liked ? 'scale-110 fill-[#F3A79E]' : 'stroke-[#F3A79E]'}`} />
          <span>{likeCount}</span>
        </button>
        <Button intent="outlinePink" size="small">
          응원 쪽지 보내기
        </Button>
      </div>
    </CommonLayout>
  );
}

export default DiaryDetail;
