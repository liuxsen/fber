const fs = require('node:fs')
const { rootPkgJsonPath } = require('./constants')

module.exports = () => {
  const pkgFileJSONstr = fs.readFileSync(rootPkgJsonPath, 'utf-8')
  const json = JSON.parse(pkgFileJSONstr)
  return json
}
