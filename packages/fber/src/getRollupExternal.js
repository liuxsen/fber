const getPkgJson = require('./utils/getPkgJson')

function getRollupExternal(root) {
  const pkgJson = getPkgJson(root)
  if (pkgJson.config && pkgJson.config.fber && pkgJson.config.fber.external) {
    return {
      external: Object.keys(pkgJson.config.fber.external),
      globals: pkgJson.config.fber.external,
    }
  }
  return {
    external: [],
    globals: {},
  }
}

module.exports = {
  getRollupExternal,
}
