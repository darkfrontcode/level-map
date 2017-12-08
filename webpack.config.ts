import * as path 				from 'path'

// No types for this plugin for now => @types/open-browser-webpack-plugin
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

export default <any>{
	entry: {

		app: [ path.join(__dirname, './source/main.ts') ]
		
	},
	output: {

		path: path.join(__dirname, './public'),
		publicPath: 'http://localhost:3000/',
		filename: '[name].js',

	},
	module: {

		rules: [

			{
				test: /\.tsx?$/,
				use: [ 'ts-loader' ]
			},
			{
				test: /\.js$/,
				use: [ 'source-map-loader' ],
				enforce: 'pre'
			},
		]

	},
	devtool: "source-map",
	resolve: {

		extensions: ['.ts', '.tsx', '.js']

	},
	plugins: [
		new OpenBrowserPlugin({ url: 'http://localhost:3000' })
	]
}