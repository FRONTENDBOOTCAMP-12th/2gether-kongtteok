import { Navigate, Outlet } from 'react-router';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import { useAuthStore } from '@/stores/auth';

export function RootLayout() {
  const { user, isSignIn } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [isSignIn, user]);

  if (loading) {
    return <Loading />;
  }

  if (!isSignIn || !user) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}
