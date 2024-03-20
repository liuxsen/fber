module.exports = {
  entry: 'src/App.vue',
  pluginName: 'pluginName',
  terser: true, // 是否需要压缩代码
  devtool: 'source-map', // bundle模式生成sourcemap
  external: {
    vue: 'Vue',
  },
}
