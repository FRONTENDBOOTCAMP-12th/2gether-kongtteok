import { getDateKR } from '@/utils/get-date';

interface NotiItemProps {
  nickname: string;
  profileImage?: string | null;
  diaryDate: string;
  likeDate: string;
}

function NotiItem({ nickname, profileImage, diaryDate, likeDate }: NotiItemProps) {
  const likeDateFormat = likeDate.split('T').shift();

  return (
    <div className="relative flex flex-col gap-y-1.5 py-1.75 pl-17 text-xs leading-[150%]">
      <img
        src={profileImage ?? `/images/mallang/mallangFace.png`}
        alt={`${nickname}님`}
        className="absolute top-0 left-0 aspect-square w-14 rounded-[50%] object-cover"
      />
      <p className="text-primary">
        {nickname}님이 <time dateTime={diaryDate}>{getDateKR(diaryDate)}</time> 일기에 공감했어요.
      </p>
      <time dateTime={likeDateFormat} className="text-primary opacity-80">
        {getDateKR(likeDateFormat)}
      </time>
    </div>
  );
}

export default NotiItem;
