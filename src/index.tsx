import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import InputText from '@/components/Input';

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
      </section>
    </StrictMode>
  );
}
