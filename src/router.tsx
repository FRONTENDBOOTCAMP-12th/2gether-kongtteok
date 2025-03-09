import SignInPage from '@/pages/SignIn/Index';
import { Route, Routes } from 'react-router';
import Components from './components';
import SignUpLogin from './pages/SignUp/SignUpLogin';
import SignUpEmail from './pages/SignUp/SignUpEmail';
import SignUpNickName from './pages/SignUp/SignUpNickName';
import SignUpInterests from './pages/SignUp/SignUpInterests';

export const navList = [
  { path: 'signin', text: '로그인', element: <SignInPage /> },
  { path: 'components', text: '컴포넌트 모음', element: <Components /> },
  { path: 'signup_login', text: '회원가입(로그인 정보)', element: <SignUpLogin /> },
  { path: 'signup_email', text: '회원가입(이메일)', element: <SignUpEmail /> },
  { path: 'signup_nickname', text: '회원가입(닉네임)', element: <SignUpNickName /> },
  { path: 'signup_interests', text: '회원가입(관심사)', element: <SignUpInterests /> },
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
