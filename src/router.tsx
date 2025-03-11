import { Route, Routes } from 'react-router';
import Components from '@/components';
import SignUp from '@/pages/SignUp/';
import SignUpEmail from '@/pages/SignUp/Email';
import SignUpNickname from '@/pages/SignUp/Nickname';
import SignUpInterests from '@/pages/SignUp/Interests';
import SignInPage from '@/pages/SignIn/Index';
import ProfilePage from '@/pages/Profile/Index';
import DiaryWrite from '@/pages/DiaryWrite/';

export const navList = [
  { path: 'signin', text: '로그인', element: <SignInPage /> },
  { path: 'signup', text: '회원가입(로그인 정보)', element: <SignUp /> },
  { path: 'signup/email', text: '회원가입(이메일)', element: <SignUpEmail /> },
  { path: 'signup/nickname', text: '회원가입(닉네임)', element: <SignUpNickname /> },
  { path: 'signup/interests', text: '회원가입(관심사)', element: <SignUpInterests /> },
  { path: 'diaryWrite', text: '일기 쓰기', element: <DiaryWrite /> },
  { path: 'profile', text: '프로필', element: <ProfilePage /> },
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
