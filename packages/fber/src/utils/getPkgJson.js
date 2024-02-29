const fs = require('node:fs')
const path = require('node:path')

module.exports = (root) => {
  const pkgFilePath = path.join(root, 'package.json')

  const pkgFileJSONstr = fs.readFileSync(pkgFilePath, 'utf-8')
  const json = JSON.parse(pkgFileJSONstr)
  return json
}
