const path = require('node:path')
const fs = require('node:fs')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const semver = require('semver')
const { checkPkgEnv } = require('../utils/checkPkgEnv')

function getTemplate(root) {
  const templatePath = path.join(root, 'index.html')
  const template = fs.readFileSync(templatePath, 'utf-8')
  // 删除type module的注入方式
  const res = template.replace(/<script.*?type="module".*?><\/script>/g, '')
  return res
}

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

function webpackCompiler(root) {
  const entryPath = require('../utils/getEnty')()
  const distDir = path.join(root, 'dist', 'app')
  const config = require('../utils/getFberConfig')()
  const webpack = require('webpack')
  const NODE_ENV = config.terser !== false ? 'production' : 'development'
  webpack({
    context: path.join(__dirname, '..', '..'),
    mode: NODE_ENV,
    entry: entryPath,
    output: {
      path: distDir,
      clean: true,
      filename: '[name].[contenthash].js',
      publicPath: '/',
    },
    devtool: config.devtool || 'none',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.vue'],
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
          use: 'ts-loader',
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
    plugins: [
      new webpack.DefinePlugin({ // webpack自带该插件，无需单独安装
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV), // 将属性转化为全局变量，让代码中可以正常访问
        },
        '__VUE_OPTIONS_API__': 'true',
        '__VUE_PROD_DEVTOOLS__': 'false',
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': 'false',
      }),
      // 请确保引入这个插件！
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        templateContent: getTemplate(root),
      }),
    ],
    optimization: {
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

    const info = stats.toJson()

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }
    if (stats.hasErrors()) {
      console.error(info.errors)
    }
    else {
      // 处理完成
      // eslint-disable-next-line
      console.log('打包完成')
    }
  })
}

module.exports = webpackCompiler
