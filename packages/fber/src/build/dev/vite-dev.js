const { createServer } = require('vite')
const { checkPkgEnv } = require('../../utils/checkPkgEnv')
const getConfig = require('../../utils/getFberConfig')

function getPlugins(rootdir) {
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
  const config = getConfig()
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: rootdir,
    plugins: getPlugins(rootdir),
    server: config.dev.server,
  })
  await server.listen()

  server.printUrls()
  // server.bindCLIShortcuts({ print: true })
}

module.exports = { viteDevServer }
