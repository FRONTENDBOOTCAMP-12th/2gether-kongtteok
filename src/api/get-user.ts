import supabase from '@/lib/supabase-client';
import { AUTH_STORAGE } from '@/lib/supabase-client';

interface AuthState {
  state: {
    user: string | null;
    isSignIn: boolean;
  };
}

export const GetUser = async () => {
  const authData = localStorage.getItem(AUTH_STORAGE);

  const authState = JSON.parse(authData ?? '{}') as AuthState;

  const userId = authState.state?.user;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  const { data: userData, error: userError } = await supabase.from('users').select('*').eq('id', userId).single();

  if (userError) throw userError;

  return userData;
};
