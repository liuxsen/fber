const path = require('node:path')
const webpack = require('webpack')
const semver = require('semver')
const chalk = require('chalk')

const { root, fberRoot } = require('../../utils/constants')
const { checkPkgEnv } = require('../../utils/checkPkgEnv')
const { getTsAlias } = require('../../utils/getAlias')
const { vue3Plugin } = require('./plugins')

function getBabelOptions(root) {
  const env = checkPkgEnv(root)
  const res = [
    ['@babel/preset-env', { targets: 'defaults' }],
  ]

  if (env.isReact && semver.gte(env.version, '17.0.0')) {
    res.push(['@babel/preset-react', {
      runtime: 'automatic',
    }])
  }
  else if (env.isReact && semver.lte(env.version, '17.0.0')) {
    res.push([
      '@babel/preset-react', {
        runtime: 'classic',
      },
    ])
  }
  return res
}

function webpackCompiler() {
  const distDir = path.join(root, 'dist', 'app')
  const config = require('../../utils/getFberConfig')()
  const entryPath = path.join(root, config.app.entry)
  const NODE_ENV = config.app.mode || 'none'
  webpack({
    context: fberRoot,
    mode: NODE_ENV, // development production none
    entry: entryPath,
    output: {
      path: distDir,
      clean: true,
      filename: '[name].[contenthash].js',
      publicPath: config.app.publicPath || {},
    },
    devtool: config.app.devtool || 'none',
    resolve: {
      extensions: ['.vue', '.tsx', '.ts', '.js'],
      alias: getTsAlias(),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.(?:js|mjs|cjs|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: getBabelOptions(root),
            },
          },
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          // 针对vue需要配置如下，否则找不到vue文件地址
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
          },
          exclude: /node_modules/,
        },
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            'style-loader',
            'css-loader',
            'less-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                      // Options
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },

      ],
    },
    externals: config.app.externals,
    plugins: vue3Plugin(NODE_ENV, config),
    optimization: {
      realContentHash: true,
      splitChunks: {
        cacheGroups: {
          'moment': {
            test: /[\\/]node_modules[\\/](moment)[\\/]/,
            name: 'moment-vender',
            chunks: 'all',
          },
          'vue-vender': {
            test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
            name: 'vue-vendor',
            chunks: 'all',
          },
          'react-vender': {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
          },
        },
      },
    },
  }, (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    // const info = stats.toJson()

    if (stats.hasWarnings()) {
      // console.warn(info.warnings)
    }
    if (stats.hasErrors()) {
      // console.error(info.errors)
    }
    else {
      // 处理完成
      // eslint-disable-next-line
      console.log(chalk.green('打包完成'))
    }
  })
}

module.exports = webpackCompiler
