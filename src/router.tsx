import { Route, Routes } from 'react-router';
import MainPage from '@/pages/Main';
import SignUp from '@/pages/SignUp';
import SignUpEmail from '@/pages/SignUp/Email';
import SignUpNickname from '@/pages/SignUp/Nickname';
import SignUpInterests from '@/pages/SignUp/Interests';
import SignInPage from '@/pages/SignIn';
import ProfilePage from '@/pages/Profile';
import DiaryView from '@/pages/DiaryView';
import DiaryWrite from '@/pages/DiaryWrite';
import Components from '@/components';

export const navList = [
  { path: '/', text: '홈', element: <MainPage /> },
  { path: 'signin', text: '로그인', element: <SignInPage /> },
  { path: 'signup', text: '회원가입(로그인 정보)', element: <SignUp /> },
  { path: 'signup/email', text: '회원가입(이메일)', element: <SignUpEmail /> },
  { path: 'signup/nickname', text: '회원가입(닉네임)', element: <SignUpNickname /> },
  { path: 'signup/interests', text: '회원가입(관심사)', element: <SignUpInterests /> },
  { path: 'profile', text: '프로필', element: <ProfilePage /> },
  { path: 'diary/write', text: '일기 쓰기', element: <DiaryWrite /> },
  { path: 'diary/view', text: '내 일기 보기', element: <DiaryView /> },
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
