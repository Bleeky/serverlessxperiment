module.exports = {
    "env": {
      "browser": false,
      "es6": true,
      "node": true
    },
    parser: 'babel-eslint',
    extends: ['airbnb-base'],
    'settings': {
      'import/resolver': {
        "babel-module": {}
      }
    },
    'rules': {
      'import/prefer-default-export': 0,
      "no-plusplus": 0,
    }
}
  