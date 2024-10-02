// @ts-check
const eslint = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    ignores: ['**/dist/', '**/coverage/', 'eslint.config.js', '.releaserc.js', 'jest.config.ts', 'cdk.out'],
  },
);
