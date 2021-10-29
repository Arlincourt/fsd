const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		},
		runtimeChunk: 'single',
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
	optimization: optimization(),
	devServer: {
		port: 4200,
		overlay: true,
    open: true,
		liveReload: true,
		hot: true
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
			template: './src/pages/headers/headers.pug',
			filename: 'headers.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/colors/colors.pug',
			filename: 'colors.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/cards/cards.pug',
			filename: 'cards.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/form-elements/form-elements.pug',
			filename: 'form-elements.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/landing-page/landing-page.pug',
			filename: 'landing-page.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/filter/filter.pug',
			filename: 'filter.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/room-details/room-details.pug',
			filename: 'room-details.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/login/login.pug',
			filename: 'login.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/register/register.pug',
			filename: 'register.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/pages/index/index.pug',
			filename: 'index.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		 })
	],
	module: {
		rules: [
			{
				test: /\.(png|jpg|svg)$/,
				exclude: [/src\/theme/, /src\/assets/],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: "[name].[ext]",
							useRelativePath: true,	
						},
				}]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
				exclude: [/src\/components/, /src\/assets/, /src\/pages/,],
        type: "asset/resource",
			},
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, {
					loader: 'css-loader',
					options: {
						url: {
							filter: (url, resourcePath) => {
								if (url.includes(".png")) {
									return false;
								}
								return true;
							},
						},
					}
				}, 'postcss-loader', 'sass-loader'],
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