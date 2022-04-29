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
    'out-tsc',
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
};
