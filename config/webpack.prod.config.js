const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackMonitor = require('webpack-monitor');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackBaseConfig = require('./webpack.common.config.js');

module.exports = merge(webpackBaseConfig, {
	plugins: [
		new BundleAnalyzerPlugin(),
		new WebpackMonitor({
            capture: true, // -> default 'true'
            target: '../monitor/myStatsStore.json', // default -> '../monitor/stats.json'
            launch: true, // -> default 'false'
            port: 8081, // default -> 8081
            excludeSourceMaps: true // default 'true'
          })
	],
	optimization: {
		minimizer: [
		new UglifyJsPlugin(),
		new OptimizeCSSAssetsPlugin()
		]
	}
});