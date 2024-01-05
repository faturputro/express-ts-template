module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  rules: {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'semi': 'error',
    quotes: ['error', 'single'],
  }
};
