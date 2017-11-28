import { Application, Request as req, Response as res } from 'express'
import * as path 										from 'path'
import chalk 											from 'chalk'
import * as express 									from 'express'
import * as webpack 									from 'webpack'
import webpack_config 									from './webpack.config'
import * as webpack_dev_middleware 						from 'webpack-dev-middleware'
import * as webpack_hot_middleware 						from 'webpack-hot-middleware'

/* ==========================================================================
	-- Utils
========================================================================== */

const port 				= process.env.PORT || 3000
const environment 		= process.env.NODE_ENV || 'development'
const log 				= console.log
const success 			= chalk.white.bgGreen.bold

/* ==========================================================================
	-- Configs
========================================================================== */

const app : Application = express()
const webpack_compiler 	= webpack(webpack_config)
app.use(express.static(path.join(__dirname, './public')))

/* ==========================================================================
	-- Webpack Middleware
========================================================================== */

app.use(webpack_dev_middleware(webpack_compiler, <any>{
	stats: { colors: true },
	publicPath: webpack_config.output.publicPath,
	historyApiFallback: true,
	hot: true
}))

app.use(webpack_hot_middleware(webpack_compiler))

/* ==========================================================================
	-- Routes
========================================================================== */

app.get('/', (req:req, res:res) => res.sendFile(path.join(__dirname, './views/map.html')))

/* ==========================================================================
	-- Server
========================================================================== */

app.listen(port, (err:any) => {
	if(err) return console.log(err)
	log(success(`ts-node listening on port ${port} in ${environment} mode`))
})