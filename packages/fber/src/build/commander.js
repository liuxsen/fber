const process = require('node:process')
const { program } = require('commander')
const { buildComponents } = require('./components/index')
const { buildLib } = require('./lib')
const buildApp = require('./app')
const { viteDevServer } = require('./dev/vite-dev')

program.command('lib')
  .action(() => {
    buildLib()
  })

program.command('components')
  .action(() => {
    buildComponents()
  })

program.command('app')
  .action(() => {
    buildApp()
  })

program.command('dev')
  .description('开发模式')
  .action(() => {
    const root = process.cwd()
    viteDevServer(root)
  })

// program.command('init')
//   .description('下载前端模板')
//   .action(() => {
//     getTemplateInfo()
//   })

program.parse(process.argv)
