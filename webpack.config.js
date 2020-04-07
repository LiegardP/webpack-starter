const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let config = {
    entry: "./src/js/index.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "./bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack 4 Starter',
            template: 'dist/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new CopyWebpackPlugin([
            { from: 'src/images', to: 'images' }
        ])
    ],
    resolve: {extensions: ['.js', '.ts']},
    module: {
        rules: [
            {
                test: [/.js$|.ts$/],
                exclude: /(node_modules)/,
                use: {
                loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/typescript'
                        ]
                    }
                }
            },
            {                
                test: [/.css$|.scss$/],                
                use:[                    
                    MiniCssExtractPlugin.loader,                  
                    'css-loader',
                    'sass-loader',
                ]            
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: './dist/images'
                    }
                  }
                ]
            }
        ]
    },
}
  
module.exports = config;

