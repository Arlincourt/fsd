module.exports = {
  env: {
    es6: true,
    jquery: true,
    browser: true,
    node: true,
    jest: true,
  },
  parser: '@babel/eslint-parser',
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  rules: {
    "import/extensions": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-shadow": "off",
    "no-new": "off",
    "class-methods-use-this": "off",
    "no-underscore-dangle": 'off'
  },
  settings: {
    'import/resolver': {
      node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
      },
  },
  }
};