const PUBLIC_PATH = require('path').join(__dirname);

module.exports = {
  mode: 'development',
  entry: './scripts/index.js',
  output: {
    path: PUBLIC_PATH,
    filename: 'index.js'
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
    }]
  },
  devServer: {
    contentBase: PUBLIC_PATH,
    compress: true,
    port: 9000
  },
  devtool: 'eval-source-map'
};
