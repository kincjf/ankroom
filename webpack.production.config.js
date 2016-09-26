// 임시로 만들었음, angular2-webpack-starter로 바꾸자
var sliceArgs = Function.prototype.call.bind(Array.prototype.slice);
var toString = Function.prototype.call.bind(Object.prototype.toString);

var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


var config = {
  entry: {
    'vendor': [
      // Polyfills
      'core-js/es6',
      'core-js/es7/reflect',
      'zone.js/dist/zone',
      'zone.js/dist/long-stack-trace-zone',
      // Angular2
      '@angular/common',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/core',
      '@angular/router',
      '@angular/http',
      // RxJS
      'rxjs',
      // Other
      'angular2-jwt',
      'lodash'
    ],
    'app': [
      './src/index'
    ]
  },
  // Config for our build files
  output: {
    path: root('dist'),
    filename: '/build/[name].js',
    // filename: '[name].[hash].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
    // publicPath: 'http://mycdn.com/'
  },

  resolve: {
    root: __dirname,
    extensions: [
      '',
      '.ts',
      '.js',
      '.json',
      '.css',
      '.html'
    ]
  },

  module: {
    preLoaders: [{test: /\.ts(x?)$/, loader: 'tslint-loader'}],

    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      query: {
        'ignoreDiagnostics': [
          2403, // 2403 -> Subsequent variable declarations
          2300, // 2300 Duplicate identifier
          2304, // 2304 Cannot find name
          2374, // 2374 -> Duplicate number index signature
          2375  // 2375 -> Duplicate string index signature
        ]
      },
      exclude: [ /\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/ ]
    },
      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader'},

      // Support for CSS as raw text
      {test: /\.css$/, loader: 'raw-loader'},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw-loader'},
    ],
    noParse: [
      /zone\.js\/dist\/.+/,
      /reflect-metadata/,
      /es(6|7)-.+/,
      /.zone-microtask/,
      /.long-stack-trace-zone/
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'angular': 'angular'
    }),
    new CommonsChunkPlugin({name: 'vendor', filename: 'build/vendor.js', minChunks: Infinity}),
    new CommonsChunkPlugin({name: 'common', filename: 'build/common.js', minChunks: 2, chunks: ['app', 'vendor']}),
    new CopyWebpackPlugin([
      {from: 'src', to: 'src'},
      {from: 'index.html'}
    ])],

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false
  },

  resolveLoader: {
    modulesDirectories: [
      path.join(__dirname, 'node_modules')
    ]
  }
};

function root(args) {
  args = sliceArgs(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
function rootNode(args) {
  args = sliceArgs(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}

module.exports = config;
