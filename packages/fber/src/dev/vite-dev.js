const { createServer } = require('vite')

function getPlugins(rootdir) {
  const { checkPkgEnv } = require('../utils/checkPkgEnv')
  const semver = require('semver')

  const env = checkPkgEnv(rootdir)
  const plugins = []
  if (env.isReact) {
    plugins.push(require('@vitejs/plugin-react')())
  }

  if (env.isVue) {
    const isVue3 = semver.gt(env.version, '3.0.0')
    if (isVue3) {
      plugins.push([require('@vitejs/plugin-vue')(), require('@vitejs/plugin-vue-jsx')()])
    }
    else {
      plugins.push([require('@vitejs/plugin-vue2')(), require('@vitejs/plugin-vue2-jsx')()])
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
