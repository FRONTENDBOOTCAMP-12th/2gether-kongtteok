import supabase from '@/lib/supabase-client';

export const GetUser = async () => {
  const userId = localStorage.getItem('userData');

  const { data: userData, error: userError } = await supabase.from('users').select('*').eq('id', userId).single();

  if (userError) throw userError;

  return userData;
};
