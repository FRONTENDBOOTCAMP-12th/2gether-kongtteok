import { createClient } from '@supabase/supabase-js';
import { Database, Tables, TablesInsert } from './database.types';

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

const supabase = createClient<Database>(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false, //세션을 로컬 스토리지에 저장하지 않음
  },
});
export default supabase;

export const AUTH_STORAGE = 'kong-tteok/auth';
export const DATABASE_NAME = 'diary';
export const STORAGE_NAME = 'images';

export type DiaryItem = Tables<'diary'>;
export type DiaryItemInsert = TablesInsert<'diary'>;
