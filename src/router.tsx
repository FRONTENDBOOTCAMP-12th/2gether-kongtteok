import { Route, Routes } from 'react-router';
import MainPage from '@/pages/Main';
import SignUp from '@/pages/SignUp';
import SignInPage from '@/pages/SignIn';
import ProfilePage from '@/pages/Profile';
import DiaryView from '@/pages/DiaryView';
import DiaryWrite from '@/pages/DiaryWrite';
import Settings from '@/pages/Settings';
import DiaryDetail from '@/pages/DiaryDetail';
import ProfileEdit from '@/pages/ProfileEdit';
import NotifyList from '@/pages/Notifi';
import Components from '@/components';

export const navList = [
  { path: '/', text: '홈', element: <MainPage /> },
  { path: 'signin', text: '로그인', element: <SignInPage /> },
  { path: 'signup', text: '회원가입', element: <SignUp /> },
  { path: 'profile', text: '프로필', element: <ProfilePage /> },
  { path: 'diary/write', text: '일기 쓰기', element: <DiaryWrite /> },
  { path: 'settings', text: '설정', element: <Settings /> },
  { path: 'diary/view/:diaryId', text: '내 일기 보기', element: <DiaryView /> },
  { path: 'diary/detail/:diaryId', text: '일기 상세 보기', element: <DiaryDetail /> },
  { path: 'profile/edit', text: '프로필 편집', element: <ProfileEdit /> },
  { path: 'notify', text: '알림', element: <NotifyList /> },
  { path: 'components', text: '컴포넌트 모음', element: <Components /> },
];

const Router = () => {
  return (
    <Routes>
      {navList.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default Router;
