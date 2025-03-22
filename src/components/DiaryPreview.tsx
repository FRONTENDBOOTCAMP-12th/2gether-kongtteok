import { LockSolid, Heart } from '@mynaui/icons-react';
import EmotionImage, { type EmotionType } from '@/components/EmotionImage';

export interface DiaryPreviewProps {
  date: string;
  isPrivate: boolean;
  diaryImage?: string | string[] | null;
  title: string;
  content: string;
  likes?: number;
  emotion: EmotionType;
  showActions?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}

function DiaryPreview({
  emotion,
  date,
  isPrivate,
  diaryImage,
  title,
  content,
  likes = 0,
  showActions = true,
  onEdit,
  onDelete,
}: DiaryPreviewProps) {
  return (
    <article className="border-primary bg-background flex w-full flex-col justify-between rounded-[10px] border p-3">
      <section className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <EmotionImage emotion={emotion} className="h-5 w-5" />
          <span className="text-primary text-xs opacity-50">{date}</span>
          {isPrivate && <LockSolid className="text-secondary h-3 w-3" />}
        </div>

        {showActions && (
          <div className="text-primary flex gap-2 text-xs">
            <button onClick={onEdit} className="cursor-pointer">
              수정
            </button>
            <button onClick={onDelete} className="cursor-pointer">
              삭제
            </button>
          </div>
        )}
      </section>

      <h2 className="text-primary mt-2 w-full text-left text-sm font-bold">{title}</h2>

      <section className="mt-1.5 flex w-full">
        {diaryImage ? (
          <figure className="h-16.5 w-16.5 min-w-16.5 flex-shrink-0 overflow-hidden rounded-[10px]">
            <img
              src={Array.isArray(diaryImage) ? diaryImage[0] : diaryImage}
              alt="일기 이미지"
              className="h-full w-full object-cover"
            />
          </figure>
        ) : null}

        <p className={`text-primary text-xs ${diaryImage ? 'ml-3' : ''} line-clamp-4`}>{content}</p>
      </section>

      <section className="mt-auto flex items-center justify-end gap-1">
        <Heart className="fill-likes text-likes h-3.5 w-3.5" />
        <span className="text-likes text-xs">{likes}</span>
      </section>
    </article>
  );
}

export default DiaryPreview;
