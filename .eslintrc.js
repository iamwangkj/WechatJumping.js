module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    images: 'readonly',
    auto: 'readonly',
    device: 'readonly',
    toast: 'readonly',
    exit: 'readonly',
    random: 'readonly',
    sleep: 'readonly',
    floaty: 'readonly',
    colors: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
  }
}
