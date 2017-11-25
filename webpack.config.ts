import * as path 				from 'path'
import * as webpack 			from 'webpack'

export default <any>{
	entry: {

		app: [
			// 'webpack/hot/dev-server',
			// 'webpack-hot-middleware/client',
			path.join(__dirname, './source/main.ts')
		],
		search:[
			path.join(__dirname, './source/breadth-first-search.ts')
		]
		
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
	// externals: {
	// 	'TweenLite' : 'TweenLite'
	// },
	devtool: "source-map",
	resolve: {

		extensions: ['.ts', '.tsx', '.js']

	},
	plugins:[

		new webpack.HotModuleReplacementPlugin(),

	],
}