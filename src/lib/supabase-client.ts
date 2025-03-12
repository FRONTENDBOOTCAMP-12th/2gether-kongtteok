import { createClient } from '@supabase/supabase-js';
import { Database, Tables, TablesInsert } from './database.types';

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

const supabase = createClient<Database>(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);
export default supabase;

export const DATABASE_NAME = 'diary';
export const STORAGE_NAME = 'images';

// 테이블에 접근하기 위한 단축키 제공
export type DiaryItem = Tables<'diary'>;
export type DiaryItemInsert = TablesInsert<'diary'>;
