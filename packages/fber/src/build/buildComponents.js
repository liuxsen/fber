const process = require('node:process')
const path = require('node:path')
const fs = require('node:fs')
const { rimrafSync } = require('rimraf')
const { root } = require('../utils/constants')
const build = require('./compiler-components')

function buildComponents() {
  const config = require('../utils/getFberConfig')()
  const componentsDir = config.componentsDir
  // 获取组件文件夹下的入口
  getEntryList(componentsDir, config)
}

function getEntryList(dir, config) {
  const root = process.cwd()
  const absPath = path.join(root, dir)
  const stat = fs.statSync(absPath)
  if (!stat.isDirectory) {
    // eslint-disable-next-line
    console.log('组件入口不是文件夹')
    return
  }
  const componentList = fs.readdirSync(absPath)
  const componentListPaths = componentList.map((item) => {
    const dir = path.join(absPath, item)
    const files = fs.readdirSync(dir)
    const entryFile = files.filter((item) => {
      return item.includes('index')
    })[0]
    return [item, path.join(dir, entryFile)]
  })
  // const entryList = componentList
  componentListPaths.forEach(([componentName, componentPath]) => {
    buildSingleComponent(componentName, componentPath, config)
  })
}

function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, (match) => {
    return match.toUpperCase()
  })
}

// Button => h-button => HButton
function genComponnetName(prefix, name) {
  const firstChar = capitalizeFirstLetter(name)
  if (prefix) {
    return prefix.toUpperCase() + firstChar
  }
  else {
    return firstChar
  }
}

function buildSingleComponent(componentName, componentPath, config) {
  const prefix = config.componentPrefix || ''
  rimrafSync(path.join(root, 'dist', 'components'))
  build({
    input: componentPath,
    external: config.external,
  },
  {
    pluginName: genComponnetName(prefix, componentName),
  })
}

exports.buildComponents = buildComponents
