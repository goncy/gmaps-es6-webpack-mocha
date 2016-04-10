var path = require("path");

module.exports = {
  devtool: 'eval',
  context: __dirname,
  entry: {
    bundle: './src/index.js',
    test: './tests.js'
  },
  output: {
    path: __dirname + "/build",
    filename: '[name].js',
    publicPath: "/"
  },
  devServer: {
    contentBase: './public',
    port: 3333
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.png$/,
        loader: "file?prefix=img&limit=10000/"
      },
      {
        test: /\.test\.js$/,
        loader: "mocha!babel"
      }
    ],
  },
  resolve: {
    extensions: ["", ".js", ".scss", ".css"]
  }
}