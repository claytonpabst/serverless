const path = require("path");
// eslint-disable-next-line import/no-extraneous-dependencies
const nodeExternals = require("webpack-node-externals");
// eslint-disable-next-line import/no-extraneous-dependencies
const slsw = require("serverless-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  node: {
    __dirname: true
  },
  devtool: "nosources-source-map",
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react-app", "stage-2"],
          plugins: ["css-modules-transform"]
        }
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000,
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
    sourceMapFilename: "[file].map"
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "client/build", to: "build" }], {
      debug: "info"
    })
  ]
};