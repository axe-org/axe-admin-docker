// 默认配置文件
module.exports = {
  // axe-admin-web 配置
  appName: 'Demo', // APP名称， 展示使用
  appGitHome: 'https://github.com/axe-org/demo-app', // 仓库地址
  // 动态路由配置， 动态路由 分为 开发环境和生产环境两套。
  // 生产环境在其他服务器上部署，而这里设置反向代理规则以安全地访问。
  // origin URL 是生产环境的实际地址，但是为了安全，我们建议设置IP限定。 而容器设置反向代理，同时做了APP管理员才能操作的限定，即通过反向代理设置访问规则。
  originDynamicRouterAdminURL: 'https://dynamic.demo.axe-org.cn/admin/',
  // 外部可以访问的动态路由管理页面地址 ， 放在前端供访问。 需要注意，实际部署时外部需要反向代理规则以映射到域名，则需要修改这个URL地址。
  // 设置域名， 默认为localhost即本地测试，使用端口号访问，端口号固定为2669, 如果设置了域名，则端口号也相应修改为80
  // 支持IP形式， 如本地简单部署时，直接设置host为IP，访问时需要通过 IP:host来访问。
  dynamicRouterHost: 'localhost', // 生产环境 2669
  devDynamicRouterHost: 'localhost', // 端口号限定为 2679
  // 离线包的两个服务器限定。
  originOfflinePackAdminURL: 'https://offline.demo.axe-org.cn/admin/',
  offlinePackHost: 'localhost', // 2667
  devOfflinePackHost: 'localhost', // 2677。
  jenkinsURL: 'http://jenkins.luoxianming.cn', // jenkins服务器地址
  jenkinsModuleImportJobName: 'DemoModuleImport', // jenkins接入模块的job名。

  // axe-admin-server 配置。
  adminServerHost: 'localhost', // 固定值。
  sqlType: 'sqlite', // 数据库类型， 暂时只有 sqlite
  guestMode: false, // 默认关闭访客模式
  // jenkinsURL: 'http://jenkins.luoxianming.cn',
  jenkinsUser: 'xxxxx', // 用户帐号与密码, 配置一个有权限访问模块管理和构建任务的帐号，以进行打包的调用。
  jenkinsPassword: 'xxxx',
  // jenkinsModuleImportJobName: 'DemoModuleImport', // 模块接入job名
  // appGitHome: 'https://github.com/axe-org/demo-app', // 仓库地址
  appGitType: 'github', // 默认类型， 虽然推荐使用gitlab ，但是当前demo是放在github上的。
  adminUserName: 'admin', // 初始化的管理员帐号与密码,
  adminPassword: 'admin',

  // 本地放置的离线包配置
  devOfflinePackServerSetting: { // 开发环境下的离线包设定.
    checkDownload: true,
    local: {
      downloadUrl: 'http://localhost:3112/download/',
      publicPath: '/download'
    },
    // 服务器私钥证书
    pem: `-----BEGIN RSA PRIVATE KEY-----
    MIIEpAIBAAKCAQEA4YXOMN8CxfZqDy2lpV+kbUgE4knWCG4k0M5/+lzOoEWl9eoo
    hXw0Ln3dY0Cjx2EGsVCR5KzZVIfjRCiyQwdd8QYpmXwkXwbSq4hLtRPMN/411WN/
    zTgycaDEXlgqz5YZ3RReQzdzqj/KkLvwjFvaW6Q57CeEM52VaRhtYzMIU0WJuUwh
    sDKODg8jYzAOp3n+gKdUToOGiC/wG9HyU/0qt37gA/eHgRjOUcNJ1KT085+ddTGK
    HyopN+cTtNQ0nq+nzj5ZhF3Zl6iQ92JWSV9ERE62CvX+dPnyVWjOc/1jmcDgcaej
    JldFGLc2DjRMn148LM93kLDeCw35vhZTQeS+AwIDAQABAoIBAH4MoaBjJVOsVL9D
    DjCOcoK6HDC2gDCaD2293X373WlrREVcqWVidG//3XuaJ3BK5Mi6dbDQg3Bhuz7f
    WDNqrLEIdrvYzSNn1twVA+ujsyMgrMomIMp9PISSDO+Ga/c2uCH/PmhnV/iySu/2
    e46X0EYkVlOOCrAmxdnF0238mgyf5mgiNgxVJ9N4D7LiRHDdhQ+6b86MsziiF13x
    ho+Lqo072RAL/krRm6HKiEN9Pe1ZdWmHmFRapkwobeIscWZOKkhmjlWbJrkyTGGZ
    Vhpc6h2vllFeQhTJPud6EOgS7877pgdYTupov3U3nonNqSDUu5jtwva9eRzyfiZ4
    2I32GkECgYEA+3moBdO3LFVryR9Cph8AX0oLgry1uPC7s2SFD4IOkldLVcfMY87P
    TCx9wLHC6smYt0orATy8GFR6fVFZ9++JZNqo8MZNc5VNS2nbw755mJ0EkSWrFq/k
    DPYeS+R0CHRbBb/MOWEmtna276hMpQY7eHzCPSrzGcljKzi7xHR2CzECgYEA5ZSb
    TTn0sTxLRYCBsAVLota5yjXenqjRrXH6pvXd61OeYf6FFUB7a1aciC+FrgFwtE2S
    NsfEjg1hQFaS6RfCzoOW0NUlCoX2bRiiAzfc7mDfWumX+1TLSSAa/1Z+uEsgkvuP
    BhAcrpJok+FIrkarOZAzf+P/fYpzjzzNjvbtZ3MCgYEA+SF3Af7SswsVMzTS9Hw2
    BDD44lZNuaBUc86bu9de1D/DFIJRzHcwCwjwtBvnPG7n6n2ByUIAHiJjDw+vD9+w
    v8eYIqByTpWU86c13uAu2rCDu8ATlPA//088iHcVNOMA4ds3WYkTryRA64BSHhLk
    i+MdEzgfimZm5oTYEDJIV6ECgYEA14MeGmuqUOpJuq+8jlEaRH2PoMva9FODqW8S
    ncK2FR/E0TbNFTsX4JZIkOsTcVn2w7sB45y53aOfxHbAqEFe5N/QJq+/etZwks8J
    3z2Ejt2vLjeULSHXRwj1bvZyNGyJ4pB1HXrogdP8ib10rey29W1xer+76cybWD36
    tRcFmxMCgYBSx18xn2yfnpb0vtSDnvIXsAPh0Cop5bVf9/VQF+bEqPUmXo6WuDeM
    LcZAjQZYjQ8JPYixFRz5Vl7bENOg4z6Ai3cznCrwqzB4+qt8XsoQsx/1+QeY4N+U
    f7xntR9Yw5QcEHXGj+V7tE1oWfU3mmJg9dRWKm8PFfQhv039qsUPMw==
    -----END RSA PRIVATE KEY-----
    `
  }
}
