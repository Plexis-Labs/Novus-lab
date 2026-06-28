/**
 * lint-staged configuration
 * @see https://github.com/lint-staged/lint-staged/issues/825
 */
export default {
  '*.{ts,tsx,js,jsx}': [
    () => 'eslint --fix --max-warnings 0 .',
    'prettier --write',
  ],

  '*.{json,md,yaml,yml,css}': ['prettier --write'],
}
