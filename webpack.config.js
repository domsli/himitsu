const path = require('path');

module.exports = {
  entry: {
    'style.css': './public/scss/style.scss',
    'main.js': './public/js/main.js', 
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, './public/bundles'),
  },
  devServer: {
    port: 8080,
    proxy: [ // allows redirect of requests to webpack-dev-server to another destination
      {
        context: '**',
        target: 'http://localhost:9000', //server and port to redirect to
        secure: false //don't use https
      }
    ]
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        {
          loader: 'style-loader'
	},
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader'
        }
      ]
    }, {
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }],
  },
  mode: 'development'
};
