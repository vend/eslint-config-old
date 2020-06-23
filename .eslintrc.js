const restrictedGlobals = require('confusing-browser-globals')
const prettierConfig = require('./prettier.config')

module.exports = {
  env: {
    browser: true,
  },
  plugins: ['@typescript-eslint', 'jsx-a11y', 'prettier', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'standard',
    'standard-react',
    // These should go last since they disable all formatting-related lints.
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/standard',
  ],
  rules: {
    // Prefer foo.bar over foo['bar'].
    'dot-notation': 'error',

    // Disallow use of the console object, such as console.log.
    'no-console': 'error',

    // Disallow empty conditional and loop bodies.
    'no-empty': 'error',

    // Don't allow Object prototype built-ins.
    // Standard turns this on but it doesn't seem very useful.
    'no-prototype-builtins': 'off',

    // Disallow browser globals with generic names like 'event' and 'name'.
    'no-restricted-globals': ['error'].concat(restrictedGlobals),

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

    // Naming conventions. The TypeScript rule is much more complete and configurable than ESLint's.
    camelcase: 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'variable',
        // Allow PascalCase for React components, UPPER_CASE for constants.
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'function',
        // Allow PascalCase for React components.
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      // Don't require object properties to conform to any convention.
      {
        selector: 'property',
        format: null,
      },
      // However, require class members to be camelCase.
      {
        selector: 'memberLike',
        modifiers: ['private', 'protected', 'public'],
        format: ['camelCase'],
      },
      // Types should be PascalCase.
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      // But sometimes we use enums like consts, especially when converting from JS.
      {
        selector: 'enum',
        format: ['PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'enumMember',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
    ],

    // Require imports to be first in the file, as they're hoisted.
    'import/first': 'error',

    // Don't allow default exports.
    'import/no-default-export': 'error',

    // Have a convention around import order.
    'import/order': 'error',

    // jsx-a11y rules copied from create-react-app.
    'jsx-a11y/accessible-emoji': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        aspects: ['noHref', 'invalidHref'],
      },
    ],
    'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': ['error', { ignoreNonDOM: true }],
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/iframe-has-title': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-distracting-elements': 'error',
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'jsx-a11y/scope': 'error',

    // Require that code be formatted according to Prettier rules.
    'prettier/prettier': [
      'error',
      prettierConfig,
      {
        // Rule should not be affected by a Prettier configuration file.
        usePrettierrc: false,
      },
    ],

    // Don't require event handlers to be prefixed with "handle".
    'react/jsx-handler-names': 'off',

    // We use TypeScript so don't usually need PropTypes.
    'react/prop-types': 'off',

    // Prevent stale closures in useEffect, useCallback, etc.
    'react-hooks/exhaustive-deps': 'error',

    // Enforce the Rules of Hooks.
    'react-hooks/rules-of-hooks': 'error',
  },

  overrides: [
    // Relax certain rules for tests.
    {
      files: ['cypress/**', '**/*.po.*', '**/*.spec.*', '**/*.test.*'],
      env: {
        jest: true,
        mocha: true,
      },
      globals: {
        cy: 'readable',
        Cypress: 'readable',
      },

      rules: {
        'no-console': 'off',
      },
    },

    // TypeScript-specific rules. Somewhat inspired by tslint:recommended.
    {
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
        // Checked by TypeScript and creates false positives with class method
        // overloads.
        'no-dupe-class-members': 'off',

        // This rule has issues with the TypeScript parser, but tsc catches
        // these sorts of errors anyway.
        // See: https://github.com/typescript-eslint/typescript-eslint/issues/342
        'no-undef': 'off',

        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',

        // Conflicts with TypeScript's noImplicitReturns option.
        'no-useless-return': 'off',

        // Require overloads to be grouped together
        '@typescript-eslint/adjacent-overload-signatures': 'error',

        // Use T[] over Array<T> for simple types
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],

        // Prevent use of certain types that are almost always mistakes or have better alternatives.
        // This configuration is based on the default, but excludes '{}' and 'object'.
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              String: {
                message: 'Use string instead',
                fixWith: 'string',
              },
              Boolean: {
                message: 'Use boolean instead',
                fixWith: 'boolean',
              },
              Number: {
                message: 'Use number instead',
                fixWith: 'number',
              },
              Symbol: {
                message: 'Use symbol instead',
                fixWith: 'symbol',
              },

              Function: {
                message: [
                  'The `Function` type accepts any function-like value.',
                  'It provides no type safety when calling the function, which can be a common source of bugs.',
                  'It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.',
                  'If you are expecting the function to accept certain arguments, you should explicitly define the function shape.',
                ].join('\n'),
              },

              // object typing
              Object: {
                message: [
                  'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
                  '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
                  '- If you want a type meaning "any value", you probably want `unknown` instead.',
                ].join('\n'),
              },
            },
            extendDefaults: false,
          },
        ],

        // Require 'as' type assertions.
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          { assertionStyle: 'as' },
        ],

        // Prefer interfaces over type literals (type T = { ... }).
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],

        // Require fields and methods to be explicitly labeled public, private, or protected.
        // Exclude public constructors.
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          { overrides: { constructors: 'no-public' } },
        ],

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

        // Prefer array literals over the array constructor.
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'error',

        // Don't allow extra semi-colons.
        'no-extra-semi': 'off',
        '@typescript-eslint/no-extra-semi': 'error',

        // Disallow empty interfaces, which are not useful.
        '@typescript-eslint/no-empty-interface': 'error',

        // Disallow invalid declarations of constructors on interfaces and 'new' methods on classes.
        '@typescript-eslint/no-misused-new': 'error',

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

        // Prefer function types over callable interface types with no other members.
        '@typescript-eslint/prefer-function-type': 'error',

        // Prefer import instead of triple-slash reference comments.
        '@typescript-eslint/triple-slash-reference': 'error',

        // Warn when two overloads could be combined into one.
        '@typescript-eslint/unified-signatures': 'error',
      },
    },
  ],
}
