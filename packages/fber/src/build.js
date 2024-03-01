#!/usr/bin/env node

// rollup.config.js
const process = require('node:process')
const { program } = require('commander')
const build = require('./compiler')
const { viteDevServer } = require('./vite-dev')
const { getRollupExternal } = require('./getRollupExternal')
const webpackCompiler = require('./webpack/compiler')

// https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md#%e5%ae%89%e8%a3%85
program.command('build')
  .description('build the app')
  .option('-n, --name <name>', 'umd 模式全局名称')
  .action(() => {
    const root = process.cwd()
    const entryPath = require('./getEnty')(root)
    const { external } = getRollupExternal(root)
    build({
      input: entryPath,
      external,
    })
  })

program.command('dev')
  .description('开发模式')
  .action(() => {
    const root = process.cwd()
    viteDevServer(root)
  })

program.command('bundle')
  .description('打包前端项目')
  .action(() => {
    const root = process.cwd()
    webpackCompiler(root)
  })

program.parse(process.argv)
