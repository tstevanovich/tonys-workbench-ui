// @ts-check
const eslint = require('@eslint/js');
const { defineConfig, globalIgnores } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier/flat');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

const ignoredPaths = [
  '**/.angular/**',
  '**/coverage/**',
  '**/dist/**',
  '**/node_modules/**',
  '**/playwright-report/**',
  '**/reports/**',
  '**/test-results/**'
];

const angularLifecycleInterfaces = [
  'AfterContentChecked',
  'AfterContentInit',
  'AfterViewChecked',
  'AfterViewInit',
  'DoCheck',
  'OnChanges',
  'OnDestroy',
  'OnInit'
];

const angularLifecycleMethods = [
  'ngAfterContentChecked',
  'ngAfterContentInit',
  'ngAfterViewChecked',
  'ngAfterViewInit',
  'ngDoCheck',
  'ngOnChanges',
  'ngOnDestroy',
  'ngOnInit'
];

/** @type {import('eslint').Linter.RulesRecord} */
const typeScriptRules = {
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      fixStyle: 'inline-type-imports'
    }
  ],
  'no-undef': 'off',
  'simple-import-sort/exports': 'warn',
  'simple-import-sort/imports': 'warn'
};

/** @type {import('eslint').Linter.RulesRecord} */
const angularRules = {
  '@angular-eslint/computed-must-return': 'error',
  '@angular-eslint/directive-selector': [
    'error',
    {
      type: 'attribute',
      prefix: 'app',
      style: 'camelCase'
    }
  ],
  '@angular-eslint/component-selector': [
    'error',
    {
      type: 'element',
      prefix: 'app',
      style: 'kebab-case'
    }
  ],
  '@angular-eslint/no-async-lifecycle-method': 'error',
  '@angular-eslint/no-developer-preview': 'error',
  '@angular-eslint/no-experimental': 'error',
  '@angular-eslint/no-lifecycle-call': 'error',
  '@angular-eslint/no-pipe-impure': 'error',
  '@angular-eslint/no-uncalled-signals': 'error',
  '@angular-eslint/prefer-host-metadata-property': 'error',
  '@angular-eslint/prefer-on-push-component-change-detection': 'error',
  '@angular-eslint/prefer-output-emitter-ref': 'error',
  '@angular-eslint/prefer-output-readonly': 'error',
  '@angular-eslint/prefer-signal-model': 'error',
  '@angular-eslint/prefer-signals': 'error',
  '@angular-eslint/prefer-standalone': 'error',
  '@angular-eslint/relative-url-prefix': 'error',
  '@angular-eslint/use-injectable-provided-in': 'error',
  'no-restricted-imports': [
    'error',
    {
      paths: [
        {
          name: '@angular/core',
          importNames: angularLifecycleInterfaces,
          message:
            'Do not use Angular class lifecycle hooks. Prefer signals, computed state, effects, async pipe flows, render callbacks, or service-owned setup.'
        }
      ]
    }
  ],
  'no-restricted-syntax': [
    'error',
    ...angularLifecycleMethods.map((methodName) => ({
      selector: `MethodDefinition[key.name="${methodName}"]`,
      message:
        'Do not use Angular class lifecycle hooks. Prefer signals, computed state, effects, async pipe flows, render callbacks, or service-owned setup.'
    }))
  ]
};

/** @type {import('eslint').Linter.RulesRecord} */
const templateRules = {
  '@angular-eslint/template/conditional-complexity': [
    'error',
    {
      maxComplexity: 5
    }
  ],
  '@angular-eslint/template/cyclomatic-complexity': [
    'error',
    {
      maxComplexity: 8
    }
  ],
  '@angular-eslint/template/no-any': 'error',
  '@angular-eslint/template/no-non-null-assertion': 'error',
  '@angular-eslint/template/prefer-at-else': 'error',
  '@angular-eslint/template/prefer-at-empty': 'error',
  '@angular-eslint/template/prefer-class-binding': 'error',
  '@angular-eslint/template/prefer-ngsrc': 'error',
  '@angular-eslint/template/prefer-self-closing-tags': 'error',
  '@angular-eslint/template/prefer-static-string-properties': 'error',
  'no-restricted-syntax': [
    'error',
    {
      selector: 'BoundAttribute[name="hidden"]',
      message: 'Do not use [hidden] in Angular templates. Use @if instead.'
    }
  ]
};

module.exports = defineConfig([
  globalIgnores(ignoredPaths),
  {
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, tseslint.configs.recommended, tseslint.configs.stylistic],
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: typeScriptRules
  },
  {
    files: ['src/**/*.ts'],
    extends: [angular.configs.tsRecommended],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname
      }
    },
    processor: angular.processInlineTemplates,
    rules: angularRules
  },
  {
    files: ['src/**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: templateRules
  },
  eslintConfigPrettier
]);
