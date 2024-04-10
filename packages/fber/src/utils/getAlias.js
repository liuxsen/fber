const fs = require('node:fs')
const path = require('node:path')
const { root } = require('./constants')

function getTsConfig() {
  const rootConfigPath = path.join(root, 'tsconfig.json')
  const exitsTsConfig = fs.existsSync(rootConfigPath)
  if (exitsTsConfig) {
    let str = fs.readFileSync(rootConfigPath, 'utf-8')
    // 删除 // 注释
    str = str.replace(/\/\/.*$/gm, '')
    return JSON.parse(str)
  }
  else {
    return null
  }
}
exports.getTsConfig = getTsConfig

function getTsAlias() {
  const config = getTsConfig()
  const paths = config.compilerOptions?.paths
  if (!config || !paths) {
    return null
  }
  const res = {}
  Object.keys(paths).forEach((key) => {
    res[key.replace('/*', '')] = path.join(root, paths[key][0].replace('/*', ''))
  })
  return res
}

exports.getTsAlias = getTsAlias
