// 用于在启动时， 处理配置文件。
const fs = require('fs')
const { URL } = require('url')
// 如当前路径处无配置文件，则复制默认配置文件。
if (!fs.existsSync('/axe/config.js')) {
  fs.writeFileSync('/axe/config.js', fs.readFileSync('/root/config.js'))
}
const config = require('/axe/config')

function makeID () {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

let dynamicServerAccessControlPath = makeID()
let offlineServerAccessControlPath = makeID()

let ipRegex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
let dynamicRouterPort = '80'
if (config.dynamicRouterHost === 'localhost' || ipRegex.test(config.dynamicRouterHost)) {
  dynamicRouterPort = '2669'
}
let offlineServerPort = '80'
if (config.offlinePackHost === 'localhost' || ipRegex.test(config.offlinePackHost)) {
  offlineServerPort = '2667'
}
let originDynamicRouterAdminURL = new URL(config.originDynamicRouterAdminURL)
let originOfflinePackAdminURL = new URL(config.originOfflinePackAdminURL)
let nginxConfig = `
server {
  listen       80;
  server_name  ${config.adminServerHost};

  location / {
    root   /root/dist;
    index  index.html;
  }
  location /api/ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:2678/api/;
    proxy_set_header   Cookie $http_cookie;
    client_max_body_size 30M;
  }
}

server {
  listen        ${dynamicRouterPort};
  server_name   ${config.dynamicRouterHost};

  location / {
    proxy_set_header Host ${originDynamicRouterAdminURL.host};
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_pass ${originDynamicRouterAdminURL.origin};
    proxy_set_header   Cookie $http_cookie;
    client_max_body_size 30M;
  }

  location /admin/create {
    default_type application/json ;
    return 200  '{"error":"没有权限，只有APP管理员用户才可以操作！！"}';
  }
  location /admin/close {
    default_type application/json ;
    return 200  '{"error":"没有权限，只有APP管理员用户才可以操作！！"}';
  }

  location /admin/${dynamicServerAccessControlPath}/ {
    proxy_set_header Host ${originDynamicRouterAdminURL.host};
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_pass ${config.originDynamicRouterAdminURL};
    proxy_set_header   Cookie $http_cookie;
    client_max_body_size 30M;
  }
}

server {
  listen        ${offlineServerPort};
  server_name   ${config.offlinePackHost};

  location / {
    proxy_set_header Host ${originOfflinePackAdminURL.host};
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_pass ${originOfflinePackAdminURL.origin};
    proxy_set_header   Cookie $http_cookie;
    client_max_body_size 30M;
  }

  location /admin/stopPack {
    default_type application/json ;
    return 200  '{"error":"没有权限，只有APP管理员用户才可以操作！！"}';
  }
  location /admin/pushPackInfo {
    default_type application/json ;
    return 200  '{"error":"没有权限，只有APP管理员用户才可以操作！！"}';
  }

  location /admin/${offlineServerAccessControlPath}/ {
    proxy_set_header Host ${originOfflinePackAdminURL.host};
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_pass ${config.originOfflinePackAdminURL};
    proxy_set_header   Cookie $http_cookie;
    client_max_body_size 30M;
  }
}

`

if (config.devDynamicRouterHost !== 'localhost' && !ipRegex.test(config.devDynamicRouterHost)) {
  // 如果由host限定，需要添加反向代理规则，否则直接访问端口。
  nginxConfig += `
  server {
    listen        80;
    server_name   ${config.devDynamicRouterHost};
  
    location / {
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
      proxy_pass http://127.0.0.1:2679/;
      proxy_set_header   Cookie $http_cookie;
      client_max_body_size 30M;
    }
  }
  `
}

if (config.devOfflinePackHost !== 'localhost' && !ipRegex.test(config.devOfflinePackHost)) {
  // 如果由host限定，需要添加反向代理规则，否则直接访问端口。
  nginxConfig += `
  server {
    listen        80;
    server_name   ${config.devOfflinePackHost};
  
    location / {
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
      proxy_pass http://127.0.0.1:2677/;
      proxy_set_header   Cookie $http_cookie;
      client_max_body_size 30M;
    }
  }
  `
}
// 覆盖nginx配置
fs.writeFileSync('/etc/nginx/conf.d/default.conf', nginxConfig)

// 分发配置
// 离线包
if (config.devOfflinePackServerSetting) {
  let devOfflineServerConfig = 'module.exports = ' + JSON.stringify(config.devOfflinePackServerSetting)
  fs.writeFileSync('/axe/offline/config.js', devOfflineServerConfig)
}
// admin-server
let adminServerConfig = {
  sqlType: config.sqlType,
  guestMode: config.guestMode,
  jenkinsURL: config.jenkinsURL,
  jenkinsUser: config.jenkinsUser,
  jenkinsPassword: config.jenkinsPassword,
  jenkinsModuleImportJobName: config.jenkinsModuleImportJobName,
  appGitHome: config.appGitHome,
  appGitType: config.appGitType,
  adminUserName: config.adminUserName,
  adminPassword: config.adminPassword,
  dynamicServerAccessControlPath: dynamicServerAccessControlPath,
  offlineServerAccessControlPath: offlineServerAccessControlPath
}
fs.writeFileSync('/axe/admin/config.js', 'module.exports = ' + JSON.stringify(adminServerConfig))

// admin-web
let webConfig = {
  appName: config.appName,
  appGitHome: config.appGitHome,
  guestMode: config.guestMode,
  dynamicRouterAdminURL: config.proxyAdminURLSetting.dynamicRouterAdminURL,
  devDynamicRouterAdminURL: config.proxyAdminURLSetting.devDynamicRouterAdminURL,
  offlinePackAdminURL: config.proxyAdminURLSetting.offlinePackAdminURL,
  devOfflinePackAdminURL: config.proxyAdminURLSetting.devOfflinePackAdminURL,
  jenkinsURL: config.jenkinsURL,
  jenkinsModuleImportJobName: config.jenkinsModuleImportJobName
}
fs.writeFileSync('/root/dist/config.js', 'window.AXEWebConfig=' + JSON.stringify(webConfig))
