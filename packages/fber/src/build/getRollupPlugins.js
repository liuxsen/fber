const path = require('node:path')
const commonjs = require('rollup-plugin-commonjs')

// // 删除 console.log
const ts = require('@rollup/plugin-typescript')
const strip = require('@rollup/plugin-strip')
const replace = require('rollup-plugin-replace')
const terser = require('@rollup/plugin-terser')
const postcss = require('rollup-plugin-postcss')
const babel = require('@rollup/plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const semver = require('semver')
const vue3 = require('@vitejs/plugin-vue')
const vue3Jsx = require('@vitejs/plugin-vue-jsx')
const vue2 = require('@vitejs/plugin-vue2')
const vue2jsx = require('@vitejs/plugin-vue2-jsx')
const { checkPkgEnv } = require('../utils/checkPkgEnv')

const extensions = ['.js', '.jsx', '.tsx', '.ts', '.mjs', '.json', '.node']

function getRollupPlugins(root) {
  const env = checkPkgEnv(root)
  const isVue = env.isVue
  const isReact = env.isReact
  const isTs = env.isTsProject
  const plugins = [
    // 可使用 `import {module} from './file'` 替换 `import {module} from './file/index.js`
    resolve({
      browser: true,
      extensions,
    }),
    // 替换环境变量
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    commonjs({
      extensions,
    }),
    // --ts
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions,
      presets: isReact
        ? [
            '@babel/preset-env',
          ]
        : [],
    }),

    strip({
      functions: ['console.log'],
    }),
    postcss({
      extract: 'css/index.css', // 是否提取css
      minimize: true,
      extensions: ['.less', '.css'],
      plugins: [
        require('postcss-preset-env')({
        }),
      ],
    }),
    // terser(),
  ]
  if (isTs) {
    plugins.splice(3, 0, ts())
  }
  if (isVue && env.version) {
    const isVue3 = semver.gt(env.version, '3.0.0')
    if (isVue3) {
      plugins.unshift(vue3(), vue3Jsx())
    }
    else {
      plugins.unshift(vue2(), vue2jsx())
    }
  }

  return plugins
}

module.exports = { getRollupPlugins }
