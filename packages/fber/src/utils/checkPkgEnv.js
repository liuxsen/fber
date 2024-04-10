const { isTsProject, root } = require('./constants')

function checkPkgEnv() {
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
  else if (pkgJson.peerDependencies && pkgJson.peerDependencies.vue) {
    res.framework = 'vue'
    res.version = pkgJson.peerDependencies.vue
  }

  return {
    isReact: res.framework === 'react',
    isVue: res.framework === 'vue',
    isTsProject,
    version: res.version,
  }
}

module.exports = { checkPkgEnv }
