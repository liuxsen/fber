# fber

> front-end builder tools 前端构建脚本

可构建lib包，可构建项目

- [x] 支持vue2，vue3
- [x] 支持react
- [ ] 支持typescript


## install

全局使用

- npm i fber -g

项目内部使用

- npm i fber -D
- yarn add fber -D


## 如何使用

在 `scripts` 中添加执行脚本

// package.json

```json
{
  "scripts": {
    "build": "fber build --name plugin",
    "bundle": "fber bundle",
    "dev": "fber dev"
  }
}
```

fber build 用来构建生产产物

fber dev 用来作为开发环境


### 配置项目入口,external

// package.json
```json
{
  "config": {
    "fber": {
      "entry": "src/components/index.jsx",
      "external": {
        "vue": "Vue"
      }
    }
  }
}
```

### 使用fber.config.js

```js
// react
module.exports = {
  entry: 'src/index.tsx',
  external: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
}
```

```js
// vue
module.exports = {
  entry: 'src/index.ts',
  external: {
    vue: 'Vue',
  },
}
```

### 构件包的cdn地址

- 指定版本 https://unpkg.com/pkg_name@version/dist/es/index.js
- 最新版本 https://unpkg.com/pkg_name/dist/es/index.js