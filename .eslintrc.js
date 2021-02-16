const path = require('path');
const src = path.resolve(__dirname, 'src');
const components = path.resolve(__dirname, 'src', 'components');

module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: 'tsconfig.json',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', src],
          ['components', components],
        ]
      }
    }
  }
};