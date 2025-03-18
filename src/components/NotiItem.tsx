import { getDateKR } from '@/utils/get-date';

interface NotiItemProps {
  nickname: string;
  profileImage?: string;
  diaryDate: string;
}

function NotiItem({ nickname, profileImage, diaryDate }: NotiItemProps) {
  return (
    <div className="relative flex flex-col gap-y-1.5 py-1.75 pl-17 text-xs leading-[150%]">
      <img
        src={profileImage ?? `/images/mallang/mallangFace.png`}
        alt={`${nickname}님`}
        className="absolute top-0 left-0 aspect-square w-14 rounded-[50%] bg-amber-200"
      />
      <p className="text-primary">{`${nickname}님이 ${getDateKR(diaryDate)} 일기에 공감했어요.`}</p>
      <time dateTime={diaryDate} className="text-beige-600">
        {getDateKR(diaryDate)}
      </time>
    </div>
  );
}

export default NotiItem;
