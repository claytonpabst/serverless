const path = require("path");
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require("webpack-node-externals");
// eslint-disable-next-line import/no-extraneous-dependencies
const slsw = require("serverless-webpack");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  node: {
    __dirname: true
  },
  devtool: "source-map",
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      { test: /\.graphql?$/, loader: "webpack-graphql-loader" }
    ]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  }
};