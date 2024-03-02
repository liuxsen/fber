const fs = require('node:fs')
const { isTsProject } = require('./constants')

function checkPkgEnv(root) {
  const pkgJson = require('./getPkgJson')(root)
  const res = {
    framework: '',
    version: '',
  }
  if (pkgJson.dependencies && pkgJson.dependencies.react) {
    res.framework = 'react'
    res.version = pkgJson.dependencies.react
  }

  else if (pkgJson.dependencies && pkgJson.dependencies.vue) {
    res.framework = 'vue'
    res.version = pkgJson.dependencies.vue
  }

  return {
    isReact: res.framework === 'react',
    isVue: res.framework === 'vue',
    isTsProject,
    version: res.version,
  }
}

module.exports = { checkPkgEnv }
