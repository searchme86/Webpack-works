const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    // open: true,
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.js', 'scss'],
  },
  entry: {
    sample01: './src/hello-world.js',
    sample02: './src/hello-world.js',
    sample03: './src/hello-world.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset/source',
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        // include: [path.resolve(__dirname, 'src')],
      },
    ],
  },
  plugins: [
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['sample01'],
      filename: 'sample01.html',
      title: 'Hello world',
      template: 'src/page-template.hbs',
      description: 'hello world',
      minify: 'false',
    }),
    new HtmlWebpackPlugin({
      chunks: ['sample02'],
      filename: 'sample02.html',
      title: 'kiwi',
      template: 'src/page-template.hbs',
      description: 'Kiwi',
      minify: 'false',
    }),
  ],
};
