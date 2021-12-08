const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const pages = fs.readdirSync(path.resolve(__dirname, 'src/pages'))

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		},
		minimize: true
	}

	if(!isDev) {
		config.minimizer = [
			new OptimizeCssWebpackPlugin(),
			new TerserWebpackPlugin({cache: true, parallel: true})
		]
	}

	return config
}

module.exports = {
	entry: {
		main: ['@babel/polyfill', './src/index.js'],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[contenthash].js',
	},
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@theme': path.resolve(__dirname, 'src/theme'),
			'@': path.resolve(__dirname, 'src')
		}
	},
	mode: 'development',
	optimization: optimization(),
	devServer: {
		port: 4200,
		open: true,
    hot: true,
    contentBase: path.join(__dirname, "dist"),
	},
	devtool: isDev ? 'source-map' : '',
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					context: path.resolve(__dirname, 'src/assets/'),
					from: '*',
					to: path.resolve(__dirname, 'dist'),
					noErrorOnMissing: true,
				},
			]
		}),
		...pages.map((page) => {
			return new HtmlWebpackPlugin({
				template: `./src/pages/${page}/${page}.pug`,
				filename: `${page}.html`,
			})
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [
			{
        test: /\.(png|jpg|svg)$/,
				exclude: [/fonts/],
        type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]',
				},
      },
			{
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        exclude: [/images/],
        type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
      },
			{
				test: /\.s[ac]ss$/,
				use: [ 
					isDev 
					? 'style-loader' 
					: MiniCssExtractPlugin.loader, 
					'css-loader', 'postcss-loader', 'sass-loader'
				],
			},
			{
        test: /\.pug$/,
        loader: 'pug-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env'
					]
				}
			},
		]
	}
}
