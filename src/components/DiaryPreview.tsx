import { LockSolid, Heart } from '@mynaui/icons-react';
import { getDateKR } from '@/utils/get-date';
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
}

function DiaryPreview({ emotion, date, isPrivate, diaryImage, title, content, likes = 0 }: DiaryPreviewProps) {
  return (
    <div className="border-primary bg-background flex w-full flex-col justify-between rounded-[10px] border p-3 text-left">
      <div className="flex w-full items-center gap-2">
        <EmotionImage emotion={emotion} className="h-5 w-5" />
        <span className="text-primary text-xs opacity-50">{getDateKR(date)}</span>
        {isPrivate && <LockSolid className="text-secondary w-3.5" aria-label="비공개" />}
      </div>

      <p className="text-primary mt-2 w-full text-left text-sm font-bold">{title}</p>

      <div className="mt-1.5 flex w-full">
        {diaryImage ? (
          <figure className="h-16.5 w-16.5 min-w-16.5 flex-shrink-0 overflow-hidden rounded-[10px]">
            <img
              src={Array.isArray(diaryImage) ? diaryImage[0] : diaryImage}
              alt="일기 이미지"
              className="h-full w-full object-cover"
            />
          </figure>
        ) : null}

        <p className={`text-primary text-left text-xs ${diaryImage ? 'ml-3' : ''} line-clamp-4`}>{content}</p>
      </section>

      <div className="mt-auto flex items-center justify-end gap-1">
        <Heart className="fill-likes text-likes h-3.5 w-3.5" />
        <span className="sr-only">공감 수</span>
        <span className="text-likes text-xs">{likes}</span>
      </div>
    </div>
  );
}

export default DiaryPreview;
