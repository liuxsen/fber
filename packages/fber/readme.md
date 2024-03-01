# fber

> front-end builder tools 前端构建脚本

- [x] 支持vue2，vue3
- [x] 支持react 


## install

npm i fber -D

yarn add fber -D

## 如何使用


在 `scripts` 中添加执行脚本

// package.json

```json
{
  "scripts": {
    "build": "fber build --name plugin",
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



### 使用cdn地址

- 指定版本 https://unpkg.com/pkg@version/dist/es/index.js
- 最新版本 https://unpkg.com/pkg/dist/es/index.js