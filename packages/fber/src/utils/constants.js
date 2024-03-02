const path = require('node:path')
const process = require('node:process')

const fberRoot = path.join(__dirname, '..', '..')
const root = process.cwd()
const rootPkgJsonPath = path.join(root, 'package.json')
const fberConfigJsPath = path.join(root, 'fber.config.js')

function getEntryPath(entry) {
  return path.join(root, entry)
}

module.exports = {
  fberRoot,
  root,
  rootPkgJsonPath,
  getEntryPath,
  fberConfigJsPath,
}
