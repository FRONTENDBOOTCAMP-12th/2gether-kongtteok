import { useState } from 'react';
import { useNavigate } from 'react-router';
import CommonLayout from '@/components/layout/CommonLayout';
import ThemeSetters from '@/components/ThemeSetters';
import Modal from '@/components/Modal';
import { useDarkmodeStore } from '@/stores/darkmode';
import supabase from '@/lib/supabase-client';

function Settings() {
  const navigate = useNavigate();
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'settings' | 'notice' | 'terms' | 'privacy'>('settings');
  const { darkmode } = useDarkmodeStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (currentView !== 'settings') {
    return (
      <CommonLayout headerProps={{ title: '설정', isLeftIcon: true }}>
        <div className="text-brown-700 flex h-screen flex-col items-center justify-center text-center text-lg">
          <p>
            멋사 프론트엔드 12기 여러분!
            <br />
            말랑이🐰와 콩떡이들🍡이 늘 응원해요
            <br />
            항상 행복한 하루 보내시길 바라요🍀
          </p>
          <button
            className="bg-secondary text-primary mt-6 rounded px-4 py-2"
            onClick={() => setCurrentView('settings')}>
            돌아가기
          </button>
        </div>
      </CommonLayout>
    );
  }

  return (
    <CommonLayout headerProps={{ title: '설정', isLeftIcon: true }} data-theme={darkmode ? 'dark' : 'light'}>
      <ul>
        <div className="pb-6">
          <li className="border-beige-200 border-b">
            <button className="w-full cursor-pointer py-4 text-left" onClick={() => navigate('/profile/edit')}>
              프로필 편집
            </button>
          </li>
          <li className="border-beige-200 border-b">
            <button className="w-full cursor-pointer py-4 text-left" onClick={() => setIsActivityModalOpen(true)}>
              내 활동
            </button>
          </li>
          <li className="border-beige-200 flex items-center justify-between border-b py-4">
            <span className="text-brown-700">다크모드</span>
            <ThemeSetters />
          </li>
        </div>
        <div className="py-6">
          <li className="border-beige-200 border-b">
            <button className="w-full cursor-pointer py-4 text-left" onClick={() => setCurrentView('notice')}>
              공지사항
            </button>
          </li>
          <li className="border-beige-200 border-b">
            <button className="w-full cursor-pointer py-4 text-left" onClick={() => setCurrentView('terms')}>
              이용정책
            </button>
          </li>
          <li className="border-beige-200 border-b">
            <button className="w-full cursor-pointer py-4 text-left" onClick={() => setCurrentView('privacy')}>
              개인정보처리방침
            </button>
          </li>
        </div>
        <div className="pt-6">
          <li className="border-beige-200 border-b">
            <button className="w-full cursor-pointer py-4 text-left" onClick={handleLogout}>
              로그아웃
            </button>
          </li>
          <li>
            <button className="w-full cursor-pointer py-4 text-left" onClick={() => setIsDeleteModalOpen(true)}>
              회원탈퇴
            </button>
          </li>
        </div>
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
          description="이제 우리랑 안 놀 거예요? 😢"
          primaryBtnText="말랑이"
          cancelBtn="콩떡이"
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </CommonLayout>
  );
}

export default Settings;
