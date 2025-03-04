import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/layout/Header';

const root = document.getElementById('root');

if (root) {
  const reactDOMRoot = createRoot(root);

  reactDOMRoot.render(
    <StrictMode>
      <section className="p-4">
        <article className="flex flex-col gap-y-2">
          <Header title="메인" isLeftIcon={false} isRightIcon={true} />
          <Header title="알림" isLeftIcon={true} isRightIcon={false} />
          <Header title="일기장" isLeftIcon={true} isRightIcon={true} />
        </article>
      </section>
    </StrictMode>
  );
}
