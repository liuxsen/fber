const { createServer } = require('vite')
const react = require('@vitejs/plugin-react')
const vue3 = require('@vitejs/plugin-vue')
const vue3Jsx = require('@vitejs/plugin-vue-jsx')
const vue2 = require('@vitejs/plugin-vue2')
const vue2jsx = require('@vitejs/plugin-vue2-jsx')

function getPlugins(rootdir) {
  const { checkPkgEnv } = require('../utils/checkPkgEnv')
  const semver = require('semver')

  const env = checkPkgEnv(rootdir)
  const plugins = []
  if (env.isReact) {
    plugins.push(react())
  }

  if (env.isVue) {
    const isVue3 = semver.gt(env.version, '3.0.0')
    if (isVue3) {
      plugins.push([vue3(), vue3Jsx()])
    }
    else {
      plugins.push([vue2(), vue2jsx()])
    }
  }

  return plugins
}

async function viteDevServer(rootdir) {
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: rootdir,
    plugins: getPlugins(rootdir),
    server: {
      port: 1337,
    },
  })
  await server.listen()

  server.printUrls()
  // server.bindCLIShortcuts({ print: true })
}

module.exports = { viteDevServer }
