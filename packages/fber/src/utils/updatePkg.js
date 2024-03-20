// 构建完成之后需要更新package.json
const path = require('node:path')
const fs = require('node:fs')
const os = require('node:os')
const getPkgJson = require('./getPkgJson')
const { root } = require('./constants')
const getEntryName = require('./getEntryName')

function updatePkgJSON(pluginName) {
  const pkgPath = path.join(root, 'package.json')
  const json = getPkgJson(root)
  const entryName = getEntryName()
  json.files = [
    `dist/assets/${pluginName}.umd.js`,
    `dist/assets/${pluginName}.iife.js`,
    `dist/assets/${pluginName}.cjs.js`,
    `dist/assets/${pluginName}.es.js`,
  ]

  json.module = `dist/assets/${pluginName}.umd.js`
  json.main = `dist/assets/${pluginName}.cjs.js`
  json.types = `dist/assets/types/${entryName}.d.ts`
  const newline = os.EOL
  fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2) + newline)
}

module.exports = updatePkgJSON
