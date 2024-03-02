const chalk = require('chalk')
const inquirer = require('inquirer')

function inputPkgName() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'pkgName',
        message: chalk.green('请输入插件名'),
        validate(str) {
          if (!str) {
            return chalk.red('插件名是必选项')
          }
          else {
            return true
          }
        },
      },
    ])
    .then((answers) => {
      // Use user feedback for... whatever!!
      return answers.pkgName
    })
}

module.exports = {
  inputPkgName,
}
