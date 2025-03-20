import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase-client';
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
  diaryImage: string | string[] | null;
}

interface Like {
  post_id: number;
}

interface UserInterest {
  interest_id: string;
  interests: { name: string } | null;
}

function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'일기장' | '쪽지함'>('일기장');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select(`id, profileImage, nickname, intro, user_interests (interest_id, interests (name))`)
          .single();

        if (error) throw error;

        const interestsArray: string[] = Array.isArray(data?.user_interests)
          ? (data.user_interests as unknown as UserInterest[])
              .filter((interest) => interest.interests !== null && typeof interest.interests.name === 'string')
              .map((interest) => interest.interests!.name)
          : [];

        setProfile({
          id: data.id,
          profileImage: data.profileImage ?? '/images/default/profile.webp',
          nickname: data.nickname ?? '익명',
          intro: data.intro ?? '',
          interests: interestsArray,
        });
      } catch (error) {
        console.error('프로필 정보를 가져오지 못했습니다.', error);
      }
    };

    const fetchDiaries = async () => {
      try {
        const { data, error } = await supabase
          .from('diary')
          .select('id, date, title, content, emotion, isPrivate, diaryImage');

        if (error) throw error;

        if (data && Array.isArray(data)) {
          setDiaries(
            data.map((diary) => ({
              id: diary.id,
              date: diary.date,
              title: diary.title,
              content: diary.content,
              isPrivate: diary.isPrivate,
              emotion: (['exciting', 'happy', 'proud', 'fine', 'angry', 'tired', 'sad', 'depressed'].includes(
                diary.emotion
              )
                ? diary.emotion
                : 'fine') as EmotionType,
              diaryImage: Array.isArray(diary.diaryImage)
                ? (diary.diaryImage as string[])
                : typeof diary.diaryImage === 'string'
                  ? diary.diaryImage
                  : null,
            }))
          );
        }
      } catch (error) {
        console.error('일기 데이터를 가져오지 못했습니다.', error);
      }
    };

    const fetchLikes = async () => {
      try {
        const { data, error } = await supabase.from('likes').select('post_id');
        if (error) throw error;

        if (data && Array.isArray(data)) {
          const likesMap: Record<number, number> = {};
          (data as Like[]).forEach((like) => {
            likesMap[like.post_id] = (likesMap[like.post_id] || 0) + 1;
          });
          setLikes(likesMap);
        }
      } catch (error) {
        console.error('좋아요 데이터를 가져오지 못했습니다.', error);
      }
    };

    fetchProfile();
    fetchDiaries();
    fetchLikes();
    setLoading(false);
  }, []);

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
