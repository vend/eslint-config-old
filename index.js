const prettierConfig = require('./prettier.config')

module.exports = {
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'standard',
    'standard-react',
    // These should go last since they disable all formatting-related lints.
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/standard',
  ],
  rules: {
    // Prefer () => 0 over () => { return 0 }.
    'arrow-body-style': 'error',

    // Prefer foo.bar over foo['bar'].
    'dot-notation': 'error',

    // Disallow use of the console object, such as console.log.
    'no-console': 'error',

    // Disallow empty conditional and loop bodies.
    'no-empty': 'error',

    // Disabled so we don't have to change chai assertions.
    // See: https://github.com/standard/standard/issues/690
    'no-unused-expressions': 'off',

    // Don't allow unused labels.
    'no-unused-labels': 'off',

    // Disallow the 'var' keyword.
    'no-var': 'error',

    // Prefer ES6 shorthand notation in object literals.
    'object-shorthand': 'error',

    // Make variables const when possible.
    'prefer-const': 'error',

    // Require the radix argument to parseInt to avoid unintentionally allowing hex or octal.
    radix: 'error',

    // Require PascalCased class names.
    '@typescript-eslint/class-name-casing': 'error',

    // Have a convention around import order.
    'import/order': 'error',

    // Prefer arrow functions when passing callbacks.
    'prefer-arrow-callback': 'error',

    // Require that code be formatted according to Prettier rules.
    'prettier/prettier': [
      'error',
      prettierConfig,
      {
        // Rule should not be affected by a Prettier configuration file.
        usePrettierrc: false,
      },
    ],

    // We use TypeScript so don't usually need PropTypes.
    'react/prop-types': 'off',
  },

  // TypeScript-specific rules. Somewhat inspired by tslint:recommended.
  overrides: {
    files: ['**/*.ts', '**/*.tsx'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },

    rules: {
      // Require overloads to be grouped together
      '@typescript-eslint/adjacent-overload-signatures': 'error',

      // Use T[] over Array<T> for simple types
      '@typescript-eslint/array-type': ['error', 'array-simple'],

      // Prevent use of certain types that are almost always mistakes.
      '@typescript-eslint/ban-types': [
        'error',
        {
          types: {
            Boolean: {
              fixWith: 'boolean',
              message:
                'Avoid using the `Boolean` type. Did you mean `boolean`?',
            },
            Function: {
              message:
                'Avoid using the `Function` type. Prefer a specific function type like `() => void`.',
            },
            Number: {
              fixWith: 'number',
              message: 'Avoid using the `Number` type. Did you mean `number`?',
            },
            Object: {
              message: 'Avoid using the `Object` type. Did you mean `object`?',
            },
            String: {
              fixWith: 'string',
              message: 'Avoid using the `String` type. Did you mean `string`?',
            },
            Symbol: {
              fixWith: 'symbol',
              message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
            },
          },
        },
      ],

      // Require camelCase names, except for property names.
      camelcase: 'off',
      '@typescript-eslint/camelcase': ['error', { properties: 'never' }],

      // TODO: enable once a new typescript-eslint release is cut and we can exclude constructors, like TSLint.
      // Require fields and methods to be explicitly labeled public, private, or protected.
      // '@typescript-eslint/explicit-member-accessibility': 'error',

      // Require consistent ordering of fields, methods, and constructors.
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'public-static-field',
            'public-static-method',
            'protected-static-field',
            'protected-static-method',
            'private-static-field',
            'private-static-method',
            'instance-field',
            'constructor',
            'instance-method',
          ],
        },
      ],

      // Require 'as' type assertions.
      '@typescript-eslint/no-angle-bracket-type-assertion': 'error',

      // Disallow empty interfaces, which are not useful.
      '@typescript-eslint/no-empty-interface': 'error',

      // Disallow invalid declarations of constructors on interfaces and 'new' methods on classes.
      '@typescript-eslint/no-misused-new': 'error',

      // Don't allow modules or namespaces, except in declaration files.
      '@typescript-eslint/no-namespace': [
        'error',
        { allowDefinitionFiles: true },
      ],

      // Use import instead of triple-slash reference comments.
      '@typescript-eslint/no-triple-slash-reference': 'error',

      // TypeScript-aware unused variable rule.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          // Allow unused function arguments
          args: 'none',
          // Allow destructuring like { a, ...b } = obj even if a is unused, to allow omitting fields.
          ignoreRestSiblings: true,
        },
      ],

      // Prefer ES6-style imports over 'require'.
      '@typescript-eslint/no-var-requires': 'error',

      // Prefer functiopn types over callable interface types with no other members.
      '@typescript-eslint/prefer-function-type': 'error',

      // Prefer interfaces over type literals (type T = { ... }).
      '@typescript-eslint/prefer-interface': 'error',

      // Warn when two overloads could be combined into one.
      '@typescript-eslint/unified-signatures': 'error',
    },
  },
}
