const path = require('path');
// MiniCssExtractPlugin: generating a style file in dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// keep recent data of dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// generate new html by new bundle
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  entry: {
    'hello-world': './src/hello-world.js',
    kiwi: './src/kiwi.js',
  },
  output: {
    // filename: 'bundle.js',
    // browser chaching works
    // filename: 'bundle.[contenthash].js',
    filename: '[name].[contenthash].js',
    // path: './dist',
    path: path.resolve(__dirname, './dist'),
    // --htmlWepackPlugin--
    // publicPath: 'dist/',
    publicPath: '',

    // clean: {
    //   dry: true,
    //   keep: /\.css/,
    // },
  },
  mode: 'production',
  optimization: {
    // 외부 라이브러리(예: lodash)를 Import 할 경우, bundle 파일의 사이즈가 증가함
    // 외부 라이브러리로 인한 번들 사이즈를 줄이기위한 기능
    splitChunks: {
      // 라이브러리를 import한 모든 파일을 가리키는 설정
      chunks: 'all',
      // 최소 사이즈가 넘을 경우, 번들 사이즈를 줄일 지를 설정
      minSize: 3000,
    },
  },
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
      // hbs rule
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ],
  },
  // npm install mini-css-extract-plugin --save-dev
  // npm install clean-webpack-plugin --save-dev
  // npm install html-webpack-plugin --save-dev
  // npm install handlebars-loader --save-dev
  // npm install handlebars --save-dev
  plugins: [
    new MiniCssExtractPlugin({
      // filename: 'style.css',
      // filename: 'style.[contenthash].css',
      filename: '[name].[contenthash].css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello world',
      template: 'src/page-template.hbs',
      description: 'Hello world',
      // 별도 파일을 만들기 위해, filename에 특정 이름을 입력함
      filename: 'hello-world.html',
      // webpack에게 특정파일에 해당한 속성을 집어넣을 수 있도록 chunk 옵션을 넣음
      // chunk name은 entry에 텍스트를 가져다 씀
      // entry: {
      //   'hello-world': './src/hello-world.js',
      //   kiwi: './src/kiwi.js',
      // },
      chunks: ['hello-world'],
      // minify되지 않게(false) 출력하도록 설정=> human readable
      minify: false,
    }),
    // 별도의 html이 설정되도록 새로운 HtmlWebpackPlugin 인스턴스를 생성
    new HtmlWebpackPlugin({
      title: 'kiwi',
      template: 'src/page-template.hbs',
      description: 'kiwi',
      // 별도 파일을 만들기 위해, filename에 특정 이름을 입력함
      filename: 'kiwi.html',
      // webpack에게 특정파일에 해당한 속성을 집어넣을 수 있도록 chunk 옵션을 넣음
      // chunk name은 entry에 텍스트를 가져다 씀
      // entry: {
      //   'hello-world': './src/hello-world.js',
      //   kiwi: './src/kiwi.js',
      // },
      chunks: ['kiwi'],
      // minify되지 않게(false) 출력하도록 설정=> human readable
      minify: false,
    }),
  ],
};
