const path = require('path');

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
      //css loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
