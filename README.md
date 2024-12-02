# onlinejudge-functions

Online Judge 3 云函数仓库。

目前绑定服务商为腾讯云。

## 初始化新的云函数

1. 进入 `packages` 目录
2. `npx scf init scf-nodejs --name <function-name>` 初始化云函数
3. 进入创建的目录，修改 `serverless.yml` 配置中的必要字段，如：
   - `region: ap-shanghai`
   - `runtime: Nodejs16.13`
