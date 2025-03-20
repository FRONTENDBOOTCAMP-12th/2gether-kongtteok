import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

export interface AuthUser {
  user: null | string;
  isSignIn: boolean;
}

const initialUser: AuthUser = {
  user: null,
  isSignIn: false,
};

export const useAuthStore = create(
  persist(
    combine({ ...initialUser }, (set) => ({
      signIn: (user: string) => {
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
