#!/usr/bin/env node
require('babel-polyfill');
var production
try {
  production = !process.execArgv[0].match(/babel-cli/)
} catch (err) {
  production = true
}

if (production) {
  require('../dist')
} else {
  require('../src')
}
