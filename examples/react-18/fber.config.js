module.exports = {
  components: {
    entry: 'src/components',
    prefix: 'h',
    external: ['vue'],
    globals: {
      vue: 'Vue',
    },
  },
  lib: {
    entry: 'src/App.vue',
    pluginName: 'ui',
    external: ['vue'],
    globals: {
      vue: 'Vue',
    },
  },
  app: {
    entry: 'src/index.ts',
    devtool: 'source-map',
    publicPath: '/',
    mode: 'production',
    staticDir: 'static', // 默认public文件夹
  },
  dev: {
    server: {
      host: true,
      proxy: {
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  },
}
