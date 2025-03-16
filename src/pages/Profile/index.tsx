import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import supabase from '@/lib/supabase-client';
import Header from '@/components/layout/Header';
import ProfileInfo from '@/components/ProfileInfo';
import Tab from '@/components/Tab';
import DiaryPreview from '@/components/DiaryPreview';
import Footer from '@/components/layout/Footer';
import { DiaryItem } from '@/lib/supabase-client';

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
    Pick<DiaryItem, 'id' | 'date' | 'title' | 'emotion' | 'isPrivate' | 'likes' | 'diaryImage'>[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
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
          .select('id, date, title, emotion, isPrivate, likes, diaryImage')
          .order('date', { ascending: false });
        if (error) throw error;
        setDiaries(data);
      } catch (error) {
        console.error('일기 데이터를 가져오지 못했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchDiaries();
  }, []);

  return (
    <section className="bg-background flex min-h-dvh flex-col items-center p-4">
      <div className="flex w-full items-center justify-center">
        <Header title="프로필" isLeftIcon isRightIcon />
      </div>

      <div className="flex w-full items-center justify-center">
        {profile ? <ProfileInfo {...profile} /> : <p className="text-primary text-sm">로딩 중...</p>}
      </div>

      <Tab />

      <section className="flex flex-col items-center gap-4 py-4">
        {loading ? (
          <p className="text-primary text-sm opacity-50">데이터를 불러오는 중...</p>
        ) : diaries.length > 0 ? (
          diaries.map((diary) => (
            <Link to={`/diary/${diary.id}`} key={diary.id}>
              <DiaryPreview {...diary} />
            </Link>
          ))
        ) : (
          <p className="text-primary text-sm opacity-50">아직 작성한 일기가 없어요.</p>
        )}
      </section>

      <Footer />
    </section>
  );
}

export default ProfilePage;
