const express = require('express')
const path = require('path')
const app = express()
const chalk = require('chalk')
const log = console.log

const port = process.env.PORT || 3000
const environment = process.env.NODE_ENV || 'development'

app.use(express.static(path.join(__dirname, './public')))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './views/map.html')))
app.get('main.js', (req, res) => res.sendFile(path.join(__dirname, './public/main.js')))

app.listen(port, err => {
	if(err) return console.log(err)
	log(chalk.white.bgGreen.bold(`node listening on port ${port} in ${environment} mode`))
})