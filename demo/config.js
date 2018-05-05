// demo配置文件
module.exports = {
  // axe-admin-web 配置
  appName: 'Demo',
  appGitHome: 'https://github.com/axe-org/demo-app',
  jenkinsURL: 'http://jenkins.luoxianming.cn',
  jenkinsModuleImportJobName: 'DemoModuleImport',
  guestMode: true,
  // 动态路由
  originDynamicRouterAdminURL: 'https://dynamic.demo.axe-org.cn/admin/',
  dynamicRouterHost: 'localhost', // host是写在nginx配置上的。
  devDynamicRouterHost: 'localhost', // 不会使用

  // 离线包
  originOfflinePackAdminURL: 'https://offline.demo.axe-org.cn/admin/',
  offlinePackHost: 'localhost',
  devOfflinePackHost: 'localhost', // 不会使用

  // axe-admin-server 配置。
  adminServerHost: 'demo.axe-org.cn',
  sqlType: 'sqlite',
  jenkinsUser: 'xxxxx',
  jenkinsPassword: 'xxxx',
  appGitType: 'github',
  adminUserName: 'admin',
  adminPassword: 'admin',

  // 最终管理页面URL配置。
  proxyAdminURLSetting: {
    dynamicRouterAdminURL: 'https://proxy-dynamic.demo.axe-org.cn/admin/',
    offlinePackAdminURL: 'https://proxy-offline.demo.axe-org.cn/admin/',
    // 没有测试环境。
    devDynamicRouterAdminURL: 'http://localhost:2679/admin/',
    devOfflinePackAdminURL: 'http://localhost:2677/admin/'
  },
  // 没有测试环境， 不使用
  devOfflinePackServerSetting: {
    checkDownload: true,
    local: {
      downloadUrl: 'http://localhost:2677/download/',
      publicPath: '/download'
    },
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
