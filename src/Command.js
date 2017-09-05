const program = require('commander')
const {version} = require('../package.json')
const Waterboy = require('../Waterboy.json')

module.exports = function (cmd) {
	program
		.version(version)
		.description(Waterboy[cmd].description)
		.parse(process.argv)
}
