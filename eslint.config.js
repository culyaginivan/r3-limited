import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.{jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    ...eslintPluginReact.configs.flat.recommended,
    ...eslintPluginReactHooks.configs.flat.recommended,
  },
  {
    files: ['**/*.astro'],
    rules: {
      'astro/no-deprecated-getentrybyslug': 'error',
    },
  },
];
