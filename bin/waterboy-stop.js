#!/usr/bin/env node
process.title = 'Waterboy CLI'
const {Command, connect} = require('../src')
Command('stop')
connect().then(daemon => daemon.stop())