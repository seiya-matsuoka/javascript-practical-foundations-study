import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'coverage/**', 'dist/**', 'build/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      // 学習用コードでは実行結果を観察するため、console出力を許可する。
      'no-console': 'off',

      // 比較用の変数や途中確認用の値を置くことがあるため、未使用は警告に留める。
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // 注意例を扱う場面を考慮し、定数条件はエラーではなく警告にする。
      'no-constant-condition': ['warn', { checkLoops: false }],
    },
  },
  {
    files: ['src/02-values-types-comparison/**/*.js'],
    rules: {
      eqeqeq: 'off',
      'use-isnan': 'off',
      'no-compare-neg-zero': 'off',
      'no-constant-binary-expression': 'off',
      'no-unassigned-vars': 'off',
    },
  },
  {
    files: ['src/03-variables-scope-reference/**/*.js'],
    rules: {
      'no-useless-assignment': 'off',
      'no-constant-condition': 'off',
    },
  },
  {
    files: ['src/12-node-json-practical-patterns/**/*.js'],
    rules: {
      'no-redeclare': 'off',
      'no-constant-condition': 'off',
      'no-constant-binary-expression': 'off',
    },
  },
];
