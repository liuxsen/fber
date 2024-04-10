// // 删除 console.log
// const semver = require('semver')
// eslint-disable-next-line
const terser = require('@rollup/plugin-terser')
const { checkPkgEnv } = require('../utils/checkPkgEnv')

const { vue3Plugin, reactPlugin } = require('./plugins')

// eslint-disable-next-line
function getRollupPlugins(root, cliOptions) {
  const env = checkPkgEnv(root)
  // const isVue = env.isVue
  const isReact = env.isReact
  let plugins = [
  ]
  if (isReact) {
    plugins = reactPlugin
  }
  else {
    // const isVue2 = env.version && semver.lt(env.version, '2.9.9')
    // if (!isVue2) {
    //   plugins = vue2Plugin
    // }
    // else {
    // }
    plugins = vue3Plugin
  }
  // if (cliOptions.terser) {
  //   plugins.push(terser())
  // }
  return plugins
}

module.exports = { getRollupPlugins }
