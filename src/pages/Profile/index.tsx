import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase-client';
import { useAuthStore } from '@/stores/auth';
import CommonLayout from '@/components/layout/CommonLayout';
import ProfileInfo from '@/components/ProfileInfo';
import Tab from '@/components/Tab';
import DiaryPreview from '@/components/DiaryPreview';
import { EmotionType } from '@/components/EmotionImage';

interface Profile {
  id: string;
  profileImage: string;
  nickname: string;
  intro: string;
  interests: string[];
}

interface Diary {
  id: number;
  date: string;
  title: string;
  content: string;
  isPrivate: boolean;
  emotion: EmotionType;
  diaryImage?: string;
}

interface Like {
  post_id: number;
}

interface UserInterest {
  interest_id: string;
  interests: { name: string } | null;
}

const EMOTIONS: EmotionType[] = ['exciting', 'happy', 'proud', 'fine', 'angry', 'tired', 'sad', 'depressed'];

function ProfilePage() {
  const userId = useAuthStore((s) => s.user);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'일기장' | '쪽지함'>('일기장');

  useEffect(() => {
    if (!userId) {
      console.error('유저 ID가 없습니다.');
      return;
    }

    const fetchData = async () => {
      try {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select(`id, profileImage, nickname, intro, user_interests (interest_id, interests (name))`)
          .eq('id', userId)
          .single();

        if (userError) throw userError;

        const interestsArray: string[] = Array.isArray(userData?.user_interests)
          ? (userData.user_interests as unknown as UserInterest[])
              .filter((interest) => interest.interests !== null && typeof interest.interests.name === 'string')
              .map((interest) => interest.interests!.name)
          : [];

        setProfile({
          id: userData.id,
          profileImage: userData.profileImage ?? '/images/default/profile.webp',
          nickname: userData.nickname ?? '익명',
          intro: userData.intro ?? '',
          interests: interestsArray,
        });

        const { data: diaryData, error: diaryError } = await supabase
          .from('diary')
          .select('id, date, title, content, emotion, isPrivate, diaryImage')
          .eq('user_id', userId)
          .order('date', { ascending: false });

        if (diaryError) throw diaryError;

        const parsedDiaries =
          (diaryData as Diary[]).map((diary) => ({
            id: diary.id,
            date: diary.date,
            title: diary.title,
            content: diary.content,
            isPrivate: diary.isPrivate,
            emotion: EMOTIONS.includes(diary.emotion) ? diary.emotion : 'fine',
            diaryImage: Array.isArray(diary.diaryImage)
              ? diary.diaryImage[0]
              : typeof diary.diaryImage === 'string'
                ? diary.diaryImage
                : undefined,
          })) ?? [];

        setDiaries(parsedDiaries);

        const { data: likeData, error: likeError } = await supabase.from('likes').select('post_id');
        if (likeError) throw likeError;

        const likesMap: Record<number, number> = {};
        (likeData ?? []).forEach((like: Like) => {
          likesMap[like.post_id] = (likesMap[like.post_id] || 0) + 1;
        });

        setLikes(likesMap);
      } catch (error) {
        console.error('데이터 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <CommonLayout headerProps={{ title: '프로필', isLeftIcon: true, isRightIcon: true }} showFooter={true}>
      <div className="flex w-full items-center justify-center">
        {profile ? <ProfileInfo {...profile} /> : <p className="text-primary text-sm">로딩 중...</p>}
      </div>

      <Tab
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as '일기장' | '쪽지함')}
        tabs={[
          { title: '일기장', value: '일기장' },
          { title: '쪽지함', value: '쪽지함' },
        ]}
      />

      <section className="flex w-full flex-col items-center gap-4 py-4">
        {activeTab === '일기장' ? (
          loading ? (
            <p className="text-primary text-sm opacity-50">데이터를 불러오는 중...</p>
          ) : diaries.length > 0 ? (
            diaries.map((diary) => (
              <button
                key={diary.id}
                onClick={() => (window.location.href = `/diary/view/${diary.id}`)}
                className="w-full">
                <DiaryPreview
                  date={diary.date}
                  isPrivate={diary.isPrivate}
                  diaryImage={diary.diaryImage}
                  title={diary.title}
                  content={diary.content}
                  likes={likes[diary.id] ?? 0}
                  emotion={diary.emotion}
                  showActions={true}
                />
              </button>
            ))
          ) : (
            <p className="text-primary text-sm opacity-50">아직 작성한 일기가 없어요.</p>
          )
        ) : (
          <p className="text-primary text-sm opacity-50">쪽지 기능 준비 중</p>
        )}
      </section>
    </CommonLayout>
  );
}

export default ProfilePage;
