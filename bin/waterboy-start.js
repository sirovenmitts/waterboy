#!/usr/bin/env node
process.title = 'Waterboy CLI'
const {Command, connect} = require('../src')
Command('start')
connect().then(daemon => daemon.start())