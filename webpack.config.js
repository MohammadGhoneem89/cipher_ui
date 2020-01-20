const webpack = require('webpack');
const config = {
  entry: ['whatwg-fetch', './core/main.js'],

  output: {
    path: './',
    filename: 'index.js',
  },

  devServer: {
    inline: true,
    port: 3000,
    stats: 'minimal',
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',

        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.css$/,
        loader: 'css-loader'
      }

    ]
  },
  plugins: [
    // minify output
    new webpack.optimize.UglifyJsPlugin()
  ]
};


module.exports = config;