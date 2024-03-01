// 构建完成之后需要更新package.json
const path = require('node:path')
const fs = require('node:fs')
const getPkgJson = require('../utils/getPkgJson')

function updatePkgJSON(root, entryPath) {
  const pkgPath = path.join(root, 'package.json')
  const json = getPkgJson(root)
  json.files = [
    'dist/umd',
    'dist/iife',
    'dist/cjs',
    'dist/es',
  ]
  const extension = path.extname(entryPath)
  const baseName = path.basename(entryPath, extension)
  json.module = `dist/umd/${baseName}.js`
  json.main = `dist/cjs/${baseName}.js`
  fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2))
}

module.exports = updatePkgJSON
