import { Navigate, Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import { GetUser } from '@/api/get-user';
import Loading from './Loading';
import EmotionImage from './EmotionImage';

export function RootLayout() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userData');

        if (userId) {
          const user = await GetUser();
          setUserData(user);
        }

        setLoading(false);
      } catch (error) {
        console.error('사용자 데이터 로딩 오류:', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Loading text="로딩중...">
        <EmotionImage className="w-9 animate-bounce" />
      </Loading>
    );
  }

  const userId = localStorage.getItem('userData');
  if (!userId) {
    return <Navigate to="/signin" />;
  }

  if (!userData) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}
