const prettierConfig = require('./prettier.config')

module.exports = {
  plugins: ['prettier'],
  extends: [
    'standard',
    'standard-react',
    // These should go last since they disable all formatting-related lints.
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/standard',
  ],
  rules: {
    // Disabled so we don't have to change chai assertions.
    // See: https://github.com/standard/standard/issues/690
    'no-unused-expressions': 'off',

    // We use TypeScript so don't usually need PropTypes.
    'react/prop-types': 'off',

    'prettier/prettier': [
      'error',
      prettierConfig,
      {
        // Rule should not be affected by a Prettier configuration file.
        usePrettierrc: false,
      },
    ],
  },
}
