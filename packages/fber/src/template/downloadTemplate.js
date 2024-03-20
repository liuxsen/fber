const path = require('node:path')
const shelljs = require('shelljs')
const { root } = require('../utils/constants')
const templateInfo = require('./constants')

function downloadTemplateFromGit({ framework, version, dir }) {
  const absDir = path.join(root, dir)
  const gitDir = path.join(dir, '.git')
  const templateKey = `${framework}${version}Template`
  const templateGitUrl = templateInfo[templateKey]
  shelljs.exec(`git clone ${templateGitUrl} ${absDir}`)
  shelljs.exec(`rm -rf ${gitDir}`)
}

module.exports = downloadTemplateFromGit
