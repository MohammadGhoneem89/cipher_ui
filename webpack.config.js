var config = {
    entry: ['whatwg-fetch', './main.js'],

   output: {
      path:'./',
      filename: 'index.js',
   },

   devServer: {
      inline: true,
      port: 3000,
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
               presets: ['es2015', 'react','stage-2']
            }
         },
		 {
			test: /\.css$/,
			loader: 'css-loader'
		 }

      ]

   }
}

module.exports = config;