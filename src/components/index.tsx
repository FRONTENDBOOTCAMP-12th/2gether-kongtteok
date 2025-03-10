import Header from './layout/Header';
import Footer from './layout/Footer';
import Tab from './Tab';
import Button from './Button';
import Switch from './Switch';
import Textarea from './Textarea';
import InputText from './InputText';
import EmotionButton from './Emotion';
import ToggleButton from './ToggleButton';
import InputButtonSet from './InputButtonSet';
import ProfileInfo from './ProfileInfo';
import DiaryPreview, { DiaryPreviewProps } from './DiaryPreview';
import DiaryHeader, { DiaryHeaderProps } from './DiaryHeader';

function Components() {
  const profileData = {
    profileImage: '/logo.webp',
    nickname: '박윤경',
    intro: '내 총 어떤데~',
    interests: ['취미', '직장', '친구'],
  };

  const diaryData: DiaryPreviewProps[] = [
    {
      emotion: 'sad',
      date: '2025-03-06',
      isPrivate: true,
      diaryImage: '/images/emotion/sad.png',
      content:
        '친구가 타로를 봐줬는데 결과가 좋지 않아서 조금 슬펐어.. 프로젝트가 어떻게 될지 궁금해서 월간 운세를 봤는데 걱정이 된다ㅜㅜ 그래도 열심히 하고 있으니까 잘 해낼 수 있겠지? 조원분들도 힘내주시고 계시니까.. 타로 그거 뭐 다 미신이지!',
      likes: 3,
    },
    {
      emotion: 'happy',
      date: '2025-03-07',
      isPrivate: false,
      content: '프로젝트 조원들이랑 동기들을 만나서 행복했어!',
      likes: 12,
    },
  ];

  const diaryHeaderData: DiaryHeaderProps = {
    date: '2025년 2월 14일',
    weather: 'sunny',
    emotion: 'happy',
    title: '랜선탈출모임',
  };

  return (
    <section className="bg-background p-4 pb-20">
      <h1 className="pb-4 text-2xl">공통 컴포넌트</h1>
      <article className="flex flex-col items-start gap-y-2">
        <Header title="메인" isLeftIcon={false} isRightIcon={true} />
        <Header title="알림" isLeftIcon={true} isRightIcon={false} />
        <Header title="일기장" isLeftIcon={true} isRightIcon={true} />
      </article>
      <article className="flex flex-col items-start gap-y-2">
        <InputText labelText="아이디" defaultValue="기본 값" placeholder="placeholder" />
        <InputText labelText="비밀번호" type="password" labelHidden={true} />
      </article>
      <article className="mt-10 pb-15">
        <h3 className="pb-4">input + button set</h3>
        <InputButtonSet inputType="email" labelText="이메일" placeholder="이메일">
          중복 확인
        </InputButtonSet>
      </article>
      <article className="flex flex-col gap-y-2">
        <Textarea label="소개글" />
        <Textarea label="소개글" labelHidden className="h-[12.5rem]" defaultValue="label 없는 스타일" />
      </article>
      <article className="mt-15">
        <h2>Switch</h2>
        <div className="flex flex-col items-start gap-y-3">
          <Switch label="다크모드" defaultChecked labelHidden />
          <Switch label="혼자볼래" />
        </div>
      </article>
      <article className="mt-12 flex flex-col items-start gap-y-2">
        <h2>탭 컴포넌트</h2>
        <Tab />
      </article>
      <article className="mt-12">
        <h2>프로필</h2>
        <ProfileInfo
          profileImage={profileData.profileImage}
          nickname={profileData.nickname}
          intro={profileData.intro}
          interests={profileData.interests}
        />
      </article>
      <article className="mt-12">
        <h2>일기 헤더</h2>
        <DiaryHeader {...diaryHeaderData} />
      </article>
      <article className="mt-12">
        <h2>일기 프리뷰</h2>
        <section className="flex flex-col gap-[12px]">
          {diaryData.map((diary, index) => (
            <DiaryPreview key={index} {...diary} />
          ))}
        </section>
      </article>
      <article className="mt-4 flex flex-col items-start gap-y-2">
        <h2>버튼</h2>
        <h3>Default</h3>
        <Button>버튼</Button>
        <Button ariaDisabled={true}>버튼</Button>
        <Button intent="secondary">버튼</Button>
        <Button intent="outline">버튼</Button>
        <Button intent="outlinePink">버튼</Button>

        <h3>Default size / inline-block</h3>
        <Button inlineSize="fit">버튼</Button>
        <Button inlineSize="fit" intent="secondary">
          버튼
        </Button>
        <Button inlineSize="fit" intent="outline">
          버튼
        </Button>
        <Button inlineSize="fit" intent="outlinePink">
          버튼
        </Button>

        <h3>small size</h3>
        <Button size="small" inlineSize="fit">
          inline-block button
        </Button>
        <Button intent="secondary" size="small" inlineSize="fit">
          inline-block button
        </Button>
        <Button intent="outline" size="small" inlineSize="fit">
          inline-block button
        </Button>
        <Button intent="outlinePink" size="small" inlineSize="fit">
          inline-block button
        </Button>
      </article>
      <article className="mt-12 flex flex-col items-start gap-y-2">
        <h2>토글 버튼(checkbox / radio)</h2>
        <ToggleButton label="관심사" />
      </article>
      <article className="mt-15">
        <h2>감정 버튼</h2>
        <div className="grid grid-cols-4 gap-x-4">
          <EmotionButton />
          <EmotionButton emotion="happy" />
          <EmotionButton emotion="proud" />
          <EmotionButton emotion="fine" />
          <EmotionButton emotion="angry" />
          <EmotionButton emotion="tired" />
          <EmotionButton emotion="sad" />
          <EmotionButton emotion="depressed" />
        </div>
      </article>
      <Footer />
    </section>
  );
}

export default Components;
