const path = require('node:path')
const getFberConfig = require('./getFberConfig')

module.exports = function getEntryName() {
  const config = getFberConfig()
  const entryPath = config.entry
  const extension = path.extname(entryPath)
  const baseName = path.basename(entryPath, extension)
  return baseName
}
