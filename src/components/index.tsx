import Header from './layout/Header';
import Footer from './layout/Footer';
import Tab from './Tab';
import Button from './Button';
import Switch from './Switch';
import Textarea from './Textarea';
import InputText from './InputText';
import AttachFile from './AttachFile';
import EmotionButton from './Emotion';
import ToggleButton from './ToggleButton';
import InputButtonSet from './InputButtonSet';
import ProfileInfo from './ProfileInfo';
import { Croissant } from '@mynaui/icons-react';

const profileData = {
  profileImage: '/logo.webp',
  nickname: '박윤경',
  intro: '내 총 어떤데~',
  interests: ['취미', '직장', '친구'],
};

function Components() {
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
        <h2>이미지 파일 첨부</h2>
        <AttachFile label="이미지 첨부" />
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
        <Button inlineSize="fit" className="inline-flex items-center justify-center gap-x-1">
          크라상 먹기 <Croissant width={18} aria-hidden />
        </Button>
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
