#!/usr/bin/env node

const process = require('node:process')
const { program } = require('commander')
const chalk = require('chalk')
const build = require('./build/compiler')
const { viteDevServer } = require('./dev/vite-dev')
const { getRollupExternal } = require('./build/getRollupExternal')
const webpackCompiler = require('./bundle/compiler')
const { inputPkgName } = require('./inquire')

// https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md#%e5%ae%89%e8%a3%85
program.command('build')
  .description('build the app')
  .option('-n, --pluginName <pluginName>', 'umd 模式全局名称')
  .option('-m, --mode [mode]', '打包模式, development | production', 'production')
  .action(async (options) => {
    const config = require('./utils/getFberConfig')()
    const entryPath = require('./utils/getEnty')()
    const { external } = getRollupExternal()
    if (!options.pluginName) {
      if (config.pluginName) {
        options.pluginName = config.pluginName
      }
      else {
        // eslint-disable-next-line
      console.log(chalk.red('>>>请填写包umd模式的插件名称'))
        options.pluginName = await inputPkgName()
      }
    }
    build({
      input: entryPath,
      external,
    }, {
      pluginName: options.pluginName,
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
