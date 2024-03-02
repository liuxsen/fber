const path = require('node:path')
const commonjs = require('rollup-plugin-commonjs')

// // 删除 console.log
const strip = require('@rollup/plugin-strip')
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

function getRollupPlugins(root) {
  const env = checkPkgEnv(root)
  const isVue = env.isVue
  const isReact = env.isReact
  const plugins = [
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
    resolve({
      browser: true,
      extensions: ['.js', '.jsx', '.mjs', '.json', '.node'],
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: isReact
        ? [
            '@babel/preset-react',
          ]
        : [],
    }),
    // terser(),
  ]
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
