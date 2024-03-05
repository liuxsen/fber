const shell = require('shelljs')
const { SemVer } = require('semver')
const { checkPkgEnv } = require('../utils/checkPkgEnv')
const { rootTsConfigPath } = require('../utils/constants')

module.exports = function genVueTs() {
  const env = checkPkgEnv()
  const isVue = env.isVue
  const isTs = env.isTsProject
  if (isVue) {
    if (isTs) {
      if (SemVer.gte(env.version, '3.0.0')) {
        shell.exec(`npx vue-tsc -p ${rootTsConfigPath} --declaration --emitDeclarationOnly --outDir dist/assets/types`)
      }
      else {
        // eslint-disable-next-line
        console.log('vue2 忽略生成ts')
      }
    }
    else {
      // eslint-disable-next-line
      console.log('非ts项目,忽略生成ts声明文件')
    }
  }
}
