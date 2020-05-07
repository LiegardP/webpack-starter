const webpack = require('webpack');
const glob = require('glob');
const fs = require('fs');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");


// Our function that generates our html plugins
function generateHtmlPlugins(templateDir) {
    // Read files in template directory
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
    return templateFiles.map(item => {
        // Split names and extension
        const parts = item.split('.')
        const name = parts[0]
        const extension = parts[1]

        // Create new HTMLWebpackPlugin with options
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
        })
    })
}
// Call our function on our views directory.
const htmlPlugins = generateHtmlPlugins('../template')


let config = {
    entry: {
        main: "./src/js/index.js",
    },
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: '[name].[chunkhash:5].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack 4 Starter',
            template: 'template/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash:5].css'
        }),
        new CopyWebpackPlugin([
            { from: 'src/images', to: 'images' }
        ]),
        new CleanWebpackPlugin(),
        new DashboardPlugin(),
    ].concat(htmlPlugins),
    // tell to webpack resolve specific extensions if they are missing
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
                      name: '[name][contenthash:5].[ext]',
                      outputPath: './dist/images'
                    }
                  }
                ]
            },
            // {
            //     test: /\.njk$/,
            //     use: [
            //         {
            //             loader: 'simple-nunjucks-loader',
            //             options: {}
            //         }
            //     ]
            // }
        ]
    },
}
module.exports = config;

