import { createBrowserRouter } from 'react-router';
import MainPage from './pages/Main';
import ProfilePage from './pages/Profile';
import DiaryList from './pages/DiaryList';
import DiaryWrite from './pages/DiaryWrite';
import DiaryView from './pages/DiaryView';
import Components from './components/index';
import SignInPage from './pages/SignIn';
import SignUp from './pages/SignUp';
import { RootLayout } from './components/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'diarylist', element: <DiaryList /> },
      { path: 'diary/write', element: <DiaryWrite /> },
      { path: 'diary/view', element: <DiaryView /> },
      { path: 'components', element: <Components /> },
    ],
  },
  { path: 'signin', element: <SignInPage /> },
  { path: 'signup', element: <SignUp /> },
]);
