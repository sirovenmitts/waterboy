#!/usr/bin/env node
process.title = 'Waterboy CLI'

const program = require('commander')
const {version} = require('../package.json')
const Waterboy = require('../Waterboy.json')

program
	.version(version)
	.description('Waterboy will help remind you when it is time to drink some water')

Object.keys(Waterboy).forEach(cmd =>
	program.command(cmd, Waterboy[cmd].description))

program.parse(process.argv)