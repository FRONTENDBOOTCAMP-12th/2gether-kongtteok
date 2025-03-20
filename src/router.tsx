import { createBrowserRouter } from 'react-router';
import MainPage from './pages/Main';
import ProfilePage from './pages/Profile';
import DiaryList from './pages/DiaryList';
import DiaryWrite from './pages/DiaryWrite';
import DiaryView from './pages/DiaryView';
import DiaryDetail from '@/pages/DiaryDetail';
import Settings from '@/pages/Settings';
import NotifyList from '@/pages/Notifi';
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
      { path: 'diary/view/:diaryId', text: '내 일기 상세 보기', element: <DiaryView /> },
      { path: 'diary/detail/:diaryId', text: '다른 사람 일기 상세 보기', element: <DiaryDetail /> },
      { path: 'settings', text: '설정', element: <Settings /> },
      { path: 'notify', text: '알림', element: <NotifyList /> },
      { path: 'components', element: <Components /> },
    ],
  },
  { path: 'signin', element: <SignInPage /> },
  { path: 'signup', element: <SignUp /> },
]);
