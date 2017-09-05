#!/usr/bin/env node
require('./Daemon').Frontend.then(d => d.status())