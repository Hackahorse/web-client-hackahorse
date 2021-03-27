module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/max-attributes-per-line': [1, {
      'singleline': 1,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    }],
    'no-unused-vars': 1,
    'comma-dangle': [1, 'always-multiline'],
    'linebreak-style': ['error', 'unix'],
    "vue/name-property-casing": ["error", "kebab-case"]
  }
}
