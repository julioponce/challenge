module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  globals: {
    expect: true,
    describe: true,
    it: true,
    beforeAll: true,
    beforeEach: true,
    before: true,
    after: true,
    afterEach: true,
    page: true,
    self: true,
    workbox: true,
    fetch: true,
    caches: true
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-new': 'off',
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/attributes-order': 'off',
    'vue/v-bind-style': 'off',
    'vue/html-self-closing': 'off',
    'handle-callback-err': 'off',
    'no-useless-escape': 'off'
  }
}
