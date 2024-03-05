const path = require('node:path')
const process = require('node:process')
const fs = require('node:fs')

const fberRoot = path.join(__dirname, '..', '..')
const root = process.cwd()
const rootPkgJsonPath = path.join(root, 'package.json')
const fberConfigJsPath = path.join(root, 'fber.config.js')
const isTsProject = fs.existsSync(path.join(root, 'tsconfig.json'))
const distRoot = path.join(root, 'dist')
const rootTsConfigPath = path.join(root, 'tsconfig.json')

function getEntryPath(entry) {
  return path.join(root, entry)
}

module.exports = {
  fberRoot,
  root,
  rootPkgJsonPath,
  getEntryPath,
  fberConfigJsPath,
  isTsProject,
  distRoot,
  rootTsConfigPath,
}
