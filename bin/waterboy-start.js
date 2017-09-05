#!/usr/bin/env node
process.title = 'Waterboy CLI'
const {command, connect} = require('../src')
command('start')
connect().then(daemon => daemon.start())