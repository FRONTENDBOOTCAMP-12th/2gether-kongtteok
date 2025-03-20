import { LockSolid, LockOpenSolid, Heart } from '@mynaui/icons-react';
import EmotionImage, { type EmotionType } from '@/components/EmotionImage';

export interface DiaryPreviewProps {
  date: string;
  isPrivate: boolean;
  diaryImage?: string;
  content: string;
  likes?: number;
  emotion: EmotionType;
  onDelete?: () => void;
  onEdit?: () => void;
}

function DiaryPreview({ emotion, date, isPrivate, diaryImage, content, likes = 0 }: DiaryPreviewProps) {
  return (
    <article className="border-primary bg-background flex h-33.5 w-full flex-col justify-between rounded-[10px] border p-3">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <EmotionImage emotion={emotion} className="h-5 w-5" />
          <span className="text-primary text-xs opacity-50">{date}</span>
          {isPrivate ? (
            <LockSolid className="text-secondary h-3 w-3" />
          ) : (
            <LockOpenSolid className="text-secondary h-3 w-3" />
          )}
        </div>

        <div className="text-primary flex gap-2 text-xs">
          <button onClick={() => console.log('일기쓰기 페이지로 이동 예정')} className="cursor-pointer">
            수정
          </button>
          <button onClick={() => console.log('삭제 확인 창 띄울 예정')} className="cursor-pointer">
            삭제
          </button>
        </div>
      </section>

      <section className="mt-1.5 flex">
        {diaryImage ? (
          <figure className="h-16.5 w-16.5 min-w-16.5 flex-shrink-0 overflow-hidden rounded-[10px]">
            <img src={diaryImage} alt="일기 이미지" className="h-full w-full object-cover" />
          </figure>
        ) : null}
        <p className={`text-primary text-xs ${diaryImage ? 'ml-3' : ''} line-clamp-4`}>{content}</p>
      </section>

      <section className="mt-auto flex items-center justify-end gap-1">
        <Heart className="h-3.5 w-3.5 fill-[#F3A79E] text-[#F3A79E]" />
        <span className="text-xs text-[#F3A79E]">{likes}</span>
      </section>
    </article>
  );
}

export default DiaryPreview;
