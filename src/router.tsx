import SignInPage from '@/pages/SignIn/Index';
import { Route, Routes } from 'react-router';
import Components from './components';
import SignUpPage from './pages/SignUp/Index';

export const navList = [
  { path: '/signin', text: '로그인', element: <SignInPage /> },
  { path: '/components', text: '컴포넌트 모음', element: <Components /> },
  { path: 'signup', text: '회원가입', element: <SignUpPage /> },
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
