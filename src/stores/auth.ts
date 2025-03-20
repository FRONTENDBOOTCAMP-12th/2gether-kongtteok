import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

interface User {
  id: string;
  nickname: string;
  email: string;
  created_at: string;
}

interface AuthUser {
  user: null | User;
  isSignIn: boolean;
}

const initialUser: AuthUser = {
  user: null,
  isSignIn: false,
};

export const useAuthStore = create(
  persist(
    combine({ ...initialUser }, (set) => ({
      signIn: (user: User) => {
        set({
          user: user,
          isSignIn: !!user,
        });
      },
      signOut: () => {
        set(initialUser);
      },
    })),
    { name: 'store/auth' }
  )
);
