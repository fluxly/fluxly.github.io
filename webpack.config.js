const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  
};
module.exports = {
  // 🔹 Where webpack starts building
  entry: "./index.js",

  // 🔹 Where webpack outputs the bundle
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "ravel-dist"),
    clean: true // wipes dist/ on rebuild
  },

  // 🔹 Development mode (faster, better errors)
  mode: "development",

  // 🔹 Resolve ES modules cleanly
  resolve: {
    extensions: [".js"],
  },

  // 🔹 Enable source maps for debugging
  devtool: "source-map",

  plugins: [
    new webpack.DefinePlugin({
      __RAVEL_COMPONENT_BASE__: JSON.stringify("ravel-dist/"), 
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../../core/web-components/images"),
          to: "images",
        },
      ],
    }),
  ],
};
