const express = require('express')
const path = require('path')
const app = express()
const chalk = require('chalk')
const log = console.log

const port = process.env.PORT || 1001
const environment = process.env.NODE_ENV || 'development'

app.use(express.static(path.join(__dirname, './public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views/map.html')))

app.listen(port, err => {
	if(err) return console.log(err)
	log(chalk.white.bgGreen.bold(`node listening on port ${port} in ${environment} mode`))
})