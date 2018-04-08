const resolve = require('path').resolve;
const Jarvis = require('webpack-jarvis');

module.exports = {
  entry: './src/main.js',
  output: {
    library: 'd3re',
    libraryTarget: 'umd',
    filename: 'd3re.min.js',
    path: resolve(__dirname, 'dist')
  },
  externals: {
    d3: {
      commonjs: 'd3',
      commonjs2: 'd3',
      amd: 'd3',
      root: 'd3'
    }
  },
  plugins: [new Jarvis()]
};
