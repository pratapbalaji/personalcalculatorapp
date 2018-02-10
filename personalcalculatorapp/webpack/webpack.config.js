var path = require('path');
var BundleTracker = require('webpack-bundle-tracker');
var webpack = require('webpack');
var config = {};

config.entry = {
  main: [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, '../static/js/src/index')
  ]
};

config.devtool = 'inline-sourcemap';
config.output = {
  path: path.join(__dirname, '../static/builds-development/'),
  filename: 'main.js',
  publicPath: 'http://0.0.0.0:3000/static/builds-development/',
};

config.module = {
  loaders: [{
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    include: [path.join(__dirname, '../static/js/src')],
    loader: 'babel-loader',
    query: {
      presets: ['es2015', 'stage-2', 'react']
    }
  }, {
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  }]
};

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new BundleTracker({ filename: './webpack/webpack-stats.dev.json' }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      BASE_URL: JSON.stringify('http://0.0.0.0:3000/'),
    }
  })
];

config.module.loaders[0].query.plugins = ['react-hot-loader/babel'];

config.devServer = {
  inline: true,
  progress: true,
  hot: true,
  historyApiFallback: true,
  host: '0.0.0.0',
  port: 3000
};

module.exports = config;