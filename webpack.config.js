'use strict';
const LiveReloadPlugin = require('webpack-livereload-plugin');
const webpack = require('webpack');
const MINIFY = process.argv.indexOf('--minify') !== -1;

const sourceDir = __dirname + '/frontend';
const outputDir = __dirname + '/build/public';

const JS_DIST_DIR = `${__dirname}/backend/public/javascripts/`;

const STYLES_SRC_DIR = `${sourceDir}/styles/`;
const STYLES_DIST_DIR = `${outputDir}/styles/`;

const ESLINT_CONFIG_FILE = __dirname + '/.eslintrc';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
// {
//   name: 'styles',
//   cache: true,
//   entry: {
//     // Add more entry point styles
//     // index: `${STYLES_SRC_DIR}index.styl`
//     index: `${STYLES_SRC_DIR}index.styl`
//   },
//   output: {
//     path: STYLES_DIST_DIR,
//     filename: '[name].js'
//   },
//   // module: {
//   //   loaders: [
//   //     {
//   //       test: /\.styl$/,
//   //       loaders: ExtractTextPlugin.extract({
//   //         fallback: 'style-loader',
//   //         use: 'css-loader!postcss-loader!stylus-loader'
//   //       })
//   //     }
//   //   ]
//   // },
//   module: {
//     loaders: [{
//       test: /\.styl$/,
//       loader: 'css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
//     }]
//   },
//   // postcss: () => ({
//   //   defaults: [
//   //     lost,
//   //     assets,
//   //     customMedia,
//   //     fontMagician({
//   //       hosted: `${__dirname}/src/fonts`
//   //     }),
//   //     autoprefixer
//   //   ]
//   // }),
//   plugins: [
//     new ExtractTextPlugin('[name].css'),
//     new LiveReloadPlugin({
//       port: 35739
//     })
//   ]
// },
  {
    name: 'react',
    entry: {
      app: `${sourceDir}/app.js`,
    },
    output: {
      // filename: 'app.js',
      // path: __dirname
      filename: '[name].js',
      path: JS_DIST_DIR
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-0'],
            plugins: [
              "transform-decorators-legacy",
              ['transform-react-jsx', { pragma: 'h' }],
              // ['typecheck', {
              //   disable: {
              //     production: true
              //   }
              // }],
              'syntax-flow',
              'transform-flow-strip-types',
              'transform-runtime'
            ],
            cacheDirectory: true
          },
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css/,
          loader: 'style!css?minimize'
        }
      ]
    },
    plugins: [
      new LiveReloadPlugin({
        port: 35739
      }),
      // new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
  }
];
