import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import prerender from '@prerenderer/rollup-plugin';

const viteConfig = defineConfig((env) => {
  const isDevMode = env.mode.includes('development');

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      tailwindcss(),
      prerender({
        routes: ['/'], // 정적 페이지를 생성할 루트(경로) 추가
        renderer: '@prerenderer/renderer-puppeteer',
        postProcess(renderedRoute) {
          // HTTP → HTTPS로 변경 or `localhost` → 서비스 URL로 변경
          renderedRoute.html = renderedRoute.html
            .replace(/http:/gi, 'https:')
            .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/gi, process.env.CI_ENVIRONMENT_URL || '');
        },
      }),
      ViteImageOptimizer({
        cache: true,
        cacheLocation: '.cache',
      }),
    ],
    server: {
      host: 'localhost',
      port: 3000,
    },
    preview: {
      host: 'localhost',
      port: 8080,
    },
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});

export default viteConfig;
