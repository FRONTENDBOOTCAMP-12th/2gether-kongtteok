import { Route, Routes } from 'react-router';
import ProfilePage from '@/pages/Profile/Index';
import SignInPage from '@/pages/SignIn/Index';
import DiaryWrite from '@/pages/DiaryWrite/';
import Components from './components';

export const navList = [
  { path: '/signin', text: '로그인', element: <SignInPage /> },
  { path: '/diaryWrite', text: '일기 쓰기', element: <DiaryWrite /> },
  { path: '/components', text: '컴포넌트 모음', element: <Components /> },
  { path: '/profile', text: '프로필', element: <ProfilePage /> },
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
