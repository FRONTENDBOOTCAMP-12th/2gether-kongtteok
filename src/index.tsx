import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import InputText from '@/components/InputText';
import Button from './components/Button';

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
        <article className="flex flex-col gap-y-2 mt-4">
          <h2>버튼</h2>
          <h3>Default</h3>
          <Button>버튼</Button>
          <Button disabled>버튼</Button>
          <Button intent="secondary">버튼</Button>
          <Button intent="outline">버튼</Button>
          <Button intent="outlinePink">버튼</Button>

          <h3>Default size / inline-block</h3>
          <Button inlineSize="fit">버튼</Button>
          <Button inlineSize="fit" intent="secondary">버튼</Button>
          <Button inlineSize="fit" intent="outline">버튼</Button>
          <Button inlineSize="fit" intent="outlinePink">버튼</Button>

          <h3>small size</h3>
          <Button size="small" inlineSize="fit">inline-block button</Button>
          <Button intent="secondary" size="small" inlineSize="fit">inline-block button</Button>
          <Button intent="outline" size="small" inlineSize="fit">inline-block button</Button>
          <Button intent="outlinePink" size="small" inlineSize="fit">inline-block button</Button>
        </article>
      </section>
    </StrictMode>
  );
}
