const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  const plugins = [
    new HtmlWebpackPlugin({
      title: 'Tienda',
      template: './templates/index.html',
      filename: './index.html',
    }),
    new Dotenv()
  ]
  
  return {
    mode: 'development',
    entry: {
      "index": path.resolve(__dirname, 'src/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
      publicPath: '/'
    },
    devServer: {
      port: 9001,
      historyApiFallback: true,
    },
    devtool: 'eval-source-map',
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
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1000000,
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
    }
  }
} 