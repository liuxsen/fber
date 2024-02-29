const path = require('node:path')
const getPkgJson = require('./utils/getPkgJson')

module.exports = (root) => {
  const json = getPkgJson(root)
  if (json.config && json.config.fber && json.config.fber.entry) {
    return path.join(root, json.config.fber.entry)
  }

  return path.join(root, 'src', 'index.js')
}
