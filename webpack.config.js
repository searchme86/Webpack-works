const path = require('path');
// TerserPlugin : minifying bundling size
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    // path: './dist',
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/',
  },
  mode: 'none',
  module: {
    rules: [
      // 여기부터=> resource(이미지, 텍스트 파일) 관련
      // {
      //   test: /\.(ttf)$/,
      //   type: 'asset/resource',
      // },
      // {
      //   test: /\.(png|jpg)$/,
      //   type: 'asset/resource',
      // },
      // {
      //   test: /\.(png|jpg)$/,
      //   type: 'asset/inline',
      // },
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
      {
        test: /\.txt/,
        type: 'asset/source',
      },
      // 여기까지=> resource(이미지, 텍스트 파일) 관련,
      // 여기부터 스타일 loader
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.scss$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      // },
      // 여기까지 스타일 loader
      // npm install @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev
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
    ],
  },
  plugins: [
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};
