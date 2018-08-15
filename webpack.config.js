const PUBLIC_PATH = require('path').join(__dirname);

module.exports = {
  mode: 'development',
  entry: 'index.js',
  output: {
    path: PUBLIC_PATH,
    filename: 'index.js'
  },
  devServer: {
    contentBase: PUBLIC_PATH,
    compress: true,
    port: 9000
  },
  devtool: 'source-map'
};
