import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...jsxA11y.flatConfigs.recommended,
    settings: {
      react: {
        version: '19.0.0',
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'react/prop-types': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'jsx-a11y/alt-text': [
        'warn',
        {
          elements: ['img'],
        },
      ],
      'jsx-a11y/aria-props': 'warn', // 유효한 aria-* 속성만 사용
      'jsx-a11y/aria-proptypes': 'warn', // 유효한 aria-* 상태/값만 사용
      'jsx-a11y/aria-unsupported-elements': 'warn', // DOM에서 지원되는 role, ARIA만 사용
      'jsx-a11y/role-has-required-aria-props': 'warn', // 필수 ARIA 속성이 빠져있는지 체크
      'jsx-a11y/role-supports-aria-props': 'warn', // ARIA 속성은 지원되는 role에서만 사용
      'react/no-unknown-property': 'off', // DOM에 정의되지 않은 속성을 사용했는지 체크 (emotion css 속성 등 예외 케이스가 있으므로 기본은 off)
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        // 같은 폴더인 경우를 제외하고 import 경로는 항상 절대 경로를 사용
        'warn',
        { allowSameFolder: true, rootDir: 'src', prefix: '@' },
      ],
    },
  }
);
