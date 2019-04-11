const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            plugins: ['lodash'],
            presets: ['es2015']
          }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            },
          },
        ]
      },
      {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
             'file-loader'
           ]
       }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new LodashModuleReplacementPlugin()
  ],
};
