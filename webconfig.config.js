const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/main.ts',
    polyfills: './src/polyfills.ts',
    styles: './src/styles.scss'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['@ngtools/webpack']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@stomp/stompjs': path.resolve(__dirname, 'node_modules/@stomp/stompjs'),
      'dgram': path.resolve(__dirname, 'node_modules/dgram')
    }
  }
};