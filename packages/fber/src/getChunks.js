const getPkgJson = require('./utils/getPkgJson')

function getChunks(root) {
  const json = getPkgJson(root)
  if (json.config && json.config.fber && json.config.fber.chunks) {
    return json.config.fber.chunks
  }
  return {}
}

module.exports = { getChunks }
