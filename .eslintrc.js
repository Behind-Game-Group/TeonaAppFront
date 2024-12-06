// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  ignorePatterns: ['/dist/*'],
  rules: {
    'prettier/prettier': 'error',

    'no-unused-vars': ['warn'], // Avertir lorsqu'il y a des variables non utilisées
  },
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
