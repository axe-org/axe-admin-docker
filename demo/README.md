## demo

这里拿 `demo.axe-org.cn`上的配置做为示例：

服务配置 [config.js](config.js)

nginx配置 [nginx.conf](nginx.conf)


作为真正使用的服务， 外部还是要有一层nginx来做控制转发和域名。要设置访客模式， 同时暴露生产环境的动态路由和离线包。