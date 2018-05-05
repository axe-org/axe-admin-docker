# axe-admin-docker

dockerfile to install axe-admin

## 安装说明

使用`docker`来进行管理平台的发布。管理平台包括以下几个部分 ：

* [axe-admin-server](https://github.com/axe-org/axe-admin-server) : 管理平台服务端, 使用nodejs
* [axe-admin-web](https://github.com/axe-org/axe-admin-web) : 管理平台静态页面， 使用vue
* [offline-pack-server](https://github.com/axe-org/offline-pack-server) :  离线包管理页面， 离线包分为生产环境和开发环境， 管理平台自带一份开发环境， 并配置到生产环境的反向代理。
* [dynamic-router-server](https://github.com/axe-org/dynamic-router-server) : 动态路由管理平台， 同上，生产环境和开发环境， 自带一份开发环境， 并配置到生产环境的反向代理。
* nginx : 配置反向代理规则， 以处理 离线包和动态路由的权限问题 和 生产环境的反向代理。

安装 ： 

	docker build axe-admin
	
本地测试 ： 

	docker run -d -p 80:80 -p 2667:2667 -p 2669:2669 -p 2677:2677 -p 2679:2679 test

实际部署 ：

	docker run -d -p 80:80 -p 2667:2667 -p 2669:2669 -p 2677:2677 -p 2679:2679 --mount type=bind,source=/path/to/save,target=/axe test


## 使用Dockerfile构建

首先要构建 `node-nginx` , 进入文件夹，执行构建命令 ：

	docker build -t node-nginx .

然后回到根目录，执行命令：

	docker build -t axe-admin .

### 权限问题讨论

对于离线包和动态路由的权限， 有两个问题： 

1. 管理页面的查看权限
2. 管理页面的处理权限

生产环境的管理页面，显然是不能公开的，我们 建议 页面的安全性通过 IP限定来处理， 即对于生产环境的管理平台只能被 `axe管理平台`所在服务器访问， 而由管理平台服务器进行反向代理，以使内网的开发人员可以访问。

管理页面的权限问题 ： 我们在`Dockerfile`里做了特殊处理， 使用`nginx`反向代理 暴露了页面和相关查询接口， 但是对于修改接口， 我们只暴露给 APP管理组的 人员。 通过随机生成以路径作为管理接口的真正地址
