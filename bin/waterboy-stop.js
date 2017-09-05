#!/usr/bin/env node
process.title = 'Waterboy CLI'
const {command, connect} = require('../src')
command('stop')
connect().then(daemon => daemon.stop())