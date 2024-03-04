const path = require('node:path')
const { root } = require('./constants')
const getFberConfig = require('./getFberConfig')

module.exports = () => {
  const config = getFberConfig()
  if (config.entry)
    return path.join(root, config.entry)
  return path.join(root, 'src', 'index.js')
}
