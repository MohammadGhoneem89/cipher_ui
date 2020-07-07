var config = {
  entry: ['whatwg-fetch', './core/main.js'],

  output: {
    path: './',
    filename: 'index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true
  },
  externals: [{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
  }],

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

  }
};

module.exports = config;