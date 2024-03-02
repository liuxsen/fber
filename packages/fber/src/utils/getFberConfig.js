// 获取包信息
const fs = require('node:fs')
const { fberConfigJsPath, rootPkgJsonPath } = require('./constants')

function getFberConfig() {
  const pkgFileJSONstr = fs.readFileSync(rootPkgJsonPath, 'utf-8')
  const json = JSON.parse(pkgFileJSONstr)
  if (json.config && json.config.fber) {
    return json.config.fber
  }
  else if (fs.existsSync(fberConfigJsPath)) {
    return require(fberConfigJsPath)
  }
  return {}
}

module.exports = getFberConfig
