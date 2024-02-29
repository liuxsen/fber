// rollup.config.js
const path = require('node:path')
const { defineConfig } = require('rollup')
// 删除 console.log 等代码
const strip = require('@rollup/plugin-strip')

const inputFile = path.join(__dirname, 'src/index.js')

const plugins = [strip({
  functions: ['console.log'],
})]

module.exports = defineConfig(
  [
    {
      input: inputFile,
      output: {
        format: 'commonjs',
        file: 'dist/bundle.js',
      },
      plugins,
    },
    {
      input: inputFile,
      output: {
        format: 'module',
        file: 'dist/bundle.module.js',
      },
      plugins,
    },
    {
      input: inputFile,
      output: {
        format: 'iife',
        name: 'plugin',
        file: 'dist/bundle.iife.js',
      },
      plugins,
    },
    {
      input: inputFile,
      output: {
        format: 'umd',
        name: 'plugin', // 定义plugin的名称
        file: 'dist/bundle.umd.js',
      },
      plugins,
    },
  ],
)
