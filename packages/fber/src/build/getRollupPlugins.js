// // 删除 console.log
const semver = require('semver')
const terser = require('@rollup/plugin-terser')
const { checkPkgEnv } = require('../utils/checkPkgEnv')

const { vue3Plugin, vue2Plugin, reactPlugin } = require('./plugins')

function getRollupPlugins(root, cliOptions) {
  const env = checkPkgEnv(root)
  const isVue = env.isVue
  const isReact = env.isReact
  let plugins = [
  ]
  if (isVue) {
    const isVue3 = semver.gte(env.version, '3.0.0')
    if (isVue3) {
      plugins = vue3Plugin
    }
    else {
      plugins = vue2Plugin
    }
  }
  if (isReact) {
    plugins = reactPlugin
  }
  if (cliOptions.terser) {
    plugins.push(terser())
  }
  return plugins
}

module.exports = { getRollupPlugins }
