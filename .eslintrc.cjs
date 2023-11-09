module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
   // parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    '@nuxtjs',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/comment-directive': 'off'
  }
}
