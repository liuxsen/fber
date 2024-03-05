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
const { checkPkgEnv } = require('../utils/checkPkgEnv')
const { distRoot } = require('../utils/constants')

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
      presets: [
        '@babel/preset-env',
      ],
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
    plugins.splice(3, 0, ts({
      // react可以直接升成ts
      // vue3 需要使用vue-tsc
      compilerOptions: isReact
        ? {
            declaration: true,
            outDir: path.join(distRoot, 'types'),
          }
        : {},
    }))
  }
  if (isVue && env.version) {
    const isVue3 = semver.gte(env.version, '3.0.0')
    if (isVue3) {
      plugins.unshift(require('@vitejs/plugin-vue')(), require('@vitejs/plugin-vue-jsx')())
    }
    else {
      plugins.unshift(require('@vitejs/plugin-vue2')(), require('@vitejs/plugin-vue2-jsx')())
    }
  }

  return plugins
}

module.exports = { getRollupPlugins }
