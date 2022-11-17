const path = require('path');
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
    // filename: 'bundle.js',
    filename: '[name].bundle.js',
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
  mode: 'development',
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true,
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // 별도 파일을 만들기 위해, filename에 특정 이름을 입력함
      filename: 'hello-world.html',
      // webpack에게 특정파일에 해당한 속성을 집어넣을 수 있도록 chunk 옵션을 넣음
      // chunk name은 entry에 텍스트를 가져다 씀
      // entry: {
      //   'hello-world': './src/hello-world.js',
      //   kiwi: './src/kiwi.js',
      // },
      chunks: ['hello-world'],
      title: 'Hello world',
      template: 'src/page-template.hbs',
      description: 'Hello world',
    }),
    // 별도의 html이 설정되도록 새로운 HtmlWebpackPlugin 인스턴스를 생성
    new HtmlWebpackPlugin({
      // 별도 파일을 만들기 위해, filename에 특정 이름을 입력함
      filename: 'kiwi.html',
      // webpack에게 특정파일에 해당한 속성을 집어넣을 수 있도록 chunk 옵션을 넣음
      // chunk name은 entry에 텍스트를 가져다 씀
      // entry: {
      //   'hello-world': './src/hello-world.js',
      //   kiwi: './src/kiwi.js',
      // },
      chunks: ['kiwi'],
      title: 'Kiwi',
      template: 'src/page-template.hbs',
      description: 'Kiwi',
    }),
  ],
};