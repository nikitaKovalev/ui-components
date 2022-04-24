module.exports = {
  root: true,
  extends: [
    '@lightech-llc/eslint-config-angular',
    '@lightech-llc/eslint-config-angular/html',
    '@lightech-llc/eslint-config-angular/rxjs',
  ],
  ignorePatterns: [
    'e2e',
    'src/**/test.ts',
    'src/**/main.ts',
    'src/**/polyfills.ts',
    '*.js',
    '*.json',
    '*.scss',
    '*.md',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: [require.resolve('./tsconfig.eslint.json')],
  },
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-useless-constructor': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/await-thenable': 'error',
    'require-await': 'error',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    'prefer-template': 'error',
  },
};
