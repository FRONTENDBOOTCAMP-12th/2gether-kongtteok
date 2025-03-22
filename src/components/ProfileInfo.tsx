interface ProfileInfoProps {
  profileImage: string;
  nickname: string;
  intro: string;
  interests: string[];
}

function ProfileInfo({ profileImage, nickname, intro, interests }: ProfileInfoProps) {
  return (
    <section className="bg-background flex items-center justify-center p-5">
      <article className="flex items-center">
        <figure className="h-20 w-20 rounded-full">
          <img src={profileImage} alt={`${nickname}님의 프로필 이미지`} className="h-full w-full rounded-full" />
        </figure>

        <section className="ml-3 flex h-20 w-50 flex-col p-2">
          <h2 className="text-primary text-base">{nickname}</h2>

          <p className="text-primary h-10 overflow-y-auto text-xs">{intro}</p>

          <div className="mt-auto flex flex-wrap gap-1">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="text-primary flex h-5 w-7.5 items-center justify-center rounded-[10px] bg-[#D0B8A8] text-xs leading-none">
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
