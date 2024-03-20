const inquirer = require('inquirer')
const downloadTemplateFromGit = require('./downloadTemplate')

function getFramework() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: '请选择框架',
      choices: [
        'react',
        'vue',
        'normal',
      ],
    },
  ])
}

function getFrameworkVersion(framework) {
  const versions = {
    react: ['16', '18'],
    vue: ['2', '3'],
  }
  return inquirer.prompt([
    {
      type: 'list',
      name: 'version',
      message: '请选择框架版本',
      choices: versions[framework],
    },
  ])
}
function getDirPath() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'dir',
      message: '请输入项目地址，默认是当前目录',
      default: '.',
    },
  ])
}

async function getTemplateInfo() {
  const { framework } = await getFramework()
  const { version } = await getFrameworkVersion(framework)
  const { dir } = await getDirPath()
  downloadTemplateFromGit({ framework, version, dir })
}

module.exports = getTemplateInfo
