# 规范

- eslint
- husky git - 提交拦截
  - 触发lint-staged
  - 触发eslint
  - 禁止提交冲突的package-lock.json

commit 规范

全局安装

- npm install -g commitizen 
- npm install -g cz-conventional-changelog

配置信息

- echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
- commitizen init cz-conventional-changelog --save --save-exact

使用git cz  提交代码

- git cz 
