import { useEffect, useState } from 'react';
import { useNavigate, To } from 'react-router';
import { useAuthStore } from '@/stores/auth';
import { useDiaryStore } from '@/stores/diary';
import { HomeSolid, PencilSolid, Search, UserSolid } from '@mynaui/icons-react';
import Modal from '@/components/Modal';

function Footer() {
  const navigate = useNavigate();
  const userId = useAuthStore((s) => s.user);
  const hasTodayPost = useDiaryStore((s) => s.hasTodayPost);
  const checkTodayPost = useDiaryStore((s) => s.checkTodayPost);
  const [showModal, setShowModal] = useState(false);
  const [showModalTodayWrite, setShowModalTodayWrite] = useState(false);

  interface ButtonType {
    title: string;
    icon: React.ReactNode;
    label: string;
    path: To;
  }

  const buttons: ButtonType[] = [
    { title: 'home', icon: <HomeSolid className="fill-background size-7" />, label: '홈 페이지로 가기', path: '/' },
    {
      title: 'search',
      icon: <Search className="text-background size-7" />,
      label: '검색 페이지로 가기',
      path: 'search',
    },
    {
      title: 'diary',
      icon: <PencilSolid className="fill-background size-7" />,
      label: '일기쓰기 페이지로 가기',
      path: '/diary/write',
    },
    {
      title: 'profile',
      icon: <UserSolid className="fill-background size-7" />,
      label: '프로필 페이지로 가기',
      path: '/profile',
    },
  ];

  const handleNavigation = (path: To) => {
    if (path === 'search') {
      return setShowModal(true);
    }

    if ((path as string).includes('write') && hasTodayPost) {
      return setShowModalTodayWrite(true);
    }

    navigate(path);
  };

  useEffect(() => {
    if (userId) {
      checkTodayPost(userId);
    }
  }, [userId, checkTodayPost]);

  return (
    <>
      <footer className="bg-primary fixed bottom-0 z-50 w-full max-w-[27.5rem] py-2.5">
        <nav className="flex items-center justify-around">
          <h1 className="sr-only text-white">바텀 네비게이션</h1>
          {buttons.map(({ title, icon, label, path }) => (
            <button
              key={title}
              type="button"
              className="flex size-10 cursor-pointer items-center justify-center"
              title={title}
              aria-label={label}
              onClick={() => handleNavigation(path)}>
              {icon}
            </button>
          ))}
        </nav>
      </footer>
      {showModal && <Modal title="둘러보기" description="준비중입니다." onClose={() => setShowModal(false)} />}
      {showModalTodayWrite && (
        <Modal
          title="오늘은 일기를 썼어요."
          description="일기는 하루에 하나만 쓸 수 있어요. 🍡"
          onClose={() => setShowModalTodayWrite(false)}
        />
      )}
    </>
  );
}

export default Footer;
