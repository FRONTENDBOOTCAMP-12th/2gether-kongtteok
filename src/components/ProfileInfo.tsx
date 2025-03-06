type ProfileInfoProps = {
  profileImage: string;
  nickname: string;
  intro: string;
  interests: string[];
};

function ProfileInfo({ profileImage, nickname, intro, interests }: ProfileInfoProps) {
  return (
    <section className="flex items-center justify-center bg-[#FFFBEB] p-5">
      <article className="flex items-center">
        <figure className="h-[80px] w-[80px] rounded-full">
          <img src={profileImage} alt={`${nickname}님의 프로필 이미지`} className="h-full w-full rounded-full" />
        </figure>

        <section className="ml-[12px] flex h-[80px] w-[200px] flex-col bg-[#ECE3DC] p-2">
          <h2 className="text-[16px] text-[#3E3232]">{nickname}</h2>

          <p className="h-[40px] overflow-y-auto text-[12px] text-[#3E3232]">{intro}</p>

          <div className="mt-auto flex flex-wrap gap-[4px]">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="flex h-[19px] w-[31px] items-center justify-center rounded-[5px] bg-[#D0B8A8] text-[13px] leading-none text-[#3E3232]">
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
