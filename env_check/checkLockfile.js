// /misc/checkLockfile.js
const process = require('node:process')
const chalk = require('chalk')
const { lockfileVersion } = require('../package-lock.json')
const { engines } = require('../package')

if (lockfileVersion !== 2) { // 判断lockfileVersion版本，不是2就终止进程
  // eslint-disable-next-line
  console.log(`Required node version ${chalk.red(engines.node)} and npm version ${chalk.red(engines.npm)}, And then please retry npm install.`)
  process.exit(1)
}
