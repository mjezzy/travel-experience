const path = require('path');

module.exports = {
  entry: './src/index.js', // Adjust the entry point as needed
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "fs": false, // Disable fs module for client-side
      "path": false,//require.resolve("path-browserify"),
      "os": false, //require.resolve("os-browserify/browser"),
      "assert": false, //require.resolve("assert/"),
      "crypto": false, //require.resolve("crypto-browserify"),
      "util": false, //require.resolve("util/"),
      "http": false, //require.resolve("stream-http"),
      "https": false, //require.resolve("https-browserify"),
      "querystring": false, //require.resolve("querystring-es3"),
      "url": false//require.resolve("url/")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};