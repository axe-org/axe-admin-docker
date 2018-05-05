## 安装说明

使用`docker`来进行管理平台的发布。管理平台包括以下几个部分 ：

* [axe-admin-server](https://github.com/axe-org/axe-admin-server) : 管理平台服务端, 使用nodejs
* [axe-admin-web](https://github.com/axe-org/axe-admin-web) : 管理平台静态页面， 使用vue
* [offline-pack-server](https://github.com/axe-org/offline-pack-server) :  离线包管理页面， 离线包分为生产环境和开发环境， 管理平台自带一份开发环境， 并配置到生产环境的反向代理。
* [dynamic-router-server](https://github.com/axe-org/dynamic-router-server) : 动态路由管理平台， 同上，生产环境和开发环境， 自带一份开发环境， 并配置到生产环境的反向代理。
* nginx : 配置反向代理规则， 以处理 离线包和动态路由的权限问题 和 生产环境的反向代理。

安装 ： 

	docker pull dockerwhat/axe-admin
	
本地测试 ： 

	docker run -d -p 80:80 -p 2667:2667 -p 2669:2669 -p 2677:2677 -p 2679:2679 dockerwhat/axe-admin

实际部署, 实际部署时，需要指定 ：

	docker run -d -p 80:80 -p 2667:2667 -p 2669:2669 -p 2677:2677 -p 2679:2679 --mount type=bind,source=/path/to/axe,target=/axe dockerwhat/axe-admin


## 使用Dockerfile构建

首先要构建 `node-nginx` , 进入文件夹，执行构建命令 ：

	docker build -t node-nginx .

然后回到根目录，执行命令：

	docker build -t axe-admin .

## 权限问题讨论

对于离线包和动态路由的权限， 有两个问题： 

1. 管理页面的查看权限
2. 管理页面的处理权限

生产环境的管理页面，显然是不能公开的，我们 建议 页面的安全性通过 IP限定来处理， 即对于生产环境的管理平台只能被 `axe管理平台`所在服务器访问， 而由管理平台服务器进行反向代理，以使内网的开发人员可以访问。

管理页面的权限问题 ： 我们在`Dockerfile`里做了特殊处理， 使用`nginx`反向代理 暴露了页面和相关查询接口， 但是对于修改接口， 我们只暴露给 APP管理组的 人员。 通过随机生成以路径作为管理接口的真正地址.

## 详细配置介绍。

* [默认配置](config.js) 
* [DEMO](demo) : 这里是[demo.axe-org.cn](demo.axe-org.cn) 上的配置项。


### 基础配置

* appName: APP名称，展示用, 如 `Demo`
* appGitHome: APP代码仓库地址, 如 `https://github.com/axe-org/demo-app`
* guestMode: 访客模式， 允许一个访客用户来访问非操作的页面。 默认为`false`
* appGitType: git类型， 推荐使用`gitlab`来进行源码管理， 但是由于demo放在`github`上，所以必须支持`github`类型。
* hostHTTPProtocol: 协议类型， http 或 https , 默认是http , 然后根据端口号和host，来组装前端最终访问的页面地址。

### jenkins配置

* jenkinsURL: jenkins服务器地址 , 如 `http://jenkins.luoxianming.cn`
* jenkinsModuleImportJobName: APP管理模块接入的Job名， 如 `DemoModuleImport`
* jenkinsUser: jenkins构建账户
* jenkinsPassword : 密码

### adminServer配置

* sqlType : 使用的数据库类型， 目前只有`sqlite`
* adminUserName ：管理员帐号， 初始化时创建的具有APP管理和用户管理权限的一个帐号。
* adminPassword : 密码  
* adminServerHost： 服务的host设定

#### 对于host设定的补充说明

所有host默认配置是`localhost`。

如果是本地测试，直接设置 `localhost` ，具体页面路径要补上端口号

如果是部署， 且不配置域名， 通过`IP`来访问， 则host设置为相应的`IP`, 具体页面的路径要补上端口号。

如果是部署，但是外部没有额外的一层`nginx` ，则通过设定`host`来映射域名， 此时所有页面路径都在80端口上，不需要补端口号

如果外部有一层`nginx`，则设置的`host`还是 `localhost`, 外部反向代理通过 'http://localhost:port/'来访问。

### 动态路由服务器配置

* devDynamicRouterHost： 测试环境的host设定。 非域名时固定端口为 2679
* originDynamicRouterAdminURL: 生产环境的实际管理页面URL。
* dynamicRouterHost: 通过`axe-admin` 代理后的 `host`。 非域名时固定端口为2669

#### 关于生产环境的介绍

首先， 我们将动态路由和离线包的生产环境 与 我们的`axe-admin`管理平台分离， 因为前者是生产环境，后者是开发环境。 

然后，管理平台通过反向代理以访问实际的动态路由管理页面。这样做是为了比较简单地实现管理权限的控制。

1. 生产环境的 动态路由服务器，设置了访问规则，只允许`axe-admin`运行的服务器访问管理页面。
2. 然后在`axe-admin`上再做一层权限控制， 普通用户只能看到列表数据，只有`APP管理员`才能进行操作。

所以对于生产环境的动态路由和离线包，有两个设定， 一个是 实际服务器暴露的管理页面路径， 一个是通过管理平台代理的管理页面`host`设定。

### 离线包服务器配置

* devOfflinePackHost: 测试环境host设定。 非域名时端口固定为 2677
* devOfflinePackServerSetting： 测试环境的离线包服务器设定,查看[offline-pack-server](https://github.com/axe-org/offline-pack-server)以确认具体配置项设定规则。 注意`local.downloadUrl`。
* originOfflinePackAdminURL: 生产环境的实际管理页面URL
* offlinePackHost: 通过`axe-admin`代理后的`host` 。 非域名时端口固定为2667


### proxyAdminURLSetting

由于`axe-admin`实例外， 很有可能还有一层`nginx`做反向代理， 所以这里还要配置一下最终以下4个服务器的管理页面的URL。 

* dynamicRouterAdminURL ： 生产环境 动态路由
* devDynamicRouterAdminURL : 测试环境 动态路由
* offlinePackAdminURL : 生产环境离线包
* devOfflinePackAdminURL ： 测试环境离线包

本地测试时，使用`localhost`默认配置即可。

使用`IP`时， 需要修改这里的配置，将`localhost`改为对应的`IP`。
