const getFberConfig = require('../utils/getFberConfig')

function getRollupExternal() {
  const config = getFberConfig()
  if (config.external) {
    return {
      external: Object.keys(config.external),
      globals: config.external,
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
