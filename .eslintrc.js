module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['airbnb-base'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    'linebreak-style': 0,
    'newline-per-chained-call': 0,
    'max-len': [2, 220],
    'func-names': 'off',
    'consistent-return': 'off'
  }
};
