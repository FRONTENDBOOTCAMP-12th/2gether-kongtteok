import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth';
import supabase from '@/lib/supabase-client';
import NotiItem from '@/components/NotiItem';
import EmotionImage from '@/components/EmotionImage';
import CommonLayout from '@/components/layout/CommonLayout';

export interface LikeData {
  nickname: string;
  diary_id: number;
  diary_date: string;
  like_user_id: string;
  like_created_at: string;
  image_url: string | null;
}

interface GetLikesResult {
  data: LikeData[] | null;
  error: unknown;
}

const getLikesByUserId = async (userId: string): Promise<GetLikesResult> => {
  const { data, error } = await supabase.rpc('get_diary_likes', { input_user_id: userId });

  return { data, error };
};

const useLikes = (userId: string) => {
  const [likes, setLikes] = useState<LikeData[] | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchLikes = async () => {
      const { data, error } = await getLikesByUserId(userId);

      setLikes(data);
      setError(error);
    };

    fetchLikes();
  }, [userId]);

  return { likes, error };
};

function NotifyList() {
  const userId = useAuthStore((s) => s.user)!;
  const { likes, error } = useLikes(userId);
  const isLikesNull = !likes?.length;

  if (error) {
    console.error(error);
  }

  return (
    <CommonLayout headerProps={{ title: '알림', isLeftIcon: true }}>
      {isLikesNull && (
        <div className="absolute-content flex -translate-x-[50%] flex-col items-center justify-center gap-y-2">
          <EmotionImage emotion="sad" className="w-8" />
          <span className="text-primary text-sm">알림이 없습니다.</span>
        </div>
      )}
      {!isLikesNull && (
        <ul className="flex flex-col gap-y-3">
          {likes?.map((data) => (
            <li key={crypto.randomUUID()}>
              <NotiItem
                nickname={data.nickname}
                profileImage={data.image_url}
                diaryDate={data.diary_date}
                likeDate={data.like_created_at}
              />
            </li>
          ))}
        </ul>
      )}
    </CommonLayout>
  );
}

export default NotifyList;
