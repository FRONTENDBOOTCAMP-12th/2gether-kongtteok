import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './router';

const root = document.getElementById('root');

if (root) {
  const reactDOMRoot = createRoot(root);

  reactDOMRoot.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
