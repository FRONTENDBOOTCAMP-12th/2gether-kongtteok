import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');

if (root) {
  const reactDOMRoot = createRoot(root);

  reactDOMRoot.render(
    <StrictMode>
      <div className="flex h-[100vh] items-center justify-center bg-[#3E3232] p-5 text-6xl text-white">말랑콩떡</div>
    </StrictMode>
  );
}
