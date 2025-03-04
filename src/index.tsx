import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Button from './components/Button';
import InputText from '@/components/InputText';
import InputButtonSet from './components/InputButtonSet';

const root = document.getElementById('root');

if (root) {
  const reactDOMRoot = createRoot(root);

  reactDOMRoot.render(
    <StrictMode>
      <section className="p-4">
        <h1 className="pb-4 text-2xl">공통 컴포넌트</h1>
        <article className="flex flex-col gap-y-2">
          <InputText labelText="아이디" defaultValue="기본 값" placeholder="placeholder" />
          <InputText labelText="비밀번호" type="password" labelHidden={true} />
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

        <article className="mt-10">
          <h3 className="pb-4">input + button set</h3>
          <InputButtonSet inputType="email" labelText="이메일" placeholder="이메일">
            중복 확인
          </InputButtonSet>
        </article>
      </section>
    </StrictMode>
  );
}
