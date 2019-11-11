module.exports = {
  env: {
    es2020: true,
    jest: true,
    node: true,
  },
  extends: [
    'standard-with-typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
}
