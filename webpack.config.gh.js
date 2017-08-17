const resolve = require('path').resolve;

module.exports = {
  entry: './src/main.js',
  output: {
    library: 'd3re',
    libraryTarget: 'umd',
    filename: 'd3re.min.js',
    path: resolve(__dirname, ''),
  },
};
