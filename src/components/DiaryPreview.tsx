import { LockSolid, LockOpenSolid, Heart } from '@mynaui/icons-react';
import EmotionImage from '@/components/EmotionImage';

export type DiaryPreviewProps = {
  emotion: 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed';
  date: string;
  isPrivate: boolean;
  diaryImage?: string;
  content: string;
  likes: number;
  onDelete?: () => void;
  onEdit?: () => void;
};

function DiaryPreview({
  emotion,
  date,
  isPrivate,
  diaryImage,
  content,
  likes,
  onDelete: _onDelete,
  onEdit: _onEdit,
}: DiaryPreviewProps) {
  return (
    <article className="flex h-[134px] w-[288px] flex-col justify-between rounded-[8px] border border-[#3E3232] bg-[#FFFBEB] p-[12px]">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <EmotionImage emotion={emotion} className="h-[20px] w-[20px]" />
          <span className="text-[12px] text-[#3E3232] opacity-50">{date}</span>
          {isPrivate ? (
            <LockSolid className="h-[12px] w-[12px] text-[#CCA8A8]" />
          ) : (
            <LockOpenSolid className="h-[12px] w-[12px] text-[#CCA8A8]" />
          )}
        </div>

        <div className="flex gap-[8px] text-[12px] text-[#3E3232]">
          <button onClick={() => console.log('일기쓰기 페이지로 이동 예정')} className="cursor-pointer">
            수정
          </button>
          <button onClick={() => console.log('삭제 확인 창 띄울 예정')} className="cursor-pointer">
            삭제
          </button>
        </div>
      </section>

      <section className="mt-[6px] flex">
        {diaryImage ? (
          <figure className="h-[66px] w-[66px] min-w-[66px] flex-shrink-0 overflow-hidden rounded-[8px]">
            <img src={diaryImage} alt="일기 이미지" className="h-full w-full object-cover" />
          </figure>
        ) : null}
        <p className={`text-[12px] text-[#3E3232] ${diaryImage ? 'ml-[12px]' : ''} line-clamp-4`}>{content}</p>
      </section>

      <section className="mt-auto flex items-center justify-end gap-[4px]">
        <Heart className="h-[14px] w-[14px] fill-[#F3A79E] text-[#F3A79E]" />
        <span className="text-[11px] text-[#F3A79E]">{likes}</span>
      </section>
    </article>
  );
}

export default DiaryPreview;
