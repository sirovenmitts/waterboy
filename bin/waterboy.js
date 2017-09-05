#!/usr/bin/env node
process.title = 'Waterboy CLI'

const program = require('commander')
const {version, description} = require('../package.json')
const Waterboy = require('../Waterboy.json')

program
	.version(version)
	.description(description)

Object.keys(Waterboy).forEach(cmd =>
	program.command(cmd, Waterboy[cmd].description))

program.parse(process.argv)