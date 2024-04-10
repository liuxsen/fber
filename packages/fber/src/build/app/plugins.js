const fs = require('node:fs')
const path = require('node:path')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const UnoCSS = require('@unocss/webpack').default
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const cliProgress = require('cli-progress')
const { root } = require('../../utils/constants')

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

function handler(percentage) {
  if (percentage === 0) {
    bar.start(1, 0)
  }
  if (percentage === 1) {
    bar.stop()
  }
  bar.update(percentage)
}

function getTemplate(root, staticDir = '/') {
  const templatePath = path.join(root, 'index.html')
  const template = fs.readFileSync(templatePath, 'utf-8')
  // 删除type module的注入方式
  let res = template.replace(/<script.*?type="module".*?><\/script>/g, '')
  // 将静态文件地址重写
  res = res
    .replace(/href="\//g, `href="/${staticDir}/`)
    .replace(/src="\//g, `src="/${staticDir}/`)
  return res
}

exports.vue3Plugin = (NODE_ENV, config) => {
  const plugins = [
    new webpack.DefinePlugin({ // webpack自带该插件，无需单独安装
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV), // 将属性转化为全局变量，让代码中可以正常访问
      },
      '__VUE_OPTIONS_API__': 'true',
      '__VUE_PROD_DEVTOOLS__': 'false',
      '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': 'false',
    }),
    // 请确保引入这个插件！
    UnoCSS(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      templateContent: getTemplate(root, config.app.staticDir),
    }),
    new HtmlWebpackExternalsPlugin({
      externals: config.app.htmlExternals,
    },
    ),
    new webpack.ProgressPlugin(handler),
    new FriendlyErrorsWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(root, config.app.staticDir),
          to: path.join(root, 'dist', 'app', config.app.staticDir),
          noErrorOnMissing: true,
        },
      ],
    }),
  ]
  if (config.app.analyzerBundle) {
    plugins.push(new BundleAnalyzerPlugin())
  }
  return plugins
}
