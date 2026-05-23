/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  ignoreFiles: ['dist/**/*', 'coverage/**/*', '.angular/**/*', 'node_modules/**/*'],
  rules: {
    // Angular components may intentionally start with an empty stylesheet.
    'no-empty-source': null
  }
};
