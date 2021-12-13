module.exports = {
  env: {
    es6: true,
    jquery: true,
    browser: true,
    node: true,
    jest: true,
  },
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