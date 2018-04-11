const HtmlWebPackPlugin = require("html-webpack-plugin");
var webpack = require('webpack');
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/index.html",
  filename: "./index.html"
});

const hotModulePlugin = new webpack.HotModuleReplacementPlugin({
  multiStep: true
});

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: "localhost",
    port: 3000,
    proxy: {
      "/api/**": {
        target: "http://localhost:5000",
        secure: false
      }
    },
    contentBase: path.join(__dirname, "public")
  },

  plugins: [htmlPlugin,hotModulePlugin]
};
