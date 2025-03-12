import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import ProfileInfo from '@/components/ProfileInfo';
import Tab from '@/components/Tab';
import DiaryPreview, { DiaryPreviewProps } from '@/components/DiaryPreview';
import Footer from '@/components/layout/Footer';

function ProfilePage() {
  const profileData = {
    profileImage: '/logo.webp',
    nickname: '박윤경',
    intro: '내 총 어떤데~',
    interests: ['취미', '직장', '친구'],
  };

  const diaryData: DiaryPreviewProps[] = [
    {
      emotion: 'sad',
      date: '2025-03-06',
      isPrivate: true,
      diaryImage: '/images/emotion/sad.png',
      content:
        '친구가 타로를 봐줬는데 결과가 좋지 않아서 조금 슬펐어.. 프로젝트가 어떻게 될지 궁금해서 월간 운세를 봤는데 걱정이 된다ㅜㅜ 그래도 열심히 하고 있으니까 잘 해낼 수 있겠지? 조원분들도 힘내주시고 계시니까.. 타로 그거 뭐 다 미신이지!',
      likes: 3,
    },
    {
      emotion: 'happy',
      date: '2025-03-07',
      isPrivate: false,
      content: '프로젝트 조원들이랑 동기들을 만나서 행복했어!',
      likes: 12,
    },
  ];

  const [profile, setProfile] = useState(profileData);
  const [diaries, setDiaries] = useState<DiaryPreviewProps[]>(diaryData);

  useEffect(() => {
    // fetch("/api/profile")
    //   .then((res) => res.json())
    //   .then((data) => setProfile(data))
    //   .catch((error) => console.error("프로필 정보를 가져오지 못했습니다.", error));
    // fetch("/api/diaries")
    //   .then((res) => res.json())
    //   .then((data) => setDiaries(data))
    //   .catch((error) => console.error("일기 데이터를 가져오지 못했습니다.", error));
  }, []);

  return (
    <section className="bg-background flex min-h-dvh flex-col items-center p-4">
      <div className="flex w-full items-center justify-center">
        <Header title="프로필" isLeftIcon={true} isRightIcon={true} />
      </div>

      <div className="flex w-full items-center justify-center">
        <ProfileInfo {...profile} />
      </div>

      <Tab />

      <section className="flex flex-col items-center gap-4 py-4">
        {diaries.length > 0 ? (
          diaries.map((diary) => <DiaryPreview key={diary.date} {...diary} />)
        ) : (
          <p className="text-gray-500">아직 작성한 일기가 없어요요.</p>
        )}
      </section>

      <Footer />
    </section>
  );
}

export default ProfilePage;
