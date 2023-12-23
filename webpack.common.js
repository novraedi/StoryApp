/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const htmlWebpackPluginConfig = {
  meta: {
    viewport:
      'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
    'theme-color': '#4285f4',
  },
  templateParameters: {
    brandName: 'Story App',
  },
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // eslint-disable-next-line global-require
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/views/index.html'),
      ...htmlWebpackPluginConfig,
    }),

    new HtmlWebpackPlugin({
      filename: 'books/add.html',
      template: path.resolve(__dirname, 'src/views/books/add.html'),
      ...htmlWebpackPluginConfig,
    }),

    // Auth pages
    new HtmlWebpackPlugin({
      title: 'Login',
      filename: 'auth/login.html',
      template: path.resolve(__dirname, 'src/views/auth/login.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Register',
      filename: 'auth/register.html',
      template: path.resolve(__dirname, 'src/views/auth/register.html'),
      ...htmlWebpackPluginConfig,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
