const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    // path: './dist',
    path: path.resolve(__dirname, './dist'),
  },
  mode: 'none',
};
