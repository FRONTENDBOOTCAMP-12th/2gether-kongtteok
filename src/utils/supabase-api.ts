import supabase, { DATABASE_NAME, DiaryItem } from '@/lib/supabase-client';

interface DiaryViewQueryOptions extends Partial<QueryOptions> {
  date: string;
  userId: string;
}

interface QueryOptions {
  fields?: string;
  diaryId?: number;
  page?: number;
  perPage?: number;
  orderKey?: keyof DiaryItem;
  sortKey?: 'asc' | 'desc';
}

export const getDiaryList = async ({
  fields = '*',
  page = 0,
  perPage = 10,
  orderKey = 'created_at',
  sortKey = 'asc',
}: QueryOptions = {}) => {
  const fromIndex = page > 0 ? page + perPage - 1 : 0;
  const toIndex = perPage > 1 ? page + perPage - 1 : fromIndex;
  const isAscending = sortKey.includes('asc');

  return await supabase
    .from(DATABASE_NAME)
    .select(fields)
    .range(fromIndex, toIndex)
    .order(orderKey, { ascending: isAscending });
};

export const getDiaryViewList = async ({
  date,
  userId,
  fields = '*',
  page = 0,
  perPage = 10,
}: DiaryViewQueryOptions) => {
  const fromIndex = page > 0 ? page + perPage - 1 : 0;
  const toIndex = perPage > 1 ? page + perPage - 1 : fromIndex;

  return await supabase
    .from(DATABASE_NAME)
    .select(fields)
    .eq('user_id', userId)
    .eq('date', date)
    .range(fromIndex, toIndex);
};
