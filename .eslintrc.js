module.exports = {
    root: true,
    parserOptions: {
      sourceType: 'module',
      parser: 'babel-eslint'
    },
    env: {
      browser: true,
    },
    extends: ['airbnb-base'],
    'rules': {
      "no-plusplus": 0,
    }
  }
  