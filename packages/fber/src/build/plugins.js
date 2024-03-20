const ts = require('rollup-plugin-typescript2')
const rollupTs = require('@rollup/plugin-typescript')
const strip = require('@rollup/plugin-strip')
const replace = require('rollup-plugin-replace')
const postcss = require('rollup-plugin-postcss')
const babel = require('@rollup/plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const extensions = ['.js', '.jsx', '.tsx', '.mjs', '.json', '.node']

exports.vue3Plugin = [
  ts(),
  // 可使用 `import {module} from './file'` 替换 `import {module} from './file/index.js`
  resolve({
    browser: true,
    extensions,
  }),
  commonjs({
    extensions: ['.js', '.jsx', '.mjs', '.json', '.node'],
  }),
  // 替换环境变量
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  require('@vitejs/plugin-vue')(),
  require('@vitejs/plugin-vue-jsx')(),
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
]

exports.vue2Plugin = [
  ts(),
  resolve({
    browser: true,
    extensions,
  }),
  commonjs({
    extensions: ['.js', '.jsx', '.mjs', '.json', '.node'],
  }),
  // 替换环境变量
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  require('@vitejs/plugin-vue2')(),
  require('@vitejs/plugin-vue2-jsx')(),
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
]

exports.reactPlugin = [
  commonjs({
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.json', '.node'],
  }),
  resolve({
    browser: true,
    extensions,
  }),
  rollupTs(),
  // 替换环境变量
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
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
]
