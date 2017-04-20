var resolve = require('path').resolve;

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'chart.min.js',
    path: resolve(__dirname, 'dist')
  }
};
