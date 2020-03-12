const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    entry: "./src/js/index.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "./bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack 4 Starter',
            template: 'src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        })
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
                    'style-loader',                  
                    'css-loader',
                    'sass-loader'
                ]            
            }
        ]
    },
}
  
module.exports = config;

