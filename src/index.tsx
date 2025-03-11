import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import Router from './router';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const root = document.getElementById('root');

if (root) {
  const reactDOMRoot = createRoot(root);

  reactDOMRoot.render(
    <StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </StrictMode>
  );
}
