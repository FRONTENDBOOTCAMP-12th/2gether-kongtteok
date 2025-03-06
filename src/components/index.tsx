import Button from './Button';
import InputButtonSet from './InputButtonSet';
import InputText from './InputText';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Tab from './Tab';

function Components() {
  return (
    <section className="p-4">
      <h1 className="pb-4 text-2xl">공통 컴포넌트</h1>
      <article className="flex flex-col gap-y-2">
        <Header title="메인" isLeftIcon={false} isRightIcon={true} />
        <Header title="알림" isLeftIcon={true} isRightIcon={false} />
        <Header title="일기장" isLeftIcon={true} isRightIcon={true} />
      </article>
      <article className="flex flex-col gap-y-2">
        <InputText labelText="아이디" defaultValue="기본 값" placeholder="placeholder" />
        <InputText labelText="비밀번호" type="password" labelHidden={true} />
      </article>
      <article className="mt-12 flex flex-col items-start gap-y-2">
        <h2>탭 컴포넌트</h2>
        <Tab />
      </article>
      <article className="mt-4 flex flex-col gap-y-2">
        <h2>버튼</h2>
        <h3>Default</h3>
        <Button>버튼</Button>
        <Button disabled>버튼</Button>
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

      <article className="mt-10 pb-15">
        <h3 className="pb-4">input + button set</h3>
        <InputButtonSet inputType="email" labelText="이메일" placeholder="이메일">
          중복 확인
        </InputButtonSet>
      </article>

      <Footer />
    </section>
  );
}

export default Components;
