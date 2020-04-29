const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const plugins = [
    new ExtractTextPlugin("css/[name].[hash].css"),
    new HtmlWebpackPlugin({
      title: 'Tienda',
      template: './templates/index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'docs', to: 'docs' },
      { from: 'images', to: 'images' },
      { from: 'css/*.css', to: 'css', flatten: true }
    ]),
    new Dotenv({
      path: './.env.prod'
    })
  ]

  if (env.NODE_ENV === 'production') {
    plugins.push(
      new CleanWebpackPlugin(['dist'], {root: __dirname})
    )
  }

  return {
    mode: 'production',
    entry: {
      "store": path.resolve(__dirname, 'src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[hash].js',
      publicPath: '/',
      chunkFilename: 'js/[id].[chunkhash].js',
    },
    devServer: {
      port: 9001,
    },
    node: {
      fs: "empty",
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
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                }
              }
            ]
          })
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