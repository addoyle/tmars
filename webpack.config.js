const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, "src", "client", "index.js"),
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
            test: /\.(s)?css$/,
            use: [
              "style-loader",
              "css-loader",
              "sass-loader"
            ]
          },
          {
            test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }]
          },
          {
            test: /\.(png|svg|jpg|gif|ico)$/,
            use: ['file-loader']
          }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public'),
        port: 3000
    }
};
