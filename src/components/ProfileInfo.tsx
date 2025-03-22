interface ProfileInfoProps {
  profileImage: string;
  nickname: string;
  intro: string;
  interests: string[];
}

function ProfileInfo({ profileImage, nickname, intro, interests }: ProfileInfoProps) {
  return (
    <section className="bg-background flex items-center justify-center p-5">
      <article className="flex w-full max-w-md items-start">
        <figure className="h-20 w-20 shrink-0 rounded-full">
          <img src={profileImage} alt={`${nickname}님의 프로필 이미지`} className="h-full w-full rounded-full" />
        </figure>

        <section className="ml-3 flex flex-1 flex-col p-2">
          <h2 className="text-primary text-base font-normal">{nickname}</h2>

          <p className="text-primary mt-[2px] max-h-8 overflow-y-auto pr-1 text-sm font-normal">{intro}</p>

          <div className="mt-[6px] flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="text-primary flex h-6 min-w-[40px] items-center justify-center rounded-[10px] bg-[#D0B8A8] px-1.5 text-xs leading-none">
                {interest}
              </span>
            ))}
          </div>
        </section>
      </article>
    </section>
  );
}

export default ProfileInfo;
