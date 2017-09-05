#!/usr/bin/env node
const {command, connect} = require('../src')
command('status')
connect().then(d => d.status())