module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'standard',
    '@vue/typescript',
    'prettier',
    'prettier/standard',
    'prettier/vue',
    'prettier/@typescript-eslint',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {},
}
