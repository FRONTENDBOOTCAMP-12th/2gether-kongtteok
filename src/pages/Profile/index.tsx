import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase-client';
import CommonLayout from '@/components/layout/CommonLayout';
import ProfileInfo from '@/components/ProfileInfo';
import Tab from '@/components/Tab';
import DiaryPreview from '@/components/DiaryPreview';
import { DiaryItem } from '@/lib/supabase-client';
import { EmotionType } from '@/components/EmotionImage';

interface Profile {
  id: string;
  profileImage: string;
  nickname: string;
  intro: string;
  interests: string[];
}

function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [diaries, setDiaries] = useState<
    Pick<DiaryItem, 'id' | 'date' | 'title' | 'emotion' | 'isPrivate' | 'diaryImage'>[]
  >([]);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'일기장' | '쪽지함'>('일기장');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, profileImage, nickname, intro, interests')
          .single();
        if (error) throw error;
        setProfile(data as Profile);
      } catch (error) {
        console.error('프로필 정보를 가져오지 못했습니다.', error);
      }
    };

    const fetchDiaries = async () => {
      try {
        const { data, error } = await supabase
          .from('diary')
          .select('id, date, title, emotion, isPrivate, diaryImage')
          .order('date', { ascending: false });
        if (error) throw error;
        setDiaries(
          data.map((diary) => ({
            ...diary,
            emotion: diary.emotion as EmotionType,
          }))
        );
      } catch (error) {
        console.error('일기 데이터를 가져오지 못했습니다.', error);
      }
    };

    const fetchLikes = async () => {
      try {
        const { data, error } = await supabase.from('likes').select('post_id').eq('post_id', 1); // 개별 조회로 변경
        if (error) throw error;

        const likesMap: Record<number, number> = {};
        data?.forEach((like: { post_id: number }) => {
          likesMap[like.post_id] = (likesMap[like.post_id] || 0) + 1;
        });
        setLikes(likesMap);
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
        onTabChange={setActiveTab}
        tabs={[
          { title: '일기장', value: '일기장' },
          { title: '쪽지함', value: '쪽지함' },
        ]}
      />

      <section className="flex flex-col items-center gap-4 py-4">
        {activeTab === '일기장' ? (
          loading ? (
            <p className="text-primary text-sm opacity-50">데이터를 불러오는 중...</p>
          ) : diaries.length > 0 ? (
            diaries.map((diary) => (
              <button key={diary.id} onClick={() => (window.location.href = `/diary/view/${diary.id}`)}>
                <DiaryPreview {...diary} likes={likes[diary.id] ?? 0} />
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
