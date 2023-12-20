## Tooltip
```
1. vue / vite / typescript 等依赖包版本均已升级到最新版，请根据最新 package.json 重新安装依赖。
2. node 版本要求: 18 / 20+
```

## Project Introduce

```
|-- neware-wms
 |-- vite.config.ts
 |-- tsconfig.json
 |-- tsconfig.app.json
 |-- tsconfig.node.json
 |-- package.json
 |-- .prettierrc.json
 |-- .eslintrc.cjs
 |-- .eslintignore
 |-- .gitignore
 |-- .env.dev
 |-- .env.dev.local(本地创建)
 |-- .env.pro
 |-- env.d.ts
 |-- globalTypes.ts
 |-- index.html
 |-- src
 	|-- App.vue
 	|-- main.ts
	|-- permission.ts 路由权限控制
 	|-- api 接口管理
 	|-- assets 图片等资源
 	|-- directive 指令
	|-- hooks 钩子
	|-- router 路由
	|-- stores 全局状态管理
	|-- styles 全局样式
	|-- utils 工具方法
	|-- components 公共组件
	|-- views 视图
		|-- error 错误页
		|-- login 登录页
		|-- layout 布局容器
		|-- accountCenter 账号中心
		|-- orderMange 订单管理
		|-- test 测试
	
```

## 项目安装

```
yarn install
```

### 本地环境(本地开发配置文件.env.dev | .env.dev.local)

```
yarn dev
yarn devl
```

### 生产环境(打包到生产环境配置文件 .evn.prod)

```
yarn build
```

### git 提交规范

```
1. git add <file>
2. git commit -m <message>
3. git push origin <remote branch>
4. git pull --rebase
```

### 注意事项

```
1. 需安装插件：Volar(ts版本)
2. 需禁用插件：Vetur
3. 建议安装插件：ESlint、Prettier
4. node 版本：18 / 20+
6. 测试：账号 admin  密码  minad
```

