import supabase, { DATABASE_NAME } from '@/lib/supabase-client';
import { getDate } from '@/utils/get-date';
import { create } from 'zustand';
import { combine } from 'zustand/middleware';

interface DiaryType {
  hasTodayPost: boolean;
}

interface DiaryActions {
  checkTodayPost: (userId: string) => void;
  deleteTodayPost: () => void;
}

const initialDiary: DiaryType = {
  hasTodayPost: false,
};

export const useDiaryStore = create(
  combine(
    { ...initialDiary },
    (set): DiaryActions => ({
      checkTodayPost: async (userId) => {
        const post = await supabase.from(DATABASE_NAME).select('*').eq('user_id', userId).eq('date', getDate());
        const hasPost = !!post?.data?.length;

        set(() => {
          return { hasTodayPost: hasPost };
        });
      },
      deleteTodayPost: () => {
        set({ hasTodayPost: false });
      },
    })
  )
);
