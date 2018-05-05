## Guest模式

访客模式，当前展示的`demo.axe-org.cn`网站使用的就是访客模式。

访客模式，指给未登录用户一个 访客帐号，使其可以访问所有页面和内容，但是不能进行任何修改操作。

`Dockerfile`与主干版本相同， 区别在于下载的 `axe-admin-web`是 `guest`版本。


## 访客模式

访客模式事实上只适合 `demo`网站这种需求， 对于正常开发环境，系统中开发信息也应该保持警惕，避免暴露。