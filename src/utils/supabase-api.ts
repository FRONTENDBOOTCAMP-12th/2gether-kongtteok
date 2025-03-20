import supabase, { DATABASE_NAME, DiaryItem, STORAGE_NAME } from '@/lib/supabase-client';

interface QueryOptions {
  fields?: string;
  diaryId?: number;
  page?: number;
  perPage?: number;
  orderKey?: keyof DiaryItem;
  sortKey?: 'asc' | 'desc';
}

interface DiaryViewQueryOptions extends Partial<QueryOptions> {
  date: string;
  userId: string;
}

// FIXME: date 내림차순, 같은 날짜가 있는 경우 created_at 내림차순 정렬
export const getDiaryList = async ({
  fields = '*',
  page = 0,
  perPage = 10,
  orderKey = 'date',
  sortKey = 'desc',
}: QueryOptions = {}) => {
  const fromIndex = page > 0 ? page + perPage - 1 : 0;
  const toIndex = perPage > 1 ? page + perPage - 1 : fromIndex;
  const isAscending = sortKey.includes('desc');

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

interface UploadFileOptions {
  date: string;
  user_id: string;
  file: File;
  path?: string;
}

export const uploadFile = async ({ date, user_id, file, path }: UploadFileOptions) => {
  const imagePath = path ? path : `post/${user_id}/${date}`;

  return await supabase.storage.from(STORAGE_NAME).upload(`/${imagePath}/${file.name}`, file, {
    upsert: true,
    contentType: 'image/jpeg',
  });
};
