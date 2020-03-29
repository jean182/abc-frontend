module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'jest/jsx-props-no-spreading': "off",
    'jsx-a11y/label-has-associated-control': [ 'error', {
      required: {
        'some': [ 'nesting', 'id'  ]
      }
    }],
    'jsx-a11y/label-has-for': [ 'error', {
      required: {
        'some': [ 'nesting', 'id'  ]
      }
    }]
  },
};
