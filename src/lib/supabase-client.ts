import { createClient } from '@supabase/supabase-js';
import { Database, Tables, TablesInsert } from './database.types';

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;

export const supabase = createClient<Database>(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

export const DATABASE_NAME = 'diary';

export type DiaryItem = Tables<'diary'>;
export type DiaryItemInsert = TablesInsert<'diary'>;
