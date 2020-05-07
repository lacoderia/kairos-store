const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
  const plugins = [
    new CleanWebpackPlugin(['dist'], {root: __dirname}),
    new CopyWebpackPlugin([
      { from: 'docs', to: 'docs' },
      { from: 'images', to: 'images' },
      { from: 'css/*.css', to: 'css', flatten: true }
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Tienda',
      template: './templates/index.html',
      filename: './store.html',
    }),
    new Dotenv({
      path: `./.env.${env.NODE_ENV}`
    })
  ]

  return {
    mode: 'production',
    entry: {
      'store': path.resolve(__dirname, 'src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, '../kairos-build'),
      filename: 'js/[name].[hash].js',
      publicPath: '/',
      chunkFilename: 'js/[id].[chunkhash].js',
    },
    devServer: {
      port: 9001,
    },
    node: {
      fs: 'empty',
    },
    optimization: {
      minimizer: [new TerserJSPlugin({extractComments: false}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [ 
                '@babel/plugin-proposal-class-properties', 
                '@babel/plugin-proposal-optional-chaining'
              ],
            }
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'images/[name].[hash].[ext]',
            }
          }
        },
      ]
    },
    plugins,
    resolve: {
      alias: {
        src: path.join(__dirname, '/src'),
        components: path.join(__dirname, '/src/components'),
        templates: path.join(__dirname, '/src/templates'),
        views: path.join(__dirname, '/src/views'),
        library: path.join(__dirname, '/src/library'),
        res: path.join(__dirname, '/src/res'),
        http: path.join(__dirname, '/src/http'),
        services: path.join(__dirname, '/src/services'),
        styles: path.join(__dirname, '/src/styles'),
      },
      extensions: ['.ts', '.js', '.jsx']
    },
  }
}