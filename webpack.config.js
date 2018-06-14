const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

// Constant with our paths
const paths = {
	DIST: path.resolve(__dirname, 'build'),
	SRC: path.resolve(__dirname, 'source'),
  JS: path.resolve(__dirname, 'source/js')
};

// Webpack configuration
module.exports = {
  devtool: 'inline-source-map',
	entry:  [path.join(paths.JS, 'scripts.js')],
	output: {
    path: paths.DIST,
    filename: 'js/scripts.js'
  },
  devServer: {
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(paths.SRC, 'index.html')
    }),
    new ExtractTextPlugin('css/styles.css'),
    new CopyWebpackPlugin([
      {
        from: path.join(paths.SRC, 'images'),
        to: path.join(paths.DIST, 'images')
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer('last 2 versions')]
              }
            },
          ],
        })
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
