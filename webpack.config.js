const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if(!isDev) {
		config.minimizer = [
			new OptimizeCssWebpackPlugin(),
			new TerserWebpackPlugin()
		]
	}

	return config
}

module.exports = {
	entry: {
		main: ['@babel/polyfill', path.resolve(__dirname, 'src', 'pages', 'index', 'index.js')],
		colors: ['@babel/polyfill', path.resolve(__dirname, 'src', 'pages', 'colors', 'index.js')],
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
	optimization: optimization(),
	devServer: {
		port: 4200,
		hot: isDev,
		overlay: true,
    open: true
	},
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
		new HtmlWebpackPlugin({
			template: './src/pages/index/index.pug',
			chunks: ['main'],
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/colors/index.pug',
			filename: 'colors.html',
			chunks: ['colors'],
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'postcss-loader', 'css-loader']
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: "[name].[ext]",
							useRelativePath: true,
						}			
				}]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource"
			},
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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


// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// const TerserWebpackPlugin = require('terser-webpack-plugin')

// const isDev = process.env.NODE_ENV === 'development'

// const optimization = () => {
// 	const config = {
// 		splitChunks: {
// 			chunks: 'all'
// 		}
// 	}

// 	if(!isDev) {
// 		config.minimizer = [
// 			new OptimizeCssWebpackPlugin(),
// 			new TerserWebpackPlugin()
// 		]
// 	}

// 	return config
// }
// const ASSET_PATH = process.env.ASSET_PATH || '/';
// module.exports = {
// 	entry: {
// 		main: ['@babel/polyfill', path.resolve(__dirname, 'src', 'pages', 'index', 'index.js')],
// 		colors: ['@babel/polyfill', path.resolve(__dirname, 'src', 'pages', 'colors', 'index.js')],
// 	},
// 	output: {
// 		path: path.resolve(__dirname, './dist'),
// 		filename: '[name].[contenthash].js',
// 		publicPath: ASSET_PATH,
// 	},
// 	resolve: {
// 		alias: {
// 			'@components': path.resolve(__dirname, 'src/components'),
// 			'@pages': path.resolve(__dirname, 'src/pages'),
// 			'@theme': path.resolve(__dirname, 'src/theme'),
// 			'@': path.resolve(__dirname, 'src')
// 		}
// 	},
// 	optimization: optimization(),
// 	devServer: {
// 		port: 4200,
// 		hot: isDev,
// 		overlay: true,
//     open: true
// 	},
// 	plugins: [
// 		new CleanWebpackPlugin(),
// 		new CopyWebpackPlugin({
// 			patterns: [
// 				{
// 					context: path.resolve(__dirname, 'src/assets/'),
// 					from: '*.png',
// 					to: path.resolve(__dirname, 'dist'),
// 					noErrorOnMissing: true,
// 				},
// 				{
// 					context: path.resolve(__dirname, 'src/assets/'),
// 					from: '*.jpg',
// 					to: path.resolve(__dirname, 'dist'),
// 					noErrorOnMissing: true,
// 				},
// 				{
// 					context: path.resolve(__dirname, 'src/assets/'),
// 					from: '*.svg',
// 					to: path.resolve(__dirname, 'dist'),
// 					noErrorOnMissing: true,
// 				},
// 			]
// 		}),
// 		new HtmlWebpackPlugin({
// 			template: './src/pages/index/index.pug',
// 			chunks: ['main'],
// 			minify: {
// 				collapseWhitespace: !isDev
// 			}
// 		}),
// 		new HtmlWebpackPlugin({
// 			template: './src/pages/colors/index.pug',
// 			filename: 'colors.html',
// 			chunks: ['colors'],
// 			minify: {
// 				collapseWhitespace: !isDev
// 			}
// 		}),
// 		new MiniCssExtractPlugin({
// 			filename: '[name].[contenthash].css'
// 		}),
// 	],
// 	module: {
// 		rules: [
// 			{
// 				test: /\.css$/,
// 				use: [MiniCssExtractPlugin.loader, 'postcss-loader', 'css-loader']
// 			},
// 			{
// 				test: /\.(png|jpg|svg)$/,
//         type: 'asset/resource',
// 				loader: 'file-loader',
//         options: {
//           name: '[name].[ext]',
// 					outputPath: 'images',
//         },
// 			},
// 			{
// 				test: /\.(ttf|woff|svg)$/,
//         type: 'asset/inline',
// 				loader: 'file-loader',
//         options: {
//           name: '[name].[ext]',
// 					outputPath: 'fonts',
//         },
// 			},
// 			{
// 				test: /\.s[ac]ss$/,
// 				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
// 			},
// 			{
//         test: /\.pug$/,
//         loader: 'pug-loader'
// 			},
// 			{
// 				test: /\.js$/,
// 				exclude: /node_modules/,
// 				loader: 'babel-loader',
// 				options: {
// 					presets: [
// 						'@babel/preset-env'
// 					]
// 				}
// 			},
// 		]
// 	}
// }