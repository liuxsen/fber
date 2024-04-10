const path = require('node:path')
const { createServer } = require('vite')
const UnoCSS = require('unocss/vite')
const VueDevTools = require('vite-plugin-vue-devtools')
const { checkPkgEnv } = require('../../utils/checkPkgEnv')
const getConfig = require('../../utils/getFberConfig')
const { getTsAlias } = require('../../utils/getAlias')
const { root } = require('../../utils/constants')

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
      plugins.push(
        [
          VueDevTools(),
          require('@vitejs/plugin-vue')(),
          require('@vitejs/plugin-vue-jsx')({
            include: [/\.[jt]sx$/],
          }),
          UnoCSS.default(),
        ],
      )
    }
    else {
      plugins.push([require('@vitejs/plugin-vue2')(), require('@vitejs/plugin-vue2-jsx')()])
    }
  }
  const res = plugins
  return res
}

async function viteDevServer(rootdir) {
  const config = getConfig()
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    resolve: {
      alias: getTsAlias(),
    },
    publicDir: path.join(root, config.dev.staticDir || 'public'),
    root: rootdir,
    plugins: getPlugins(rootdir),
    server: config.dev.server,
  })
  await server.listen()

  server.printUrls()
  // server.bindCLIShortcuts({ print: true })
}

module.exports = { viteDevServer }
