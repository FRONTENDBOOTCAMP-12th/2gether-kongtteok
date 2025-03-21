import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/stores/auth';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import ThemeSetters from '@/components/ThemeSetters';
import CommonLayout from '@/components/layout/CommonLayout';
import EmotionImage from '@/components/EmotionImage';

function Settings() {
  const navigate = useNavigate();
  const userId = useAuthStore((s) => s.user)!;
  const signOut = useAuthStore((s) => s.signOut);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'settings' | 'notice' | 'terms' | 'privacy'>('settings');

  const handleLogout = () => {
    signOut();
    navigate('/signin');
  };

  const onDeleteUser = () => {
    console.log(userId);
  };

  if (currentView !== 'settings') {
    return (
      <CommonLayout headerProps={{ title: '설정', isLeftIcon: true }}>
        <div className="text-brown-700 dark:text-background flex h-screen flex-col items-center justify-center text-center text-lg">
          <p className="mb-6">
            멋사 프론트엔드 12기 여러분!
            <br />
            말랑이🐰와 콩떡이들🍡이 늘 응원해요
            <br />
            항상 행복한 하루 보내시길 바라요🍀
          </p>
          <Button intent="secondary" inlineSize="fit" onClick={() => setCurrentView('settings')}>
            돌아가기
          </Button>
        </div>
      </CommonLayout>
    );
  }

  return (
    <CommonLayout headerProps={{ title: '설정', isLeftIcon: true }}>
      <ul className="text-primary dark:text-background">
        <li className="border-beige-200 dark:border-beige-800 border-b">
          <button className="w-full cursor-pointer py-4 text-left" onClick={() => navigate('/profile/edit')}>
            프로필 편집
          </button>
        </li>
        <li className="border-beige-200 dark:border-beige-800 border-b">
          <button className="w-full cursor-pointer py-4 text-left" onClick={() => setIsActivityModalOpen(true)}>
            내 활동
          </button>
        </li>
        <li className="border-beige-200 dark:border-beige-800 mb-6 flex items-center justify-between border-b py-4">
          <span className="text-brown-700">다크모드</span>
          <ThemeSetters />
        </li>
        <li className="border-beige-200 dark:border-beige-800 border-b">
          <button className="w-full cursor-pointer py-4 text-left" onClick={() => setCurrentView('notice')}>
            공지사항
          </button>
        </li>
        <li className="border-beige-200 dark:border-beige-800 border-b">
          <button className="w-full cursor-pointer py-4 text-left" onClick={() => setCurrentView('terms')}>
            이용정책
          </button>
        </li>
        <li className="border-beige-200 dark:border-beige-800 mb-6 border-b">
          <button className="w-full cursor-pointer py-4 text-left" onClick={() => setCurrentView('privacy')}>
            개인정보처리방침
          </button>
        </li>
        <li className="border-beige-200 dark:border-beige-800 border-b">
          <button className="w-full cursor-pointer py-4 text-left" onClick={handleLogout}>
            로그아웃
          </button>
        </li>
        <li>
          <button className="w-full cursor-pointer py-4 text-left" onClick={() => setIsDeleteModalOpen(true)}>
            회원탈퇴
          </button>
        </li>
      </ul>

      {isActivityModalOpen && (
        <Modal
          title="알림"
          description="준비중이에요!"
          primaryBtnText="확인"
          onClose={() => setIsActivityModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <Modal
          title="정말 떠나시나요..?"
          description={`이제 우리랑 안 놀 거예요? 😢
            모든 추억이 삭제되어요`}
          cancelBtn="취소"
          onConfirm={onDeleteUser}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}

      <div className="text-primary absolute inset-0 z-60 flex flex-col items-center justify-center text-center" hidden>
        <EmotionImage emotion="sad" className="w-12 animate-bounce" />
        말랑이를 하나씩 지우고 있어요.
        <br />
        잠시만 기다려주세요.
      </div>
    </CommonLayout>
  );
}

export default Settings;
