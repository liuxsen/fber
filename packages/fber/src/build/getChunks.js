const getFberConfig = require('../utils/getFberConfig')

function getChunks() {
  const fberConfig = getFberConfig()
  if (fberConfig.chunks) {
    return fberConfig.chunks
  }
  return {}
}

module.exports = { getChunks }
