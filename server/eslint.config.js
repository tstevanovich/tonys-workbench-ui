import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

const ignoredPaths = ['coverage/**', 'dist/**', 'node_modules/**', 'reports/**', 'test-results/**'];

/** @type {import('eslint').Linter.RulesRecord} */
const typeScriptRules = {
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      fixStyle: 'inline-type-imports',
      prefer: 'type-imports'
    }
  ],
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_'
    }
  ],
  'no-undef': 'off',
  'simple-import-sort/exports': 'warn',
  'simple-import-sort/imports': 'warn'
};

export default tseslint.config(
  {
    name: 'server/ignores',
    ignores: ignoredPaths
  },
  {
    name: 'server/typescript',
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, tseslint.configs.recommended, tseslint.configs.stylistic],
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: typeScriptRules
  },
  {
    name: 'server/source-type-aware',
    files: ['src/**/*.ts', 'server/src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  eslintConfigPrettier
);
