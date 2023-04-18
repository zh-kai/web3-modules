module.exports = {
  plugins: ['prettier'],
  extends: ['@nuxtjs/eslint-config', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-model-argument': 'off',
    'no-useless-constructor': 'off',
    'vue/no-mutating-props': 'off',
    'vue/max-attributes-per-line': 'off'
  }
}
