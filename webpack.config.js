const path = require('path');
const PUBLIC_PATH = path.join(__dirname);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './scripts/index.js',
    './styles/index.scss'
  ],
  output: {
    path: path.join(PUBLIC_PATH, "dist"),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'scripts'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: 'env'
          }
        }
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'styles'),
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                url: false
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
    },
    {
      test: /\.(gif|svg|jpg|png)$/,
      loader: "file-loader"
    }
  ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './styles/index.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'images'),
      to: path.resolve(__dirname, 'dist', 'images')
    }])
  ],
  devServer: {
    contentBase: PUBLIC_PATH,
    compress: true,
    port: 9000
  },
  devtool: 'eval-source-map'
};
