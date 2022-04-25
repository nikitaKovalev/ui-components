module.exports = {
  '*.{js,ts,html,md,scss,json}': ['npm run lint -- --fix', 'prettier --write', 'git add'],
  '*.scss': ['stylelint --fix', 'git add'],
};
